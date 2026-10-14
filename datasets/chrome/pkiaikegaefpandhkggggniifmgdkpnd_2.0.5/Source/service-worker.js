try {
  importScripts('/injectable-scripts/config.js');
} catch (e) {
  console.error(e);
}

const getDataFromStorage = (key, callback) => {
  try {
    chrome.storage.local.get(key, (data) => {
      if (typeof data[key] === 'object') {
        console.log(`Got value: ${JSON.stringify(data[key], null, '\t')} for key: ${key} from storage.`);
      } else {
        console.log(`Got value: ${data[key]} for key: ${key} from storage.`);
      }
      callback(data[key]);
    });
  } catch (error) {
    console.log(error);
  }
}

const setDataToStorage = (key, value, callback=()=>{}) => {
  try {
    chrome.storage.local.set({ [key] : value }, () => {
      if(chrome.runtime.lastError) {
        callback(false);
        throw Error(chrome.runtime.lastError);
      } else {
        if (typeof value === 'object') {
          console.log(`Set value: ${JSON.stringify(value, null, '\t')} to key: ${key} in storage.`);
        } else {
          console.log(`Set value: ${value} to key: ${key} in storage.`);
        }
        callback(true);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const removeDataInStorage = (key, callback) => {
  try {
    chrome.storage.local.remove(key, () => {
      console.log(`Removed value of key: ${key} from storage.`);
      if (callback) callback(true);
    });
  } catch (error) {
    console.log(error);
  }
}

const migrateToUserGuidBasedStorage = () => {
  getDataFromStorage(USER_GUID, (userGuid) => {
    if (typeof userGuid === 'undefined') {
      console.log('Did not find previous USER GUID');
      return;
    }
    console.log('Found previous USER GUID');
    getDataFromStorage(PROCTORING_STATE, (proctoringState) => {
      if (typeof proctoringState != 'string') {
        console.log('Did not find Old PROCTORING_STATE');
        return;
      }
      console.log('Creating new format PROCTORING_STATE');
      setDataToStorage(PROCTORING_STATE, { [userGuid]: proctoringState });
    });
    getDataFromStorage(PROGRESS_DATA, (progressData) => {
      if (typeof progressData === 'undefined') {
        console.log('Did not find Old PROGRESS_DATA');
        return;
      }
      if (typeof progressData[userGuid] !== 'undefined') {
        console.log('PROGRESS_DATA already in new format so copying it as it is');
        setDataToStorage(PROGRESS_DATA_BY_USER_GUID, { ...progressData});
        removeDataInStorage(PROGRESS_DATA);
        return;
      }
      console.log('Creating new format PROGRESS_DATA');
      setDataToStorage(PROGRESS_DATA_BY_USER_GUID, { [userGuid]: {...progressData} });
      removeDataInStorage(PROGRESS_DATA);
    });
  });
}

migrateToUserGuidBasedStorage();

const isTabIdInvalid = (tabId) => {

  const _isTabIdInvalid = isNaN(parseInt(tabId));
  if(_isTabIdInvalid) console.log(`Tab id invalid: ${tabId}`);
  return _isTabIdInvalid;

}

const handleRuntimeLastError = () => {
  void chrome.runtime.lastError;
}

const removeTab = (tabId) => {
  if (isTabIdInvalid(tabId)) {
    return;
  }

  try {
    chrome.tabs.remove(tabId, handleRuntimeLastError);
    console.log(`Removed tab: ${tabId}`);
  } catch (error) {
    console.log(error);
  }
}

const activateTab = (tabId) => {
  if(isTabIdInvalid(tabId)){
    return;
  }

  try {
    chrome.tabs.update(tabId, { active: true }, handleRuntimeLastError);
    console.log(`Activated tab: ${tabId}`);
  } catch (error) {
    console.log(error);
  }
}

const checkIfDomainChanged = (expression, url) => {

  if (typeof url === 'undefined') {
    return false;
  }

  const isDomainChanged = !expression.test(url);

  if (isDomainChanged) console.log(`Domain has been changed! Url: ${url} is not matching ${expression}`);

  return isDomainChanged;

}

const handleLessonTabs = (lessonTabs, lessonTabId) => {
  if (lessonTabs.length == 0) {
    return;
  }

  if (typeof lessonTabId === 'undefined') {
    lessonTabId = lessonTabs[0].id;
    setDataToStorage(LESSON_TAB_ID, lessonTabId, () => {});
    console.log(`Detected lesson tab!: ${lessonTabId}`);
  }

  if(lessonTabs.length <= 1) {
    return;
  }

  for (let tab of lessonTabs) {
    removeTab(tab.id);
  }

  activateTab(lessonTabId);
}

const doesTabsExist = (tabKeys) => {
  for (let tabKey of tabKeys) {
    getDataFromStorage(tabKey, (tabId) => {
      if (!tabId) {
        return;
      }
      function callback() {
        if (chrome.runtime.lastError) {
          console.log(tabKey, PROCTORING_TAB_ID);
          if (tabKey == PROCTORING_TAB_ID) {
            getDataFromStorage(USER_GUID, (userGuid) => {
              setDataToStorage(PROCTORING_STATE, {[userGuid]: INITIAL});
            });
          }
          removeDataInStorage(tabKey);
        }
      }
      chrome.tabs.get(tabId, callback);
    });
  }
}

const onTabUpdatedHandler = (tabId, changeInfo, tab) => {

  doesTabsExist([LESSON_TAB_ID, PROCTORING_TAB_ID, PROCTORING_INFO_TAB_ID]);

  // Clean up multiple info tabs
  chrome.tabs.query({}, (tabs) => {
    const proctoringInfoTabIds = [];
    for (let tab of tabs) {
      if(!PROCTORING_INFO_TAB_URL_EXPRESSION.test(tab.url)) {
        return;
      }
      proctoringInfoTabIds.push(tab.id);
    }
    if (proctoringInfoTabIds.length > 1) {
      let proctoringInfoTabIdToActivate;
      getDataFromStorage(PROCTORING_INFO_TAB_ID, (proctoringInfoTabId) => {
        if (typeof proctoringInfoTabId === 'undefined') {
          proctoringInfoTabIdToActivate = proctoringInfoTabIds[0];
          setDataToStorage(PROCTORING_INFO_TAB_ID, proctoringInfoTabIdToActivate);
          return;
        }
        for (let id of proctoringInfoTabIds) {
          if (id === proctoringInfoTabId) {
            continue;
          }
          removeTab(id);
        }
      });
    }
  });

  getDataFromStorage(LESSON_TAB_ID, (lessonTabId) => {
    if (PROCTORING_SUCCESSFUL_SUBMISSION_URL_EXPRESSION.test(changeInfo.url)) {
      sendMessage(lessonTabId, PROCTORING_SUCCESSFUL_SUBMISSION_TAB_OPENED);
      getDataFromStorage(USER_GUID, (userGuid) => {
        setDataToStorage(PROCTORING_STATE, {[userGuid]: INITIAL});
      });
      setDataToStorage(IS_PROCTORING_PAUSED, false);
      removeDataInStorage(PROCTORING_TAB_ID)
    }
  });

  if (changeInfo.status !== 'complete') {
    return;
  }
  getDataFromStorage(LESSON_TAB_ID, (lessonTabId) => {
    if (typeof lessonTabId !== 'undefined') {
      if (tabId === lessonTabId) {
        if(checkIfDomainChanged(NISM_TAB_EXPRESSION, changeInfo.url)) {
          removeDataInStorage(LESSON_TAB_ID);
          getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
            if (proctoringTabId) {
              removeTab(proctoringTabId);
            }
          });
          getDataFromStorage(PROCTORING_INFO_TAB_ID, (proctoringInfoTabId) => {
            if (proctoringInfoTabId) {
              removeTab(proctoringInfoTabId);
            }
          });
        }
      }
    }

    getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
      if (typeof proctoringTabId !== 'undefined') {
        if (tab.id === proctoringTabId) {
          if (checkIfDomainChanged(PROCTORING_TAB_URL_EXPRESSION, changeInfo.url)) {
            getDataFromStorage(USER_GUID, (userGuid) => {
              setDataToStorage(PROCTORING_STATE, {[userGuid]: INITIAL});
            });
            setDataToStorage(IS_PROCTORING_PAUSED, false);
            sendMessage(lessonTabId, PROCTORING_TAB_CLOSED);
            activateTab(lessonTabId);
            removeTab(proctoringTabId);
            removeDataInStorage(PROCTORING_TAB_ID);
          }
        }
      }

      if (typeof proctoringTabId === 'undefined') {
        getDataFromStorage(PROCTORING_STOPPED, (isProctoringStopped) => {
          if (isProctoringStopped) {
            return;
          }
          chrome.tabs.query({}, (tabs) => {
            tabs.map((tab) => {
              if(!PROCTORING_TEST_TAB_URL_EXPRESSION.test(tab.url)) {
                return;
              }
              setDataToStorage(PROCTORING_TAB_ID, tab.id);
              sendMessage(lessonTabId, STARTED_PROCTORING);
              activateTab(lessonTabId);
            });
          });
        });
      }

      chrome.tabs.query({}, (tabs) => {
        tabs.map((tab) => {
          if (PROCTORING_TAB_MESSAGE_URL_EXPRESSION.test(tab.url)) {
            getDataFromStorage(USER_GUID, (userGuid) => {
              getDataFromStorage(PROCTORING_STATE, (proctoringState) => {
                if (typeof proctoringState[userGuid] === 'undefined' || proctoringState[userGuid] === INITIAL) {
                  removeTab(tab.id);
                  return;
                }
                activateTab(tab.id);
                sendMessage(lessonTabId, PROCTORING_TAB_ERROR);
              });
            })
          }
        });
      });
    });

    getDataFromStorage(PROCTORING_INFO_TAB_ID, (proctoringInfoTabId) => {
      if (typeof proctoringInfoTabId !== 'undefined') {
        if (tab.id === proctoringInfoTabId) {
          if (PROCTORING_SUCCESSFUL_SUBMISSION_URL_EXPRESSION.test(changeInfo.url)) {
            getDataFromStorage(USER_GUID, (userGuid) => {
              setDataToStorage(PROCTORING_STATE, {[userGuid]: INITIAL});
            });
            setDataToStorage(IS_PROCTORING_PAUSED, false);
            removeDataInStorage(PROCTORING_TAB_ID)
          } else if (checkIfDomainChanged(PROCTORING_TAB_URL_EXPRESSION, changeInfo.url)) {
            sendMessage(lessonTabId, PROCTORING_INFO_TAB_CLOSED);
            activateTab(lessonTabId);
            removeTab(proctoringInfoTabId);
          }
        }
      }

      if (typeof proctoringInfoTabId === 'undefined') {
        chrome.tabs.query({}, (tabs) => {
          tabs.map((tab) => {
            if(!PROCTORING_INFO_TAB_URL_EXPRESSION.test(tab.url)) {
              return;
            }
            setDataToStorage(PROCTORING_INFO_TAB_ID, tab.id);
          });
        });
      }
    });

    chrome.tabs.query({ url: [...LESSON_TAB_EXPRESSION_STRING, ...QUIZ_TAB_EXPRESSION_STRING] }, (lessonExpressionMatchingTabs) => {
      handleLessonTabs(lessonExpressionMatchingTabs, lessonTabId);
    });
  });
}

// Multiple try catch blocks because of https://stackoverflow.com/a/66408379

try {
  chrome.tabs.onUpdated.addListener(onTabUpdatedHandler);
} catch (error) {
  console.log('Error in chrome.tabs.onUpdated listener');
  console.log(error);  
}

const externalMessageHandler = (request, sender, callback) => {
  console.log(`Received external message ${request.message} from ${sender.url}`);
  if (request.message === 'isAlive') {
    callback(true);
    return true;
  }

  if (request.message === HALT_PROCTORING) {
    getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
      if (proctoringTabId) {
        removeTab(proctoringTabId);
      }
    });

    getDataFromStorage(PROCTORING_INFO_TAB_ID, (proctoringInfoTabId) => {
      if (proctoringInfoTabId) {
        removeTab(proctoringInfoTabId);
      }
    });
    callback();
    return true;
  }
  return true;
}

try {
  chrome.runtime.onMessageExternal.addListener(externalMessageHandler);
} catch (error) {
  console.log('Error in chrome.runtime.onMessageExternal listener');
  console.log(error);
}

const checkIfSuccessfulSubmissionTabIsOpen = (callback) => {

  let isSuccessTabOpen = false;

  chrome.tabs.query({}, tabs => {

    for (let tab of tabs) {

      if (!PROCTORING_SUCCESSFUL_SUBMISSION_URL_EXPRESSION.test(tab.url)) {
        continue;
      }

      isSuccessTabOpen = true;
      break;

    }

    if (isSuccessTabOpen) {
      callback(true);
    } else {
      callback(false);
    }

  });

}

const pauseProctoring = () => {

  const pauseProctoringScript = () => {
    var w = window;
    w.postMessage(JSON.stringify({
      _hireproType: "thirdPartyProctoringPause"
    }), "*");
  }

  getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
    if (!proctoringTabId) {
      console.log('Proctoring tab not available to send pauseProctoring message');
      return;
    }
    if(isTabIdInvalid(proctoringTabId)){
      return;
    }
    chrome.scripting.executeScript({
      target: {tabId: proctoringTabId},
      func: pauseProctoringScript
    });
  });

}

const resumeProctoring = () => {

  const resumeProctoringScript = () => {
    var w = window;
    w.postMessage(JSON.stringify({
      _hireproType: "thirdPartyProctoringStart"
    }), "*");
  }

  getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
    if (!proctoringTabId) {
      console.log('Proctoring tab not available to send resumeProctoring message');
      return;
    }
    if(isTabIdInvalid(proctoringTabId)){
      return;
    }
    chrome.scripting.executeScript({
      target: {tabId: proctoringTabId},
      func: resumeProctoringScript
    });
  });

}

const endProctoring = () => {

  const stopProctoringScript = () => {
    var w = window;
    w.postMessage(JSON.stringify({
      _hireproType: "thirdPartyProctoringEnd"
    }), "*");
  }

  getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
    if (!proctoringTabId) {
      console.log('Proctoring tab not available to send stopProctoring message');
      return;
    }
    if(isTabIdInvalid(proctoringTabId)){
     return;
    }
    chrome.scripting.executeScript({
      target: {tabId: proctoringTabId},
      func: stopProctoringScript
    });
    removeDataInStorage(PROCTORING_TAB_ID);
  });

}

const stopProctoring = () => {
  getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
    if (!proctoringTabId) {
      console.log('Proctoring tab not available to send stopProctoring message');
      return;
    }
    if(isTabIdInvalid(proctoringTabId)){
     return;
    }
  });

  setDataToStorage(PROCTORING_STOPPED, true, () => {})

  endProctoring();

}

const logEvent = (data) => {

  console.log({log: data});

  const logEventScript = (data) => {
    var w = window;
    w.postMessage(
      JSON.stringify({
        _hireproType: "thirdPartyDebugLog",
        data: JSON.stringify(data)
      }),
      "*"
    );
  }

  getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
    if (!proctoringTabId) {
      console.log('Proctoring tab not available to send log message');
      return;
    }
    chrome.scripting.executeScript({
      target: {tabId: proctoringTabId},
      func: logEventScript,
      args: [data]
    });
  });

}

const isProctoringInfoTabOpen = (callback) => {

  chrome.tabs.query({}, (tabs) => {

    tabs.map((tab) => {

      if (PROCTORING_INFO_TAB_URL_EXPRESSION.test(tab.url)) {
        callback(true);
      }

      if (PROCTORING_TEST_TAB_URL_EXPRESSION.test(tab.url)) {
        callback(true);
      }

    });

    callback(false);

  });

}

const sendMessage = (tabId, message) => {

  if (isTabIdInvalid(tabId)) {
    return;
  }

  if (message === PROCTORING_SUCCESSFUL_SUBMISSION_TAB_OPENED) {
    chrome.tabs.sendMessage(tabId, message, handleRuntimeLastError);
  }

  getDataFromStorage(PROCTORING_STOPPED, (proctoringStopped) => {
    if (proctoringStopped === true) {
      return;
    }
  });

  chrome.tabs.sendMessage(tabId, message, handleRuntimeLastError);

}

chrome.alarms.onAlarm.addListener((alarm) => {
  getDataFromStorage(LESSON_TAB_ID, (lessonTabId) => {
    if (lessonTabId) {
      if (alarm.name === CHECK_FOR_SUCCESSFUL_SUBMISSION_TIMER) {
        sendMessage(lessonTabId, CHECK_FOR_SUCCESSFUL_SUBMISSION_TIMER_TIMEOUT);
      }

      if (alarm.name === INACTIVITY_TIMER) {
        sendMessage(lessonTabId, INACTIVITY_TIMER_TIMEOUT);
      }

      if (alarm.name === LONG_INACTIVITY_TIMER) {
        sendMessage(lessonTabId, LONG_INACTIVITY_TIMER_TIMEOUT);
      }

      if (alarm.name === API_LOGGING_TIMER) {
        sendMessage(lessonTabId, SEND_LOCAL_PROGRESS_DATA);
      }
    }
  });
});

const messageHandler = (request, sender, callback = ()=>{}) => {
  console.log(`Received message ${request.message} from ${sender.url}`);

  if (request.message === START_API_LOGGING) {
    chrome.alarms.create(API_LOGGING_TIMER, {...request.data});
    callback();
    return true;
  }

  if (request.message === START_CHECK_FOR_SUCCESSFUL_SUBMISSION_TIMER) {
    chrome.alarms.create(CHECK_FOR_SUCCESSFUL_SUBMISSION_TIMER, {...request.data});
    callback();
    return true;
  }

  if (request.message === START_INACTIVITY_TIMER) {
    chrome.alarms.get(INACTIVITY_TIMER, a => {
      if (a) chrome.alarms.clear(INACTIVITY_TIMER);
      chrome.alarms.create(INACTIVITY_TIMER, {...request.data});
    });
    callback();
    return true;
  }

  if (request.message === START_LONG_INACTIVITY_TIMER) {
    chrome.alarms.get(LONG_INACTIVITY_TIMER, a => {
      if (a) chrome.alarms.clear(LONG_INACTIVITY_TIMER);
      chrome.alarms.create(LONG_INACTIVITY_TIMER, {...request.data});
    });
    callback();
    return true;
  }

  if (request.message === INTERRUPT_INACTIVITY_TIMER) {
    chrome.alarms.get(INACTIVITY_TIMER, a => {
      if (a) chrome.alarms.clear(INACTIVITY_TIMER);
    });
    callback();
    return true;
  }

  if (request.message === INTERRUPT_LONG_INACTIVITY_TIMER) {
    chrome.alarms.get(LONG_INACTIVITY_TIMER, a => {
      if (a) chrome.alarms.clear(LONG_INACTIVITY_TIMER);
    });
    callback();
    return true;
  }

  if (request.message === UPDATE_PROCTORING_STATE) {
    setDataToStorage(PROCTORING_STATE, {[request.userGuid]: request.data});
    callback();
    return true;
  }

  if (request.message === GET_PROCTORING_STATE) {
    getDataFromStorage(PROCTORING_STATE, (proctoringState) => {
      if (typeof proctoringState === 'undefined') {
        callback(undefined);
        return;
      }
      callback(proctoringState[request.userGuid]);
    });
    return true;
  }

  if (request.message === GET_PROGRESS_DATA) {
    getDataFromStorage(PROGRESS_DATA_BY_USER_GUID, (progressData) => {
      if (typeof progressData === 'undefined') {
        callback(undefined);
        return;
      }
      callback(progressData[request.userGuid]);
    });
    return true;
  }

  if (request.message === UPDATE_PROGRESS_DATA) {
    getDataFromStorage(PROGRESS_DATA_BY_USER_GUID, (progressData) => {
      setDataToStorage(PROGRESS_DATA_BY_USER_GUID, {
        ...progressData,
        [request.userGuid]: request.data,
      }, callback);
    });
    return true;
  }

  if (request.message === GET_SUCCESSFUL_SUBMISSION_TAB_STATUS) {
    checkIfSuccessfulSubmissionTabIsOpen(callback);
    return true;
  }

  if (request.message === RESUME_PROCTORING) {
    resumeProctoring();
    callback();
    return true;
  }

  if (request.message === PAUSE_PROCTORING) {
    pauseProctoring();
    callback();
    return true;
  }

  if (request.message === STOP_PROCTORING) {
    stopProctoring();
    callback();
    return true;
  }

  if (request.message === HALT_PROCTORING) {
    getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
      if (proctoringTabId) {
        removeTab(proctoringTabId);
      }
    });

    getDataFromStorage(PROCTORING_INFO_TAB_ID, (proctoringInfoTabId) => {
      if (proctoringInfoTabId) {
        removeTab(proctoringInfoTabId);
      }
    });
    callback();
    return true;
  }

  if (request.message === LOG_EVENT) {
    logEvent(request.data);
    callback();
    return true;
  }

  if (request.message === IS_PROCTORING_INFO_TAB_OPEN) {
    isProctoringInfoTabOpen(callback);
    return true;
  }

  if (request.message === CANDIDATE_NOT_VISIBLE) {
    getDataFromStorage(LESSON_TAB_ID, (lessonTabId) => {
      if (lessonTabId) {
        activateTab(lessonTabId);
        sendMessage(lessonTabId, CANDIDATE_NOT_VISIBLE);
      }
    });
    callback();
    return true;
  }

  if (request.message === CANDIDATE_VISIBLE) {
    getDataFromStorage(LESSON_TAB_ID, (lessonTabId) => {
      if (lessonTabId) {
        activateTab(lessonTabId);
        sendMessage(lessonTabId, CANDIDATE_VISIBLE);
      }
    });
    callback();
    return true;
  }

  return true;
}

try {
  chrome.runtime.onMessage.addListener(messageHandler);
} catch (error) {
  console.log('Error in chrome.runtime.onMessage listener');
  console.log(error);
}

const onTabRemovedHandler = (tabId) => {
  getDataFromStorage(LESSON_TAB_ID, (lessonTabId) => {
    if (tabId === lessonTabId) {
      removeDataInStorage(LESSON_TAB_ID, () => {});
  
      getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
        if (proctoringTabId) {
          removeTab(proctoringTabId);
        }
      });

      getDataFromStorage(PROCTORING_INFO_TAB_ID, (proctoringInfoTabId) => {
        if (proctoringInfoTabId) {
          removeTab(proctoringInfoTabId);
        }
        chrome.tabs.query({}, (tabs) => {
          tabs.map((tab) => {
            if (proctoringInfoTabId) {
              if (PROCTORING_INFO_TAB_URL_EXPRESSION.test(tab.url)) {
                removeTab(tab.id);
              }
            }
          });
        });
      });
    }

    getDataFromStorage(PROCTORING_TAB_ID, (proctoringTabId) => {
      if (proctoringTabId && tabId === proctoringTabId) {
        removeDataInStorage(PROCTORING_TAB_ID);
        activateTab(lessonTabId);
  
        sendMessage(lessonTabId, PROCTORING_TAB_CLOSED);
        
        getDataFromStorage(USER_GUID, (userGuid) => {
          setDataToStorage(PROCTORING_STATE, {[userGuid]: INITIAL});
        });
        setDataToStorage(IS_PROCTORING_PAUSED, false);
      }
    });

    getDataFromStorage(PROCTORING_INFO_TAB_ID, (proctoringInfoTabId) => {
      if (proctoringInfoTabId && tabId === proctoringInfoTabId) {
        removeDataInStorage(PROCTORING_INFO_TAB_ID);
        activateTab(lessonTabId);
  
        sendMessage(lessonTabId, PROCTORING_INFO_TAB_CLOSED);
  
        getDataFromStorage(USER_GUID, (userGuid) => {
          setDataToStorage(PROCTORING_STATE, {[userGuid]: INITIAL});
        });
        setDataToStorage(IS_PROCTORING_PAUSED, false);
      }
    });
  });

  chrome.tabs.query({}, (tabs) => {
    if (tabs.length >= 1) {
      return;
    }

    getDataFromStorage(USER_GUID, (userGuid) => {
      setDataToStorage(PROCTORING_STATE, {[userGuid]: INITIAL});
    });
    setDataToStorage(IS_PROCTORING_PAUSED, false);
    setDataToStorage(PROCTORING_STOPPED, false);
  });
}

try {
  chrome.tabs.onRemoved.addListener(onTabRemovedHandler);
} catch (error) {
  console.log(error);
}