/** dls.js - Data Layer Script -
Loaded as a script in the page.
- Contains listeners for functions (dataLayer.push, mutations, )
Shares memory, DOM access, and console with the web page.
*/

!(function () {
  let gtm_installed = false
  //console.log("dls.js")
  window.postMessage({inspector_action: "DLS_LOADED" }) 

  // GA CD integration
  /*
    If the page is GA's Custom Dimensions,
    - Add a button to 'Add CDs to dataLayer Inspector+'
  */
    window.addEventListener("message", 
      function(event) {
        //console.log(event)
        if ( event.data && event.data.inspector_action ) {
          if (event.data.inspector_action === "data_layer_push"){
            // Converts the event data to an object
            const { dataLayer, push } = event.data
            window[dataLayer] = window[dataLayer] || []
            window[dataLayer].push(push)
          } else if (event.data.inspector_action === "insert_new_analytics_observer"){
            const { observed } = event.data
            window._ap_dl.add_tracking(observed)
          } else if (event.data.inspector_action === "injectCode") {
            //console.log("injectCode", event)
            eval(event.data.codeToPush)
          } /*else if (event.data.inspector_action === "injectGTM") {
            injectGTM(event.data.settings)
          }*/
      }
    })
    if (document.location.href.includes("admin/custom-dimensions")) {
    let observer = new MutationObserver(setup_button);
    let config = {
      attributes: true,
      childList: true,
      subtree: true,
    };

    document.addEventListener("DOMContentLoaded", function (event) {
      // DOMContentLoaded
      observer.observe(document.body, config);
    });

    function setup_button() {
      let content;
      let iframe = document.querySelector("#galaxyIframe");
      if (iframe) {
        content = iframe.contentDocument.querySelector(
          "#ID-m-content-dimensionsContent"
        );
        if (content) {
          observer.disconnect();
          let d = iframe.contentDocument;
          if (d.querySelector("#dl-inspector-add-cds-btn")) return;
          let b = d.createElement("button");
          b.id = "dl-inspector-add-cds-btn";
          b.innerText = "Add CDs to dataLayer Inspector+";
          b.style = `
            background-image: linear-gradient(to bottom, #023c5b, #0e7013);
            border-radius: 0px;
            font-family: Arial;
            color: #ffffff;
            font-size: 10px;
            padding: 1px 2px 2px 2px;
            text-decoration: none;
            position: retalive;
            margin-top: .5em;`;
          d.querySelector(".ID-adminTableControl").appendChild(b);

          function add_cds_to_dataLayer_inspector() {
            let account_info = /\/a(\d+)w(\d+)p(\d+)\//.exec(
              document.location.href
            );
            let account = window.preload.accountTree.accounts.find(
              (a) => a.id === account_info[1]
            );
            let property = account.properties.find(
              (p) => p.id === account_info[2]
            );
            let trackingId = property.trackingId;
            iframe = document.querySelector("#galaxyIframe");
            content = iframe.contentDocument.querySelector(
              "#ID-m-content-dimensionsContent"
            );
            rows = content.querySelectorAll("tr");
            rows = Array.from(rows);
            if (
              content.querySelector("._GAEj") &&
              content.querySelector("._GAEj").innerText === "10"
            )
              alert(
                "If there are more than 10 CDs, make sure you show maximum rows before capturing CDs"
              );
            cd_obj = rows.reduce(
              (out, r) => {
                let cells = r.querySelectorAll("td");
                if (cells.length) {
                  out[`cd${cells[1].innerText.split("\n")[0]}`] = {
                    name: cells[0].innerText.split("\n")[0],
                    index: cells[1].innerText.split("\n")[0],
                    scope: cells[2].innerText.split("\n")[0],
                    changed: cells[3].innerText.split("\n")[0],
                    state: cells[4].innerText.split("\n")[0],
                  };
                }
                return out;
              },
              {
                propertyID: trackingId,
              }
            );
            let clipboard_helper = document.getElementById(
              "dl-inspector-add-cds-btn-clipboard-helper"
            );
            if (!clipboard_helper) {
              clipboard_helper = d.createElement("textarea");
              clipboard_helper.id = "dl-inspector-add-cds-btn-clipboard-helper";
              clipboard_helper.style = "width: 0;";
              document.body.appendChild(b);
            }
            let txt = `${trackingId}\n`;
            clipboard_helper.value = Object.keys(cd_obj).reduce((txt, k, i) => {
              if (i === 0) return txt;
              let cd = cd_obj[k];
              return (
                txt +
                `${cd.name}\t${cd.index}\t${cd.scope}\t${cd.changed}\t${cd.state}\n`
              );
            }, txt);
            console_copy.log(clipboard_helper.value);
            window.postMessage(
              JSON.stringify({
                event: "dl-inspector-copied_cd_list",
                payload: cd_obj,
              }),
              "*"
            );
            alert(
              "The CDs have been added to your DataLayer Inspector+ - \n \nFor those that don't have access to the admin section of GA, the list of CDs has been copied to your console. Select the list, including the property ID, copy the list, and paste it into the inspector CD names field, and press update."
            );
          }
          d.querySelector("#dl-inspector-add-cds-btn").addEventListener(
            "click",
            add_cds_to_dataLayer_inspector
          );
        }
      }
    }
  }

  // Asana integration
  function integrate_asana() {
    function extract_task_name() {
      const el = document.querySelector(
        ".SingleTaskTitleInput-taskName textarea"
      );
      return el ? el.textContent.split("~")[0] : undefined;
    }

    function asana_task_name_parameter(task_name) {
      return task_name ? `&asana_task_name=${task_name}` : "";
    }
    window.addEventListener("mousedown", (e) => {
      if (
        e.target &&
        e.target.href &&
        e.target.href.includes("da_tools_task") &&
        !e.target.href.includes("asana_task_name=")
      ) {
        e.target.href =
          e.target.href + asana_task_name_parameter(extract_task_name());
      }
    });
  }
  if (window.location.href.includes("app.asana.com")) {
    integrate_asana();
  }

  function type_of_object(o) {
    return Array.isArray(o) ? "array" : "object";
  }
  // The settings are passed as an attribute of the script element containing this IIFy
  let settings_str = document.currentScript.getAttribute(
    "data-datalayer-inspector-settings"
  );
  // Convert the settings to an object
  let settings = settings_str ? JSON.parse(settings_str) : {};
  settings.filter = "~";

  let count_of_gtm_js_pushes = 0;
  let gtm_load_event_processed;

  const COLOR_OK = "#171";
  const COLOR_ISSUE = "#A73";
  const COLOR_ERROR = "#E22";

  function e(b, c, x, i) {
    x = x || 11;
    var n = `font-family: "Helvetica Neue", Helvetica, Arial, sans-serif; font-size: ${x}px; ${
      b ? "font-weight: bold;" : "font-weight: normal;"
    }  ${i ? "font-style: italic;" : ""} color: ${c}; `;
    return n;
  }
  const FORMAT_CONSOLE_LOG_GROUP_OK = e(true, COLOR_OK, 11);
  const FORMAT_CONSOLE_LOG_GROUP_NOTE = e(true, COLOR_ISSUE, 11);
  const FORMAT_CONSOLE_LOG_GROUP_ERROR = e(true, COLOR_ERROR, 11);
  const FORMAT_CONSOLE_LOG_EVENT = e(false, "inherit", 11, true);
  const FORMAT_CONSOLE_LOG_EVENT_DATA = e(true, "inherit", 11, false);

  let debugging = true;
  let console_copy = undefined;
  let copy_console = settings.interceptingConsole;
  window._ap_dl = window._ap_dl || {};

  // window.hits_recorded = []
  // window.addEventListener('hit_sent', function(msg){
  //   window.hits_recorded.push(msg.detail)
  // })
  // For timing of hits
  window._ap_dl.dl_inspector_init_time =
    window._ap_dl.dl_inspector_init_time || Date.now();
  // Save the console aside. Some sites overwrite the console and make it unusable.
  if (!window._ap_dl.console) {
    // creating a copy of the console. Redfin blocks console logs with Rift
    window._ap_dl.console = console_copy = copy_console
      ? Object.assign({}, window.console)
      : window.console;
  }
  let console_group = console_copy.groupCollapsed;
  if (!console_copy.groupCollapsed) {
    console_group = console_copy.group;
  }

  function push_console_set(console_set) {
    if (!window._c_w_) {
      console_set.forEach((i) => {
        i.call();
      });
    } else {
      window._c_w_(console_set);
    }
  }

  // prepare a function that will allow for trackers to be added after loading of this script
  // For example, a datalayer may have a different name, so it is loaded when the name is discovered.
  window._ap_dl.add_tracking = function (tracker) {
    settings.observed_functions = settings.observed_functions || [];
    settings.observed_functions.push(tracker);
    tracker.func
      ? insert_object_listener(settings, tracker, observed_function_listener)
      : insert_function_listener(settings, tracker, observed_function_listener);
  };

  // Each observed function may have a specific evaluation function for its arguments
  function set_evaluations(functions) {
    if (!functions) return;
    functions.forEach((f) => {
      if (f.brand === "Google" && f.func === "push") {
        f.evaluation = evaluate_dataLayer_push;
      }
    });
  }
  set_evaluations(settings.observed_functions);

  // BEGIN - CLASSIC MODE SUPPORT
  /*
    Classic mode support
    Limited to watching for GTM dataLayer and pushing a basic object
  */
  if (settings.classicMode) {
    const GOOGLE_DATALAYER = {
      object: "dataLayer",
      func: "push",
      type: "array",
      brand: "Google",
      logo_url: `images/google_favicon.ico`, // "https://support.google.com/favicon.ico",
    };
    settings.observed_objects = [GOOGLE_DATALAYER];
    insert_object_listener(settings, GOOGLE_DATALAYER, classic_mode_listener);
    return;
  }

  function classic_mode_listener(settings, observe, args) {
    console_copy.log("data layer push:", args);
  }

  // END OF CLASSIC MODE SUPPORT

  // START OBSERVER FUNCTIONS

  /*
   Step through and setup each observed function
  */
  // If there are no functions to observe, no reason to be here
  if (!settings.observed_functions || settings.observed_functions.length === 0)
    return;
  settings.observed_objects = [];
  settings.observed_functions.forEach((o) => {
    // This is remnants of a failed try to list to functions ga and _fbq.
    //o.func ?
    //insert_object_listener(settings, o, observed_function_listener) :
    // Setup the listener
    if (o.object)
      insert_object_listener(settings, o, observed_function_listener);
  });
  // console.log('~ Settings - ', settings)
  if (settings.ibm && settings.tealium) {
    reset_tealium(40);
  }

  function reset_tealium(n) {
    //      console.log('~ reset_tealium', n)
    if (n > 0) {
      setTimeout(() => {
        // wait for utag and don't do anything while utag is observed
        if (!window.utag || (window.utag && window.utag.object_observed)) {
          n = n - 1;
          reset_tealium(n);
        } else {
          const tealium_definition = settings.observed_functions.find(
            (o) => o.brand === "Tealium"
          );
          settings.observed_objects = settings.observed_objects.filter(
            (o) => !o === "utag"
          );
          //            console.log('~ resetting tealium', settings.observed_objects, new Error("Stack Trace").stack)
          insert_object_listener(
            settings,
            tealium_definition,
            observed_function_listener
          );
        }
      }, 50);
    }
  }
  /*
    Given a setup to abserve, create a monkey patch with a listener
    observe is from the settings passed in
  */
  function insert_object_listener(settings, observe, listener) {
    //      console.log(`~insert_object_listener`, settings, observe, listener, new Error("Stack Trace").stack)
    let { object, func, type, wait, brand, logo_url, logo_size } = observe;

    function set_property(o) {
      //console.log(`~pproperty.set`, object, o)
      // Setup the formatting for the console.log
      // When it is set
      // TODO - A more robust filter for what must be true
      if (typeof o === "function") {
        // If the property is not the type expected.
        //setTimeout(console.log.bind(console.log, `${fltr}%c     ${brand} ${object} is a function and not an object:`, push_format, o))
        let push_format = `${FORMAT_CONSOLE_LOG_GROUP_ERROR} background: url(${logo_url}) no-repeat; background-size: ${logo_size}`;
        console_copy.log(
          `${fltr}%c     ${brand} analytics is expecting ${object} to be an object and is finding a function:`,
          push_format,
          o
        );
        observe.original = o;
      } else if (!o.object_observed) {
        // If the object is not observed
        if (brand === "Segment" && o.addEventListener) {
          //  console.log('~', o)
          //   o.addEventListener('track', console.log)
          //   o.addEventListener('page', console.log)
          //   o.addEventListener('pageview', console.log)
        }
        // If there was an original
        let reset_txt =
          observe.original && !(brand === "Segment") ? "has been reset" : "set";
        // If Google, and the initial dalaLayer is not an empty array
        let formatting = observe.original
          ? FORMAT_CONSOLE_LOG_GROUP_NOTE
          : FORMAT_CONSOLE_LOG_GROUP_OK;
        let message =
          reset_txt === `set`
            ? observe.original && brand === "Segment"
              ? `The ${object} has been reset. This is typical behavior. Segment overwrites the original object after loading its code.`
              : ""
            : `The ${object} has been reset. Any data that was in it is overwritten. \nClick the link in the bottom entry of the Call Stack below to see the offending code.
  This data has been overwritten: ${stringify_removing_unwanted_references(observe.original)} \n`;
        if (
          brand === "Google" &&
          Array.isArray(o) &&
          o.length > 0 &&
          !observe.original
        ) {
          // console.log(`~DL !== []`,JSON.stringify(o))
          formatting = FORMAT_CONSOLE_LOG_GROUP_NOTE;
          message = `The ${object} was initialized with data; e.g. dataLayer = [{...}]. This is a non-standard method and could result in lost data.`;
          reset_txt = "set with data";
        }
        let push_format = `${
          reset_txt === `set` || reset_txt === `set with data`
            ? formatting
            : FORMAT_CONSOLE_LOG_GROUP_ERROR
        } 
        background: url(${logo_url}) no-repeat; background-size: ${logo_size}`;
        let console_set = [];
        console_set.push(
          console_group.bind(
            console_group,
            `~ %c     ${brand} ${object} - ${reset_txt}`,
            push_format
          )
        );
        console_set.push(
          console_copy.log.bind(console_copy.log, `~ ${message}`, o)
        );
        //setTimeout(console.log.bind(console.log, `${fltr}%c     ${brand} ${object} ${reset_txt}:`, push_format, o))
        if (!settings.hideStack && !settings.classicMode) {
          get_call_stack(
            new Error(`Set ${object}`).stack,
            console_set,
            console_group,
            settings
          );
        }
        console_set.push(console_copy.groupEnd.bind(console_copy.groupEnd));
        push_console_set(console_set);
        // Mark the object as observed
        o.object_observed = true;
        // Replace the orginal
        observe.original = o;
        // Insert the listeners
        if (func) {
          insert_object_function_listeners(settings, observe, listener);
        } else {
          insert_function_listener(settings, observe, listener);
        }
      }
    }

    logo_size = logo_size ? logo_size : "14px 14px";
    let fltr =  "~ " // settings.filter || "~";
    // Don't try to abserve something more than once
    if (settings.observed_objects.find((o) => o === observe.object)) return;
    // Save a record of the objects observed
    settings.observed_objects.push(observe.object);
    // Store the current value of the object
    observe.original = window[object];
    // If there is already an object
    if (observe.original) {
      // If the object has a function
      if (func) {
        // Monkey patch the object's function
        insert_object_function_listeners(settings, observe, listener);
      } else {
        // This is another try at listening to a function on the window; e.g. ga() and _fbq and fbq()
        insert_function_listener(settings, observe, listener);
      }
    } //else {
    // Define a getter and setter for the object in the window object
    try {
      // If an object has been initialized incorrectly; e.g. var OBJECT = something, then it is not configurable
      const descriptor1 = Object.getOwnPropertyDescriptor(window, object);
      // If the object doesn't already exist, or it is configurable, then set up a property listener
      if (!descriptor1 || descriptor1.configurable) {
        Object.defineProperty(window, object, {
          get: function () {
            // return the "original"
            return observe.original;
          },
          set: set_property,
          configurable: true,
          enumerable: true,
        });
      } else {
        let push_format = `${FORMAT_CONSOLE_LOG_GROUP_NOTE} background: url(${logo_url}) no-repeat; background-size: ${logo_size}`;
        let console_set = [];
        console_set.push(
          console_group.bind(
            console_group,
            `~ %c     ${object} - initialization unobservable`,
            push_format
          )
        );
        console_set.push(
          console_copy.log.bind(
            console_copy.log,
            `~`,
            `${object} was initialized as non-configurable; e.g. var ${object}.`
          )
        );
        console_set.push(
          console_copy.log.bind(
            console_copy.log,
            `~`,
            `If ${object} is reset, the Inspector+ will not be able to alert you.`
          )
        );
        if (brand === "Google") {
          console_set.push(
            console_copy.log.bind(
              console_copy.log,
              `~`,
              `This is non-standard, and frequently seen when the dataLayer is initialzed directly with data.`
            )
          );
          console_set.push(
            console_copy.log.bind(
              console_copy.log,
              `~`,
              `If ${object} is reset (wiping out previous pushes), the Inspector will not be able to warn.`
            )
          );
        }
        console_set.push(console_copy.groupEnd.bind(console_copy.groupEnd));
        push_console_set(console_set);
      }
    } catch (e) {
      let push_format = `${FORMAT_CONSOLE_LOG_GROUP_ERROR} background: url(${logo_url}) no-repeat; background-size: ${logo_size}`;
      let console_set = [];
      console_set.push(
        console_group.bind(
          console_group,
          `~ %c     ${brand} ${object} - improperly set`,
          push_format
        )
      );
      console_set.push(console_copy.log.bind(console_copy.log, `~`, e));
      console_set.push(console_copy.groupEnd.bind(console_copy.groupEnd));
      push_console_set(console_set);
    }
    var event = new CustomEvent(`DATALAYER_LISTENER_INITIALIZED`, {
      object: object,
    });
    document.dispatchEvent(event);
  }

  function insert_object_function_listeners(settings, observe, listener) {
    // A particular object may have multiple functions needing a listener
    // Filter to the object, and set each function listener
    settings.observed_functions
      .filter((f) => f.object === observe.object)
      .forEach((observe_func) => {
        insert_object_function_listener(settings, observe_func, listener);
      });
  }

  /**
    Adds a listener to an object
    @param settings - setting object
    @param observe - definitions of object, func, type, and original
    @param listener - function addeded
  */
  function insert_object_function_listener(settings, observe, listener) {
    let { object, func, type, original } = observe;
    // Get the object to observe
    let a = window[object];
    // Save the original function
    var c = a[func];
    // Mark the object as observed
    a.object_observed = true;
    a[func] = function () {
      // If it is a dataLayer.push function
      if (
        arguments[0] &&
        observe.brand === "Google" &&
        observe.func === "push"
      ) {
        let evt = arguments[0].event;
        if (evt && settings.hideTiming) {
          // Really show timing
          let now = Date.now();
          let cb = arguments[0].eventCallback;
          arguments[0].eventCallback = function (gtm) {
            log_observed_arguments_to_console(
              settings,
              observe,
              undefined,
              {
                gtm: gtm,
                timed_event: evt,
                elapsed_time: Date.now() - now,
              },
              new Error("Stack Trace").stack
            );
            if (cb) {
              cb(gtm);
            }
          };
        }
      }
      b.apply(this, arguments);
      c.apply(a, arguments);
    };
    if (observe.brand === "Google" && observe.func === "push") b.apply(a, a);

    // The patch
    function b() {
      if (observe.type === "array") {
        for (let i = 0; i < arguments.length; i++) {
          listener(settings, observe, arguments[i]);
        }
      } else {
        listener(settings, observe, arguments);
      }
    }
  }

  /**
    Adds a listener to an object
    @param settings - setting object
    @param observe - definitions of object, and type
    @param listener - function addeded
  */
  function insert_function_listener(settings, observe, listener) {
    let { object, type } = observe;
    // console.log("insert_object_function_listener:object instantiated")
    var c = observe.original;
    let a = function () {
      c.apply(this, arguments);
      b.apply(this, arguments);
      //  if (arguments["1"] === "pageview") debugger
    };
    let keys = Object.keys(c);
    keys.forEach((k) => {
      if (c.hasOwnProperty(k)) a[k] = c[k];
    });
    a.object_observed = true;
    observe.original = a;
    b.apply(a, a);

    function b() {
      listener(settings, observe, arguments);
    }
  }

  /** Get the current dataLayer values for the given GTM
  https://www.simoahava.com/analytics/two-simple-data-model-tricks/
  */
  function current_dataLayer(gtmId) {
    return window.google_tag_manager[gtmId].dataLayer.get({
      split: () => {
        return [];
      },
    });
  }
  /**
    This function handles each observed function call
    given the observer information and the arguments
  */
  function observed_function_listener(settings, observe, args) {
    let { object, func, brand, logo_url } = observe;
    let evaluatation = observe.evaluation
      ? observe.evaluation(args, settings)
      : undefined;
    const stack = new Error("Stack Trace").stack;
    log_observed_arguments_to_console(
      settings,
      observe,
      evaluatation,
      args,
      stack
    );
  }

  // END OBSERVER FUNCTIONS

  // BEGIN EVALUATION FUNCTIONS
  /**
    Evaluate arguments pushed to the tracked function
  */
  function evaluate_tracked_arguments(observe, args) {
    MAX_PARSED_HIT_SIZE = 100000;
  }

  // END EVALUATION FUNCTIONS

  // BEGIN FORMATTING FUNCTIONS

  /**
    To show a stringified version of the object
    Circular references, HTML elements, and browser objects must be dereferenced
  */
  function stringify_removing_unwanted_references(o, delimiter) {
    const TOO_LARGE =
      "Object is too large to stringify with every push. Expand the object in memory to see details.";
    let key_count = 0;
    if (typeof o === "function") return "Function";
    var cache = [];
    let str_object = "";
    try {
      str_object = JSON.stringify(
        o,
        function (key, value) {
          key_count = key_count + 1;
          if (key_count > 1000) throw new Error(TOO_LARGE);
          if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return "Circular Reference";
            } else if (value === window) {
              return "window";
            } else if (value === document) {
              return "document";
            } else if (value instanceof HTMLElement) {
              return `${value.tagName}`;
            } else if (value.tagName === "svg") {
              return `${value.tagName}`;
            }
            // Store value in our collection
            cache.push(value);
          }
          if (value === undefined) value = "undefined (not the string literal)";
          return value;
        },
        delimiter
      );
    } catch (e) {
      if (e.message === TOO_LARGE) {
        str_object = TOO_LARGE;
      } else {
        console.error(e);
      }
    }
    cache = null;
    return str_object
      .replace(/":/g, ":")
      .replace(/\t"(.*):/g, "\t$1:")
      .replace(/"undefined \(not the string literal\)"/g, "undefined");
  }

  function pass_along_observed_arguments(
    settings,
    observe,
    evaluation,
    args,
    stack
  ) {
    // Get a port
    // send the arguments
  }

  /**
    log_observed_arguments_to_console
    Push to the Console a formatted group
    @param settings
    @param observe
    @param evaluation
    @param args
    @param stack
  */
  function log_observed_arguments_to_console(
    settings,
    observe,
    evaluation,
    args,
    stack
  ) {
    args = args || [];
    let event = undefined;
    let event_label = "event";
    let input = {
      0: args[0],
      1: args[1],
      2: args[2],
    };
    // console.log( observe, input );
    let original_args = args;

    // If the args is just one item
    if (
      Object.keys(args).length === 1 &&
      Object.keys(args).includes("0") &&
      !Object.keys(args).includes("1")
    ) {
      args = args["0"];
    }
    if (!args) return;
    pass_along_observed_arguments(settings, observe, evaluation, args, stack);
    // Preprocessing the hits to fit the legacy formatting functions
    if (observe.brand === "Adobe" && typeof input[0] === "string") {
      if (input[0].includes("Condition") && input[0].includes("not met")) {
        event_label = "Condition not met: ";
        args = {
          event: input[0].split("}")[1]
            ? input[0].split("}")[1].replace(" not met", "")
            : "Unknown event",
          details: input[0],
        };
      } else {
        args = input[0];
      }
    } else if (observe.brand === "Conde Nast" && observe.func === "track") {
      event_label = input[0];
      args = {
        event: input[1],
        payload: input[2],
      };
    }
    /*
      Color function
      TODO: Use for presets only
    */
    if (settings.classicMode) {
      return;
    }

    let { object, func, brand, logo_url, logo_size } = observe;
    let fltr =  "~ " // settings.filter || "~";
    let op = func ? `.${func}()` : "()";
    console_set = [];

    event = args ? args["event"] : undefined;

    // Currently the script evaluation is only for GTM
    // TODO - When scripts of interest are more than GTM, split this out.
    if (event === "gtm.dom") {
      evaluate_scripts(console_set, console_group, settings);
    }

    const CONSOLE_LOG_GROUP_STATUS = evaluation
      ? evaluation.status === "OK"
        ? FORMAT_CONSOLE_LOG_GROUP_OK
        : evaluation.status === "NOTICE"
        ? FORMAT_CONSOLE_LOG_GROUP_NOTE
        : FORMAT_CONSOLE_LOG_GROUP_ERROR
      : FORMAT_CONSOLE_LOG_GROUP_OK;

    if (args["event"] && settings.ignoreEvents && settings.ignoreEventsRegex) {
      if (new RegExp(settings.ignoreEventsRegex, "i").test(args["event"])) {
        return;
      }
    }

    // Extract an details from the object
    // TODO - Return an object with more information, instead of just a string
    function object_info(object) {
      if (!object) return "";
      let keys = Object.keys(object);
      return keys.length === 1
        ? object[keys[0]] // There is only one value, then return it
        : keys[0] === "0" && object[keys[0]] === "js"
        ? "gtag js"
        : keys[0] === "0" && object[keys[0]] === "config"
        ? `gtag config: ${object[keys[1]]}`
        : keys[0] === "0" && object[keys[0]] === "event"
        ? `gtag event: ${object[keys[1]]} ${
            object[keys[2]] ? "- " + object[keys[2]].send_to : ""
          }`
        : keys.length === 0
        ? "Empty object - {}"
        : "Object - Expand for details";
    }

    // If there is an event in the arguments
    let evt =
      args &&
      ((event ? `${event_label}:%c ${args["event"]}` : undefined) ||
        // else if the args are a function
        (typeof args === "function"
          ? "Function - expand for details%c"
          : undefined) ||
        // else if the args are a string
        (typeof args === "string"
          ? `${args}%c`
          : undefined ||
            // else if the args on just one thing
            Object.keys(args).length === 1
          ? // Return the key/value pair. If the value is a string, return it, otherwise return the object
            Array.isArray(args)
            ? // When the array has one item return it
              `Array of 1 item: %c${
                // if the one item is an object
                typeof args[Object.keys(args)[0]] === "object"
                  ? // It's an object
                    "object - expand for details"
                  : // It's not an object
                    args[Object.keys(args)[0]]
              }`
            : // When it's not an array,
              `${Object.keys(args)[0]}: %c${
                args[Object.keys(args)[0]] &&
                typeof args[Object.keys(args)[0]] === "object"
                  ? `${type_of_object(
                      args[Object.keys(args)[0]]
                    )} - expand for details`
                  : // It's a string, undefined, or null.
                    args[Object.keys(args)[0]]
              }`
          : // Otherwise return undefined
            undefined));

    let log_group_header = "";
    if (brand === "Google" && args.elapsed_time) {
      log_group_header = `~ %c     Google - ${args.gtm} %c ${args.timed_event}: %c${args.elapsed_time}ms`;
    } else {
      log_group_header = `~ %c     ${brand} - ${object}${op}: ${
        evt ? `%c ${evt}` : "%c " + `${object_info(args)}` + " %c"
      }`;
    }
    logo_size = logo_size ? logo_size : "14px 14px";
    let log_group_header_format = `${CONSOLE_LOG_GROUP_STATUS} background: url(${logo_url}) no-repeat; background-size: ${logo_size}; `;

    if (
      args["event"] &&
      settings.highlightEvents &&
      settings.highlightEventsRegex
    ) {
      if (
        new RegExp(settings.highlightEventsRegex, "i").test(
          stringify_removing_unwanted_references(args, "\t")
        )
      ) {
        log_group_header_format =
          log_group_header_format + "background-color: rgb(255, 255, 128); ";
      }
    }

    // Group Header
    console_set.push(
      console_group.bind(
        console_group,
        log_group_header,
        log_group_header_format,
        FORMAT_CONSOLE_LOG_EVENT,
        FORMAT_CONSOLE_LOG_EVENT_DATA
      )
    );

    if (evaluation && evaluation.status != "OK") {
      console_set.push(
        console_copy.log.bind(
          console_copy.log,
          `${fltr} %c${evaluation.status}: \n%c${evaluation.evaluation}`,
          evaluation.status === "NOTICE"
            ? FORMAT_CONSOLE_LOG_GROUP_NOTE
            : FORMAT_CONSOLE_LOG_GROUP_ERROR,
          FORMAT_CONSOLE_LOG_EVENT_DATA
        )
      );
    }
    // Grouped Pushes
    console_set.push(
      console_copy.log.bind(
        console_copy.log,
        `${fltr} ${
          Object.prototype.toString.call(args).match(/\[*\s(\w+)\]/)[1]
        }: \n${stringify_removing_unwanted_references(
          args,
          "\t"
        )}\nCurrently in memory: `,
        args
      )
    );
    if (brand === "Google") {
    }

    if (!settings.hideStack) {
      get_call_stack(stack, console_set, console_group, settings);
    }

    if (settings.hideTiming) {
      // Really show timing
      let n = current_push_time(Date.now()).now.toFixed(3);
      var logCaller = {
        value: `%c${fltr} ${n} s since Document Start`,
        fmt: e(!0, "inherit", 11),
      };
      console_set.push(
        console_copy.log.bind(console_copy.log, logCaller.value, logCaller.fmt)
      );
    }
    // End the Group
    console_set.push(console_copy.groupEnd.bind(console_copy.groupEnd));

    push_console_set(console_set);
    console_set = [];
    if (event === "gtm.load" && !gtm_load_event_processed) {
      // Prevent duplicate processing
      gtm_load_event_processed = true;

      let format = FORMAT_CONSOLE_LOG_GROUP_OK;
      let gtm_or_gtag_or_optimize = "Google Tag Manager";

      let gtm_containers = window.google_tag_manager
        ? Object.keys(window.google_tag_manager).filter((k) =>
            k.includes("GTM-")
          )
        : [];
      let optimize = gtm_containers.filter((g) => {
        return (
          window.google_tag_manager[g].Mc || window.google_tag_manager[g].Vc
        );
      });
      let aw = window.google_tag_manager
        ? Object.keys(window.google_tag_manager).filter((k) =>
            k.includes("AW-")
          )
        : [];
      let dc = window.google_tag_manager
        ? Object.keys(window.google_tag_manager).filter((k) =>
            k.includes("DC-")
          )
        : [];
      let ua = window.google_tag_manager
        ? Object.keys(window.google_tag_manager).filter((k) =>
            k.includes("UA-")
          )
        : [];
      let next_gen = window.google_tag_manager
        ? Object.keys(window.google_tag_manager).filter((k) => k.includes("G-"))
        : [];
      let addendum = "";

      if (gtm_containers.length === 1) {
        // 1 GTM Container
        if (optimize.length === 1) {
          // GTM & Optimize
          gtm_or_gtag_or_optimize = `${gtm_containers[0]} & Optimize ${optimize[0]} `;
        }
      }

      // GTM & gtag next gen
      // gtag & Optimize

      // Not Recommended
      // GTM & gtag UA, AW or DC
      if (
        gtm_containers.length > 1 ||
        (gtm_containers.length === 1 && aw.length > 0) ||
        dc.length > 0
      ) {
        format = FORMAT_CONSOLE_LOG_GROUP_NOTE;
        addendum =
          "(Multiple GTM containers - Consider Zones  - https://support.google.com/tagmanager/answer/7647043?hl=en)";
        if (optimize.length > 0 && gtm_containers.length === 2) {
          format = FORMAT_CONSOLE_LOG_GROUP_OK;
          addendum = `(Includes Optimize - ${optimize[0]})`;
        } else if (aw.length > 0 || dc.length > 0) {
          if (optimize.length > 0 && gtm_containers.length === 1) {
            addendum = ` with gtag - consider using Google Tag Manager. \n\t\thttps://support.google.com/tagmanager/answer/7582054?hl=en.)`;
          } else if (gtm_containers.length > 0) {
            addendum = ` suggestion - consider using Tag Manager's native tag templates for Google Ads, Analytics, and Floodlight. \n\t\thttps://support.google.com/tagmanager/answer/7582054?hl=en.)`;
          }
        }
      }

      if (optimize && gtm_containers.length === 1 && optimize.length > 0) {
        gtm_or_gtag_or_optimize = "Optimize";
      } else if (gtm_containers.length === 0) {
        gtm_or_gtag_or_optimize = "gtag";
      }

      gtm_or_gtag_or_optimize =
        "Google Tag Manager (gtag, optimize, and/or GTM)";
      format = FORMAT_CONSOLE_LOG_GROUP_OK;
      let gtm_format = `${format} background: url(${logo_url}) no-repeat; background-size: ${logo_size}`;
      //        console_set.push(console_copy.log.bind(console_copy.log, `%c     ${gtm_or_gtag_or_optimize} ${addendum}${fltr}`, gtm_format, window["google_tag_manager"]));
      console_set.push(
        console_copy.log.bind(
          console_copy.log,
          `%c     ${gtm_or_gtag_or_optimize} ${fltr}\n`,
          gtm_format,
          window["google_tag_manager"]
        )
      );
      if (window.google_optimize) {
        console_set.push(
          console_copy.log.bind(
            console_copy.log,
            `%c     Google Optimize ${fltr}`,
            gtm_format,
            window["gaData"] || "no gaData 🙁"
          )
        );
      }
      _c_w_(console_set);
    }
  }

  /**
  evaluate_scripts
  @param - console_set
  @param - console_group
  @param - settings
  @return - findings
  */
  function evaluate_scripts(console_set, console_group, settings) {
    let findings = undefined;
    let fltr = "~ " // settings.filter || "~";
    let scripts = document.querySelectorAll("script");
    let scripts_of_interest = [];
    scripts.forEach((s, i) => {
      if (!s.id.includes("inspector") && !s.id.includes("-inserted-snippet")) {
        let src = s.innerHTML;
        if (src) {
          if (src.includes("gtm.js")) {
            scripts_of_interest.push({
              "Contains gtm.js": s,
            });
            if (s.parentElement.nodeName != "HEAD") {
              findings = FORMAT_CONSOLE_LOG_GROUP_NOTE;
              let script_issue = `This GTM Snippet is not inside the HEAD element. It is in a ${s.parentElement.nodeName} element.`;
              console_set.push(
                console_copy.log.bind(
                  console_copy.log,
                  `${fltr}%c  ${script_issue}`,
                  FORMAT_CONSOLE_LOG_GROUP_NOTE,
                  s
                )
              );
            }
          }
        }
      }
    });
    return findings;
  }

  /***************************
  current_push_time
  @param - t
  @return Object {
    now:
    delta:
  }
  ****************************/
  function current_push_time(t) {
    var lp = window._ap_dl.dataLayerLastPushTime;
    var fp = window._ap_dl.dl_inspector_init_time;
    var delta = t - lp;
    window._ap_dl.dataLayerLastPushTime = t;
    return {
      now: (t - fp) / 1000,
      delta: delta / 1000,
    };
  }

  /**
  get_call_stack
  @param - stack
  @param - console_set
  @param - console_group
  @param - settings
  */
  function get_call_stack(stack, console_set, console_group, settings) {
    let fltr = "~ " // settings.filter || "~";
    //let stack = new Error("Stack Trace").stack;
    if (!stack) {
      console_set.push(
        console_copy.log.bind(
          console_copy.log,
          `%c${fltr} Stack Not Available:`,
          e(!0, COLOR_OK, 11),
          "The call happened before the inspector was listening or there is no stack available.",
          " \n "
        )
      );
    } else {
      stack = stack.replace(/    at /g, "");
      stack = stack.replace(/Error: /g, "");
      stack = stack.split("\n");
      //stack = stack.slice(6)
      console_set.push(
        console_group.bind(
          console_group,
          `%c${fltr} Call Stack`,
          e(!0, COLOR_OK, 11)
        )
      );
      stack.forEach((i) => {
        console_set.push(
          console_copy.log.bind(console_copy.log, `${fltr} `, i)
        );
      });
      console_set.push(
        console_copy.log.bind(console_copy.log, `${fltr} %O`, stack)
      );
      console_set.push(console_copy.groupEnd.bind(console_copy.groupEnd));
    }
  }

  /**
  evaluate_dataLayer_push

  @param - obj
  @param - settings
  */
  function evaluate_dataLayer_push(obj, settings) {
    let fltr =  "~ " // settings.filter || "~";
    const MAX_GA_POST_PAYLOAD = 8192;

    function payloadSize(imps) {
      // MAX_GA_POST_PAYLOAD
      let intPayloadSize = 0;
      try {
        imps.map((imp) => {
          intPayloadSize += JSON.stringify(imp).length;
        });
      } catch (e) {
        console_copy.error("dataLayer Inspector+:payloadSize:", e);
      }
      return intPayloadSize;
    }

    let results = [];
    try {
      /**
      une - returns true if val is undefined, null, or empty
      @param - val
      */
      function une(val) {
        //  undefined null empty
        return val === undefined || val === null || val === "";
      }
      let recognized_ecomm_object = false;
      Object.defineProperties(results, {
        status: {
          get: function () {
            let status = "OK";
            this.map((s) => {
              if (status === "OK" && s.status === "NOTICE") {
                status = s.status;
                this._evaluation = s.evaluation;
              }
              if (s.status === "ERR") {
                status = s.status;
                this._evaluation = s.evaluation;
              }
            });
            return status;
          },
        },
        evaluation: {
          get: function () {
            this._evaluation = "No issues found";
            let state = this.status;
            let result = this.sort((a, b) => {
              return a.status > b.status ? 1 : 0;
            }).reduce((e, r, i) => {
              return (
                e +
                (this.length > 1 ? `\t${fltr} ` + (i + 1) + ". " : "") +
                r.status +
                " - " +
                r.evaluation +
                "\n"
              );
            }, "");
            return result; // this._evaluation
          },
        },
      });
      if (Object.keys(obj).length === 0 && obj.constructor === Object) {
        results.push({
          status: "NOTICE",
          evaluation: "The push is an empty object",
        });
      }
      if (Array.isArray(obj)) {
        results.push({
          status: "NOTICE",
          evaluation: "The object pushed is an Array. This is non-standard",
        });
      }
      if (obj.event === null || obj.event === "") {
        results.push({
          status: "ERR",
          evaluation: "Event should not be null or empty",
        });
      } else if (
        obj.event === undefined &&
        Object.prototype.toString.call(obj) !== "[object Arguments]"
      ) {
        // gtag pushes the an Aurguments object to the dataLayer, so don't suggest it should have an event
        results.push({
          status: "NOTICE",
          evaluation:
            "All dataLayer pushes should have an event key. Without an event key, it is difficult to trigger a tag with the push.",
        });
      }
      if (obj.event === "gtm.js") {
        count_of_gtm_js_pushes = count_of_gtm_js_pushes + 1;
        // TODO - Is there any evaluation required?
        if (count_of_gtm_js_pushes > 1) {
          results.push({
            status: "NOTICE",
            evaluation: `There are multiple gtm.js pushes. \n\tGTM will treat the first as an event, and ignore the following. \n\tYou will see "Message" in the preview panel for this event.\n\t`,
          });
        }
      }
      if (obj.event === "gtm.load") {
      }
      if (obj.ecommerce) {
        if (obj.ecommerce.impressions !== undefined) {
          // This will allow for null impressions
          recognized_ecomm_object = true;
          if (!Array.isArray(obj.ecommerce.impressions)) {
            results.push({
              status: "ERR",
              evaluation: "ecommerce.impressions is not an Array",
            });
          } else if (obj.ecommerce.impressions.length === 0) {
            results.push({
              status: "NOTICE",
              evaluation: "ecommerce.impressions is empty",
            });
          } else {
            obj.ecommerce.impressions.map((imp) => {
              if (une(imp.name) && une(imp.id)) {
                results.push({
                  status: "ERR",
                  evaluation: "ecommerce.impressions must have a name or ID",
                });
              }
            });
            if (payloadSize(obj.ecommerce.impressions) >= MAX_GA_POST_PAYLOAD) {
              results.push({
                status: "ERR",
                evaluation:
                  "ecommerce.impressions exceed maximum size of POST and may not be sent.\n\t\t Consider breaking up the impressions into multiple pushes or only sending the ID and using Data Import",
              });
            } else if (
              payloadSize(obj.ecommerce.impressions) >=
              0.8 * MAX_GA_POST_PAYLOAD
            ) {
              results.push({
                status: "NOTICE",
                evaluation:
                  "ecommerce.impressions may exceed maximum size of POST and may not be sent.\n\t\t Consider breaking up the impressions into multiple pushes or only sending the ID and using Data Import",
              });
            }
          }
        }
        if (obj.ecommerce.click) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.click.products) {
            results.push({
              status: "ERR",
              evaluation: "ecommerce.click.products array is missing",
            });
          } else {
            if (!Array.isArray(obj.ecommerce.click.products)) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.click.products is not an Array",
              });
            } else if (obj.ecommerce.click.products.length === 0) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.click.products is empty",
              });
            } else {
              obj.ecommerce.click.products.map((prod) => {
                if (une(prod.name) && une(prod.id)) {
                  results.push({
                    status: "ERR",
                    evaluation:
                      "ecommerce.click.products must have a name or ID",
                  });
                }
              });
            }
          }
        }
        if (obj.ecommerce.detail) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.detail.products) {
            results.push({
              status: "ERR",
              evaluation: "ecommerce.detail.products array is missing",
            });
          } else {
            if (!Array.isArray(obj.ecommerce.detail.products)) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.detail.products is not an Array",
              });
            } else if (obj.ecommerce.detail.products.length === 0) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.detail.products is empty",
              });
            } else {
              obj.ecommerce.detail.products.map((prod) => {
                if (une(prod.name) && une(prod.id)) {
                  results.push({
                    status: "ERR",
                    evaluation:
                      "ecommerce.detail.products must have a name or ID",
                  });
                }
              });
            }
            if (
              obj.ecommerce.detail.actionField &&
              obj.ecommerce.detail.actionField.list
            ) {
              results.push({
                status: "NOTICE",
                evaluation:
                  "ecommerce.detail.actionField.list is set.\n\t\t Attibution for add to cart will be given to this list and you will not see a complete chain of events from previous lists, in the Product List Performance report.",
              });
            }
          }
        }
        if (obj.ecommerce.add) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.add.products) {
            results.push({
              status: "ERR",
              evaluation: "ecommerce.add.products array is missing",
            });
          } else {
            if (!Array.isArray(obj.ecommerce.add.products)) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.add.products is not an Array",
              });
            } else if (obj.ecommerce.add.products.length === 0) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.add.products is empty",
              });
            } else {
              obj.ecommerce.add.products.map((prod) => {
                if (une(prod.name) && une(prod.id)) {
                  results.push({
                    status: "ERR",
                    evaluation: "ecommerce.add.products must have a name or ID",
                  });
                }
              });
            }
          }
        }
        if (obj.ecommerce.remove) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.remove.products) {
            results.push({
              status: "ERR",
              evaluation: "ecommerce.remove.products array is missing",
            });
          } else {
            if (!Array.isArray(obj.ecommerce.remove.products)) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.remove.products is not an Array",
              });
            } else if (obj.ecommerce.remove.products.length === 0) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.remove.products is empty",
              });
            } else {
              obj.ecommerce.remove.products.map((prod) => {
                if (une(prod.name) && une(prod.id)) {
                  results.push({
                    status: "ERR",
                    evaluation:
                      "ecommerce.remove.products must have a name or ID",
                  });
                }
              });
            }
          }
        }
        if (obj.ecommerce.promoView) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.promoView.promotions) {
            results.push({
              status: "ERR",
              evaluation: "ecommerce.promoView.promotions array is missing",
            });
          } else {
            if (!Array.isArray(obj.ecommerce.promoView.promotions)) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.promoView.promotions is not an Array",
              });
            } else if (obj.ecommerce.promoView.promotions.length === 0) {
              results.push({
                status: "NOTICE",
                evaluation: "ecommerce.promoView.promotions is empty",
              });
            } else {
              obj.ecommerce.promoView.promotions.map((promo) => {
                if (une(promo.name) && une(promo.id)) {
                  results.push({
                    status: "ERR",
                    evaluation:
                      "ecommerce.promoView.promotions must have a name or ID",
                  });
                }
              });
              if (
                payloadSize(obj.ecommerce.promoView.promotions) >=
                MAX_GA_POST_PAYLOAD
              ) {
                results.push({
                  status: "ERR",
                  evaluation:
                    "ecommerce.promoView.promotions exceed maximum size of POST and may not be sent.\n\t\t Consider breaking up the impressions into multiple pushes or only sending the ID and using Data Import",
                });
              } else if (
                payloadSize(obj.ecommerce.promoView.promotions) >=
                0.8 * MAX_GA_POST_PAYLOAD
              ) {
                results.push({
                  status: "NOTICE",
                  evaluation:
                    "ecommerce.promoView.promotions may exceed maximum size of POST and may not be sent.\n\t\t Consider breaking up the impressions into multiple pushes or only sending the ID and using Data Import",
                });
              }
            }
          }
        }
        if (obj.ecommerce.promoClick) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.promoClick.promotions) {
            results.push({
              status: "ERR",
              evaluation: "ecommerce.promoClick.promotions array is missing",
            });
          } else {
            if (!Array.isArray(obj.ecommerce.promoClick.promotions)) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.promoClick.promotions is not an Array",
              });
            } else if (obj.ecommerce.promoClick.promotions.length === 0) {
              results.push({
                status: "ERR",
                evaluation: "ecommerce.promoClick.promotions is empty",
              });
            } else {
              obj.ecommerce.promoClick.promotions.map((promo) => {
                if (une(promo.name) && une(promo.id)) {
                  results.push({
                    status: "ERR",
                    evaluation:
                      "ecommerce.promoClick.promotions must have a name or ID",
                  });
                }
              });
            }
          }
        }
        if (obj.ecommerce.checkout) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.checkout.actionField) {
            results.push({
              status: "NOTICE",
              evaluation: "ecommerce.checkout.actionField is missing",
            });
          } else {
            if (une(obj.ecommerce.checkout.actionField.step)) {
              results.push({
                status: "NOTICE",
                evaluation: "ecommerce.checkout.actionField.step is missing",
              });
            }
          }
        }
        if (obj.ecommerce.checkout_option) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.checkout_option.actionField) {
            results.push({
              status: "NOTICE",
              evaluation: "ecommerce.checkout_option.actionField is missing",
            });
          } else {
            if (une(obj.ecommerce.checkout_option.actionField.step)) {
              results.push({
                status: "NOTICE",
                evaluation:
                  "ecommerce.checkout_option.actionField.step is missing",
              });
            }
          }
        }
        if (obj.ecommerce.purchase) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.purchase.actionField) {
            results.push({
              status: "ERR",
              evaluation: "ecommerce.purchase.actionField is required",
            });
          } else {
            if (une(obj.ecommerce.purchase.actionField.id)) {
              results.push({
                status: "ERR",
                evaluation:
                  "ecommerce.purchase.actionField.id (Transaction ID) is required",
              });
            }
            if (obj.ecommerce.purchase.products) {
              // This will allow for null products
              if (!Array.isArray(obj.ecommerce.purchase.products)) {
                results.push({
                  status: "ERR",
                  evaluation: "ecommerce.purchase.products is not an Array",
                });
              } else {
                obj.ecommerce.purchase.products.map((prod) => {
                  if (une(prod.name) && une(prod.id)) {
                    results.push({
                      status: "ERR",
                      evaluation:
                        "ecommerce.purchase.products must have a name or ID",
                    });
                  }
                });
              }
            }
          }
        }
        if (obj.ecommerce.refund) {
          recognized_ecomm_object = true;
          if (!obj.ecommerce.refund.actionField) {
            results.push({
              status: "ERR",
              evaluation: "ecommerce.refund.actionField is required",
            });
          } else {
            if (une(obj.ecommerce.refund.actionField.id)) {
              results.push({
                status: "ERR",
                evaluation:
                  "ecommerce.refund.actionField.id (Transaction ID) is required",
              });
            }
          }
        }
        if (recognized_ecomm_object != true) {
          results.push({
            status: "ISSUE",
            evaluation:
              "ecommerce.object format not recognized.\nSee https://developers.google.com/tag-manager/enhanced-ecommerce for recommended format.",
          });
        }
      }
      return results;
    } catch (e) {
      console.error("dataLayer Inspector+:evaluateObjectFormat:", e);
    }
  }
})();
