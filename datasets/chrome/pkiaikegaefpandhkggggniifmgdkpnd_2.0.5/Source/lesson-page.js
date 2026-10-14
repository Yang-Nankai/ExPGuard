let preventedClosingOfWindow = false;
let safeStopProctoringFlag = false;
let finalProcedureInitialized = false;

let initialAccumulatedLogs = [];

const embedScriptIntoDOM = (path) => {
  console.log(`Embedding script: ${path}`);
  const scriptElement = document.createElement('script');
  scriptElement.src = chrome.runtime.getURL(path);
  document.head.appendChild(scriptElement);
  console.log(`Embedded script: ${path}`);
}

const injectInitialScripts = () => {
  const initialScripts = [
    'get-ajax-url.js',
    'create-course-data-dom-element.js',
  ];
  for (let script of initialScripts) {
    embedScriptIntoDOM(`injectable-scripts/${script}`);
  }
}

const makeAjaxPost = (ajaxurl, post_data) => {
  return new Promise((resolve, reject) => {
      jQuery.ajax({
          url:     ajaxurl,
          method:  "POST",
          data:    post_data,
          success: resolve,
          error:   reject
      });
  });
}

const getAjaxURLFromDOM = () => {
  const ajaxURLElement = document.getElementById('ajaxurl-element');
  if (ajaxURLElement === null) {
    console.log('AJAX URL element not yet created.');
    return null;
  }
  return ajaxURLElement.innerText;
}

const getCourseDataFromDOM = () => {
  const courseDataElement = document.getElementById('course-data-element');
  if (courseDataElement === null) {
    console.log('Course data element not yet created.');
    return null;
  }
  return JSON.parse(courseDataElement.innerText);
}

const getCurrentUserGuid = () => {
  const courseData = getCourseDataFromDOM();
  return courseData.test_user_guid;
}

const getCurrentLessonName = () => {

  const courseData = getCourseDataFromDOM();

  return courseData.current_lesson_slug;

}


const logEvent = (data) => {
  try {
    console.log('LOG_EVENT', {
      ...createEventLog(data),
      activeLesson: getCurrentLessonName()
    });
    chrome.runtime.sendMessage({
      message: LOG_EVENT,
      data: {
        ...createEventLog(data),
        activeLesson: getCurrentLessonName()
      }
    });
  } catch (error) {
    console.log(error);
  }

}

const getDataFromHirepro = (callback) => {
  const ajaxurl = getAjaxURLFromDOM();
  if (ajaxurl === null) {
    return '';
  }
  const courseData = getCourseDataFromDOM();
  if (courseData === null) {
    return '';
  }
  makeAjaxPost(ajaxurl, {
    action: 'hirepro_get_data',
    test_user_guid: courseData.test_user_guid,
  })
  .then(r => JSON.parse(r))
  .then(result => callback(result.data))
  .catch(error => console.log(error));
}

const sendDataToHirepro = (callback, data) => {
  const ajaxurl = getAjaxURLFromDOM();
  if (ajaxurl === null) {
    return;
  }
  const courseData = getCourseDataFromDOM();
  if (courseData === null) {
    return;
  }
  console.log('Sending data to Hirepro servers');
  makeAjaxPost(ajaxurl, {
    action: 'hirepro_save_data',
    test_user_guid: courseData.test_user_guid,
    data: JSON.stringify(data)
  })
  .then(r => JSON.parse(r))
  .then(result => {
    callback(result.message);
    console.log('Sent data to Hirepro servers', data);
  })
  .catch(error => console.log(error));
}

const getIframeFromPage = () => document.querySelector('iframe[src^="https://player.vimeo"]');

const getPlayerFromIframe = (iframe) => new Vimeo.Player(iframe);

const populateCourseStructure = (remoteProgressData) => {
  console.log('Populating data');
  chrome.runtime.sendMessage({ message: GET_PROGRESS_DATA, userGuid: getCurrentUserGuid() }, (localProgressData) => {
    if (localProgressData === null && remoteProgressData !== null) {
      console.log('Local progress data not found, so setting remote progress data into local progress data');
      chrome.runtime.sendMessage({ message: UPDATE_PROGRESS_DATA, data: remoteProgressData, userGuid: getCurrentUserGuid()});
      localProgressData = {...remoteProgressData};
    }

    if (localProgressData !== null && remoteProgressData === null) {
      console.log('Local progress data found, so setting remote progresss data with local progress data');
      sendDataToHirepro((response) => console.log(response), localProgressData);
      remoteProgressData = localProgressData;
    }

    const courseData = getCourseDataFromDOM();
    const currentCourse = courseData.current_course_name;
    const currentLesson = courseData.current_lesson_slug;

    let progressData = {};

    progressData[currentCourse] = {};
    progressData[currentCourse].lessons = {};
    progressData[currentCourse].totalSeconds = 0;
    progressData[currentCourse].totalSkippedSeconds = 0;

    for (let lesson of courseData.lesson_structure) {
      if(lesson.video === false) {
        continue;
      }
      progressData[currentCourse].lessons[lesson.slug] = {
        seconds: 0,
        percent: 0
      };
    }

    if (localProgressData === null && remoteProgressData === null) {
      console.log('Setting both remote and local progress data with default data');
      chrome.runtime.sendMessage({ message: UPDATE_PROGRESS_DATA, data: progressData, userGuid: getCurrentUserGuid() });
      sendDataToHirepro((response) => console.log(response), progressData);
      localProgressData = remoteProgressData = progressData;
    }

    if (typeof localProgressData[currentCourse] === 'undefined') {
      localProgressData[currentCourse] = progressData[currentCourse];
      chrome.runtime.sendMessage({ message: UPDATE_PROGRESS_DATA, data: localProgressData, userGuid: getCurrentUserGuid() });
    }

    if (typeof remoteProgressData[currentCourse] === 'undefined') {
      remoteProgressData[currentCourse] = progressData[currentCourse];
      sendDataToHirepro((response) => console.log(response), remoteProgressData);
    }

    if (typeof localProgressData[currentCourse].lessons === 'undefined') {
      localProgressData[currentCourse].lessons = localProgressData[currentCourse];
      localProgressData[currentCourse].totalSeconds = progressData[currentCourse].totalSeconds;
      localProgressData[currentCourse].totalSkippedSeconds = progressData[currentCourse].totalSkippedSeconds;
      localProgressData[currentCourse].totalPercentage = progressData[currentCourse].totalPercentage;
      chrome.runtime.sendMessage({ message: UPDATE_PROGRESS_DATA, data: localProgressData, userGuid: getCurrentUserGuid() });
    }

    if (typeof remoteProgressData[currentCourse].lessons === 'undefined') {
      remoteProgressData[currentCourse].lessons = remoteProgressData[currentCourse];
      remoteProgressData[currentCourse].totalSeconds = progressData[currentCourse].totalSeconds;
      remoteProgressData[currentCourse].totalSkippedSeconds = progressData[currentCourse].totalSkippedSeconds;
      remoteProgressData[currentCourse].totalPercentage = progressData[currentCourse].totalPercentage;
      sendDataToHirepro((response) => console.log(response), remoteProgressData);
    }

    const lessonStructure = courseData.lesson_structure;
    for (let lesson of lessonStructure) {
      if (currentLesson === lesson.slug) {
        break;
      }
      if (lesson.video === false) {
        continue;
      }
      const iframe = getIframeFromPage();
      if (iframe !== null) {
        localProgressData[currentCourse].lessons[lesson.slug].seconds = localProgressData[currentCourse].lessons[lesson.slug].duration;
        localProgressData[currentCourse].lessons[lesson.slug].percent = 1;
      }
    }

    const videoLessons = Object.keys(progressData[currentCourse].lessons);
    for (let lesson of videoLessons) {
      if (remoteProgressData[currentCourse].lessons[lesson].seconds > localProgressData[currentCourse].lessons[lesson].seconds) {
        localProgressData[currentCourse].lessons[lesson] = remoteProgressData[currentCourse].lessons[lesson];
      } else {
        remoteProgressData[currentCourse].lessons[lesson] = localProgressData[currentCourse].lessons[lesson];
      }
    }

    // Finally update both remote and local data with the latest data
    chrome.runtime.sendMessage({ message: UPDATE_PROGRESS_DATA, data: localProgressData, userGuid: getCurrentUserGuid() });
    sendDataToHirepro((response) => console.log(response), remoteProgressData);
  });
}

const isVideoLesson = () => {

  const iframe = getIframeFromPage();

  if (iframe === null) {
    return false;
  }

  return true;

}

const pauseVideo = () => {
  console.log('Received request to pause video');
  if (!isVideoLesson()) {
    return;
  }

  const iframe = getIframeFromPage();
  const player = getPlayerFromIframe(iframe);
  player.pause();

}

const getSplittedPathnameArray = () => {
  return window.location.pathname.split('/');
}

const isQuizPage = () => {
  if (getSplittedPathnameArray().includes('quizzes')) {
    return true;
  }

  return false;
}

const isVideoLessonOrQuizPage = () => {

  if (isQuizPage()) {
    return true;
  }

  return isVideoLesson();

}

const defaultJSONData = {
  percent: 0,
  seconds: 0
};

// Append/overwrite previous data with the new data
const updateJSONData = (data) => {

  const updatedData = {
    ...defaultJSONData,
    ...data
  };

  return updatedData;

}

const resumeProctoring = () => {

  chrome.runtime.sendMessage({ message: RESUME_PROCTORING });
  console.log('Proctoring resumed!');
  logEvent({event: 'Resuming proctoring.'});

  chrome.storage.local.set({ IS_PROCTORING_PAUSED: false });

}

const pauseProctoring = () => {

  if (isQuizPage()) {
    return;
  }

  const iframe = getIframeFromPage();
  const player = getPlayerFromIframe(iframe);

  player
    .getPaused()
    .then(isPaused => {

      if (!isPaused) {
        return;
      }

      chrome.runtime.sendMessage({ message: PAUSE_PROCTORING });
      logEvent({event: 'Pausing proctoring session due to inactivity.'});
      console.log('Proctoring paused!');

      chrome.storage.local.set({IS_PROCTORING_PAUSED: true});

    });

}

const haltProctoring = () => {

  if (isQuizPage()) {
    return;
  }

  const iframe = getIframeFromPage();
  const player = getPlayerFromIframe(iframe);

  player
    .getPaused()
    .then(isPaused => {

      if (!isPaused) {
        return;
      }

      chrome.runtime.sendMessage({ message: HALT_PROCTORING });
      logEvent({event: 'Closing proctoring tab due to inactivity.'});
      console.log('Proctoring session closed!');

      chrome.storage.local.set({ IS_PROCTORING_PAUSED: true });

    });

}

const getLastLessonSlug = () => {

  let courseData = getCourseDataFromDOM();

  let lessonStructure = courseData.lesson_structure;

  return lessonStructure[lessonStructure.length-1].slug;

}

const enableMarkAsCompleteButton = () => {

  const markAsCompleteButtons = document.querySelectorAll('input[value^="Mark Complete"]');

  if (!markAsCompleteButtons.length) {
    logEvent({event: 'Could not find enable mark as complete buttons'});
    try {
      for (let input of document.getElementsByTagName('input')) {
        console.log(`This is an input which is available: ${input.outerHTML}`);
        logEvent({event: `This is an input which is available: ${input.outerHTML}`});
      }
    } catch (error) {
      console.log(error);
      logEvent({error});
    }
    return;
  }

  for (let markAsCompleteButton of markAsCompleteButtons) {

    markAsCompleteButton.removeAttribute('disabled');

  }

  logEvent({event: 'Found enable mark as complete buttons and enabled it.'});

}

const disableMarkAsCompleteButton = () => {

  const markAsCompleteButtons = document.getElementsByClassName('learndash_mark_complete_button');

  if (markAsCompleteButtons.length <= 0) {
    return;
  }

  for (let markAsCompleteButton of markAsCompleteButtons) {

    markAsCompleteButton.setAttribute('disabled', 'disabled');

  }

}

const onSuccessfulSubmission = () => {

    logEvent({event: 'Proctoring submission was successful.'});
    logEvent({event: 'Removing tab closing prevention logic.'});
    embedScriptIntoDOM('injectable-scripts/remove-window-before-unload.js');

    $('#error-message').addClass('hide');
    enableMarkAsCompleteButton();

}

const cleanUpAfterLastLesson = () => {

  logEvent({event: 'Cleaning up after last lesson.'});

  disableMarkAsCompleteButton();

  let courseData = getCourseDataFromDOM();
  let currentCourse = courseData.current_course_name;

  chrome.runtime.sendMessage({ message: GET_PROGRESS_DATA, userGuid: getCurrentUserGuid() }, (progressData) => {

    if (progressData === null) {
      return;
    }

    if (typeof progressData[currentCourse].totalPercentage !== 'undefined') {
      progressData[currentCourse].totalPercentage = Math.round(progressData[currentCourse].totalPercentage)
    }

    sendDataToHirepro((response) => console.log(response), progressData);

  });

  onSuccessfulSubmission();

}

const stopProctoring = () => {

  logEvent({event: 'Sending stop proctoring post message.'});
  chrome.runtime.sendMessage({ message: STOP_PROCTORING });

}

const areAllVideosViewed = (mode, callback) => {

  let courseData = getCourseDataFromDOM();

  // Exclude quiz pages
  // if (isQuizPage()) {
  //   callback();
  //   return;
  // }

  const currentCourse = courseData.current_course_name;

  const videoLessons = [];

  for (let lesson of courseData.lesson_structure) {

    if (lesson.video === false) {
      continue;
    }

    videoLessons.push(lesson.slug);

  }

  let completedLessons = 0;

  // Check each video lesson's percentage completed and if complete call the passed callback method
  chrome.runtime.sendMessage({ message: GET_PROGRESS_DATA, userGuid: getCurrentUserGuid() }, (progressData) => {

    if (progressData !== null) {

      for (let lesson of videoLessons) {

        if (progressData[currentCourse].lessons[lesson].percent >= 1) {
          completedLessons++;
        }

      }

    }

    if (completedLessons === videoLessons.length) {

      initialAccumulatedLogs.push(createEventLog({event: 'All video lessons are viewed.'}));
      logEvent({event: 'All video lessons are viewed.'});
      console.log('All video lessons are viewed');

      if (mode === true) {
        callback();
      }

      return;
    }

    if (mode === false) {
      callback();
    }

  });

  return true;

}

const listenToEvents = (player) => {

  let inactivityTimer;
  let longIncativityTimer;
  /*
    On playing the video:
      - Update the progress data
      - Resume proctoring if paused / halted
      - Clear the short inactivity and long inactivity timers
  */
  const onPlay = (time) => {
    console.log('Video playing!');

    const updatedJSONData = updateJSONData(time);
    updateLocalStorageContextData(updatedJSONData);

    chrome.storage.local.get(IS_PROCTORING_PAUSED, (data) => {

      if (typeof data.IS_PROCTORING_PAUSED === 'undefined' || data.IS_PROCTORING_PAUSED === false) {
        return;
      }

      resumeProctoring();

    });

    chrome.runtime.sendMessage({ message: INTERRUPT_LONG_INACTIVITY_TIMER });

    chrome.runtime.sendMessage({ message: INTERRUPT_INACTIVITY_TIMER });

    const courseData = getCourseDataFromDOM();
    const currentLesson = courseData.current_lesson_slug;
    logEvent({event: 'Video played', data: currentLesson});

  }

  /*
    On pausing the video:
      - Update the progress data
      - If the player is actually paused start the short inactivity and long inactivity timers
  */
  const onPause = (time) => {

    console.log('Video paused!');

    const updatedJSONData = updateJSONData(time);
    updateLocalStorageContextData(updatedJSONData);

    player
      .getPaused()
      .then(isPaused => {

        if (!isPaused) {
          return;
        }

	chrome.storage.local.set({IS_PROCTORING_PAUSED: true});

        chrome.runtime.sendMessage({ message: START_INACTIVITY_TIMER, data: { delayInMinutes: ALLOWED_INACTIVITY_PERIOD } });
        chrome.runtime.sendMessage({ message: START_LONG_INACTIVITY_TIMER, data: { delayInMinutes: ALLOWED_LONG_INACTIVITY_PERIOD } });

      });
      const courseData = getCourseDataFromDOM();
    const currentLesson = courseData.current_lesson_slug;
      logEvent({event: 'Video paused', data: currentLesson});

  };

  // Functionality to update logs for specified time
  let timeIterations = 1;
  let previousTickTime;

  const onTick = (time) => {

    let skipped = false;

    try {

      let lastLessonSlug = getLastLessonSlug();
      let currentLessonSlug = getCourseDataFromDOM().current_lesson_slug;

      if (Math.floor(time.seconds) >= (Math.floor(time.duration) - 2)) {
        enableMarkAsCompleteButton();
        logEvent({event: 'Lesson about to end, so enabling mark as complete button', data: currentLessonSlug});
      }
      if (currentLessonSlug === lastLessonSlug) {
        if (Math.floor(time.seconds) >= (Math.floor(time.duration) - PREVENTION_OF_TAB_CLOSING_WINDOW_PERIOD)) {
          if (preventedClosingOfWindow === false) {
            preventedClosingOfWindow = true;
            logEvent({event: 'Tab prevention logic added.'});
            embedScriptIntoDOM('injectable-scripts/prevent-window-closing.js');
          }
        }
        if (Math.floor(time.seconds) >= (Math.floor(time.duration)-10)) {
          if(safeStopProctoringFlag === false) {
            safeStopProctoringFlag = true;
            stopProctoring();
          }
        }
      }

    } catch (error) {
      logEvent({error});
      console.log(error);
    }

    if (typeof previousTickTime === 'undefined') {
      previousTickTime = time.seconds;
    }

    let skippedSeconds = time.seconds - previousTickTime;

    if (skippedSeconds > MAXIMUM_SKIP_SECONDS) {
      logEvent({event: 'Video skip detected', data: {
        previousTickTime,
        skippedSeconds,
        ...time
      }});
      console.log('%cSkipped: ' + skippedSeconds + ' seconds!', 'font-size:15px;color:red;');
      const updatedSkippedTimeInJSONData = updateJSONData({
        previousTickTime,
        skippedSeconds,
        ...time
      });
      skipped = true;
      updateLocalStorageContextData(updatedSkippedTimeInJSONData);
    }

    previousTickTime = time.seconds;

    // For every 250 ms configured time multiple intervals, update the local storage data
    const { seconds } = time;
    const computedTime = seconds / (LOG_TIME * timeIterations);
    if (computedTime < 1) {
      return;
    }

    timeIterations++;

    if (skipped) {
      return;
    }

    const updatedJSONData = updateJSONData(time);

    updateLocalStorageContextData(updatedJSONData);

  }

  // Local storage's progress data will be updated only if the updatable log is greater than the available log
  const updateLocalStorageContextData = (updatedJSONData, callback) => {

    const courseData = getCourseDataFromDOM();
  
    const currentCourse = courseData.current_course_name;
    const currentLesson = courseData.current_lesson_slug;
  
    chrome.runtime.sendMessage({ message: GET_PROGRESS_DATA, userGuid: getCurrentUserGuid() }, (progressData) => {
  
      if (progressData[currentCourse].lessons[currentLesson].seconds >= updatedJSONData.seconds) {
        return;
      }
  
      if (typeof updatedJSONData.previousTickTime !== 'undefined') {
  
        let previousTickTime = updatedJSONData.previousTickTime;
        let currentTickTime = updatedJSONData.seconds;
        let storedTickTime = progressData[currentCourse].lessons[currentLesson].seconds;
  
        if (currentTickTime > storedTickTime && previousTickTime > storedTickTime) {
          delete(updatedJSONData.previousTickTime);
        } else if (currentTickTime > storedTickTime && previousTickTime < storedTickTime) {
          delete(updatedJSONData.previousTickTime);
          updatedJSONData.skippedSeconds = currentTickTime - storedTickTime;
        } else {
          return;
        }
  
        const storedSkippedTime = progressData[currentCourse].lessons[currentLesson].skippedSeconds;
  
        if (typeof storedSkippedTime === 'undefined' || storedSkippedTime === null) {
          progressData[currentCourse].lessons[currentLesson] = {
            ...progressData[currentCourse].lessons[currentLesson],
            ...updatedJSONData,
            skippedSeconds: parseFloat(updatedJSONData.skippedSeconds.toFixed(2))
          };
        } else {
          let skippedSeconds = storedSkippedTime + updatedJSONData.skippedSeconds;
          progressData[currentCourse].lessons[currentLesson] = {
            ...updatedJSONData,
            skippedSeconds: parseFloat(skippedSeconds.toFixed(2))
          };
        }
  
      } else {
  
        progressData[currentCourse].lessons[currentLesson] = {
          ...progressData[currentCourse].lessons[currentLesson],
          ...updatedJSONData
        };
  
      }
  
      let totalSeconds = 0;
      let totalSkippedSeconds = 0;
      let totalDuration = 0;
      let watchedLessons = 0;
  
      const lessonSlugs = Object.keys(progressData[currentCourse].lessons);
  
      for (let lessonSlug of lessonSlugs) {
  
        let lesson = progressData[currentCourse].lessons[lessonSlug];
  
        if (typeof lesson.skippedSeconds !== 'undefined') {
          totalSkippedSeconds += parseFloat(lesson.skippedSeconds);
        }
  
        if (typeof lesson.seconds === 'undefined') {
          continue;
        }
  
        if (parseFloat(lesson.seconds) === 0) {
          continue;
        }
  
        totalSeconds += parseFloat(lesson.seconds);
  
        if (typeof lesson.duration === 'undefined') {
          continue;
        }
  
        totalDuration += parseFloat(lesson.duration);
        watchedLessons += 1;
  
      }
  
      progressData[currentCourse].totalSeconds = parseFloat(totalSeconds.toFixed(2));
      progressData[currentCourse].totalSkippedSeconds = parseFloat(totalSkippedSeconds.toFixed(2));
  
      if (watchedLessons === lessonSlugs.length) {
        let totalPercentage = (totalSeconds * 100) / totalDuration;
        progressData[currentCourse].totalPercentage = parseFloat(totalPercentage.toFixed(2));
        logEvent({event: 'Calculating totalPecentage.'});
      }
  
      chrome.runtime.sendMessage({ message: UPDATE_PROGRESS_DATA, data: progressData, userGuid: getCurrentUserGuid() }, () => {
  
        if (typeof callback === 'function') {
          callback();
        }
  
      });
  
    });
  
  }

  // On end of a video, the local data is updated and if all the videos are viewed the proctoring session is submitted
  const onEnd = (time) => {

    let courseData = getCourseDataFromDOM();
    let currentCourse = courseData.current_course_name;

    let currentLessonSlug = courseData.current_lesson_slug;
    let lastLessonSlug = getLastLessonSlug();

    const updatedJSONData = updateJSONData(time);

    updateLocalStorageContextData(updatedJSONData, () => {areAllVideosViewed(true, stopProctoring);});

    logEvent({event: 'Video ended', data: currentLessonSlug});

    if (currentLessonSlug === lastLessonSlug) {

      logEvent({event: 'Finished watching last lesson.'});

      chrome.runtime.sendMessage({ message: GET_PROGRESS_DATA, userGuid: getCurrentUserGuid() }, (progressData) => {

        if (progressData === null) {
          return;
        }

        if (typeof progressData[currentCourse].totalPercentage !== 'undefined') {
          progressData[currentCourse].totalPercentage = Math.round(progressData[currentCourse].totalPercentage)
        }

        logEvent({event: 'Final remote data updation call initiated.'});
        sendDataToHirepro((response) => console.log(response), progressData);

      });

      stopProctoring();
    }

  }

  // Player event listeners
  player.on('play', onPlay);

  player.on('pause', onPause);

  player.on('timeupdate', onTick);

  player.on('ended', (time) => {
    try {
      onEnd(time);
    } catch (error) {
      logEvent({error});
    }
  });

}

const seekVideo = (player, seconds) => {
  /* Seeking 2 seconds before the actual recorded seconds
     because of the vimeo player issue of video not playable,
     if the cue point has reached the very end. */
  const seekableSeconds = Math.floor(seconds) - 2 >= 0 ? Math.floor(seconds) - 2 : 0;
  console.log(`Seeking video to: ${seekableSeconds}`);
  player.setCurrentTime(seekableSeconds)
};

const necessaryChecksLog = () => {
  try {
    const iframe = getIframeFromPage();
    if (iframe) {
      logEvent({event: 'Iframe detected!'});
    } else {
      logEvent({event: 'Iframe is not detected'});
    }
    const markAsCompleteButtons = document.getElementsByClassName('learndash_mark_complete_button');
    if (!markAsCompleteButtons.length) {
      logEvent({event: 'Mark as complete buttons not detected'});
    } else {
      logEvent({event: 'Mark as complete buttons detected!'});
    }
  } catch (error) {
    logEvent({error});
  }
}

const onProctoringStarted = () => {
  logEvent({initialAccumulatedLogs});
  initialAccumulatedLogs = [];
  logEvent({event: 'Post proctoring-initializing steps started.'});
  necessaryChecksLog();

  console.log('After proctoring has begun!');

  chrome.runtime.sendMessage({ message: UPDATE_PROCTORING_STATE, data: STARTED, userGuid: getCurrentUserGuid() });

  if (!isVideoLessonOrQuizPage()) {
    enableMarkAsCompleteButton();
    return;
  }

  if (isQuizPage()) {
    const startQuizButtons = document.getElementsByName('startQuiz');
    if (startQuizButtons.length <= 0) {
      return;
    }
    const startQuizButton = startQuizButtons[0];
    startQuizButton.removeAttribute('disabled');
    return;
  }

  // Replace back the player controls
  const iframe = getIframeFromPage();
  const url = new URL(iframe.src);
  const urlParams = new URLSearchParams(url.search);
  const params = Array.from(urlParams.keys());
  for (let param of params) {
    if (NON_REMOVABLE_PARAMS.includes(param)) {
      continue;
    }
    urlParams.delete(param);
  }
  urlParams.append('controls', 1);
  url.search = urlParams.toString();
  iframe.src = url.toString();
  console.log('Placed back the player controls');

  // Once the iframe is loaded
  iframe.onload = () => {
    const player = getPlayerFromIframe(iframe);
    listenToEvents(player);
    logEvent({event: 'Listening to player events.'});

    console.log('Listening to player events!');

    const courseData = getCourseDataFromDOM();

    const currentCourse = courseData.current_course_name;
    const currentLesson = courseData.current_lesson_slug;

    // Based on the progress data
    chrome.runtime.sendMessage({ message: GET_PROGRESS_DATA, userGuid: getCurrentUserGuid() }, (progressData) => {

      if (progressData === null) {
        return;
      }

      const seconds = progressData[currentCourse].lessons[currentLesson].seconds;
      const duration = progressData[currentCourse].lessons[currentLesson].duration;

      if (seconds <= 0) {
        return;
      }

      seekVideo(player, seconds);

      if (typeof duration !== 'undefined') {

        try {

          if (Math.floor(seconds) === Math.floor(duration)) {

            logEvent({event: 'Lesson ended', data: currentLesson});

            enableMarkAsCompleteButton();

          }

        } catch (error) {

          logEvent(error);

          console.log(error);

        }

      }

      // Add restart button if the lesson was already watched
      const addRestartLessonButton = () => {

        // Add reset lesson button, which unloads the video
        const restartLessonButton = document.createElement('button');
        restartLessonButton.type = 'button';
        restartLessonButton.innerText = 'Restart Lesson';
        restartLessonButton.id = 'restart-lesson-button';
        restartLessonButton.style.fontWeight = 'bold';

        restartLessonButton.onclick = () => {
          restartLessonButton.style.display = 'none';
          player.unload();
        };

        const restartLessonButtonContainer = document.createElement('div');
        restartLessonButtonContainer.id = 'restart-lesson-button-container';

        restartLessonButtonContainer.appendChild(restartLessonButton);

        const learndashWrapper = document.getElementsByClassName('learndash-wrapper')[1];

        learndashWrapper.insertBefore(restartLessonButtonContainer, learndashWrapper.children[2]);

      }

      const _restartLessonButtonContainer = document.getElementById('restart-lesson-button-container');

      if (_restartLessonButtonContainer === null) {

        addRestartLessonButton();

      }

    });

  }

}

const isCourseEnabled = () => {

  if (getCourseDataFromDOM() === null) {
    return false;
  }

  return true;

}

const isProctoringLinkAvailable = () => {

  const courseData = getCourseDataFromDOM();

  if (courseData.proctoring_url === '') {

    log('Proctoring URL not available.');

    pauseVideo();

    addError({
      type: ERROR,
      mainText: 'Could not get proctoring session.',
      message: 'Please refresh the page to retry.',
      actionButtonText: 'Refresh',
      closeable: false,
      action: () => {
        const reloadIndicator = document.getElementById('reload-indicator');
        reloadIndicator.children[0].children[0].children[0].innerText = 'Refreshing page.';
        reloadIndicator.style.display = 'block';
        window.location.reload();
      }
    });

    return false;

  } else if (courseData.proctoring_url === 'candidate_not_found') {

    pauseVideo();

    addError({
      type: ERROR,
      mainText: 'Candidate not found.',
      message: 'Please contact administrator.',
      actionButtonText: 'Refresh',
      closeable: false,
      action: () => {
        const reloadIndicator = document.getElementById('reload-indicator');
        reloadIndicator.children[0].children[0].children[0].innerText = 'Refreshing page.';
        reloadIndicator.style.display = 'block';
        window.location.reload();
      }
    });

    return false;

  }

  return true;

}

const createEventLog = (event) => {

  return {
    ...event,
    loggedAt: Date.now()
  };

}

const beforeProctoringBegins = () => {

  initialAccumulatedLogs.push(createEventLog({event: 'Pre proctoring-initializing steps started.'}));

  if (isQuizPage()) {

    const startQuizButtons = document.getElementsByName('startQuiz');

    if (startQuizButtons.length <= 0) {
      return;
    }

    const startQuizButton = startQuizButtons[0];

    startQuizButton.setAttribute('disabled', 'disabled');

    return;
  }

  // Remove player controls by changing the src params
  const iframe = getIframeFromPage();

  iframe.removeAttribute('allow');

  const url = new URL(iframe.src);
  const params = new URLSearchParams(url.search);
  params.delete('autoplay');
  params.delete('background');
  params.delete('controls');
  params.append('background', 1);
  params.append('autoplay', 0);
  params.append('controls', 0);

  url.search = params.toString();

  iframe.src = url.toString();

  pauseVideo();

  console.log('Removing player controls!');
  console.log('Setting up proctoring!');

}

const openProctoringTab = () => {

  chrome.runtime.sendMessage({ message: IS_PROCTORING_INFO_TAB_OPEN }, (proctoringInfoTabOpened) => {

    if(proctoringInfoTabOpened) {

      return;

    }

    const courseData = getCourseDataFromDOM();

    initialAccumulatedLogs.push(createEventLog({event: 'Opening proctoring tab.'}));

    window.open(courseData.proctoring_url, '_blank');

  });

}

const beginProctoringProcess = () => {

  console.log('Begining proctoring!');

  if (DEV_MODE === false) {

    openProctoringTab();

  } else {

    onProctoringStarted();

  }

}

injectInitialScripts();

let tryToFetchRemoteProgressData;
const remoteProgressDataFetcher = () => {
  getDataFromHirepro((data) => {
    if (data !== '') {
      clearInterval(tryToFetchRemoteProgressData);
      onScriptsLoaded();
      populateCourseStructure(data);
    }
  });
}
tryToFetchRemoteProgressData = setInterval(remoteProgressDataFetcher, 2000);

// After all the injectable scripts are loaded
const onScriptsLoaded = () => {
  const sendLocalProgressData = () => {
    chrome.runtime.sendMessage({ message: GET_PROGRESS_DATA, userGuid: getCurrentUserGuid() }, (progressData) => {
      if (progressData === null) {
        return;
      }
      sendDataToHirepro((response) => console.log(response), progressData);
    });
  }
  
  chrome.runtime.sendMessage({ message: START_API_LOGGING, data: { periodInMinutes: API_LOGGING_INTERVAL } });

  try {
    chrome.runtime.onMessage.addListener((message, sender, callback) => {
      console.log(`Received message ${message} from ${sender.url}`);

      if (message === PROCTORING_SUCCESSFUL_SUBMISSION_TAB_OPENED && finalProcedureInitialized == false) {
        finalProcedureInitialized = true;
        addError({
          type: INFO,
          mainText: 'Submitting your proctoring session',
          message: 'Please do not close or refresh the page.',
          actionButtonText: '',
          closeable: false,
          action: () => {
            const reloadIndicator = document.getElementById('reload-indicator');
            reloadIndicator.children[0].children[0].children[0].innerText = 'Restarting proctoring services';
            reloadIndicator.style.display = 'block';
            window.location.reload();
          }
        });
        cleanUpAfterLastLesson();
      }
  
      if (message === SEND_LOCAL_PROGRESS_DATA) {
        sendLocalProgressData();
        return true;
      }
  
      if (message === INACTIVITY_TIMER_TIMEOUT) {
        pauseProctoring();
        return true;
      }
  
      if (message === LONG_INACTIVITY_TIMER_TIMEOUT) {
        haltProctoring();
        return true;
      }
  
      if (message === PROCTORING_TAB_CLOSED) {
        logEvent({event: message});
        pauseVideo();
        addError({
          type: ERROR,
          mainText: 'Proctoring window has been closed',
          message: 'Please click the button below to launch the proctoring again.',
          actionButtonText: 'Launch Proctoring Again',
          closeable: false,
          action: () => {
            const reloadIndicator = document.getElementById('reload-indicator');
            reloadIndicator.children[0].children[0].children[0].innerText = 'Restarting proctoring services';
            reloadIndicator.style.display = 'block';
            window.location.reload();
          }
        });
        return true;
      }
    
      if (message === PROCTORING_INFO_TAB_CLOSED) {
        logEvent({event: message});
        pauseVideo();
        addError({
          type: ERROR,
          mainText: 'Proctoring window has been closed',
          message: 'Please click the button below to launch the proctoring again.',
          actionButtonText: 'Launch Proctoring Again',
          closeable: false,
          action: () => {
            const reloadIndicator = document.getElementById('reload-indicator');
            reloadIndicator.children[0].children[0].children[0].innerText = 'Restarting proctoring services';
            reloadIndicator.style.display = 'block';
            window.location.reload();
          }
        });
        return true;
      }
    
      if (message === PROCTORING_TAB_ERROR) {
        logEvent({event: message});
        pauseVideo();
        addError({
          type: ERROR,
          mainText: 'Error in proctoring window',
          message: 'Please verify and close the error holding proctoring tab to proceed.',
          actionButtonText: 'Launch Proctoring Again',
          closeable: false,
          action: () => {
            const reloadIndicator = document.getElementById('reload-indicator');
            reloadIndicator.children[0].children[0].children[0].innerText = 'Restarting proctoring services';
            reloadIndicator.style.display = 'block';
            window.location.reload();
          }
        });
        return true;
      }
    
      if (message === CANDIDATE_NOT_VISIBLE) {
        addCandidateNotVisibleAlert();
        return true;
      }
    
      if (message === CANDIDATE_VISIBLE) {
        removeCandidateNotVisibleAlert();
        return true;
      }
    
      if (message === STARTED_PROCTORING) {
        logEvent({event: message});
        onProctoringStarted();
        return true;
      }
      callback();
      return true;
    }); 
  } catch (error) {
    console.log(error);
  }

  const setup = () => {

    chrome.runtime.sendMessage({ message: GET_PROCTORING_STATE, userGuid: getCurrentUserGuid() }, (proctoringState) => {
  
      if (proctoringState === STOPPED) {
        return;
      }
  
      if (proctoringState === STARTED) {
  
        onProctoringStarted();
        return;
  
      }
  
      if (!isVideoLessonOrQuizPage()) {
        disableMarkAsCompleteButton();
        beginProctoringProcess();
        return;
      }
      beforeProctoringBegins();
      beginProctoringProcess();
      return;
  
    });
  
  }

  $(() => {
    if (!isCourseEnabled()) {
      logEvent({event: 'No course data provided by HirePro WordPress plugin. Course might be disabled.'});
      console.log('No course data provided by Hirepro Wordpress plugin. Course might be disabled.');
      return;
    }
  
    if (!isProctoringLinkAvailable()) {
      logEvent({event: 'Proctoring link unavailable.'});
      console.log('Proctoring link is not available');
      return;
    }
  
    chrome.storage.local.get(USER_GUID, (data) => {
  
      const courseData = getCourseDataFromDOM();
  
      const userGUID = courseData.test_user_guid;
  
      if (typeof data.USER_GUID === 'undefined') {
  
        chrome.storage.local.set({ [USER_GUID]: userGUID });
  
        areAllVideosViewed(false, setup);
  
        return;
  
      } else if (userGUID !== data.USER_GUID) {

        console.log('User change detected', {
          newUser: userGUID,
          oldUser: data.USER_GUID
        });
  
        initialAccumulatedLogs.push(createEventLog({
          event: 'User change detected',
          data: {
            newUser: userGUID,
            oldUser: data.USER_GUID
          }
        }));
  
        chrome.storage.local.set({ [USER_GUID]: userGUID });

        chrome.storage.local.remove(PROCTORING_STOPPED);

        areAllVideosViewed(false, setup);
  
        // chrome.storage.local.remove(PROGRESS_DATA, () => {
  
        //   initialAccumulatedLogs.push(createEventLog({event: 'Old user data removed.'}));
  
        //   areAllVideosViewed(false, setup);
  
        //   return;
  
        // });
  
      } else {
  
        areAllVideosViewed(false, setup);
  
      }
  
    });
  
  });
}