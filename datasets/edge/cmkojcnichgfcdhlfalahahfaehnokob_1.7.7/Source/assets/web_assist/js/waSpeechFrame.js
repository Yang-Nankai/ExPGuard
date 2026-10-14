/**
 * This script is loaded into an iframe document (speechFrame.html). It includes all the code for receiving messages from the
 * content script and handling the microphone such as starting recognition and voice detection.
 */
var parentHost = "";

var speechDetector = function (useWake) {
  var me = this,
    maxInterval = 1500,
    minInterval = 500,
    speech = null,
    deviceId = "",
    hOptions = {
      interval: 70,
      threshold: -60,
    };

  me.speaking = false;
  me.globalStream = null;
  me.detectorOn = false;

  me.stop = function () {
    try {
      closeMedia();
    } catch (e) {
      console.log("Media error");
    }
  };

  me.start = function () {
    var constraints = {
        audio: {
          channelCount: 1,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: false,
          sampleRate: 16000,
          sampleSize: 16,
          volume: 1.0,
        },
        video: false,
      },
      speechOn = false;

    try {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess, handleError)
        .catch(function () {});
    } catch (e) {
      me.detectorOn = false;
      var data = JSON.stringify({ type: "error", message: e.message });
      window.parent.postMessage(data, parentHost);
    }

    function handleSuccess(stream) {
      try {
        //  speech = speech ? speech : hark(stream, hOptions);
        speech = hark(stream, hOptions);
        me.detectorOn = true;
        me.globalStream = stream;
        deviceId = getID(stream);
      } catch (e) {
        me.detectorOn = false;
        var data = JSON.stringify({ type: "error", message: e.message });
        window.parent.postMessage(data, parentHost);
      }

      function getID(stream) {
        var tracks = stream.getAudioTracks(),
          device = "";

        for (let index = 0; index < tracks.length; index++) {
          device = tracks[index].label;
          if (device) return device;
        }
      }

      if (speech) {
        speech.on("speaking", function () {
          try {
            me.speaking = true;
            if (useWake) startClock();
          } catch (error) {
            console.log("speech object");
          }
        });

        speech.on("stopped_speaking", function () {
          me.speaking = false;
          if (useWake) {
            if (speechOn) return;
            speechOn = true;
            var endTime = new Date(),
              elTime = elapsedTime(endTime);
            //    console.log('Total ' + elTime.toString());
            if (elTime < maxInterval && elTime > minInterval) {
              //       console.log('Time ' + endTime.toString());
              //   options.callback();
              var data = JSON.stringify({ type: "speechDetected" });

              window.parent.postMessage(data, parentHost);
            }
            speechOn = false;
          }
        });
      }
    }

    function handleError(error) {
      me.detectorOn = false;
      console.log(error);
    }
  };

  var startTime = null,
    counting = false;

  function startClock() {
    if (counting) return;
    startTime = new Date();
    counting = true;
  }

  function elapsedTime(endTime) {
    var elapsed = endTime - startTime;
    counting = false;
    return elapsed;
  }

  function closeMedia() {
    //   if (!me.detectorOn) return;
    me.detectorOn = false;
    speech.stop();
    stopMicrophone();
  }

  async function stopMicrophone() {
    await me.globalStream.getAudioTracks().forEach(function (track) {
      if (track.label === deviceId) {
        if (track.readyState === "live") {
          track.stop();

          if (track.readyState !== "ended") {
            var data = JSON.stringify({ type: "reload" });
            window.parent.postMessage(data, parentHost);
          }
        }
      }
    });
  }
};

var speechDetect = new speechDetector(true);

var WebSpeechRecognitionAPI = function () {
  var me = this,
    recognitionStopped = true,
    speechTimeout = null,
    speechProvider =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition ||
      window.mozSpeechRecognition ||
      window.msSpeechRecognition,
    recognition = new speechProvider(),
    startCount = 0,
    endCount = 0;

  me.dictationMode = false;
  me.options = null;
  recognition.maxAlternatives = 3;
  const language = navigator.language;
  if (language.startsWith("en-")) {
    recognition.lang = language;
  } else {
    if (me.options.languageCode) recognition.lang = me.options.languageCode;
  }
   if (isEdgeBrowser()) {
    recognition.continuous = true;
   } else {
    recognition.continuous = false;
   }
  
  // recognition.continuous = false;

  me.setContinuousMode = function (value) {
    if (!isEdgeBrowser()) recognition.continuous = value;
//   recognition.continuous = value;
  };

  function isEdgeBrowser() {
    return /Edg/.test(navigator.userAgent);
  }

  me.SetMaxAlternatives = function (max) {
    recognition.maxAlternatives = max;
  };

  async function initializeTimeout() {
    if (parseInt(me.options.webSpeechTimeout) > 0) {
      speechTimeout = new waTimeout({
        ontimeout: ontimeout,
        timeout: parseInt(me.options.webSpeechTimeout) * 1000,
      });
    }
  }
  //Process incoming transcripts and send results to the WebAssist object
  recognition.onresult = function (event) {
    var transcripts = [],
      transcript = "",
      results = null,
      finalResults = false,
      alternatives = null;

    try {
      for (
        var i = event.resultIndex, rLen = event.results.length;
        i < rLen;
        i++
      ) {
        results = event.results[i];
        finalResults = results.isFinal;
        alternatives = Array.from(results);

        for (var x = 0, len = alternatives.length; x < len; x++) {
          transcript = alternatives[x].transcript.trim();
          if (transcript) transcripts.push(transcript);
        }
      }

      sendTranscripts(transcripts, finalResults);
     
      if (parseInt(me.options.webSpeechTimeout) > 0) speechTimeout.restart();
    } catch (e) {
      if (parseInt(me.options.webSpeechTimeout) > 0) speechTimeout.stop();
      speechError = true;
      startIt("error", "network", 0);
      // data = JSON.stringify({ type: "error", message: "network" });
      // window.parent.postMessage(data, parentHost);
      console.log("Native provider error " + e.message);
    }
  };

  function sendTranscripts(transcripts, finalResults) {
    var data = JSON.stringify({
      type: "transcripts",
      transcripts: transcripts,
      finalResults: finalResults,
    });
    if (transcripts.length) window.parent.postMessage(data, parentHost);
  }
  recognition.onstart = function (event) {
    // endTime = Date.now();
    // console.log('Elapsed' + " " + (endTime - startTime));
    var data = JSON.stringify({ type: "recognitionStarted"});
    window.parent.postMessage(data, parentHost);
    recognitionStopped = false;
    startCount = 0;
  };

  var speechError = false;

  recognition.onerror = async function (event) {
    var data = null;

    if (event.error !== "aborted" && event.error !== "no-speech") {
      if (parseInt(me.options.webSpeechTimeout) > 0) speechTimeout.stop();
      if (event.error === "network") {
        speechError = true;
        startIt("error", "network", 0);
        // data = JSON.stringify({ type: "error", message: "network" });
        // window.parent.postMessage(data, parentHost);
      } else if (event.error === "not-allowed") {
        speechError = true;
        data = JSON.stringify({
          type: "error",
          message: "notallowederror",
        });
        window.parent.postMessage(data, parentHost);
      } else {
        speechError = true;
        data = JSON.stringify({ type: "error", message: event.message });
        window.parent.postMessage(data, parentHost);
      }
      console.log("Speech recognition error detected: " + event.error);
    }
  };

  var serviceError = false;

//  var startTime =null;

// Code to be measured

//var endTime = null;


  recognition.onend = function () {
    //If the recognitionStopped variable is not set it is an error
   //startTime = Date.now();
    if (!recognitionStopped && !speechError) {
      startIt("restart", "error recognition", 5);
    }
    speechError = false;
  };

   function startIt(type, message, maxCount) {
      setTimeout(() => {
        if (endCount > maxCount) {
          //    console.log("restart recognition error " + endCount);
          var data = JSON.stringify({
            type: type,
            message: message,
          });
          window.parent.postMessage(data, parentHost);
          serviceError = true;
        }
        endCount = 0;
      }, 5000);

    if (!serviceError) {
      recognitionStopped = true;
      me.start(true);
    }

    serviceError = false;
    endCount += 1;
  }

  //Start recognition
  me.start = function (reset) {
    try {
      if (!recognitionStopped) {
        return;
      }
      //  speechMonitor.start();
      if (!speechTimeout) initializeTimeout();
      recognition.start();
      //Start timeout countdown
      if (parseInt(me.options.webSpeechTimeout) > 0 && !reset) {
        speechTimeout.stop();
        speechTimeout.start();
      }
    } catch (error) {
      if (error.message.toLowerCase().indexOf('failed to execute') > -1) {
        return;
      }
      if (!startCount) {
        setTimeout(() => {
          startCount++;
          me.start();
        }, 100);
      } else {
        console.log("Recognition start error " + error.message);
      }
    }
  };

  //Stop recognition
  me.stop = function () {
    if (recognitionStopped) {
      return;
    }
    endCount = 0;
    startCount = 0;
    // speechMonitor.stop();
    recognitionStopped = true;
    if (!speechTimeout) initializeTimeout();
    recognition.stop();
    if (parseInt(me.options.webSpeechTimeout) > 0) {
      //Stop timeout countdown
      speechTimeout.stop();
    }
  };

  me.addGrammars = async function (commands) {
    var grammars = "#JSGF V1.0; grammar commands; public <commands> = ",
      lastText = commands[commands.length - 1],
      bar = "|",
      commandText = "";

    commands.forEach(function (command) {
      //Don't add wildcard commands
      commandText = command.commandText;
      if (commandText) {
        if (commandText.indexOf(" *") > -1) {
          commandText = commandText.replace(" *", "");
        }
        bar = commandText !== lastText ? " | " : " ;";
        grammars += commandText + bar;
      }
    });
    const grammarList = webkitSpeechGrammarList;
    const speechRecognitionList = new grammarList();
    speechRecognitionList.addFromString(grammars, 1);
    recognition.grammars = speechRecognitionList;
  };

  me.resetTimeout = async function () {
    if (!speechTimeout) initializeTimeout();
    speechTimeout.stop();
    if (parseInt(me.options.webSpeechTimeout) > 0) {
      speechTimeout = new waTimeout({
        ontimeout: ontimeout,
        timeout: parseInt(me.options.webSpeechTimeout) * 1000,
      });
    }
  };

  me.setVideoTimeout = async function (data) {
    if (!speechTimeout) initializeTimeout();
    if (parseInt(me.options.webSpeechTimeout) > 0) {
      speechTimeout.stop();
      speechTimeout = new waTimeout({
        ontimeout: ontimeout,
        timeout: 5000,
      });
    }
  };

  async function ontimeout() {
    var data = JSON.stringify({ type: "timeout" });
    window.parent.postMessage(data, parentHost);
  }
   // function getTime() {
  //   const now = new Date();

  //   // Get individual components
  //   const hours = now.getHours();
  //   const minutes = now.getMinutes();
  //   const seconds = now.getSeconds();

  //   // Format the time as a string
  //   return`${hours}:${minutes}:${seconds}`;
  // }
};

var waTimeout = function (options) {
  var me = this,
    timeout = null;

  me.start = async function () {
    if (timeout) return;
    timeout = setTimeout(function () {
      options.ontimeout();
    }, options.timeout);
  };

  me.stop = async function () {
    clearTimeout(timeout);
    timeout = null;
  };

  me.restart = async function () {
    me.stop();
    me.start();
  };
};

var speechRecognition = new WebSpeechRecognitionAPI();


(function (e) {
  if ("function" == typeof bootstrap) bootstrap("hark", e);
  else if ("object" == typeof exports) module.exports = e();
  else if ("function" == typeof define && define.amd) define(e);
  else if ("undefined" != typeof ses) {
    if (!ses.ok()) return;
    ses.makeHark = e;
  } else
    "undefined" != typeof window ? (window.hark = e()) : (global.hark = e());
})(function () {
  var define, ses, bootstrap, module, exports;
  return (function (e, t, n) {
    function i(n, s) {
      if (!t[n]) {
        if (!e[n]) {
          var o = typeof require == "function" && require;
          if (!s && o) return o(n, !0);
          if (r) return r(n, !0);
          throw new Error("Cannot find module '" + n + "'");
        }
        var u = (t[n] = { exports: {} });
        e[n][0].call(
          u.exports,
          function (t) {
            var r = e[n][1][t];
            return i(r ? r : t);
          },
          u,
          u.exports
        );
      }
      return t[n].exports;
    }
    var r = typeof require == "function" && require;
    for (var s = 0; s < n.length; s++) i(n[s]);
    return i;
  })(
    {
      1: [
        function (require, module, exports) {
          var WildEmitter = require("wildemitter");

          function getMaxVolume(analyser, fftBins) {
            var maxVolume = -Infinity;
            analyser.getFloatFrequencyData(fftBins);

            for (var i = 4, ii = fftBins.length; i < ii; i++) {
              if (fftBins[i] > maxVolume && fftBins[i] < 0) {
                maxVolume = fftBins[i];
              }
            }

            return maxVolume;
          }

          var audioContextType;
          if (typeof window !== "undefined") {
            audioContextType = window.AudioContext || window.webkitAudioContext;
          }
          // use a single audio context due to hardware limits
          var audioContext = null;
          module.exports = function (stream, options) {
            var harker = new WildEmitter();

            // make it not break in non-supported browsers
            if (!audioContextType) return harker;

            //Config
            var options = options || {},
              smoothing = options.smoothing || 0.2,
              interval = options.interval || 50,
              threshold = options.threshold,
              play = options.play,
              history = options.history || 10,
              running = true;

            // Ensure that just a single AudioContext is internally created
            audioContext =
              options.audioContext || audioContext || new audioContextType();

            var sourceNode, fftBins, analyser;

            analyser = audioContext.createAnalyser();
            analyser.fftSize = 1024;
            analyser.smoothingTimeConstant = smoothing;
            fftBins = new Float32Array(analyser.frequencyBinCount);

            if (stream.jquery) stream = stream[0];
            if (
              stream instanceof HTMLAudioElement ||
              stream instanceof HTMLVideoElement
            ) {
              //Audio Tag
              sourceNode = audioContext.createMediaElementSource(stream);
              if (typeof play === "undefined") play = true;
              threshold = threshold || -50;
            } else {
              //WebRTC Stream
              sourceNode = audioContext.createMediaStreamSource(stream);
              threshold = threshold || -50;
            }

            sourceNode.connect(analyser);
            if (play) analyser.connect(audioContext.destination);

            harker.speaking = false;

            harker.suspend = function () {
              return audioContext.suspend();
            };
            harker.resume = function () {
              return audioContext.resume();
            };
            Object.defineProperty(harker, "state", {
              get: function () {
                return audioContext.state;
              },
            });
            audioContext.onstatechange = function () {
              harker.emit("state_change", audioContext.state);
            };

            harker.setThreshold = function (t) {
              threshold = t;
            };

            harker.setInterval = function (i) {
              interval = i;
            };

            harker.stop = function () {
              running = false;
              harker.emit("volume_change", -100, threshold);
              if (harker.speaking) {
                harker.speaking = false;
                harker.emit("stopped_speaking");
              }
              analyser.disconnect();
              sourceNode.disconnect();
            };
            harker.speakingHistory = [];
            for (var i = 0; i < history; i++) {
              harker.speakingHistory.push(0);
            }

            // Poll the analyser node to determine if speaking
            // and emit events if changed
            var looper = function () {
              setTimeout(function () {
                //check if stop has been called
                if (!running) {
                  return;
                }

                var currentVolume = getMaxVolume(analyser, fftBins);

                harker.emit("volume_change", currentVolume, threshold);

                var history = 0;
                if (currentVolume > threshold && !harker.speaking) {
                  // trigger quickly, short history
                  for (
                    var i = harker.speakingHistory.length - 3;
                    i < harker.speakingHistory.length;
                    i++
                  ) {
                    history += harker.speakingHistory[i];
                  }
                  if (history >= 2) {
                    harker.speaking = true;
                    harker.emit("speaking");
                  }
                } else if (currentVolume < threshold && harker.speaking) {
                  for (var i = 0; i < harker.speakingHistory.length; i++) {
                    history += harker.speakingHistory[i];
                  }
                  if (history == 0) {
                    harker.speaking = false;
                    harker.emit("stopped_speaking");
                  }
                }
                harker.speakingHistory.shift();
                harker.speakingHistory.push(0 + (currentVolume > threshold));

                looper();
              }, interval);
            };
            looper();

            return harker;
          };
        },
        { wildemitter: 2 },
      ],
      2: [
        function (require, module, exports) {
          /*
    WildEmitter.js is a slim little event emitter by @henrikjoreteg largely based
    on @visionmedia's Emitter from UI Kit.
    
    Why? I wanted it standalone.
    
    I also wanted support for wildcard emitters like this:
    
    emitter.on('*', function (eventName, other, event, payloads) {
    
    });
    
    emitter.on('somenamespace*', function (eventName, payloads) {
    
    });
    
    Please note that callbacks triggered by wildcard registered events also get
    the event name as the first argument.
    */

          module.exports = WildEmitter;

          function WildEmitter() {}

          WildEmitter.mixin = function (constructor) {
            var prototype = constructor.prototype || constructor;

            prototype.isWildEmitter = true;

            // Listen on the given `event` with `fn`. Store a group name if present.
            prototype.on = function (event, groupName, fn) {
              this.callbacks = this.callbacks || {};
              var hasGroup = arguments.length === 3,
                group = hasGroup ? arguments[1] : undefined,
                func = hasGroup ? arguments[2] : arguments[1];
              func._groupName = group;
              (this.callbacks[event] = this.callbacks[event] || []).push(func);
              return this;
            };

            // Adds an `event` listener that will be invoked a single
            // time then automatically removed.
            prototype.once = function (event, groupName, fn) {
              var self = this,
                hasGroup = arguments.length === 3,
                group = hasGroup ? arguments[1] : undefined,
                func = hasGroup ? arguments[2] : arguments[1];
              function on() {
                self.off(event, on);
                func.apply(this, arguments);
              }
              this.on(event, group, on);
              return this;
            };

            // Unbinds an entire group
            prototype.releaseGroup = function (groupName) {
              this.callbacks = this.callbacks || {};
              var item, i, len, handlers;
              for (item in this.callbacks) {
                handlers = this.callbacks[item];
                for (i = 0, len = handlers.length; i < len; i++) {
                  if (handlers[i]._groupName === groupName) {
                    //console.log('removing');
                    // remove it and shorten the array we're looping through
                    handlers.splice(i, 1);
                    i--;
                    len--;
                  }
                }
              }
              return this;
            };

            // Remove the given callback for `event` or all
            // registered callbacks.
            prototype.off = function (event, fn) {
              this.callbacks = this.callbacks || {};
              var callbacks = this.callbacks[event],
                i;

              if (!callbacks) return this;

              // remove all handlers
              if (arguments.length === 1) {
                delete this.callbacks[event];
                return this;
              }

              // remove specific handler
              i = callbacks.indexOf(fn);
              callbacks.splice(i, 1);
              if (callbacks.length === 0) {
                delete this.callbacks[event];
              }
              return this;
            };

            /// Emit `event` with the given args.
            // also calls any `*` handlers
            prototype.emit = function (event) {
              this.callbacks = this.callbacks || {};
              var args = [].slice.call(arguments, 1),
                callbacks = this.callbacks[event],
                specialCallbacks = this.getWildcardCallbacks(event),
                i,
                len,
                item,
                listeners;

              if (callbacks) {
                listeners = callbacks.slice();
                for (i = 0, len = listeners.length; i < len; ++i) {
                  if (!listeners[i]) {
                    break;
                  }
                  listeners[i].apply(this, args);
                }
              }

              if (specialCallbacks) {
                len = specialCallbacks.length;
                listeners = specialCallbacks.slice();
                for (i = 0, len = listeners.length; i < len; ++i) {
                  if (!listeners[i]) {
                    break;
                  }
                  listeners[i].apply(this, [event].concat(args));
                }
              }

              return this;
            };

            // Helper for for finding special wildcard event handlers that match the event
            prototype.getWildcardCallbacks = function (eventName) {
              this.callbacks = this.callbacks || {};
              var item,
                split,
                result = [];

              for (item in this.callbacks) {
                split = item.split("*");
                if (
                  item === "*" ||
                  (split.length === 2 &&
                    eventName.slice(0, split[0].length) === split[0])
                ) {
                  result = result.concat(this.callbacks[item]);
                }
              }
              return result;
            };
          };

          WildEmitter.mixin(WildEmitter);
        },
        {},
      ],
    },
    {},
    [1]
  )(1);
});

(function (name, definition) {
  if (typeof define === "function" && define.amd) {
    // RequireJS / AMD
    define(definition);
  } else if (typeof module !== "undefined" && module.exports) {
    // CommonJS / Node.js
    module.exports = definition();
  } else {
    // Direct include
    window.ysFixWebmDuration = definition();
  }
})("fix-webm-duration", function () {
  /*
   * This is the list of possible WEBM file sections by their IDs.
   * Possible types: Container, Binary, Uint, Int, String, Float, Date
   */
  var sections = {
    0xa45dfa3: { name: "EBML", type: "Container" },
    0x286: { name: "EBMLVersion", type: "Uint" },
    0x2f7: { name: "EBMLReadVersion", type: "Uint" },
    0x2f2: { name: "EBMLMaxIDLength", type: "Uint" },
    0x2f3: { name: "EBMLMaxSizeLength", type: "Uint" },
    0x282: { name: "DocType", type: "String" },
    0x287: { name: "DocTypeVersion", type: "Uint" },
    0x285: { name: "DocTypeReadVersion", type: "Uint" },
    0x6c: { name: "Void", type: "Binary" },
    0x3f: { name: "CRC-32", type: "Binary" },
    0xb538667: { name: "SignatureSlot", type: "Container" },
    0x3e8a: { name: "SignatureAlgo", type: "Uint" },
    0x3e9a: { name: "SignatureHash", type: "Uint" },
    0x3ea5: { name: "SignaturePublicKey", type: "Binary" },
    0x3eb5: { name: "Signature", type: "Binary" },
    0x3e5b: { name: "SignatureElements", type: "Container" },
    0x3e7b: { name: "SignatureElementList", type: "Container" },
    0x2532: { name: "SignedElement", type: "Binary" },
    0x8538067: { name: "Segment", type: "Container" },
    0x14d9b74: { name: "SeekHead", type: "Container" },
    0xdbb: { name: "Seek", type: "Container" },
    0x13ab: { name: "SeekID", type: "Binary" },
    0x13ac: { name: "SeekPosition", type: "Uint" },
    0x549a966: { name: "Info", type: "Container" },
    0x33a4: { name: "SegmentUID", type: "Binary" },
    0x3384: { name: "SegmentFilename", type: "String" },
    0x1cb923: { name: "PrevUID", type: "Binary" },
    0x1c83ab: { name: "PrevFilename", type: "String" },
    0x1eb923: { name: "NextUID", type: "Binary" },
    0x1e83bb: { name: "NextFilename", type: "String" },
    0x444: { name: "SegmentFamily", type: "Binary" },
    0x2924: { name: "ChapterTranslate", type: "Container" },
    0x29fc: { name: "ChapterTranslateEditionUID", type: "Uint" },
    0x29bf: { name: "ChapterTranslateCodec", type: "Uint" },
    0x29a5: { name: "ChapterTranslateID", type: "Binary" },
    0xad7b1: { name: "TimecodeScale", type: "Uint" },
    0x489: { name: "Duration", type: "Float" },
    0x461: { name: "DateUTC", type: "Date" },
    0x3ba9: { name: "Title", type: "String" },
    0xd80: { name: "MuxingApp", type: "String" },
    0x1741: { name: "WritingApp", type: "String" },
    // 0xf43b675: { name: 'Cluster', type: 'Container' },
    0x67: { name: "Timecode", type: "Uint" },
    0x1854: { name: "SilentTracks", type: "Container" },
    0x18d7: { name: "SilentTrackNumber", type: "Uint" },
    0x27: { name: "Position", type: "Uint" },
    0x2b: { name: "PrevSize", type: "Uint" },
    0x23: { name: "SimpleBlock", type: "Binary" },
    0x20: { name: "BlockGroup", type: "Container" },
    0x21: { name: "Block", type: "Binary" },
    0x22: { name: "BlockVirtual", type: "Binary" },
    0x35a1: { name: "BlockAdditions", type: "Container" },
    0x26: { name: "BlockMore", type: "Container" },
    0x6e: { name: "BlockAddID", type: "Uint" },
    0x25: { name: "BlockAdditional", type: "Binary" },
    0x1b: { name: "BlockDuration", type: "Uint" },
    0x7a: { name: "ReferencePriority", type: "Uint" },
    0x7b: { name: "ReferenceBlock", type: "Int" },
    0x7d: { name: "ReferenceVirtual", type: "Int" },
    0x24: { name: "CodecState", type: "Binary" },
    0x35a2: { name: "DiscardPadding", type: "Int" },
    0xe: { name: "Slices", type: "Container" },
    0x68: { name: "TimeSlice", type: "Container" },
    0x4c: { name: "LaceNumber", type: "Uint" },
    0x4d: { name: "FrameNumber", type: "Uint" },
    0x4b: { name: "BlockAdditionID", type: "Uint" },
    0x4e: { name: "Delay", type: "Uint" },
    0x4f: { name: "SliceDuration", type: "Uint" },
    0x48: { name: "ReferenceFrame", type: "Container" },
    0x49: { name: "ReferenceOffset", type: "Uint" },
    0x4a: { name: "ReferenceTimeCode", type: "Uint" },
    0x2f: { name: "EncryptedBlock", type: "Binary" },
    0x654ae6b: { name: "Tracks", type: "Container" },
    0x2e: { name: "TrackEntry", type: "Container" },
    0x57: { name: "TrackNumber", type: "Uint" },
    0x33c5: { name: "TrackUID", type: "Uint" },
    0x3: { name: "TrackType", type: "Uint" },
    0x39: { name: "FlagEnabled", type: "Uint" },
    0x8: { name: "FlagDefault", type: "Uint" },
    0x15aa: { name: "FlagForced", type: "Uint" },
    0x1c: { name: "FlagLacing", type: "Uint" },
    0x2de7: { name: "MinCache", type: "Uint" },
    0x2df8: { name: "MaxCache", type: "Uint" },
    0x3e383: { name: "DefaultDuration", type: "Uint" },
    0x34e7a: { name: "DefaultDecodedFieldDuration", type: "Uint" },
    0x3314f: { name: "TrackTimecodeScale", type: "Float" },
    0x137f: { name: "TrackOffset", type: "Int" },
    0x15ee: { name: "MaxBlockAdditionID", type: "Uint" },
    0x136e: { name: "Name", type: "String" },
    0x2b59c: { name: "Language", type: "String" },
    0x6: { name: "CodecID", type: "String" },
    0x23a2: { name: "CodecPrivate", type: "Binary" },
    0x58688: { name: "CodecName", type: "String" },
    0x3446: { name: "AttachmentLink", type: "Uint" },
    0x1a9697: { name: "CodecSettings", type: "String" },
    0x1b4040: { name: "CodecInfoURL", type: "String" },
    0x6b240: { name: "CodecDownloadURL", type: "String" },
    0x2a: { name: "CodecDecodeAll", type: "Uint" },
    0x2fab: { name: "TrackOverlay", type: "Uint" },
    0x16aa: { name: "CodecDelay", type: "Uint" },
    0x16bb: { name: "SeekPreRoll", type: "Uint" },
    0x2624: { name: "TrackTranslate", type: "Container" },
    0x26fc: { name: "TrackTranslateEditionUID", type: "Uint" },
    0x26bf: { name: "TrackTranslateCodec", type: "Uint" },
    0x26a5: { name: "TrackTranslateTrackID", type: "Binary" },
    0x60: { name: "Video", type: "Container" },
    0x1a: { name: "FlagInterlaced", type: "Uint" },
    0x13b8: { name: "StereoMode", type: "Uint" },
    0x13c0: { name: "AlphaMode", type: "Uint" },
    0x13b9: { name: "OldStereoMode", type: "Uint" },
    0x30: { name: "PixelWidth", type: "Uint" },
    0x3a: { name: "PixelHeight", type: "Uint" },
    0x14aa: { name: "PixelCropBottom", type: "Uint" },
    0x14bb: { name: "PixelCropTop", type: "Uint" },
    0x14cc: { name: "PixelCropLeft", type: "Uint" },
    0x14dd: { name: "PixelCropRight", type: "Uint" },
    0x14b0: { name: "DisplayWidth", type: "Uint" },
    0x14ba: { name: "DisplayHeight", type: "Uint" },
    0x14b2: { name: "DisplayUnit", type: "Uint" },
    0x14b3: { name: "AspectRatioType", type: "Uint" },
    0xeb524: { name: "ColourSpace", type: "Binary" },
    0xfb523: { name: "GammaValue", type: "Float" },
    0x383e3: { name: "FrameRate", type: "Float" },
    0x61: { name: "Audio", type: "Container" },
    0x35: { name: "SamplingFrequency", type: "Float" },
    0x38b5: { name: "OutputSamplingFrequency", type: "Float" },
    0x1f: { name: "Channels", type: "Uint" },
    0x3d7b: { name: "ChannelPositions", type: "Binary" },
    0x2264: { name: "BitDepth", type: "Uint" },
    0x62: { name: "TrackOperation", type: "Container" },
    0x63: { name: "TrackCombinePlanes", type: "Container" },
    0x64: { name: "TrackPlane", type: "Container" },
    0x65: { name: "TrackPlaneUID", type: "Uint" },
    0x66: { name: "TrackPlaneType", type: "Uint" },
    0x69: { name: "TrackJoinBlocks", type: "Container" },
    0x6d: { name: "TrackJoinUID", type: "Uint" },
    0x40: { name: "TrickTrackUID", type: "Uint" },
    0x41: { name: "TrickTrackSegmentUID", type: "Binary" },
    0x46: { name: "TrickTrackFlag", type: "Uint" },
    0x47: { name: "TrickMasterTrackUID", type: "Uint" },
    0x44: { name: "TrickMasterTrackSegmentUID", type: "Binary" },
    0x2d80: { name: "ContentEncodings", type: "Container" },
    0x2240: { name: "ContentEncoding", type: "Container" },
    0x1031: { name: "ContentEncodingOrder", type: "Uint" },
    0x1032: { name: "ContentEncodingScope", type: "Uint" },
    0x1033: { name: "ContentEncodingType", type: "Uint" },
    0x1034: { name: "ContentCompression", type: "Container" },
    0x254: { name: "ContentCompAlgo", type: "Uint" },
    0x255: { name: "ContentCompSettings", type: "Binary" },
    0x1035: { name: "ContentEncryption", type: "Container" },
    0x7e1: { name: "ContentEncAlgo", type: "Uint" },
    0x7e2: { name: "ContentEncKeyID", type: "Binary" },
    0x7e3: { name: "ContentSignature", type: "Binary" },
    0x7e4: { name: "ContentSigKeyID", type: "Binary" },
    0x7e5: { name: "ContentSigAlgo", type: "Uint" },
    0x7e6: { name: "ContentSigHashAlgo", type: "Uint" },
    0xc53bb6b: { name: "Cues", type: "Container" },
    0x3b: { name: "CuePoint", type: "Container" },
    0x33: { name: "CueTime", type: "Uint" },
    0x37: { name: "CueTrackPositions", type: "Container" },
    0x77: { name: "CueTrack", type: "Uint" },
    0x71: { name: "CueClusterPosition", type: "Uint" },
    0x70: { name: "CueRelativePosition", type: "Uint" },
    0x32: { name: "CueDuration", type: "Uint" },
    0x1378: { name: "CueBlockNumber", type: "Uint" },
    0x6a: { name: "CueCodecState", type: "Uint" },
    0x5b: { name: "CueReference", type: "Container" },
    0x16: { name: "CueRefTime", type: "Uint" },
    0x17: { name: "CueRefCluster", type: "Uint" },
    0x135f: { name: "CueRefNumber", type: "Uint" },
    0x6b: { name: "CueRefCodecState", type: "Uint" },
    0x941a469: { name: "Attachments", type: "Container" },
    0x21a7: { name: "AttachedFile", type: "Container" },
    0x67e: { name: "FileDescription", type: "String" },
    0x66e: { name: "FileName", type: "String" },
    0x660: { name: "FileMimeType", type: "String" },
    0x65c: { name: "FileData", type: "Binary" },
    0x6ae: { name: "FileUID", type: "Uint" },
    0x675: { name: "FileReferral", type: "Binary" },
    0x661: { name: "FileUsedStartTime", type: "Uint" },
    0x662: { name: "FileUsedEndTime", type: "Uint" },
    0x43a770: { name: "Chapters", type: "Container" },
    0x5b9: { name: "EditionEntry", type: "Container" },
    0x5bc: { name: "EditionUID", type: "Uint" },
    0x5bd: { name: "EditionFlagHidden", type: "Uint" },
    0x5db: { name: "EditionFlagDefault", type: "Uint" },
    0x5dd: { name: "EditionFlagOrdered", type: "Uint" },
    0x36: { name: "ChapterAtom", type: "Container" },
    0x33c4: { name: "ChapterUID", type: "Uint" },
    0x1654: { name: "ChapterStringUID", type: "String" },
    0x11: { name: "ChapterTimeStart", type: "Uint" },
    0x12: { name: "ChapterTimeEnd", type: "Uint" },
    0x18: { name: "ChapterFlagHidden", type: "Uint" },
    0x598: { name: "ChapterFlagEnabled", type: "Uint" },
    0x2e67: { name: "ChapterSegmentUID", type: "Binary" },
    0x2ebc: { name: "ChapterSegmentEditionUID", type: "Uint" },
    0x23c3: { name: "ChapterPhysicalEquiv", type: "Uint" },
    0xf: { name: "ChapterTrack", type: "Container" },
    0x9: { name: "ChapterTrackNumber", type: "Uint" },
    0x0: { name: "ChapterDisplay", type: "Container" },
    0x5: { name: "ChapString", type: "String" },
    0x37c: { name: "ChapLanguage", type: "String" },
    0x37e: { name: "ChapCountry", type: "String" },
    0x2944: { name: "ChapProcess", type: "Container" },
    0x2955: { name: "ChapProcessCodecID", type: "Uint" },
    0x50d: { name: "ChapProcessPrivate", type: "Binary" },
    0x2911: { name: "ChapProcessCommand", type: "Container" },
    0x2922: { name: "ChapProcessTime", type: "Uint" },
    0x2933: { name: "ChapProcessData", type: "Binary" },
    0x254c367: { name: "Tags", type: "Container" },
    0x3373: { name: "Tag", type: "Container" },
    0x23c0: { name: "Targets", type: "Container" },
    0x28ca: { name: "TargetTypeValue", type: "Uint" },
    0x23ca: { name: "TargetType", type: "String" },
    0x23c5: { name: "TagTrackUID", type: "Uint" },
    0x23c9: { name: "TagEditionUID", type: "Uint" },
    0x23c4: { name: "TagChapterUID", type: "Uint" },
    0x23c6: { name: "TagAttachmentUID", type: "Uint" },
    0x27c8: { name: "SimpleTag", type: "Container" },
    0x5a3: { name: "TagName", type: "String" },
    0x47a: { name: "TagLanguage", type: "String" },
    0x484: { name: "TagDefault", type: "Uint" },
    0x487: { name: "TagString", type: "String" },
    0x485: { name: "TagBinary", type: "Binary" },
  };

  function doInherit(newClass, baseClass) {
    newClass.prototype = Object.create(baseClass.prototype);
    newClass.prototype.constructor = newClass;
  }

  function WebmBase(name, type) {
    this.name = name || "Unknown";
    this.type = type || "Unknown";
  }
  WebmBase.prototype.updateBySource = function () {};
  WebmBase.prototype.setSource = function (source) {
    this.source = source;
    this.updateBySource();
  };
  WebmBase.prototype.updateByData = function () {};
  WebmBase.prototype.setData = function (data) {
    this.data = data;
    this.updateByData();
  };

  function WebmUint(name, type) {
    WebmBase.call(this, name, type || "Uint");
  }
  doInherit(WebmUint, WebmBase);
  function padHex(hex) {
    return hex.length % 2 === 1 ? "0" + hex : hex;
  }
  WebmUint.prototype.updateBySource = function () {
    // use hex representation of a number instead of number value
    this.data = "";
    for (var i = 0; i < this.source.length; i++) {
      var hex = this.source[i].toString(16);
      this.data += padHex(hex);
    }
  };
  WebmUint.prototype.updateByData = function () {
    var length = this.data.length / 2;
    this.source = new Uint8Array(length);
    for (var i = 0; i < length; i++) {
      var hex = this.data.substr(i * 2, 2);
      this.source[i] = parseInt(hex, 16);
    }
  };
  WebmUint.prototype.getValue = function () {
    return parseInt(this.data, 16);
  };
  WebmUint.prototype.setValue = function (value) {
    this.setData(padHex(value.toString(16)));
  };

  function WebmFloat(name, type) {
    WebmBase.call(this, name, type || "Float");
  }
  doInherit(WebmFloat, WebmBase);
  WebmFloat.prototype.getFloatArrayType = function () {
    return this.source && this.source.length === 4
      ? Float32Array
      : Float64Array;
  };
  WebmFloat.prototype.updateBySource = function () {
    var byteArray = this.source.reverse();
    var floatArrayType = this.getFloatArrayType();
    var floatArray = new floatArrayType(byteArray.buffer);
    this.data = floatArray[0];
  };
  WebmFloat.prototype.updateByData = function () {
    var floatArrayType = this.getFloatArrayType();
    var floatArray = new floatArrayType([this.data]);
    var byteArray = new Uint8Array(floatArray.buffer);
    this.source = byteArray.reverse();
  };
  WebmFloat.prototype.getValue = function () {
    return this.data;
  };
  WebmFloat.prototype.setValue = function (value) {
    this.setData(value);
  };

  function WebmContainer(name, type) {
    WebmBase.call(this, name, type || "Container");
  }
  doInherit(WebmContainer, WebmBase);
  WebmContainer.prototype.readByte = function () {
    return this.source[this.offset++];
  };
  WebmContainer.prototype.readUint = function () {
    var firstByte = this.readByte();
    var bytes = 8 - firstByte.toString(2).length;
    var value = firstByte - (1 << (7 - bytes));
    for (var i = 0; i < bytes; i++) {
      // don't use bit operators to support x86
      value *= 256;
      value += this.readByte();
    }
    return value;
  };
  WebmContainer.prototype.updateBySource = function () {
    this.data = [];
    for (this.offset = 0; this.offset < this.source.length; this.offset = end) {
      var id = this.readUint();
      var len = this.readUint();
      var end = Math.min(this.offset + len, this.source.length);
      var data = this.source.slice(this.offset, end);

      var info = sections[id] || { name: "Unknown", type: "Unknown" };
      var ctr = WebmBase;
      switch (info.type) {
        case "Container":
          ctr = WebmContainer;
          break;
        case "Uint":
          ctr = WebmUint;
          break;
        case "Float":
          ctr = WebmFloat;
          break;
      }
      var section = new ctr(info.name, info.type);
      section.setSource(data);
      this.data.push({
        id: id,
        idHex: id.toString(16),
        data: section,
      });
    }
  };
  WebmContainer.prototype.writeUint = function (x, draft) {
    for (
      var bytes = 1, flag = 0x80;
      x >= flag && bytes < 8;
      bytes++, flag *= 0x80
    ) {}

    if (!draft) {
      var value = flag + x;
      for (var i = bytes - 1; i >= 0; i--) {
        // don't use bit operators to support x86
        var c = value % 256;
        this.source[this.offset + i] = c;
        value = (value - c) / 256;
      }
    }

    this.offset += bytes;
  };
  WebmContainer.prototype.writeSections = function (draft) {
    this.offset = 0;
    for (var i = 0; i < this.data.length; i++) {
      var section = this.data[i],
        content = section.data.source,
        contentLength = content.length;
      this.writeUint(section.id, draft);
      this.writeUint(contentLength, draft);
      if (!draft) {
        this.source.set(content, this.offset);
      }
      this.offset += contentLength;
    }
    return this.offset;
  };
  WebmContainer.prototype.updateByData = function () {
    // run without accessing this.source to determine total length - need to know it to create Uint8Array
    var length = this.writeSections("draft");
    this.source = new Uint8Array(length);
    // now really write data
    this.writeSections();
  };
  WebmContainer.prototype.getSectionById = function (id) {
    for (var i = 0; i < this.data.length; i++) {
      var section = this.data[i];
      if (section.id === id) {
        return section.data;
      }
    }
    return null;
  };

  function WebmFile(source) {
    WebmContainer.call(this, "File", "File");
    this.setSource(source);
  }
  doInherit(WebmFile, WebmContainer);
  WebmFile.prototype.fixDuration = function (duration, options) {
    var logger = options && options.logger;
    if (logger === undefined) {
      logger = function (message) {
        console.log(message);
      };
    } else if (!logger) {
      logger = function () {};
    }

    var segmentSection = this.getSectionById(0x8538067);
    if (!segmentSection) {
      logger("[fix-webm-duration] Segment section is missing");
      return false;
    }

    var infoSection = segmentSection.getSectionById(0x549a966);
    if (!infoSection) {
      logger("[fix-webm-duration] Info section is missing");
      return false;
    }

    var timeScaleSection = infoSection.getSectionById(0xad7b1);
    if (!timeScaleSection) {
      logger("[fix-webm-duration] TimecodeScale section is missing");
      return false;
    }

    var durationSection = infoSection.getSectionById(0x489);
    if (durationSection) {
      if (durationSection.getValue() <= 0) {
        logger(
          "[fix-webm-duration] Duration section is present, but the value is empty"
        );
        durationSection.setValue(duration);
      } else {
        logger("[fix-webm-duration] Duration section is present");
        return false;
      }
    } else {
      logger("[fix-webm-duration] Duration section is missing");
      // append Duration section
      durationSection = new WebmFloat("Duration", "Float");
      durationSection.setValue(duration);
      infoSection.data.push({
        id: 0x489,
        data: durationSection,
      });
    }

    // set default time scale to 1 millisecond (1000000 nanoseconds)
    timeScaleSection.setValue(1000000);
    infoSection.updateByData();
    segmentSection.updateByData();
    this.updateByData();

    return true;
  };
  WebmFile.prototype.toBlob = function (mimeType) {
    return new Blob([this.source.buffer], { type: mimeType || "video/webm" });
  };

  function fixWebmDuration(blob, duration, callback, options) {
    // The callback may be omitted - then the third argument is options
    if (typeof callback === "object") {
      options = callback;
      callback = undefined;
    }

    if (!callback) {
      return new Promise(function (resolve) {
        fixWebmDuration(blob, duration, resolve, options);
      });
    }

    try {
      var reader = new FileReader();
      reader.onloadend = function () {
        try {
          var file = new WebmFile(new Uint8Array(reader.result));
          if (file.fixDuration(duration, options)) {
            blob = file.toBlob(blob.type);
          }
        } catch (ex) {
          // ignore
        }
        callback(blob);
      };
      reader.readAsArrayBuffer(blob);
    } catch (ex) {
      callback(blob);
    }
  }

  // Support AMD import default
  fixWebmDuration.default = fixWebmDuration;

  return fixWebmDuration;
});

var mediaRecorder = function () {
  // Convert the audio data chunks to a single audio data blob.
  let me = this,
    bitrate = 128000,
    globalStream = null,
    recorder = null,
    mediaURL = "",
    audioContext = null,
    mediaBlob = null,
    sourceNode = null,
    // recordTab = false,
    startRecorder = null,
    stopRecorder = null,
    elTotalTime = null,
    elTimer = null,
    rTimer = null,
    pTimer = null,
    vProgress = null,
    audioContainer = null,
    audioBuffer = null,
    data = null,
    mediaPaused = false,
    playing = false,
    startPlayURL = chrome.runtime.getURL("playButton.jpg"),
    stopPlayURL = chrome.runtime.getURL("stopButton.jpg"),
    playerStatus = null;

  me.options = null;
  me.recording = false;
  me.enabled = true;
  me.duration = 0;

  async function addImage(parent, id, path, alt, className, width, height) {
    var img = document.createElement("img");

    img.style.width = width;
    img.style.height = height;
    img.src = path;
    img.alt = alt;
    parent.appendChild(img);
  }

  async function initializeRecorderHTML() {
    var startURL = chrome.runtime.getURL("startRecording.png"),
      stopURL = chrome.runtime.getURL("stopRecording.png");

    //recorder
    startRecorder = document.createElement("DIV");
    startRecorder.id = "waStartRecorder";
    startRecorder.title = "Record";
    addImage(startRecorder, "", startURL, "start recording", "", "", "");

    stopRecorder = document.createElement("DIV");
    stopRecorder.title = "stop recording";
    stopRecorder.id = "waStopRecorder";
    addImage(stopRecorder, "", stopURL, "stop recording", "", "", "");

    //AUdio Player
    audioContainer = document.createElement("DIV");

    audioContainer.id = "waAudioPlayer";
    audioContainer.innerHTML = getAudioPlayer();
    audioContainer.className = "aWrap";

    var recorderContainer = document.createElement("DIV");
    recorderContainer.zIndex = 999999999;
    recorderContainer.id = "waRecorderContainer";

    elTimer = document.createElement("DIV");
    elTimer.id = "waTimer";
    elTimer.innerHTML = "00:00:00";
    elTimer.display = "none";

    recorderContainer.appendChild(startRecorder);
    recorderContainer.appendChild(stopRecorder);
    recorderContainer.appendChild(audioContainer);
    recorderContainer.appendChild(elTimer);
    document.documentElement.appendChild(recorderContainer);
    audioContainer = document.getElementById("waAudioPlayer");
    playerStatus = document.getElementById("playState");
    // addRecorderEvents();
  }

  function getAudioPlayer() {
    return '<div class="aPlay"><span id="aPlayIco"><img id = "playState" src="Playbutton.JPG"></span></div><div class="aCron"><span id="waNow">00:00:00</span> / <span id="waTime">00:00:00</span></div><div id="waTimeRange"><span id="waRangeCover"></span></div>';
  }

  initializeRecorderHTML();
  me.quality = async function (quality) {
    switch (quality) {
      case "high":
        bitrate = 320000;
        break;
      case "good":
        bitrate = 160000;
        break;
      case "medium":
        bitrate = 128000;
        break;
    }
  };

  me.startRecording = function () {
    try {
      initializeRecorder();

      var constraints = {
        audio: {
          sampleRate: 44100,
          channelCount: 2,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          volume: 1.0,
        },
        video: false,
      };

      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(handleSuccess, handleError)
        .catch(function () {});
    } catch (e) {
      data = JSON.stringify({ type: "error", message: "" });
      window.parent.postMessage(data, parentHost);
      console.log("Media audio  error " + e.message);
    }
  };

  // me.recordTab = function() {
  //   recordTab = true;
  //   //video: true,
  //   var constraints = {
  //     audio: {
  //       sampleRate: 44100,
  //       channelCount: 2,
  //       // echoCancellation: true,
  //       // noiseSuppression: true,
  //       // autoGainControl: true,
  //       volume: 1.0
  //     },
  //     video: true
  //   };

  //   navigator.mediaDevices.getDisplayMedia(constraints)
  // .then(handleSuccess, handleError).catch(function () { });

  //   // (screenConstraints).then(function(screenStream){
  //   //   /* use the screen & audio stream */

  //   //   var micConstraints = {audio:true};
  //   //   navigator.mediaDevices.getUserMedia(micConstraints).then(function(micStream) {
  //   //     /* use the microphone stream */

  //   //     //create a new stream in which to pack everything together
  //   //     var composedStream = new MediaStream();

  //   //     //add the screen video stream
  //   //   //  screenStream.getVideoTracks().forEach(function(videoTrack) {
  //   //   //    composedStream.addTrack(videoTrack);
  //   //   //  });

  //   //     //create new Audio Context
  //   //     var context = new AudioContext();

  //   //     //create new MediaStream destination. This is were our final stream will be.
  //   //     var audioDestinationNode = context.createMediaStreamDestination();

  //   //     //check to see if we have a screen stream and only then add it
  //   //     if (screenStream && screenStream.getAudioTracks().length > 0) {
  //   //       //get the audio from the screen stream
  //   //       const systemSource = context.createMediaStreamSource(screenStream);

  //   //       //set it's volume (from 0.1 to 1.0)
  //   //       const systemGain = context.createGain();
  //   //       systemGain.gain.value = 1.0;

  //   //       //add it to the destination
  //   //       systemSource.connect(systemGain).connect(audioDestinationNode);

  //   //     }

  //   //     //check to see if we have a microphone stream and only then add it
  //   //     if (micStream && micStream.getAudioTracks().length > 0) {
  //   //       //get the audio from the microphone stream
  //   //       const micSource = context.createMediaStreamSource(micStream);

  //   //       //set it's volume
  //   //       const micGain = context.createGain();
  //   //       micGain.gain.value = 1.0;

  //   //       //add it to the destination
  //   //       micSource.connect(micGain).connect(audioDestinationNode);
  //   //     }

  //   //     //add the combined audio stream
  //   //     audioDestinationNode.stream.getAudioTracks().forEach(function(audioTrack) {
  //   //       composedStream.addTrack(audioTrack);
  //   //     });

  //   //     //pass over to function that shows the stream and activates the recording controls
  //   //   //  onCombinedStreamAvailable(composedStream)

  //   //   }).catch(function(err) {
  //   //     console.log(err);
  //   //   });
  //   // }).catch(function(err) {
  //   //   console.log(err);
  //   // });
  // }

  // Function to record audio from the current tab
  // me.recordTab = function() {
  //   // Capture audio from the current tab using getUserMedia
  // try {
  //   if (me.recording) return;

  //   initializeRecorder();
  //  var id = chrome.tabCapture.getMediaStreamId()
  //   var constraints = {
  //     audio: {
  //       sampleRate: 44100,
  //       channelCount: 2,
  //       echoCancellation: false,
  //       // noiseSuppression: true,
  //       autoGainControl: true,
  //       volume: 1.0,
  //       mandatory: {
  //         chromeMediaSource: 'tab',
  //         chromeMediaSourceId: id
  //     }
  //     },
  //     video: {
  //       width: { ideal: 1280 },
  //       height: { ideal: 720 },
  //       frameRate: { ideal: 30, max: 60 },
  //       facingMode: { ideal: 'user' }// or 'user' for front camera  me.options.cameraPosition
  //     }
  //   };

  //   navigator.mediaDevices.getUserMedia(constraints)
  //     .then(handleSuccess, handleError).catch(function () { });
  // } catch (e) {
  //   data = JSON.stringify({ type: "error", message: "" });
  //   window.parent.postMessage(data, parentHost);
  //   console.log("Media audio  error " + e.message);
  // }
  // };

  function handleSuccess(stream) {
    var mediaChunks = [];

    me.recording = true;
    stopRecorder.style.display = "block";
    startRecorder.style.display = "none";
    elTimer.style.display = "block";
    globalStream = stream;
    // Create a recorder object to record the audio stream.
    try {
      recorder = new MediaRecorder(stream, {
        audioBitsPerSecond: bitrate,
        mimeType: "audio/webm", // 141100
      });
    } catch (error) {
      console.log(error);
    }

    // Listen for the "dataavailable" event to get the audio data chunks.
    recorder.addEventListener("dataavailable", function (event) {
      mediaChunks.push(event.data);
      try {
        if (recorder.state === "inactive" && audioContext) {
          mediaBlob = new Blob(mediaChunks, { type: "audio/webm" });
          processBlob(mediaBlob, audioContext);
        }
      } catch (error) {
        console.log("recorder error");
      }
    });

    rTimer = new timer(elTimer, null);
    setTimeout(() => {
      audioContainer.style.display = "none";
      elTimer.display = "block";
    }, 100);

    try {
      setTimeout(() => {
        recorder.start();
        rTimer.startTimer();
      }, 300);
    } catch (e) {
      data = JSON.stringify({ type: "error", message: "" });
      window.parent.postMessage(data, parentHost);
      console.log("Media audio  error " + e.message);
    }
    audioContext = new AudioContext();
  }

  async function handleError(e) {
    if (e.name === "NotAllowedError") {
      data = JSON.stringify({ type: "error", message: "notallowederror" });
    } else {
      data = JSON.stringify({ type: "error", message: "" });
    }
    window.parent.postMessage(data, parentHost);
    console.log("Microphone error " + e.message);
  }

  function processBlob(oBlob) {
    const fileReader = new FileReader();

    // Set up file reader on loaded end event
    fileReader.onloadend = () => {
      const arrayBuffer = fileReader.result;
      // Convert array buffer into audio buffer
      audioContext.decodeAudioData(arrayBuffer, (buffer) => {
        audioBuffer = buffer;
        rTimer.duration = audioBuffer.duration;
        ysFixWebmDuration(mediaBlob, rTimer.duration * 1000).then(function (
          blob
        ) {
          mediaBlob = blob;
          mediaURL = URL.createObjectURL(mediaBlob);
        });
      });
    };
    //Load blob
    fileReader.readAsArrayBuffer(oBlob);
  }

  // Function to preprocess the audio blob
  function preprocessAudio() {
    sourceNode = new AudioBufferSourceNode(audioContext, {
      buffer: audioBuffer,
    });
    sourceNode.connect(audioContext.destination);
  }

  me.stopRecording = function () {
    try {
      if (!me.recording || playing || mediaPaused) return;

      if (rTimer) rTimer.stopTimer();
      recorder.stop();
      me.recording = false;
    } catch (e) {
      data = JSON.stringify({ type: "error", message: "" });
      window.parent.postMessage(data, parentHost);
      console.log("Stop recording error " + e.message);
    }
    stopRecorder.style.display = "none";
    startRecorder.style.display = "block";
    me.recording = false;
    stopMicrophone();
  };

  me.downloadRecording = function () {
    if (!me.enabled || me.recording || !mediaBlob) return;
    me.enabled = false;
    const downloadLink = document.createElement("a");
    mediaURL = mediaURL ? mediaURL : URL.createObjectURL(mediaBlob);
    downloadLink.href = mediaURL;
    downloadLink.download = "waAudio.webm";
    downloadLink.click();
    me.enabled = true;
  };

  me.playRecording = function () {
    if (me.recording || !me.enabled || !mediaURL) return;
    me.enabled = false;
    if (!AudioBuffer) {
      me.enabled = true;
    }
    if (!mediaPaused) {
      startPlay(0);
    } else {
      audioContext.resume();
    }
    initializeAudio();
    mediaPaused = false;
    me.enabled = true;
  };

  function initializeAudio() {
    pTimer.paused = false;
    vProgress.paused = false;
    playing = true;
    mediaPaused = false;
    audioContainer.style.display = "flex";
  }

  function startPlay(time) {
    preprocessAudio();

    var startTimer = document.getElementById("waNow"),
      endTime = document.getElementById("waTimer"),
      totalTime = timeStringToSeconds(endTime.innerHTML),
      elProgress = document.getElementById(
        "waRangeCover",
        (elTotalTime = document.getElementById("waTime"))
      );

    playerStatus.src = stopPlayURL;
    elTotalTime.innerHTML = endTime.innerHTML;
    sourceNode.start(0, time);
    //Time tracker
    pTimer = new timer(startTimer, stopTimer);
    pTimer.endTime = totalTime;
    pTimer.startTimer();
    //Progress bar
    vProgress = new progress(elProgress);
    vProgress.endTime = totalTime;
    vProgress.startProgress();
  }

  function stopTimer() {
    me.stopPlaying();
  }

  function timeStringToSeconds(timeString) {
    // Split the time string into hours, minutes, and seconds
    const timeComponents = timeString.split(":").map(Number);
    let totalSeconds;

    // Depending on the number of time components, calculate total seconds accordingly
    switch (timeComponents.length) {
      case 2: // MM:SS format
        totalSeconds = timeComponents[0] * 60 + timeComponents[1];
        break;
      case 3: // HH:MM:SS format
        totalSeconds =
          timeComponents[0] * 3600 + timeComponents[1] * 60 + timeComponents[2];
        break;
      default:
        totalSeconds = 0; // Invalid format, return 0
        break;
    }

    return totalSeconds;
  }

  me.pausePlaying = function () {
    if (me.recording || !me.enabled || mediaPaused || !playing) return;
    me.enabled = false;
    if (!audioContext) {
      me.enabled = true;
      return;
    }
    audioContext.suspend();
    playerStatus.src = startPlayURL;
    vProgress.pauseProgress();
    pTimer.pauseTimer();
    mediaPaused = true;
    playing = false;
    me.enabled = true;
  };

  me.stopPlaying = function () {
    if (me.recording || !mediaURL) return;
    if (sourceNode) {
      pTimer.stopTimer();
      vProgress.stopProgress();
      sourceNode.disconnect();
      sourceNode.stop(0);
      sourceNode = null;
      if (mediaPaused) audioContext.resume();
      pTimer.paused = false;
      vProgress.paused = false;
      playerStatus.src = startPlayURL;
      sourceNode = null;
      vProgress.initializeProgress();
      pTimer.initializeTimer();
    }

    playing = false;
    mediaPaused = false;
  };

  me.seek = function (time) {
    if (me.recording || !me.enabled || !audioContext) return;

    if (playing || pTimer.totalSeconds) {
      data = JSON.stringify({
        type: "commandMessage",
        message: "Use the 'go forward' or 'go back' commands",
      });
      window.parent.postMessage(data, parentHost);
      return;
    }
    me.enabled = false;
    startPlay(time);
    pTimer.setTimer(time);
    vProgress.setTime(time);
    //   initializeAudio();
    me.enabled = true;
    setTimeout(() => {
      data = JSON.stringify({
        type: "commandMessage",
        message: 'Say "pause" or "stop playing"',
      });
      window.parent.postMessage(data, parentHost);
    }, 500);
  };

  me.forward = function (time) {
    if (me.recording || !me.enabled || !audioContext) return;

    if (!pTimer.totalSeconds) {
      data = JSON.stringify({
        type: "commandMessage",
        message: "Use the 'time' command to advance",
      });
      window.parent.postMessage(data, parentHost);
      return;
    }

    me.enabled = false;
    var currentTime = !sourceNode ? 0 : pTimer.totalSeconds;
    if (playing || mediaPaused) sourceNode.stop();
    time = currentTime + time;
    pTimer.setTimer(time);
    vProgress.setTime(time);
    me.enabled = true;
  };

  me.back = function (time) {
    if (me.recording || !me.enabled || !audioContext) return;

    if (!pTimer.totalSeconds) {
      data = JSON.stringify({
        type: "commandMessage",
        message: "Use the 'time' command to advance",
      });
      window.parent.postMessage(data, parentHost);
      return;
    }

    me.enabled = false;
    var currentTime = !sourceNode ? 0 : pTimer.totalSeconds;
    if (playing || mediaPaused) sourceNode.stop();
    time = currentTime - time;
    if (time < 0) time = 0;
    pTimer.setTimer(time);
    vProgress.setTime(time);
    me.enabled = true;
  };

  me.hide = async function () {
    if (me.recording) me.stopRecording();
    if (playing) me.stopPlaying();
    audioContainer.style.display = "none";
    startRecorder.style.display = "none";
    stopRecorder.style.display = "none";
    initializeRecorder();
  };

  me.stopMic = async function () {
    stopMicrophone();
  };

  async function stopMicrophone() {
    await globalStream.getAudioTracks().forEach(function (track) {
      if (track.readyState === "live") {
        track.stop();
      }
    });
  }

  function initializeRecorder() {
    if (playing || mediaPaused) {
      me.stopPlaying();
    } else if (sourceNode) {
      sourceNode.disconnect();
      sourceNode.stop(0);
      sourceNode = null;
    }
    if (me.recording) me.stopRecording();
    mediaPaused = false;
    mediaBlob = null;
    playing = false;
    globalStream = null;
    audioBuffer = null;
    recorder = null;
    mediaURL = "";
    me.recording = false;
    audioContext = null;
  }
};

var recorder = new mediaRecorder();

var timer = function (elTimer, stopTimer) {
  var me = this,
    timerInterval = null,
    isTimerRunning = false;

  me.endTime = 99999999;
  me.totalSeconds = 0;
  me.paused = false;

  me.startTimer = function () {
    if (!isTimerRunning) {
      isTimerRunning = true;
      if (me.paused) {
        me.paused = false;
      } else {
        timerInterval = setInterval(updateTimer, 1000);
      }
    }
  };

  me.pauseTimer = function () {
    me.paused = true;
    // isTimerRunning = false;
  };

  me.stopTimer = function () {
    me.paused = false;
    clearInterval(timerInterval);
    isTimerRunning = false;
    me.totalSeconds = 0;
  };

  me.setTimer = function (time) {
    if (time > me.endTime) {
      me.totalSeconds = me.endTime;
    } else if (time < 0) {
      me.totalSeconds = 0;
    } else {
      me.totalSeconds = time;
    }
    setTimerElement();
  };

  function updateTimer() {
    if (me.paused || !isTimerRunning) return;
    ++me.totalSeconds;

    if (me.totalSeconds > me.endTime) {
      if (me.totalSeconds < me.duration) {
        me.totalSeconds = me.duration;
      } else {
        me.stopTimer();
        if (stopTimer) stopTimer();
        var data = JSON.stringify({ type: "playStopped" });
        window.parent.postMessage(data, parentHost);
        return;
      }
    }

    setTimerElement();
  }

  function setTimerElement() {
    var totalSeconds = me.totalSeconds,
      hours = Math.floor(totalSeconds / 3600),
      remainingSeconds = totalSeconds % 3600,
      minutes = Math.floor(remainingSeconds / 60),
      seconds = remainingSeconds % 60;

    //hours = hours > 0 ? (hours < 10 ? "0" + hours : hours) + ":" : ""; // Show hours only if at least an hour has passed
    hours = (hours < 10 ? "0" + hours : hours) + ":";
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    elTimer.innerHTML = hours + minutes + ":" + seconds;
  }
  me.initializeTimer = function () {
    elTimer.innerHTML = "00:00:00";
  };
};

var progress = function (elProgress) {
  var me = this,
    progressInterval = null,
    isProgressRunning = false;

  me.paused = false;
  me.endTime = 999999999;
  me.totalSeconds = 0;

  me.startProgress = function () {
    if (!isProgressRunning) {
      isProgressRunning = true;
      if (me.paused) {
        me.paused = false;
      } else {
        elProgress.style.width = "0px";
        progressInterval = setInterval(updateProgress, 1000);
      }
    }
  };

  me.pauseProgress = function () {
    me.paused = true;
  };

  me.stopProgress = async function () {
    me.paused = false;
    clearInterval(progressInterval);
    isProgressRunning = false;
    me.totalSeconds = 0;
  };

  me.setTime = function (time) {
    me.totalSeconds = time;
    if (me.totalSeconds > me.endTime) {
      me.totalSeconds = me.endTime;
    } else if (me.totalSeconds < 0) {
      me.totalSeconds = 0;
    }
    setEndTime();
    // me.startProgress();
  };

  async function updateProgress() {
    if (me.paused || !isProgressRunning) return;
    me.totalSeconds++;
    if (me.totalSeconds > me.endTime) {
      me.stopProgress();
      return;
    }
    setEndTime();
  }

  function setEndTime() {
    var completed = me.totalSeconds / me.endTime;
    elProgress.style.width = parseInt(completed * 100) + "px";
  }
  me.initializeProgress = function () {
    elProgress.style.width = "0px";
  };
};

window.addEventListener(
  "message",
  function (message) {
    try {
      if (!isJsonString(message.data)) return;
      var data = JSON.parse(message.data),
        doc = getDocument(message.source[0]);

      if (!data || !data.host || !data.action) return;
      let url = new URL(data.host);
      if (url && url.origin !== message.origin) return;
      parentHost = data.host;

      switch (data.action) {
        case "quality":
          recorder.quality(data.params.quality);
          break;
        case "addGrammars":
          speechRecognition.addGrammars(data.options.data);
          break;
        case "setMaxAlternatives":
          speechRecognition.SetMaxAlternatives(data.options.data);
          break;

        case "startRecognition":
          speechRecognition.options = data.options;
          if (doc && doc.hidden) return;
          speechRecognition.start();
          break;
        case "stopRecognition":
          speechRecognition.options = data.options;
          speechRecognition.stop();
          break;
        case "setContinuousMode":
          speechRecognition.setContinuousMode(data.options.data);
          break;
        case "resetTimeout":
          speechRecognition.options = data.options;
          speechRecognition.resetTimeout();
          break;
        case "setVideoTimeout":
          speechRecognition.options = data.options;
          speechRecognition.setVideoTimeout();
          break;
        case "setDictationMode":
          speechRecognition.dictationMode = data.options.data;
          break;
        case "startSpeechDetection":
          if (doc && doc.hidden) return;
          speechDetect.start();
          break;
        case "stopSpeechDetection":
          speechDetect.stop();
          break;
        case "startRecording":
          recorder.options = data.options;
          recorder.startRecording();
          break;
        // case "recordTab":
        //   recorder.options = data.options;
        //   recorder.recordTab();
        //   break;
        case "stopRecording":
          recorder.stopRecording();
          break;
        case "playRecording":
          recorder.playRecording();
          break;
        case "pause":
          recorder.pausePlaying();
          break;
        case "stop playing":
          recorder.stopPlaying();
          break;
        case "seek":
          recorder.seek(data.params.time);
          break;
        case "forward":
          recorder.forward(data.params.time);
          break;
        case "back":
          recorder.back(data.params.time);
          break;
        case "downloadRecording":
          recorder.downloadRecording();
          break;

        case "hideRecorder":
          recorder.hide();
          break;
        case "stopMic":
          recorder.stopMic();
          break;
      }
    } catch (error) {}
  },
  false
);

function isJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

function getDocument(win) {
  try {
    return win === window.self ? win.document : null;
  } catch (error) {
    return null;
  }
}

// var modalWindow = function () {
//   var me = this;

//   me.show = function (html, title, width, showConfirm, callBack) {
//     if (showConfirm) {
//       Swal.fire({
//         title: title,
//         html: html,
//         confirmButtonText: 'OK',
//         width: width,
//         showCloseButton: true
//       }).then((result) => {
//         if (result.isConfirmed) {
//           callBack()
//         }
//       });
//     } else {
//       Swal.fire({
//         html: html,
//         width: width,
//         backdrop: 'black',
//         background: "black",
//         showConfirmButton: false,
//         animation: false,
//         showCloseButton: false
//       }).then((result) => {
//         if (result.dismiss) {
//           callBack()
//         }
//       });;
//     }
//   };

//   me.hide = function () {
//     Swal.close(); // [2]
//   };

// };

// function bufferToBlob(buffer) {
//   const context = new AudioContext();
//   const buf = context.createBuffer(1, 44100, 44100);
//   return blob = new Blob([buf.getChannelData(0)], { type: 'audio/wav' });
// }
// function convertAudioBufferToBlob(audioBuffer) {

//   var channelData = [],
//     totalLength = 0,
//     channelLength = 0;

//   for (var i = 0; i < audioBuffer.numberOfChannels; i++) {
//     channelData.push(audioBuffer.getChannelData(i));
//     totalLength += channelData[i].length;
//     if (i == 0) channelLength = channelData[i].length;
//   }

//   // interleaved
//   const interleaved = new Float32Array(totalLength);

//   for (
//     let src = 0, dst = 0;
//     src < channelLength;
//     src++, dst += audioBuffer.numberOfChannels
//   ) {
//     for (var j = 0; j < audioBuffer.numberOfChannels; j++) {
//       interleaved[dst + j] = channelData[j][src];
//     }
//     //interleaved[dst] = left[src];
//     //interleaved[dst + 1] = right[src];
//   }

//   // get WAV file bytes and audio params of your audio source
//   const wavBytes = getWavBytes(interleaved.buffer, {
//     isFloat: true, // floating point or 16-bit integer
//     numChannels: audioBuffer.numberOfChannels,
//     sampleRate: 48000,
//   });
//   const wav = new Blob([wavBytes], { type: "audio/mp3" });
//   return wav;
// }

// function getWavBytes(buffer, options) {
//   const type = options.isFloat ? Float32Array : Uint16Array
//   const numFrames = buffer.byteLength / type.BYTES_PER_ELEMENT

//   const headerBytes = getWavHeader(Object.assign({}, options, { numFrames }))
//   const wavBytes = new Uint8Array(headerBytes.length + buffer.byteLength);

//   // prepend header, then add pcmBytes
//   wavBytes.set(headerBytes, 0)
//   wavBytes.set(new Uint8Array(buffer), headerBytes.length)

//   return wavBytes
// }
// // adapted from https://gist.github.com/also/900023
// // returns Uint8Array of WAV header bytes
// function getWavHeader(options) {
//   const numFrames = options.numFrames
//   const numChannels = options.numChannels || 2
//   const sampleRate = options.sampleRate || 44100
//   const bytesPerSample = options.isFloat ? 4 : 2
//   const format = options.isFloat ? 3 : 1

//   const blockAlign = numChannels * bytesPerSample
//   const byteRate = sampleRate * blockAlign
//   const dataSize = numFrames * blockAlign

//   const buffer = new ArrayBuffer(44)
//   const dv = new DataView(buffer)

//   let p = 0

//   function writeString(s) {
//     for (let i = 0; i < s.length; i++) {
//       dv.setUint8(p + i, s.charCodeAt(i))
//     }
//     p += s.length
//   }

//   function writeUint32(d) {
//     dv.setUint32(p, d, true)
//     p += 4
//   }

//   function writeUint16(d) {
//     dv.setUint16(p, d, true)
//     p += 2
//   }

//   writeString('RIFF')              // ChunkID
//   writeUint32(dataSize + 36)       // ChunkSize
//   writeString('WAVE')              // Format
//   writeString('fmt ')              // Subchunk1ID
//   writeUint32(16)                  // Subchunk1Size
//   writeUint16(format)              // AudioFormat https://i.stack.imgur.com/BuSmb.png
//   writeUint16(numChannels)         // NumChannels
//   writeUint32(sampleRate)          // SampleRate
//   writeUint32(byteRate)            // ByteRate
//   writeUint16(blockAlign)          // BlockAlign
//   writeUint16(bytesPerSample * 8)  // BitsPerSample
//   writeString('data')              // Subchunk2ID
//   writeUint32(dataSize)            // Subchunk2Size

//   return new Uint8Array(buffer)
// }
//   // Convert AudioBuffer to a Blob using WAVE representation
// function bufferToWave(abuffer, len) {
// 	var numOfChan = abuffer.numberOfChannels,
// 	length = len * numOfChan * 2 + 44,
// 	buffer = new ArrayBuffer(length),
// 	view = new DataView(buffer),
// 	channels = [], i, sample,
// 	offset = 0,
// 	pos = 0;

// 	// write WAVE header
// 	setUint32(0x46464952);                         // "RIFF"
// 	setUint32(length - 8);                         // file length - 8
// 	setUint32(0x45564157);                         // "WAVE"

// 	setUint32(0x20746d66);                         // "fmt " chunk
// 	setUint32(16);                                 // length = 16
// 	setUint16(1);                                  // PCM (uncompressed)
// 	setUint16(numOfChan);
// 	setUint32(abuffer.sampleRate);
// 	setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
// 	setUint16(numOfChan * 2);                      // block-align
// 	setUint16(16);                                 // 16-bit (hardcoded in this demo)

// 	setUint32(0x61746164);                         // "data" - chunk
// 	setUint32(length - pos - 4);                   // chunk length

// 	// write interleaved data
// 	for(i = 0; i < abuffer.numberOfChannels; i++)
// 		channels.push(abuffer.getChannelData(i));

// 	while(pos < length) {
// 		for(i = 0; i < numOfChan; i++) {             // interleave channels
// 			sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
// 			sample = (0.5 + sample < 0 ? sample * 32768 : sample * 32767)|0; // scale to 16-bit signed int
// 			view.setInt16(pos, sample, true);          // write 16-bit sample
// 			pos += 2;
// 		}
// 		offset++                                     // next source sample
// 	}

// 	// create Blob
// 	return new Blob([buffer], {type: "audio/wav"});

// 	function setUint16(data) {
// 		view.setUint16(pos, data, true);
// 		pos += 2;
// 	}

// 	function setUint32(data) {
// 		view.setUint32(pos, data, true);
// 		pos += 4;
// 	}
// }
//Function to convert an AudioBuffer to a Blob
// function bufferToBlob(buffer) {
//   const interleaved = interleave(buffer);
//   const bufferLength = interleaved.length * 2;
//   const view = new DataView(new ArrayBuffer(bufferLength));
//   let index = 0;
//   interleaved.forEach(function (sample) {
//     view.setInt16(index, sample * 0x7FFF, true);
//     index += 2;
//   });
//   return new Blob([view], { type: 'audio/wav' });
// }

// // Function to interleave audio channels
// function interleave(input) {
//   const leftChannel = input.getChannelData(0);
//   const rightChannel = input.getChannelData(1);
//   const length = input.length;
//   const result = new Float32Array(length * 2);
//   let index = 0;
//   let inputIndex = 0;
//   while (index < length) {
//     result[index++] = leftChannel[inputIndex];
//     result[index++] = rightChannel[inputIndex];
//     inputIndex++;
//   }
//   return result;
// }

// Function to preprocess the audio blob
// function preprocessAudio() {
//   sourceNode = new AudioBufferSourceNode(audioContext, {
//     buffer: AudioBuffer,
//   });

//   // const normalizer = audioContext.createGain();
//   // // Adjust normalization gain to increase volume
//   // const targetLoudness = 1.5; // Example target loudness level
//   // // const maxVolume = Math.max.apply(Math, audioElement.volume);
//   // const gainValue = targetLoudness / 1;
//   // normalizer.gain.value = gainValue;
//   // sourceNode.connect(normalizer);
//   // normalizer.connect(audioContext.destination);
//   sourceNode.connect(audioContext.destination);
// }
// navigator.mediaDevices.getUserMedia({
//   audio: {
//     autoGainControl: false,
//     channelCount: 2,
//     echoCancellation: false,
//     latency: 0,
//     noiseSuppression: false,
//     sampleRate: 48000,
//     sampleSize: 16,
//     volume: 1.0
//   }
// });
