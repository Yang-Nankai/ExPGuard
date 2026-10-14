(function () {
    var imgs = $('[data-src]');
    $.each(imgs, function (i, e) {
        if ($(e).attr('data-src')) {
            var dataSrc = $(e).attr('data-src');
            $(e).attr('src', dataSrc);
        }
    });
})();

// chrome.storage.onChanged.addListener(function (changes, namespace) {
//     for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
//         console.log('key changed :', key);
//         console.log('old value changed :', oldValue);
//         console.log('new value  changed :', newValue);
//     }
// });


window.Widget = function(queryP) {
	this.queryP = queryP || {};
	this.doc = {
		n_click: 'n-widgetclick',
		n_action: 'n-widgetaction',
		n_target: 'n-widgettarget'
	};
	this.toggleClassName = this.queryP.toggleClassName || 'active';
	this.n_clicks = document.querySelectorAll(`[${this.doc.n_click}]`);
	this.n_actions = document.querySelectorAll(`[${this.doc.n_action}]`);
	window.old_target_value = null;
	window.mouseOnWidgetFlag = false;
};

Widget.prototype.removeClass = function(elem, className) {
	try {
		if (elem) {
			this.filter(elem, function(item, index) {
				if (item) {
					item.classList.remove(className);
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
};

Widget.prototype.addClass = function(elem, className) {
	try {
		if (elem) {
			this.filter(elem, function(item, index) {
				if (item) {
					item.classList.add(className);
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
};

Widget.prototype.toggleClass = function(elem, className) {
	try {
		if (elem) {
			this.filter(elem, function(item, index) {
				if (item) {
					item.classList.toggle(className);
				}
			});
		}
	} catch (e) {
		console.log(e);
	}
};

Widget.prototype.filter = function(el, cb) {
	let count = 0;
	try {
		if (el.length > 0) {
			while (count < el.length) {
				cb(el[count], count);
				count++;
			}
		}
	} catch (e) {
		console.log('error@ filter Function' + e);
	}
};

Widget.prototype.widgetHideOn = function() {
	try {
		const _this = this;
		_this.queryP.widgetHideOn.forEach((item) => {
			const elem =
				item.event == 'document'
					? [document]
					: document.querySelectorAll(item.event);

			_this.filter(elem, function(elemItem, count) {
				elemItem.addEventListener('click', (e) => {
					item.target.forEach((target) => {
						/* console.log("clicked")
						console.log(document.querySelectorAll(target.event))
						console.log(_this.toggleClassName) */
						_this.removeClass(
							document.querySelectorAll(target.event),
							_this.toggleClassName
						);
					});
				});
			});
		});
	} catch (e) {
		console.log(e);
	}
};

Widget.prototype.firstLoadRender = function(callBack) {
	const _this = this;

	if (_this.queryP.firstLoad.attribute) {
		window.old_target_value = _this.queryP.firstLoad.attribute;
		const storageItem = _this.queryP.firstLoad.storage.item;
		const storageValue = _this.queryP.firstLoad.storage.value;
		try {
			const elements = document.querySelectorAll(
				`[n-widgetclick=${window.old_target_value}],[n-widgetaction=${window.old_target_value}],[n-widgettarget=${window.old_target_value}]`
			);

			if (!localStorage.getItem(storageItem)) {
				localStorage.setItem(storageItem, storageValue);
				_this.filter(elements, function(els, idx) {
					els.classList.toggle(_this.toggleClassName);
				});
				typeof callBack == 'function' && callBack(true);
			} else {
				typeof callBack == 'function' && callBack(false);
			}
		} catch (e) {
			typeof callBack == 'function' && callBack(false);
			console.error('Error finding the first load attribute at Widget Feature');
		}
	}
};

Widget.prototype.init = function(callBack) {
	// Loop for the click
	const _this = this;
	try {
		_this.filter(_this.n_clicks, function(elementItems, count) {
			elementItems.addEventListener('click', (e) => {
				const callBackObj = {};
				let THIS = e.currentTarget;
				const THIS_TARGET = THIS.getAttribute(_this.doc.n_target);
				callBackObj.clickElement = THIS;

				callBackObj.hasTarget = THIS_TARGET ? true : false;

				if (callBackObj.hasTarget) callBackObj.targetValue = THIS_TARGET;

				callBackObj.hasClickValue = THIS.getAttribute(_this.doc.n_click)
					? true
					: false;

				callBackObj.clickValue = THIS.getAttribute(_this.doc.n_click) || '';

				callBackObj.hasAction = THIS.parentElement.querySelector(
					`[${_this.doc.n_action}]`
				)
					? true
					: false;

				if (callBackObj.hasAction) {
					callBackObj.actionElement = THIS.parentElement.querySelector(
						`[${_this.doc.n_action}]`
					);

					callBackObj.actionValue = callBackObj.actionElement.getAttribute(
						_this.doc.n_action
					);
				}

				if (THIS_TARGET) {
					THIS = document.querySelector(
						`[${_this.doc.n_click}=${THIS_TARGET}]`
					);
				}

				/*
				 * CHECK IF THIS CLICK ELEMENT HAS ACTIVE TARGET ATTRIBUTE AND ITS VALUE
				 */

				const IS_ACTIVE_TARGET =
					_this.queryP.hasOwnProperty('activateTarget') &&
					_this.queryP.activateTarget;

				if (IS_ACTIVE_TARGET) {
					const CLICK_HAS_ATTR = THIS.getAttribute(_this.doc.n_click);
					const CLICK_HAS_TARGET = THIS.hasAttribute(_this.doc.n_target);
					let targetAtt1 = CLICK_HAS_ATTR
						? document.querySelectorAll(
								`[${_this.doc.n_target}=${CLICK_HAS_ATTR}]`
						  )
						: document.querySelectorAll(
								`[${_this.doc.n_target}=${THIS_TARGET}]`
						  );

					if (
						!CLICK_HAS_ATTR ||
						(!CLICK_HAS_TARGET && window.old_target_value != CLICK_HAS_ATTR)
					) {
						/* console.log("clicked2")
						console.log(document.querySelectorAll(`[${_this.doc.n_target}]`))
						console.log(_this.toggleClassName) */
						_this.removeClass(
							document.querySelectorAll(`[${_this.doc.n_target}]`),
							_this.toggleClassName
						);
					}
					/* console.log("clicked3")
					console.log(targetAtt1) */
					_this.toggleClass(targetAtt1, _this.toggleClassName);

					window.old_target_value = CLICK_HAS_ATTR;
				}

				// Filter Function
				_this.filter(_this.n_clicks, (item) => {
					if (THIS != item) {
						if (item.parentElement.querySelector(`[${_this.doc.n_action}]`)) {
							//console.log("clicked4")
							//console.log(targetAtt1)
	
							_this.removeClass(
								[
									item,
									item.parentElement.querySelector(`[${_this.doc.n_action}]`)
								],
								_this.toggleClassName
							);
						}
					}
				});

				_this.toggleClass(
					[
						THIS,
						THIS.parentElement.querySelector(`[${_this.doc.n_action}]`)
							? THIS.parentElement.querySelector(`[${_this.doc.n_action}]`)
							: ''
					],
					_this.toggleClassName
				);
				if (THIS.classList.contains(_this.toggleClassName)) {
					//console.log("clicked5")
					callBackObj.clickIsActive = true;
				} else {
					//console.log("clicked6")
					callBackObj.clickIsActive = false;
				}

				if (
					THIS.parentElement.querySelector(`[${_this.doc.n_action}]`) &&
					THIS.parentElement
						.querySelector(`[${_this.doc.n_action}]`)
						.classList.contains(_this.toggleClassName)
				) {
					//console.log("clicked7")
					callBackObj.actionIsActive = true;
				} else {
					//console.log("clicked8")
					callBackObj.actionIsActive = false;
				}

				if (typeof callBack == 'function') {
					callBack(callBackObj);
				}
			});
		});

		_this.filter([..._this.n_clicks, ..._this.n_actions], function(el, i) {
			el.addEventListener('mouseover', (e) => {
				mouseOnWidgetFlag = false;
			});

			el.addEventListener('mouseout', (e) => {
				mouseOnWidgetFlag = true;
			});
		});

		document.addEventListener('click', (e) => {
			const callObj = {};
			callObj.actionElement = null;
			callObj.actionIsActive = false;
			callObj.actionValue = null;
			callObj.clickElement = e.target;
			callObj.clickIsActive = false;
			callObj.clickValue = "document";
			callObj.hasAction = false;
			callObj.hasClickValue = false;
			callObj.hasTarget = false;

			if (mouseOnWidgetFlag) {
				/* console.log("clicked9")
				console.log(_this) */
				const event = new CustomEvent("ClickedOutsideWidget");
				document.dispatchEvent(event);
				
				_this.removeClass(_this.n_clicks, _this.toggleClassName);
				_this.removeClass(_this.n_actions, _this.toggleClassName);
				
				if (typeof callBack == 'function') {
					callBack(callObj);
				}
			}
			 
		});

		if (_this.queryP.hasOwnProperty('widgetHideOn')) {
			_this.widgetHideOn();
		}
	} catch (e) {
		console.log(e);
	}
};

var acceptButton = $(".accept");
var allowWidget = $(".allow-widget");
var acceptTerm = $(".accept-prompt");
var denyTerms = $(".denytTerms");
var piiAccept = "piiAccept";
acceptButton.on("click", function (e) {
    closePiiWidgetforAccept();
    chrome.runtime.sendMessage({task: "showOptInPage"}, function (response) {
    });
});

function triggerCloseWidget() {
    new Widget().removeClass(
        document.querySelectorAll(
            '[n-widgetClick],[n-widgetaction], [n-widgettarget]'
        ),
        'active'
    );
    $(".calendar_popup").addClass("hiddentab")
}
function triggerOpenWidget(){
    new Widget().addClass(
        document.querySelectorAll(
            '[n-widgetClick="main"],[n-widgetaction="main"], [n-widgettarget="main"]'
        ),
        'active'
    );
    $(".calendar_popup").removeClass("hiddentab")
}

document.addEventListener("searchTextChanged", function () {
    triggerCloseWidget()
})

denyTerms.on("click", function (e) {
    closePiiWidget();
});

function closePiiWidget() {
    try {
        document.dispatchEvent(new Event("searchTextChanged"));
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: 'cancel'
            })
        );
    } catch (e) {
        console.log(e);
    }
}

function closePiiWidgetforAccept() {
    try {
        document.dispatchEvent(
            new CustomEvent('PiiAccept', {
                detail: 'cancel'
            })
        );
    } catch (e) {
        console.log(e);
    }
}
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        if (key === "piiAccept" && newValue === "1") {
            allowWidget.show();
            acceptTerm.hide();
            $("[n-widgetaction=link1],[n-widgetclick=link1]").removeClass("active");
            document.dispatchEvent(
                new CustomEvent("PiiAccept", {
                    detail: true,
                })
            );
            //console.log("accepted 2")
             // calendar
             const timeArr = currentTimeHandler();
        calendar.render();
        appointmentsWidget.removeAllEvents();
        appointmentsWidget.render();
        updateCalendarBtns();
        renderStoredEvents();
        toggleAppointmentForm();
        addCurrentDate();
        previousDateDisable();
        amOrPmDecider();
        appointmentFormHandler(timeArr[0], timeArr[1]);
        appointmentSectionFormHandler(timeArr[0], timeArr[1]);
        closeModalsHandler();
        } else if (key === "piiAccept" && newValue === "-1") {
            allowWidget.hide();
            acceptTerm.show();

            document.dispatchEvent(
                new CustomEvent("PiiAccept", {
                    detail: false,
                })
            );
            //console.log("not accepted 2")
        }
    }
});


function checkPiiStored() {
    var accepted = storageReplacer.getLocalStorageItem("piiAccept");
    if (accepted && accepted == 1) {
        //console.log("accepted")
        allowWidget.show();
        acceptTerm.hide();
        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: true,
            })
        );
        // calendar
        const timeArr = currentTimeHandler();
        calendar.render();
        appointmentsWidget.removeAllEvents();
        appointmentsWidget.render();
        updateCalendarBtns();
        renderStoredEvents();
        toggleAppointmentForm();
        addCurrentDate();
        previousDateDisable();
        amOrPmDecider();
        appointmentFormHandler(timeArr[0], timeArr[1]);
        appointmentSectionFormHandler(timeArr[0], timeArr[1]);
        closeModalsHandler();
    } else if (!accepted || accepted == -1) {
        //console.log("not accepted")
        allowWidget.hide();
        acceptTerm.show();

        document.dispatchEvent(
            new CustomEvent("PiiAccept", {
                detail: false,
            })
        );
    }
}

//constants js
var calendarEl = document.getElementById('calendar');
var appointmentsEl = document.getElementById('appointments-list');
var selectedEvent = null; // Store the selected event for editing or deletion
var calendar;
var appointmentsWidget;
var eventid = 0;
var searchInput = document.getElementById('searchInput');
var filteredEventsContainer = document.getElementById('filteredEventsContainer');
// All Elements of Calendar
$CALENDAR = {
    calendar_wrap: document.getElementById("calendar"),
    date_from_am: document.querySelector(".calendar_popup .date-from .am"),
    date_from_pm: document.querySelector(".calendar_popup .date-from .pm"),
    date_to_am: document.querySelector(".calendar_popup .date-to .am"),
    date_to_pm: document.querySelector(".calendar_popup .date-to .pm"),
    app_date_from_am: document.querySelector(".appointments_popup .date-from .am"),
    app_date_from_pm: document.querySelector(".appointments_popup .date-from .pm"),
    app_date_to_am: document.querySelector(".appointments_popup .date-to .am"),
    app_date_to_pm: document.querySelector(".appointments_popup .date-to .pm"),
    edit_modal: document.querySelectorAll(".fc-event-title-container"),
    add_appointment: document.getElementById("appointments-add-btn"),
    close_form_btn: document.querySelectorAll(".close-form-btn"),
  }
  
  // Add Appointment Form elements
  $APPOINTMENT = {
    date: document.querySelector(".calendar_popup #event-date"),
    event_freq_input: document.querySelector(".calendar_popup .freq-content"),
    event_freq: document.querySelector(".calendar_popup .event-freq-cont"),
    event_freq_state: 0,
    event_freq_options: document.querySelectorAll(".calendar_popup .event-freq-cont p"),
    event_freq_arrow: document.querySelector(".calendar_popup .freq-cont .arrow-icon"),
    notify_before_input: document.querySelector(".calendar_popup .notify-content"),
    notify_before: document.querySelector(".calendar_popup .event-timer-cont"),
    notify_before_state: 0,
    notify_options: document.querySelectorAll(".calendar_popup .event-timer-cont p"),
    notify_before_arrow: document.querySelector(".calendar_popup .notify-content .arrow-icon"),
    color_code_options: document.querySelectorAll(".calendar_popup .color-options div"),
    form_elm: document.querySelector(".calendar_popup .event-form-wrap"),
    go_back: document.querySelectorAll(".edit-content-block"),
    from_time: document.querySelector(".calendar_popup .date-from .from-wrap"),
    from_opt_select: document.querySelector(".calendar_popup .date-from .from-values"),
    save_changes: document.getElementById("saveChangesBtn"),
    from_opt_select_state: 0,
    from_val_select: document.querySelectorAll(".calendar_popup .from-values p"),
    from_time_arrow: document.querySelector(".calendar_popup .from-wrap .arrow-icon"),
    to_time: document.querySelector(".calendar_popup .date-to .to-wrap"),
    to_opt_select: document.querySelector(".calendar_popup .date-to .to-values"),
    to_opt_select_state: 0,
    to_val_select: document.querySelectorAll(".calendar_popup .to-values p"),
    to_time_arrow: document.querySelector(".calendar_popup .to-wrap .arrow-icon"),
    create_appoint: document.querySelector(".calendar_popup .create-appointment"),
  };

  $APPOINTMENT_MODAL_ELMS = {
    app_form_elm: document.querySelector(".appointments_popup .event-form-wrap"),
    app_date: document.querySelector(".appointments_popup #event-date"),
    app_event_freq_input: document.querySelector(".appointments_popup .freq-content"),
    app_event_freq: document.querySelector(".appointments_popup .event-freq-cont"),
    app_event_freq_state: 0,
    app_event_freq_options: document.querySelectorAll(".appointments_popup .event-freq-cont p"),
    app_event_freq_arrow: document.querySelector(".appointments_popup .freq-cont .arrow-icon"),
    app_notify_before_input: document.querySelector(".appointments_popup .notify-content"),
    app_notify_before: document.querySelector(".appointments_popup .event-timer-cont"),
    app_notify_before_state: 0,
    app_notify_options: document.querySelectorAll(".appointments_popup .event-timer-cont p"),
    app_notify_before_arrow: document.querySelector(".appointments_popup .notify-content .arrow-icon"),
    app_color_code_options: document.querySelectorAll(".appointments_popup .color-options div"),
    app_from_time: document.querySelector(".appointments_popup .date-from .from-wrap"),
    app_from_opt_select: document.querySelector(".appointments_popup .date-from .from-values"),
    app_from_opt_select_state: 0,
    app_from_val_select: document.querySelectorAll(".appointments_popup .from-values p"),
    app_from_time_arrow: document.querySelector(".appointments_popup .from-wrap .arrow-icon"),
    app_to_time: document.querySelector(".appointments_popup .date-to .to-wrap"),
    app_to_opt_select: document.querySelector(".appointments_popup .date-to .to-values"),
    app_to_opt_select_state: 0,
    app_to_val_select: document.querySelectorAll(".appointments_popup .to-values p"),
    app_to_time_arrow: document.querySelector(".appointments_popup .to-wrap .arrow-icon"),
    app_create_appoint: document.querySelector(".appointments_popup .create-appointment"),
  }

//ERROR FIELDS

function cleanValidation(fieldElements){
    return new Promise((resolve,reject)=>{
      fieldElements.forEach((ele)=>{
        if(ele.parentElement.children.length > 2 ){
          ele.parentElement.removeChild(ele.parentElement.lastChild)
        }
    })
    resolve("validation cleaned")
  })

}

function renderErrorFieldHtml(element,errorTxt){
  let parentEle= element.parentElement;
  let errorEle = document.createElement('span');
  errorEle.classList.add("error-field");
  errorEle.textContent = errorTxt;
  parentEle.appendChild(errorEle);
  parentEle.scrollIntoView()
  if($(".to-wrap .error-field") && $(".to-wrap .error-field").length >= 2){
    $(".to-wrap .error-field").hide() 
    $(".to-wrap .error-field")[0].style.display = "block" 
  }
}

function titleError(form){
  if(form === "appointment-form"){
    renderErrorFieldHtml(document.querySelector(".appointments_popup #event-title"),"Title  Required");
  }else{
    renderErrorFieldHtml(document.querySelector(".calendar_popup #event-title"),"Title Required");
  }
}

function urlError(form){
  if(form === "appointment-form"){
      renderErrorFieldHtml(document.querySelector(".appointments_popup #event-link"),"Invalid Meeting Link");
  }else{
    renderErrorFieldHtml(document.querySelector(".calendar_popup #event-link"),"Invalid Meeting Link");
  }
}
var dateErrorpresent = false;
function dateError(form){
  dateErrorpresent = true;
  if(form === "appointment-form"){
    renderErrorFieldHtml(document.querySelector(".appointments_popup #event-date"),"Choose a date from today onwards (MM/DD/YYYY)");
  }else{
    renderErrorFieldHtml(document.querySelector(".calendar_popup #event-date"),"Choose a date from today onwards (MM/DD/YYYY)");
  }

}

function fromFieldError(form){
  if(!dateErrorpresent){
   if(form === "appointment-form"){
     renderErrorFieldHtml(document.querySelector(".appointments_popup #time-from"),"Time should be greater than current time");
     }else{
     renderErrorFieldHtml(document.querySelector(".calendar_popup #time-from"),"Time should be greater than current time");
     }
  }
}
function fromFieldError3(form){
  if(form === "appointment-form"){
    renderErrorFieldHtml(document.querySelector(".appointments_popup #time-from"),"Invalid Time");
  }else{
    renderErrorFieldHtml(document.querySelector(".calendar_popup #time-from"),"Invalid Time");
  }

}

function toFieldError(form){
  if(!dateErrorpresent){
		if(form === "appointment-form"){
			renderErrorFieldHtml(document.querySelector(".appointments_popup #time-to"),"Time should be greater than current time");
		  }else{
			renderErrorFieldHtml(document.querySelector(".calendar_popup #time-to"),"Time should be greater than current time");
		  }
	}
}

function toFieldError2(form){
  if(!dateErrorpresent){
    if(form === "appointment-form"){
      renderErrorFieldHtml(document.querySelector(".appointments_popup #time-to"),"End time should be greater than Start time");
      }else{
      renderErrorFieldHtml(document.querySelector(".calendar_popup #time-to"),"End time should be greater than Start time");
      }
  }
}
function toFieldError3(form){
  if(form === "appointment-form"){
    renderErrorFieldHtml(document.querySelector(".appointments_popup #time-to"),"Invalid Time");
  }else{
    renderErrorFieldHtml(document.querySelector(".calendar_popup #time-to"),"Invalid Time");
  }
}

  //VALIDATIONS

  function titleValidation(appointmentFormObj){
    //console.log(appointmentFormObj.title,'title')
    return new Promise((resolve,reject)=>{
      if(!appointmentFormObj.title){
        reject("No Title")
      }else{
        if(appointmentFormObj.title.trim().length == 0){
          reject("No Title")
        }else{
          resolve(appointmentFormObj)
        }
      }

    })

  }
  function isDateBeforeToday(date) {
    return new Date(new Date(date).toDateString()) < new Date(new Date().toDateString());
  }
  function dateValidation(appointmentFormObj, form){
    return new Promise((resolve,reject)=>{
      if(!appointmentFormObj.date){
        reject("No Date Selected")
      }else{
        if(isDateBeforeToday(moment(appointmentFormObj.date).format("MM/DD/YYYY"))){
            reject("Choose a date from today onwards (MM/DD/YYYY)")
            dateError(form)
            //renderErrorFieldHtml(document.querySelector(".calendar_popup #event-date"),"Invalid Date");
        }else{
            resolve(appointmentFormObj)
        }
      }
    })
  }
  function isValidURL(string) {

    var res = string.match(/(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi);


      return (res !== null);

  }
  function isValidMeetingURL(url) {
    // Regular expression to validate meeting URLs
    //const urlPattern = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9.-]+)\/([a-zA-Z0-9-]+)$/;
    // console.log(urlPattern.test(url),'meetLink_test')
    // Test the URL against the pattern
    return isValidURL(url);
  }

  function urlValidation(appointmentFormObj){
    return new Promise((resolve,reject)=>{
      let meetlink = appointmentFormObj.meet_link;
      if(!meetlink) resolve('No Url Present');
      if (meetlink && isValidMeetingURL(meetlink)) resolve('Valid URL')
      else reject('Invalid URL')
    })
      
  }

  function fromFieldValidation(appointmentFormObj,formtype){
    //check if previous time selected
    return new Promise((resolve,reject)=>{
      let fromStartTime = appointmentFormObj.time_from + " " + appointmentFormObj.time_from_period;
      let fromStartDate = appointmentFormObj.date;   
      //console.log(fromStartTime,fromStartDate,'fromStart')
      let getFromUtcTimestamp = calculateUTCTimestamp(fromStartDate,fromStartTime);
      const inputtimepattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
      if(!inputtimepattern.test(appointmentFormObj.time_from)){
        fromFieldError3(formtype)
        reject('From Field')
      } else{
        if (isDateAndTimeBeforeToday(getFromUtcTimestamp)) {
            // console.log('The added date is before today\'s date.');
            reject({err:'From field',timestamp : getFromUtcTimestamp})

          }else {   
            // console.log('The added date is after today\'s date.');
            resolve(getFromUtcTimestamp)

          }
      }
     
    })
  }

  function toFieldValidation(appointmentFormObj,formtype){
    //check if previous time selected
    return new Promise((resolve,reject)=>{
      let toEndTime = appointmentFormObj.time_to + " " + appointmentFormObj.time_to_period;
      let toEndDate = appointmentFormObj.date;      
      // console.log(toEndTime,toEndDate,'toEnd')


      let getFromUtcTimestamp = calculateUTCTimestamp(toEndDate,toEndTime)
      const inputtimepattern = /^(0?[1-9]|1[0-2]):[0-5][0-9]$/;
      if(!inputtimepattern.test(appointmentFormObj.time_to)){
        toFieldError3(formtype)
        reject('From Field')
      } else{
        if (isDateAndTimeBeforeToday(getFromUtcTimestamp)) {    
            // console.log('The added date is before today\'s date.');
            reject('To Field')
          } else {
          
            // console.log('The added date is after today\'s date.');
      
            resolve(getFromUtcTimestamp)
          }
      }

      

    })
  }

  function isDateAndTimeBeforeToday(date) {
    let currentTimestamp = currentDateAndTime();
    //console.log(currentTimestamp,date,'ppp')
    return date < currentTimestamp;
  }

  function checkifToGreaterThanFrom(fromTimeStamp,toTimeStamp,formtype){
    // console.log(fromTimeStamp < toTimeStamp,"status")
      if( fromTimeStamp < toTimeStamp ){

        return false
      }else{
          toFieldError2(formtype)
          return true
      }
  }

  function currentDateAndTime(){
    const now = new Date();

    // Get the current date in 'YYYY-MM-DD' format
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Add 1 to month since it's zero-based
    const day = String(now.getDate()).padStart(2, '0');
    const currentDate = `${year}-${month}-${day}`;
  
    // Get the current time in 'h:mm AM/PM' format
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const currentTime = `${formattedHours}:${minutes} ${ampm}`;
  
    //console.log(`Date: ${currentDate}`);
    //console.log(`Time: ${currentTime}`);
    return calculateUTCTimestamp(currentDate,currentTime)
  }

  function calculateUTCTimestamp(dateString,timeString){

      const dateParts = dateString.split('-');
      const timeParts = timeString.split(':');

      // Extract components
      const year = parseInt(dateParts[0]);
      const month = parseInt(dateParts[1]) - 1; // Adjust for zero-based month index
      const day = parseInt(dateParts[2]);
      let hour = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1].split(' ')[0]);

      // Adjust for PM time
      if (timeString.includes('PM') && hour !== 12) {
        hour += 12;
      }
      // Adjust for AM time
      if (timeString.includes('AM') && hour == 12) {
        hour -= 12;
      }

      // Create the UTC timestamp
      const utcTimestamp = Date.UTC(year, month, day, hour, minutes);
      return utcTimestamp
    // const utcTimestamp = Date.UTC(
    //   parseInt(date.split('-')[0]),
    //   parseInt(date.split('-')[1]) - 1,
    //   parseInt(date.split('-')[2]),
    //   parseInt(time.split(':')[0]) + 
    //   ( 
    //     (time.includes('PM') && (parseInt(time.split(':')[0]) !== 12)) ?
    //      12 : (time.includes('PM') && (parseInt(time.split(':')[0]) === 12)) ?  
    //      0 : -12),
    //   parseInt(time.split(':')[1].split(' ')[0])
    // );
  
  }
//date js


function addCurrentDate(){
	var todayDate = new Date();
   
	var month = todayDate.getMonth() + 1;
	var day = todayDate.getDate();
	var year = todayDate.getFullYear();
	if(month < 10)
	  month = '0' + month.toString();
	if(day < 10)
	  day = '0' + day.toString();
	var maxDate = year + '-' + month + '-' + day;
	document.querySelector(".calendar_popup #event-date").value = maxDate;
	document.querySelector(".appointments_popup #event-date").value = maxDate;
  }

function amOrPmDecider(){
	const now = new Date();
  
	// Get the current time in 'h:mm AM/PM' format
	const hours = now.getHours();
	const ampm = hours >= 12 ? 'PM' : 'AM';
	
	let AmPmWrap = document.querySelectorAll('.time-btns');
	// console.log(ampm,hours,'DAY');
	// console.log(AmPmWrap,'Wrap')
	ampm === 'AM' ? 
	AmPmWrap.forEach(ele=>{
	  ele.firstElementChild.classList.add("selected-btn")
	//   console.log(ele.firstElementChild,'Element1')
	}) : 
	AmPmWrap.forEach(ele=>{
  
	  ele.lastElementChild.classList.add("selected-btn")
	//   console.log(ele.lastElementChild,'Element2')
	})
	
  }
  
function updateCurrentDateTime2() {
	var date = getCurrentTime();
	$('#custtime').html(date.value + ' ' + date.unit);
	$('#custdate').html(customDate2(new Date()));
	$('.currenttime .sep').css('display', 'inline-block');
}

function getCurrentTime(val) {
	var date = val || new Date();
	var format = {
		value: '',
		unit: '',
	};
	var tempDate = changeTimeFormatTo12Hr(date);
	format.value = tempDate.hours + ':' + tempDate.minutes;
	format.unit = tempDate.unit;
	format.hours = tempDate.hours;
	format.minutes = tempDate.minutes;
	return format;
}

function changeTimeFormatTo12Hr(date) {
	var hours = date.getHours(),
		minutes =
			date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	var unit = getMeridianFromHour(hours);
	hours = hours % 12;
	hours = hours == 0 ? 12 : hours;

	return {
		hours: hours,
		minutes: minutes,
		unit: unit,
	};
}

function getMeridianFromHour(hour) {
	hour = hour % 24;
	return hour < 12 ? 'am' : 'pm';
}

function customDate2(date) {
	var monthNames = [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		wekdayName = [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		];
	return (
		wekdayName[date.getDay() + 0] +
		', ' +
		monthNames[date.getMonth() + 0] +
		' ' +
		date.getDate()
	);
}

// Calendar helper
function saveEventsToLocalStorage(events) {
    storageReplacer.setLocalStorageItem('calenderEvents', JSON.stringify(events));
    // sendReminderData('set', events);
}

function removeFromLocalStorage(notificationIdentifier) {
    let storedEvents = getEventsFromLocalStorage();
    const tempEventList = storedEvents;
    const delObjIdentifier = tempEventList.findIndex(
        (event) => event.NotificationIdentifier === notificationIdentifier
    );
    storedEvents = storedEvents.filter(function (event) {
        return event.NotificationIdentifier !== notificationIdentifier;
    });
    saveEventsToLocalStorage(storedEvents);
    sendReminderData('delete', tempEventList[delObjIdentifier]);
}

function getEventsFromLocalStorage() {
    var storedEvents = storageReplacer.getLocalStorageItem('calenderEvents');
    return storedEvents ? JSON.parse(storedEvents) : [];
}

function renderStoredEvents() {
    var storedEvents = getEventsFromLocalStorage();
    calendar.addEventSource(storedEvents);
    fetch('https://calendarplanner.co/calendar/json/holidayList.json')
        .then(response => response.json())
        .then(data => {
            //console.log(data.push(storedEvents))
            calendar.addEventSource(data)
        })
        .catch(error => {
            //console.error('Error loading holiday events:', error);
            callback([]); // Fallback to an empty array in case of an error
        });

    appointmentsWidget.addEventSource(storedEvents);
}

function searchEvents(keyword) {
    var events = calendar.getEvents();
    var filteredEvents = events.filter(function (event) {
        return (
            event.title.toLowerCase().includes(keyword.toLowerCase()) ||
            event.description.toLowerCase().includes(keyword.toLowerCase())
        );
    });

    // Clear existing events on the calendar and render filtered events
    calendar.removeAllEvents();
    calendar.addEventSource(filteredEvents);
}

function filterEvents(keyword) {
    var events = calendar.getEvents();
    var filteredEvents = events.filter(function (event) {
        return (
            event.title.toLowerCase().includes(keyword)
        );
    });
    return filteredEvents;
}

function displayFilteredEvents(events) {
    // Group events by date
    var eventsByDate = {};

    events.forEach(function(event) {
        //var dateKey = event.start.toLocaleDateString();
        var dateKey = moment(event.start).format('YYYY-MM-DD');
		//console.log(event.start)
		//console.log(event.start.toLocaleDateString())
        if (!eventsByDate[dateKey]) {
            eventsByDate[dateKey] = [];
        }
        eventsByDate[dateKey].push(event);
    });
	
   
    var html = '';
    for (var date in eventsByDate) {
		//console.log(date)
        html += `<h3>${moment(new Date(date)).format("Do MMM 'YY, dddd")}</h3>`;
        eventsByDate[date].forEach(function(event) {
            html += `
                <div class="appointments" data-start="${event.start}">
                    <span class="appointment-title">${event.title}</span>
                    <span class="appointment-time">${event.extendedProps.eventStartTime ? event.extendedProps.eventStartTime +'-'+ event.extendedProps.eventEndTime : 'All Day'} </span>
                </div>
            `;
        });
        
    }

    
    $('.seach-results-wrap').show();
    
	if(events.length == 0){
		html += `<h3>No results found</h3>`;
	}
    $("#filteredEventsContainer").empty()
    $("#filteredEventsContainer").append(html)
  
	document.querySelector(".seach-results-wrap").scrollTop = 0; 
    let appelements = document.querySelectorAll('.appointments');
    appelements.forEach((item) => {
        item.addEventListener('click', function(e){
            // Switch to the day view using the clicked events start date
            calendar.changeView('timeGridDay', new Date(e.currentTarget.getAttribute("data-start"))); 
            $('.seach-results-wrap').hide();
            searchInput.value = ''; // Clear the search input
        });
    });
}
function getEventIdfromlocal() {
    var storedev = getEventsFromLocalStorage();
    var neweventid = 0;
    if (storedev.length != 0) {
        //console.log("in")

        neweventid = Math.max.apply(Math, storedev.map(function (o) {
            //console.log("neweventId", neweventid);
            return o.eventid;
        })) + 1
    } else {
        //console.log("out")
        neweventid = 1
    }
    //console.log("neweventId", neweventid);
    return neweventid
}
function getTimeDifference(startTime, endTime) {
	const difference = endTime - startTime;
	const differenceInMinutes = difference / 1000 / 60;
	let hours = Math.floor(differenceInMinutes / 60);
	if (hours < 0) {
	  hours = 24 + hours;
	}
	let minutes = Math.floor(differenceInMinutes % 60);
	if (minutes < 0) {
	  minutes = 60 + minutes;
	}
	const hoursAndMinutes = hours + ":" + (minutes < 10 ? '0' : '') + minutes;
	return hoursAndMinutes;
}
function saveEvents(eventsObj) {
    //console.log('UI::', eventsObj);
    var eventStartTime = convertTime12to24(eventsObj.time_from + ' ' + eventsObj.time_from_period);
    var eventEndTime = convertTime12to24(eventsObj.time_to + ' ' + eventsObj.time_to_period);
    var eventFrequency = eventsObj.event_freq;
    eventid = getEventIdfromlocal();
    //console.log("eventId", eventid);
    var eventObject = {
        eventid: eventid,
		title: eventsObj.title,
		start: eventsObj.date + 'T' + eventStartTime,
		end: eventsObj.date + 'T' + eventEndTime,
		description: eventsObj.description,
		event_url: eventsObj.meet_link,
		color: eventsObj.color_code,
		notify:eventsObj.notify_before,
		frequency:eventsObj.event_freq,
		backgroundColor:eventsObj.color_code,
		eventColor:eventsObj.color_code,
		className:eventsObj.color_code,
		eventOrder:'title,start,end',
		eventOrderStrict: 'true',
		eventStartTime:eventsObj.time_from + ' ' +eventsObj.time_from_period,
		eventEndTime:eventsObj.time_to + ' ' +eventsObj.time_to_period,
		duration: getTimeDifference(new Date(eventsObj.date + 'T' + eventStartTime), new Date(eventsObj.date + 'T' + eventEndTime)),
    };
    //console.log(eventObject)
    if (eventFrequency === 'Daily') {
		/* eventObject.startRecur = eventsObj.date + 'T' + eventStartTime;
		eventObject.recurring = true;
		eventObject.dow = [0, 1, 2, 3, 4, 5, 6]; // All days
		eventObject.startTime = eventStartTime;
		eventObject.endTime = eventEndTime; */
		var rruleString = {
			freq: 'daily',
			dtstart: new Date(eventsObj.date + 'T' + eventStartTime),
		};
		eventObject.rrule = rruleString;
		
	} else if (eventFrequency === 'Weekly') {
		var daysOfWeek = []; // Add specific days here, e.g., [0, 2] for Sunday and Tuesday

		// Create an rrule string for the selected days of the week
		var rruleString = {
			freq: 'weekly',
			dtstart: new Date(eventsObj.date + 'T' + eventStartTime)
		};
		eventObject.rrule = rruleString;

	}else if (eventFrequency === 'Monthly') {
		// Add logic for monthly recurring events
		var startDate = new Date(eventsObj.date + 'T' + eventStartTime);
		var endDate = new Date(eventsObj.date + 'T' + eventEndTime);

		var dayOfMonth = startDate.getDate(); // Day of the month

		var rruleString = {
			freq: 'monthly',
			dtstart: startDate,
			bymonthday: dayOfMonth
		};
		eventObject.rrule = rruleString;
	}

    eventObject.timestampbefore5min = "";
    const dateTime = new Date(eventObject.start);
    if (eventObject.notify === '5 Minutes')
        eventObject.timestampbefore5min = new Date(dateTime.getTime() - 5 * 60 * 1000).getTime();
    else if (eventObject.notify === '10 Minutes')
        eventObject.timestampbefore5min = new Date(dateTime.getTime() - 10 * 60 * 1000).getTime();
    else if (eventObject.notify === '15 Minutes')
        eventObject.timestampbefore5min = new Date(dateTime.getTime() - 15 * 60 * 1000).getTime();
    else if (eventObject.notify === '30 Minutes')
        eventObject.timestampbefore5min = new Date(dateTime.getTime() - 30 * 60 * 1000).getTime();
    eventObject.NotificationIdentifier = setNotificationIdentifier(eventObject.notify);

    let events = getEventsFromLocalStorage();
    events.push(eventObject);
    // Save events to local storage
    saveEventsToLocalStorage(events);
    sendReminderData('set', eventObject);
    // Render the stored events on the calendar
    calendar.removeAllEvents();
    appointmentsWidget.removeAllEvents();
    renderStoredEvents();

    // Hide the event form


    // Clear input fields

}

function deleteEvents(selectedEvent) {
    if (selectedEvent) {

        selectedEvent.remove(); // Remove the event from the calendar
        removeFromLocalStorage(selectedEvent.extendedProps.NotificationIdentifier); // Remove from local storage
        calendar.removeAllEvents();
        appointmentsWidget.removeAllEvents();
        renderStoredEvents();
    }
}

function deleteSingleEvents(selectedEvent){
	selectedEvent.setExtendedProp('exdate', selectedEvent.start.toISOString())
	//selectedEvent.setProp('exdate', selectedEvent.start.toISOString())
	var storedEvents = getEventsFromLocalStorage();
	// Find the index of the event with eventid 5
	var index = storedEvents.findIndex(function(event) {
		return event.eventid === selectedEvent.extendedProps.eventid;
	});

	// Check if the event with eventid 5 was found
	if (index !== -1) {
		// Add the exdate key with the value 1 to the event
		if (!storedEvents[index].exdate) {
			storedEvents[index].exdate = [];
		}

		storedEvents[index].exdate.push(selectedEvent.start.toISOString());
		
		//storedEvents[index].exdate = selectedEvent.start.toISOString();
	}

	
	saveEventsToLocalStorage(storedEvents);
	// Render the stored events on the calendar
	calendar.removeAllEvents();
	appointmentsWidget.removeAllEvents();
	renderStoredEvents();
	
}

function convertTime12to24(time12h) {
    const [time, modifier] = time12h.split(' ');

    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = parseInt(hours, 10) + 12;
    }

    return `${hours}:${minutes}`;
}
function areObjectsEqual(objA, objB) {
	// Check if both objects have the same number of properties
	const keysA = Object.keys(objA);
	const keysB = Object.keys(objB);
  
	if (keysA.length !== keysB.length) {
	  return false;
	}
  
	// Check if all properties and their values are the same
	for (const key of keysA) {
	  if (objA[key] !== objB[key]) {
		return false;
	  }
	}
  
	// If no differences were found, return true
	return true;
}
function openEditEventPopup(data){
	//console.log("filled data",data)
	let appointmentFormObjprefilled = {
		title: data.title,
		description: data.extendedProps.description,
		date: moment(data.start).format("YYYY-MM-DD"),
		time_from: data.extendedProps.eventStartTime.split(" ")[0],
		time_from_period: data.extendedProps.eventStartTime.split(" ")[1],
		time_to: data.extendedProps.eventEndTime.split(" ")[0],
		time_to_period: data.extendedProps.eventEndTime.split(" ")[1],
		event_freq: data.extendedProps.frequency,
		notify_before: data.extendedProps.notify,
		meet_link: data.extendedProps.event_url,
		color_code: data.extendedProps.eventColor
	}
	//console.log(appointmentFormObjprefilled)
	document.querySelector(".calendar_popup #event-title").value = data.title;
	document.querySelector(".calendar_popup #event-desc").value = data.extendedProps.description;
	document.querySelector(".calendar_popup #event-link").value = data.extendedProps.event_url;
	document.querySelector(".calendar_popup #time-from").value = data.extendedProps.eventStartTime.split(" ")[0];
	document.querySelector(".calendar_popup #time-to").value = data.extendedProps.eventEndTime.split(" ")[0];
	document.querySelector(".calendar_popup .event-freq").value = data.extendedProps.frequency;
	document.querySelector(".calendar_popup .event-notify").value = data.extendedProps.notify;
	$(".calendar_popup .color-options div").removeClass("selected-color");
	$(".calendar_popup [data-value='"+data.extendedProps.eventColor+"']").addClass("selected-color");
	$(".calendar_popup .date-from .time-btns div").removeClass("selected-btn");
	$(".calendar_popup .date-to .time-btns div").removeClass("selected-btn");
	$(".calendar_popup .date-from .time-btns div."+data.extendedProps.eventStartTime.split(" ")[1].toLowerCase()).addClass("selected-btn");
	$(".calendar_popup .date-to .time-btns div."+data.extendedProps.eventEndTime.split(" ")[1].toLowerCase()).addClass("selected-btn");
	document.querySelector(".calendar_popup #event-date").value = moment(data.start).format("YYYY-MM-DD");
	var saveEventButton = document.querySelector(".calendar_popup #saveChangesBtn");
	saveEventButton.addEventListener('click', function() {
		let appointmentFormObj = {
            title: document.querySelector(".calendar_popup #event-title").value,
            description: document.querySelector(".calendar_popup #event-desc").value,
            date: document.querySelector(".calendar_popup #event-date").value,
            time_from: document.querySelector(".calendar_popup #time-from").value,
            time_from_period: document.querySelector(".calendar_popup .date-from .selected-btn").innerText,
            time_to: document.querySelector(".calendar_popup #time-to").value,
            time_to_period: document.querySelector(".calendar_popup .date-to .selected-btn").innerText,
            event_freq: document.querySelector(".calendar_popup .event-freq").value,
            notify_before: document.querySelector(".calendar_popup .event-notify").value,
            meet_link: document.querySelector(".calendar_popup #event-link").value,
            color_code: document.querySelector(".calendar_popup .selected-color").getAttribute("data-value")
        }
		//console.log(areObjectsEqual(appointmentFormObjprefilled, appointmentFormObj));
		if(areObjectsEqual(appointmentFormObjprefilled, appointmentFormObj)){
			/* clearFormFields(false)
			$(".calendar_popup .event-form-wrap").removeClass("popupVisible");
			$APPOINTMENT.form_elm.classList.remove("edit-form");
			console.log("no changesssssssssss")
			cleanValidation([
				document.querySelector(".calendar_popup #event-title"),
				document.querySelector(".calendar_popup #event-link"),
				document.querySelector(".calendar_popup #time-from"),
				document.querySelector(".calendar_popup #time-to"),
				document.querySelector(".calendar_popup #event-date")
			])	 */
		}else{
			
			  
		}
		
		
		//console.log("yes changesssssssssss")
    dateErrorpresent = false
			Promise.allSettled([
				cleanValidation([
					document.querySelector(".calendar_popup #event-title"),
					document.querySelector(".calendar_popup #event-link"),
					document.querySelector(".calendar_popup #time-from"),
					document.querySelector(".calendar_popup #time-to"),
					document.querySelector(".calendar_popup #event-date")
				]),
				titleValidation(appointmentFormObj),
				urlValidation(appointmentFormObj),
				dateValidation(appointmentFormObj,"calendar-form"),
				fromFieldValidation(appointmentFormObj,"calendar-form"),
				toFieldValidation(appointmentFormObj,"calendar-form")
			  ])
			  .then((res)=>{
	
				let titleFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason === "No Title");
				let urlValidation = res.filter((ele)=> ele.status=="rejected" && ele.reason === "Invalid URL");
				let dateValidation = res.filter((ele)=> ele.status=="rejected" && ele.reason === "No Date Selected");
				let fromFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason.err === "From field");
				let toFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason === "To Field");
	  
				// console.log(titleFieldStatus.length,fromFieldStatus.length,toFieldStatus.length)
				titleFieldStatus.length &&  titleError("calendar-form"); 
				urlValidation.length && urlError("calendar-form");
				dateValidation.length && dateError("calendar-form")
				fromFieldStatus.length && fromFieldError("calendar-form");
				toFieldStatus.length && toFieldError("calendar-form");
	  
				if(!toFieldStatus.length && fromFieldStatus.length && (!checkifToGreaterThanFrom(res[4].reason.timestamp,res[5].value,"calendar-form")))  throw new Error(" Error in  from field");
	  
				if(!toFieldStatus.length && (checkifToGreaterThanFrom(res[4].value,res[5].value,"calendar-form"))) throw new Error("Greater than from field")
				
				if(fromFieldStatus.length || toFieldStatus.length || titleFieldStatus.length || dateValidation.length || urlValidation.length) throw new Error("Before Date OR InValid URL OR title Error");
				return true
			  })
			  .then((res)=>{
				  //console.log("edited data",data)
				  updateEvent(data);
			  })
			  .catch((err)=>{
				  //console.log(err,'error')
			  });
			  try {
				document.querySelector(".edit-form .event-details-cont").scrollTo(0,0);
			  }
			  catch(err) {
				
			  }

	
		//editEventPopup.style.display = 'none';
	});

}

function openEditEventPopupAppointments(data){
	//console.log(data,'data')
	let appointmentFormObjprefilled = {
		title: data.title,
		description: data.extendedProps.description,
		date: moment(data.start).format("YYYY-MM-DD"),
		time_from: data.extendedProps.eventStartTime.split(" ")[0],
		time_from_period: data.extendedProps.eventStartTime.split(" ")[1],
		time_to: data.extendedProps.eventEndTime.split(" ")[0],
		time_to_period: data.extendedProps.eventEndTime.split(" ")[1],
		event_freq: data.extendedProps.frequency,
		notify_before: data.extendedProps.notify,
		meet_link: data.extendedProps.event_url,
		color_code: data.extendedProps.eventColor
	}
	document.querySelector(".appointments_popup #event-title").value = data.title;
	document.querySelector(".appointments_popup #event-desc").value = data.extendedProps.description;
	document.querySelector(".appointments_popup #event-link").value = data.extendedProps.event_url;
	document.querySelector(".appointments_popup #time-from").value = data.extendedProps.eventStartTime.split(" ")[0];
	document.querySelector(".appointments_popup #time-to").value = data.extendedProps.eventEndTime.split(" ")[0];
	document.querySelector(".appointments_popup .event-freq").value = data.extendedProps.frequency;
	document.querySelector(".appointments_popup .event-notify").value = data.extendedProps.notify;
	$(".appointments_popup .color-options div").removeClass("selected-color");
	$(".appointments_popup [data-value='"+data.extendedProps.eventColor+"']").addClass("selected-color");
	$(".appointments_popup .date-from .time-btns div").removeClass("selected-btn");
	$(".appointments_popup .date-to .time-btns div").removeClass("selected-btn");
	$(".appointments_popup .date-from .time-btns div."+data.extendedProps.eventStartTime.split(" ")[1].toLowerCase()).addClass("selected-btn");
	$(".appointments_popup .date-to .time-btns div."+data.extendedProps.eventEndTime.split(" ")[1].toLowerCase()).addClass("selected-btn");
	document.querySelector(".appointments_popup #event-date").value = moment(data.start).format("YYYY-MM-DD");
	var saveEventButtonApp = document.querySelector(".appointments_popup #saveChangesBtn");
	saveEventButtonApp.addEventListener('click', function() {
		let appointmentFormObj = {
			title: document.querySelector(".appointments_popup #event-title").value,
			description: document.querySelector(".appointments_popup #event-desc").value,
			date: document.querySelector(".appointments_popup #event-date").value,
			time_from: document.querySelector(".appointments_popup #time-from").value,
			time_from_period: document.querySelector(".appointments_popup .date-from .selected-btn").innerText,
			time_to: document.querySelector(".appointments_popup #time-to").value,
			time_to_period: document.querySelector(".appointments_popup .date-to .selected-btn").innerText,
			event_freq: document.querySelector(".appointments_popup .event-freq").value,
			notify_before: document.querySelector(".appointments_popup .event-notify").value,
			meet_link: document.querySelector(".appointments_popup #event-link").value,
			color_code: document.querySelector(".appointments_popup .selected-color").getAttribute("data-value")
		}
		if(areObjectsEqual(appointmentFormObjprefilled, appointmentFormObj)){
			/* clearFormFields(true)
			$(".appointments_popup .event-form-wrap").removeClass("popupVisible");
			$APPOINTMENT.form_elm.classList.remove("edit-form");
			console.log("no changesssssssssss")
			cleanValidation([
				document.querySelector(".appointments_popup #event-title"),
				document.querySelector(".appointments_popup #event-link"),
				document.querySelector(".appointments_popup #time-from"),
				document.querySelector(".appointments_popup #time-to"),
				document.querySelector(".appointments_popup #event-date")
			]) */
		}else{
			
			  //document.querySelector(".edit-form .event-details-cont").scrollTo(0,0);
		}
    dateErrorpresent = false
		Promise.allSettled([
            cleanValidation([
              document.querySelector(".appointments_popup #event-title"),
              document.querySelector(".appointments_popup #event-link"),
              document.querySelector(".appointments_popup #time-from"),
              document.querySelector(".appointments_popup #time-to"),
              document.querySelector(".appointments_popup #event-date")
            ]),
            titleValidation(appointmentFormObj),
            urlValidation(appointmentFormObj),
            dateValidation(appointmentFormObj,"appointment-form"),
            fromFieldValidation(appointmentFormObj,"appointment-form"),
            toFieldValidation(appointmentFormObj,"appointment-form")
          ])
          .then((res)=>{
            let titleFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason === "No Title");
            let urlValidation = res.filter((ele)=> ele.status=="rejected" && ele.reason === "Invalid URL");
            let dateValidation = res.filter((ele)=> ele.status=="rejected" && ele.reason === "Choose a date from today onwards (MM/DD/YYYY)");
            let fromFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason.err === "From field");
            let toFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason === "To Field");
  
            // console.log(titleFieldStatus.length,fromFieldStatus.length,toFieldStatus.length)
            titleFieldStatus.length &&  titleError("appointment-form"); 
            urlValidation.length && urlError("appointment-form");
            dateValidation.length && dateError("appointment-form")
            fromFieldStatus.length && fromFieldError("appointment-form");
            toFieldStatus.length && toFieldError("appointment-form");
  
            if(!toFieldStatus.length && fromFieldStatus.length && (!checkifToGreaterThanFrom(res[4].reason.timestamp,res[5].value,"appointment-form")))  throw new Error(" Error in  from field");
  
            if(!toFieldStatus.length && (checkifToGreaterThanFrom(res[4].value,res[5].value,"appointment-form"))) throw new Error("Greater than from field")
            
            if(fromFieldStatus.length || toFieldStatus.length || titleFieldStatus.length || dateValidation.length || urlValidation.length) throw new Error("Before Date OR InValid URL OR title Error");
            return true
          })
          .then((res)=>{
              updateEventAppoitments(data);
          })
          .catch((err)=>{
              //console.log(err,'error')
          });
          try {
            document.querySelector(".edit-form .event-details-cont").scrollTo(0,0);
          }
          catch(err) {
            
          }


		// updateEventAppoitments(data);

		//editEventPopup.style.display = 'none';
	});

}

function updateEvent(event) {
	//console.log(event)
	var eventdate = document.querySelector(".calendar_popup #event-date").value;
	var starttime = document.querySelector(".calendar_popup #time-from").value;
	var starttimeaMPM = document.querySelector(".calendar_popup .date-from .selected-btn").innerText;
	var endtimeaMPM = document.querySelector(".calendar_popup .date-to .selected-btn").innerText;
	var endtime = document.querySelector(".calendar_popup #time-to").value;
	var startstring = eventdate + 'T' +convertTime12to24(starttime  + ' ' +starttimeaMPM);
	var endstring = eventdate + 'T' +convertTime12to24(endtime  + ' ' +endtimeaMPM);
	event.setProp('title', document.querySelector(".calendar_popup #event-title").value);
	//console.log(startstring, endstring)
	event.setDates( startstring, endstring)
	//event.setProp('end', eventdate + 'T' +convertTime12to24(endtime  + ' ' +endtimeaMPM));
	event.setExtendedProp('eventStartTime', starttime  + ' ' +starttimeaMPM);
	event.setExtendedProp('eventEndTime', endtime  + ' ' +endtimeaMPM);
	event.setExtendedProp('duration',getTimeDifference(new Date(startstring), new Date(endstring)));
	event.setExtendedProp('description', document.querySelector(".calendar_popup #event-desc").value);
	event.setExtendedProp('event_url', document.querySelector(".calendar_popup #event-link").value);
	event.setExtendedProp('notify', document.querySelector(".calendar_popup .event-notify").value);
	event.setExtendedProp('frequency', document.querySelector(".calendar_popup .event-freq").value);
	//event.setExtendedProp('frequency', document.querySelector(".calendar_popup .event-freq").value);
	event.setExtendedProp('backgroundColor',  document.querySelector(".calendar_popup .selected-color").getAttribute("data-value"));
	event.setExtendedProp('color',  document.querySelector(".calendar_popup .selected-color").getAttribute("data-value"));
	event.setExtendedProp('className',  document.querySelector(".calendar_popup .selected-color").getAttribute("data-value"));
	event.setExtendedProp('eventColor',  document.querySelector(".calendar_popup .selected-color").getAttribute("data-value"));
	
	
	// Update the event in local storage
	updateEventInLocalStorage(event);
	$APPOINTMENT.form_elm.classList.remove("popupVisible");
    $APPOINTMENT.form_elm.classList.remove("edit-form");
  
}

function updateEventAppoitments(event) {

	var eventdate = document.querySelector(".appointments_popup #event-date").value;
	var starttime = document.querySelector(".appointments_popup #time-from").value;
	var starttimeaMPM = document.querySelector(".appointments_popup .date-from .selected-btn").innerText;
	var endtimeaMPM = document.querySelector(".appointments_popup .date-to .selected-btn").innerText;
	var endtime = document.querySelector(".appointments_popup #time-to").value;
	var startstring = eventdate + 'T' +convertTime12to24(starttime  + ' ' +starttimeaMPM);
	var endstring = eventdate + 'T' +convertTime12to24(endtime  + ' ' +endtimeaMPM);
	event.setProp('title', document.querySelector(".appointments_popup #event-title").value);
	event.setDates( startstring, endstring)
	//event.setProp('start', eventdate + 'T' +convertTime12to24(starttime  + ' ' +starttimeaMPM));
	//event.setProp('end', eventdate + 'T' +convertTime12to24(endtime  + ' ' +endtimeaMPM));
	event.setExtendedProp('eventStartTime', starttime  + ' ' +starttimeaMPM);
	event.setExtendedProp('eventEndTime', endtime  + ' ' +endtimeaMPM);
	event.setExtendedProp('duration',getTimeDifference(new Date(startstring), new Date(endstring)));
	event.setExtendedProp('description', document.querySelector(".appointments_popup #event-desc").value);
	event.setExtendedProp('event_url', document.querySelector(".appointments_popup #event-link").value);
	event.setExtendedProp('notify', document.querySelector(".appointments_popup .event-notify").value);
	//event.setProp('frequency', document.querySelector(".appointments_popup .event-freq").value);
	event.setExtendedProp('frequency', document.querySelector(".appointments_popup .event-freq").value);
	event.setExtendedProp('backgroundColor',  document.querySelector(".appointments_popup .selected-color").getAttribute("data-value"));
	event.setExtendedProp('color',  document.querySelector(".appointments_popup .selected-color").getAttribute("data-value"));
	event.setExtendedProp('className',  document.querySelector(".appointments_popup .selected-color").getAttribute("data-value"));
	event.setExtendedProp('eventColor',  document.querySelector(".appointments_popup .selected-color").getAttribute("data-value"));
	
	// Update the event in local storage
	updateEventInLocalStorage(event);
	$APPOINTMENT_MODAL_ELMS.app_form_elm.classList.remove("popupVisible");
    $APPOINTMENT_MODAL_ELMS.app_form_elm.classList.remove("edit-form");
  
}


// Fetch Current time & 15-min after time for form fields

function currentTimeHandler() {
	var aaj = new Date();
  
	const currentTime = aaj;
   
  
	// Round the current time to the nearest quarter-hour increment
	currentTime.setMinutes(Math.ceil(currentTime.getMinutes() / 30) * 30);
  
	const options = { hour: '2-digit', minute: '2-digit', hour12: true };
	const currentTimeString = currentTime.toLocaleTimeString([], options).split(" ")[0];
   const futureTime = new Date(currentTime.getTime() + 15 * 60000);
	const futureTimeString = futureTime.toLocaleTimeString([], options).split(" ")[0];
  
	return [currentTimeString, futureTimeString];
} 
// Reset Form to default Values when popup closes
function clearFormFields(isAppointment){
	const timeArr = currentTimeHandler();
	if(isAppointment){
		document.querySelector(".appointments_popup #event-title").value = '';
		document.querySelector(".appointments_popup #event-desc").value = '';
		// document.querySelector(".appointments_popup #event-date").value = '';
		document.querySelector(".appointments_popup #time-from").value = timeArr[0];

		// if(document.querySelector(".appointments_popup .date-from .pm").classList.contains("selected-btn")){
		// 	document.querySelector(".appointments_popup .date-from .pm").classList.remove("selected-btn");
		// }

		// document.querySelector(".appointments_popup .date-from .am").classList.add("selected-btn");
		$(".appointments_popup .date-from .time-btns div").removeClass("selected-btn");
		$(".appointments_popup .date-to .time-btns div").removeClass("selected-btn");
		document.querySelector(".appointments_popup #time-to").value = timeArr[1];
		addCurrentDate()
		amOrPmDecider()
		// if(document.querySelector(".appointments_popup .date-to .pm").classList.contains("selected-btn")){
		// 	document.querySelector(".appointments_popup .date-to .pm").classList.remove("selected-btn");
		// }

		// document.querySelector(".appointments_popup .date-to .am").classList.add("selected-btn");
		document.querySelector(".appointments_popup .event-freq").value = 'Once';
		document.querySelector(".appointments_popup .event-notify").value = '5 Minutes';
		document.querySelector(".appointments_popup #event-link").value = '';

		document.querySelector(".appointments_popup .selected-color").classList.remove("selected-color");
		document.querySelector(".appointments_popup .deafult").classList.add("selected-color");
		document.querySelector(".appointments_popup .event-details-cont").scrollTop = 0;
		$(".appointments_popup .error-field").remove() 
	}else{
		//console.log("clear 1");
		document.querySelector(".calendar_popup #event-title").value = '';
		document.querySelector(".calendar_popup #event-desc").value = '';
		// document.querySelector(".calendar_popup #event-date").value = '';
		$(".calendar_popup .date-from .time-btns div").removeClass("selected-btn");
		$(".calendar_popup .date-to .time-btns div").removeClass("selected-btn");
		document.querySelector(".calendar_popup #time-from").value = timeArr[0];
		addCurrentDate();
		amOrPmDecider();
		// if(document.querySelector(".calendar_popup .date-from .pm").classList.contains("selected-btn")){
		// 	document.querySelector(".calendar_popup .date-from .pm").classList.remove("selected-btn");
		// }

		// document.querySelector(".calendar_popup .date-from .am").classList.add("selected-btn");
		document.querySelector(".calendar_popup #time-to").value = timeArr[1];

		// if(document.querySelector(".calendar_popup .date-to .pm").classList.contains("selected-btn")){
		// 	document.querySelector(".calendar_popup .date-to .pm").classList.remove("selected-btn");
		// }

		// document.querySelector(".calendar_popup .date-to .am").classList.add("selected-btn");
		document.querySelector(".calendar_popup .event-freq").value = 'Once';
		document.querySelector(".calendar_popup .event-notify").value = '5 Minutes';
		document.querySelector(".calendar_popup #event-link").value = '';

		document.querySelector(".calendar_popup .selected-color").classList.remove("selected-color");
		document.querySelector(".calendar_popup .deafult").classList.add("selected-color");
		document.querySelector(".calendar_popup .event-details-cont").scrollTop = 0;
		$(".calendar_popup .error-field").remove() 
	}	
}

function updateEventInLocalStorage(updatedEvent) {
    var storedEvents = getEventsFromLocalStorage();
    // var tempStoreEvents = storedEvents;
    // var editObjIndex = tempStoreEvents.findIndex(
    //     (obj) => obj.timestamp == timestampedit
    // );
    const tempStoreEvents = storedEvents;
    const editObjIndex = tempStoreEvents.findIndex(
        (event) => event.NotificationIdentifier === updatedEvent.extendedProps.NotificationIdentifier
    );
    var updatedEvents = storedEvents.map(function (event) {
        if (event.NotificationIdentifier === updatedEvent.extendedProps.NotificationIdentifier) {
            event.title = updatedEvent.title;
			event.description = updatedEvent.extendedProps.description;
			event.start = updatedEvent.start;
			event.end = updatedEvent.end;
			event.event_url = updatedEvent.extendedProps.event_url;
			event.color = updatedEvent.extendedProps.color;
			event.backgroundColor = updatedEvent.extendedProps.backgroundColor;
			event.eventColor = updatedEvent.extendedProps.eventColor;
			event.className = updatedEvent.extendedProps.className;
			event.notify = updatedEvent.extendedProps.notify;
			event.frequency = updatedEvent.extendedProps.frequency;
			event.eventStartTime = updatedEvent.extendedProps.eventStartTime;
			event.eventEndTime = updatedEvent.extendedProps.eventEndTime;
			event.duration = getTimeDifference(new Date(updatedEvent.start), new Date(updatedEvent.end));
            if (updatedEvent.extendedProps.frequency === 'Daily') {
                var rruleString = {
					freq: 'daily',
					//dtstart: new Date(event.rrule.dtstart)
					dtstart: new Date(updatedEvent.start)
				};
				event.rrule = rruleString;
            } else if (updatedEvent.extendedProps.frequency === 'Weekly') {
                var daysOfWeek = []; // Add specific days here, e.g., [0, 2] for Sunday and Tuesday

                // Create an rrule string for the selected days of the week
                var rruleString = {
					freq: 'weekly',
					dtstart: new Date(updatedEvent.start)
				};
				event.rrule = rruleString;
				event.startRecur ? delete event.startRecur : '';
				event.recurring ? delete event.recurring : '';
				event.dow ? delete event.dow : '';
				event.startTime ? delete event.startTime : '';
				event.endTime ? delete event.endTime : '';

            } else if (updatedEvent.extendedProps.frequency === 'Monthly') {
                // Add logic for monthly recurring events
                var startDate = new Date(updatedEvent.start);
				var endDate = new Date(updatedEvent.end);
		
				var dayOfMonth = startDate.getDate(); // Day of the month
		
				var rruleString = {
					freq: 'monthly',
					dtstart: startDate,
					bymonthday: dayOfMonth
				};
				event.rrule = rruleString;
				event.startRecur ? delete event.startRecur : '';
				event.recurring ? delete event.recurring : '';
				event.dow ? delete event.dow : '';
				event.startTime ? delete event.startTime : '';
				event.endTime ? delete event.endTime : '';
            } else {
                event.startRecur ? delete event.startRecur : '';
				event.recurring ? delete event.recurring : '';
				event.dow ? delete event.dow : '';
				event.startTime ? delete event.startTime : '';
				event.endTime ? delete event.endTime : '';
				event.rrule ? delete event.rrule : '';
            }
        }
        event.timestampbefore5min = "";
        const dateTime = new Date(event.start);
        if (event.notify === '5 Minutes')
            event.timestampbefore5min = new Date(dateTime.getTime() - 5 * 60 * 1000).getTime();
        else if (event.notify === '10 Minutes')
            event.timestampbefore5min = new Date(dateTime.getTime() - 10 * 60 * 1000).getTime();
        else if (event.notify === '15 Minutes')
            event.timestampbefore5min = new Date(dateTime.getTime() - 15 * 60 * 1000).getTime();
        else if (event.notify === '30 Minutes')
            event.timestampbefore5min = new Date(dateTime.getTime() - 30 * 60 * 1000).getTime();
        return event;
    });
    saveEventsToLocalStorage(updatedEvents);
    sendReminderData('edit', tempStoreEvents[editObjIndex]);
    // Render the stored events on the calendar
    calendar.removeAllEvents();
    appointmentsWidget.removeAllEvents();
    renderStoredEvents();
}

//calendar js
calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth', // Initial view when the calendar loads
    headerToolbar: { start:'prev,next',center:'title',end: 'dayGridMonth,timeGridWeek,timeGridDay' },
    themeSystem: 'bootstrap5',
    eventTimeFormat: { // like '14:30:00'
      hour: '2-digit',
      minute: '2-digit',
      meridiem: 'short'
    },
    //slotDuration: '01:00',
    //scrollToTime: '01:00:00',
    eventMaxStack: '1',
    //display: 'block',
    //eventLimit: true, 
    dayMaxEvents: 1,
    displayEventTime: true,
    displayEventEnd: true,
    fixedWeekCount: false,
    eventClick: function(info) {
      selectedEvent = info.event; // Store the selected event
      if(document.querySelector(".calendar_popup .event-popup")){
        document.querySelector(".calendar_popup .event-popup").remove()
        showEventDetails(info, false);
      }else{
        showEventDetails(info, false);
      }
    },
    eventMouseEnter: function(info) {
       // $(".add-event-outer").css({"opacity":"0.4", "z-index":"0"})
    },
    eventMouseLeave: function(info) {
        //$(".add-event-outer").css({"opacity":"1", "z-index":"2"})
    },
   // eventContent: { html: '<i>some html</i>' },
    eventDidMount: function(info) {
      //console.log(info.event);
      // {description: "Lecture", department: "BioChemistry"}
    },
  
    views: {
      dayGridMonth: { // name of view
        //titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
        dayCellContent:function(args) {
          if(args.dayNumberText.length == 1){
            return {  html: '0'+args.dayNumberText }
          }else{
            return {  html: args.dayNumberText }
          }
        //console.log(args.dayNumberText)
        },
      
      },
      timeGridWeek:{
        dayHeaderFormat: { day: '2-digit' , weekday: 'short', omitCommas: true },
      
      },
      timeGridDay:{
        dayHeaderFormat: { weekday: 'long' },
      
      },
    }
  });

// Prev/Next Calendar Btns
function updateCalendarBtns() {  
    document.querySelector(".calendar_popup .fc-prev-button").addEventListener("click", (e) => {
      $(".event-popup") ? $(".event-popup").remove() : null;
    })

    document.querySelector(".calendar_popup .fc-next-button").addEventListener("click", (e) => {
      $(".event-popup") ? $(".event-popup").remove() : null;
    })

    document.querySelector(".fc-dayGridMonth-button").addEventListener("click", (e) => {
      $(".event-popup") ? $(".event-popup").remove() : null;
    })

    document.querySelector(".fc-timeGridWeek-button").addEventListener("click", (e) => {
      $(".event-popup") ? $(".event-popup").remove() : null;
    })

    document.querySelector(".fc-timeGridDay-button").addEventListener("click", (e) => {
      $(".event-popup") ? $(".event-popup").remove() : null;
    })
    
    // Calendar to/from AM/PM toggling
    $CALENDAR.date_from_am.addEventListener("click", (e) => {
      $CALENDAR.date_from_pm.classList.remove("selected-btn");
      $CALENDAR.date_from_am.classList.add("selected-btn");
    });
  
    $CALENDAR.date_from_pm.addEventListener("click", (e) => {
      $CALENDAR.date_from_am.classList.remove("selected-btn");
      $CALENDAR.date_from_pm.classList.add("selected-btn");
    })
  
    $CALENDAR.date_to_am.addEventListener("click", (e) => {
      $CALENDAR.date_to_pm.classList.remove("selected-btn");
      $CALENDAR.date_to_am.classList.add("selected-btn");
    });
  
    $CALENDAR.date_to_pm.addEventListener("click", (e) => {
      $CALENDAR.date_to_am.classList.remove("selected-btn");
      $CALENDAR.date_to_pm.classList.add("selected-btn");
    });

    $CALENDAR.add_appointment.addEventListener("click", (e) => {
        clearFormFields(true)
        $(".appointments_popup .event-form-wrap").addClass("popupVisible");
        document.querySelector(".appointments_popup .event-title-cont h3").innerText = "Create Appointment";
        $APPOINTMENT.event_freq_state = 0;
        $APPOINTMENT.notify_before_state = 0;
    });

    // Cloase Appointment Sections Form
    $CALENDAR.close_form_btn[1].addEventListener("click", (e) => {
        clearFormFields(true)
        $(".appointments_popup .event-form-wrap").removeClass("popupVisible");
        $APPOINTMENT_MODAL_ELMS.app_form_elm.classList.remove("edit-form");
    })
  }

 // Toggle Appointemtn Btn Events
 function toggleAppointmentForm() {
    const openEventpopup = document.getElementById("openEventpopup");
    const closeEventpopup = document.getElementById("closeEventpopup");
    openEventpopup.addEventListener("click", function() {
      clearFormFields(false)
      $(".calendar_popup .event-form-wrap").addClass("popupVisible");
      $(".event-popup").remove();
      $APPOINTMENT.event_freq_state = 0;
      $APPOINTMENT.notify_before_state = 0;
    });
  
    closeEventpopup.addEventListener("click", function() {
      clearFormFields(false)
      $(".calendar_popup .event-form-wrap").removeClass("popupVisible");
      $APPOINTMENT.form_elm.classList.remove("edit-form");
    });
  
  }

  // Appointment Form Methods Wrapper in Calendar Section
  function appointmentFormHandler(currentTimeString, futureTimeString) {
    document.querySelector(".calendar_popup #time-from").value = currentTimeString;
    document.querySelector(".calendar_popup #time-to").value = futureTimeString;

    // Event Frequency Options Toggle
    $APPOINTMENT.event_freq_input.addEventListener("click", () => {
      if ($APPOINTMENT.event_freq_state === 0) {
        $APPOINTMENT.event_freq_state = 1;
        $APPOINTMENT.event_freq.style.display = "block";
        $APPOINTMENT.event_freq_arrow.classList.add("rotate-arrow")
      } else {
        $APPOINTMENT.event_freq_state = 0;
        $APPOINTMENT.event_freq.style.display = "none";
        $APPOINTMENT.event_freq_arrow.classList.remove("rotate-arrow")
      }
    });
  
    // Notify Before Options Toggle
    $APPOINTMENT.notify_before_input.addEventListener("click", () => {
      if ($APPOINTMENT.notify_before_state === 0) {
        $APPOINTMENT.notify_before_state = 1;
        $APPOINTMENT.notify_before.style.display = "block";
        $APPOINTMENT.notify_before_arrow.classList.add("rotate-arrow")
      } else {
        $APPOINTMENT.notify_before_state = 0;
        $APPOINTMENT.notify_before.style.display = "none";
        $APPOINTMENT.notify_before_arrow.classList.remove("rotate-arrow")
      }
    });
  
    // Select Appointment Color 
    $APPOINTMENT.color_code_options.forEach((elm) => {
      elm.addEventListener("click", (e) => {
  
        $APPOINTMENT.color_code_options.forEach((elm) => {
          elm.classList.remove("selected-color");
        });
  
        e.currentTarget.classList.add("selected-color");
      })
    });
  
    // Selecting Event Freq Value
    $APPOINTMENT.event_freq_options.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        document.querySelector(".calendar_popup .event-freq").value = e.currentTarget.innerText;
        $APPOINTMENT.event_freq_state = 0;
        $APPOINTMENT.event_freq.style.display = "none";
        $APPOINTMENT.event_freq_arrow.classList.remove("rotate-arrow");
      })
    });
  
    // Selecting Notify Value
    $APPOINTMENT.notify_options.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        document.querySelector(".calendar_popup .event-notify").value = e.currentTarget.innerText;
        $APPOINTMENT.notify_before_state = 0;
        $APPOINTMENT.notify_before.style.display = "none";
        $APPOINTMENT.notify_before_arrow.classList.remove("rotate-arrow")
      })
    })
  
    // from time select
    $APPOINTMENT.from_time.addEventListener("click", (e) => {
      if($APPOINTMENT.from_opt_select_state === 0){
        $APPOINTMENT.from_opt_select_state = 1;
        $APPOINTMENT.from_opt_select.style.display = "block";
        $APPOINTMENT.from_time_arrow.classList.add("rotate-arrow");
        try {
          resetScroll();
        } catch (error) {
          
        }
        
      }else{
        $APPOINTMENT.from_opt_select_state = 0;
        $APPOINTMENT.from_opt_select.style.display = "none";
        $APPOINTMENT.from_time_arrow.classList.remove("rotate-arrow");
      }
    });
  
    // to time select
    $APPOINTMENT.to_time.addEventListener("click", (e) => {
      if($APPOINTMENT.to_opt_select_state === 0){
        $APPOINTMENT.to_opt_select_state = 1;
        $APPOINTMENT.to_opt_select.style.display = "block";
        $APPOINTMENT.to_time_arrow.classList.add("rotate-arrow");
        try {
          resetScroll();
        } catch (error) {
          
        }
      }else{
        $APPOINTMENT.to_opt_select_state = 0;
        $APPOINTMENT.to_opt_select.style.display = "none";
        $APPOINTMENT.to_time_arrow.classList.remove("rotate-arrow");
      }
    });
  
    // from value select
    $APPOINTMENT.from_val_select.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        document.querySelector(".calendar_popup .from-wrap input").value = e.currentTarget.innerText.split(" ")[0];
        $APPOINTMENT.from_opt_select_state = 0;
        $APPOINTMENT.from_opt_select.style.display = "none";
        $APPOINTMENT.from_time_arrow.classList.remove("rotate-arrow");
      })
    });
  
    // to value select
    $APPOINTMENT.to_val_select.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        document.querySelector(".calendar_popup .to-wrap input").value = e.currentTarget.innerText.split(" ")[0];
        $APPOINTMENT.to_opt_select_state = 0;
        $APPOINTMENT.to_opt_select.style.display = "none";
        $APPOINTMENT.to_time_arrow.classList.remove("rotate-arrow");
      })
    })

    
    $APPOINTMENT.create_appoint.addEventListener("click", (e) => {

        let appointmentFormObj = {
            title: document.querySelector(".calendar_popup #event-title").value,
            description: document.querySelector(".calendar_popup #event-desc").value,
            date: document.querySelector(".calendar_popup #event-date").value,
            time_from: document.querySelector(".calendar_popup #time-from").value,
            time_from_period: document.querySelector(".calendar_popup .date-from .selected-btn").innerText,
            time_to: document.querySelector(".calendar_popup #time-to").value,
            time_to_period: document.querySelector(".calendar_popup .date-to .selected-btn").innerText,
            event_freq: document.querySelector(".calendar_popup .event-freq").value,
            notify_before: document.querySelector(".calendar_popup .event-notify").value,
            meet_link: document.querySelector(".calendar_popup #event-link").value,
            color_code: document.querySelector(".calendar_popup .selected-color").getAttribute("data-value")
        }
        dateErrorpresent = false
          Promise.allSettled([
          cleanValidation([
            document.querySelector(".calendar_popup #event-title"),
            document.querySelector(".calendar_popup #event-link"),
            document.querySelector(".calendar_popup #time-from"),
            document.querySelector(".calendar_popup #time-to")
          ]),
          titleValidation(appointmentFormObj),
          urlValidation(appointmentFormObj),
          dateValidation(appointmentFormObj, "calendar-form"),
          fromFieldValidation(appointmentFormObj, "calendar-form"),
          toFieldValidation(appointmentFormObj, "calendar-form")
        ])
        .then((res)=>{
          //console.log(res,'value')
          let titleFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason === "No Title");
          let urlValidation = res.filter((ele)=> ele.status=="rejected" && ele.reason === "Invalid URL");
          let dateValidation = res.filter((ele)=> ele.status=="rejected" && ele.reason === "No Date Selected");
          let fromFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason.err === "From field");
          let toFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason === "To Field");

          // console.log(titleFieldStatus.length,urlValidation.length,fromFieldStatus.length,toFieldStatus.length)
          titleFieldStatus.length &&  titleError("calendar-form"); 
          urlValidation.length && urlError("calendar-form");
          dateValidation.length && dateError("calendar-form")
          fromFieldStatus.length && fromFieldError("calendar-form");
          toFieldStatus.length && toFieldError2("calendar-form");

          if(!toFieldStatus.length && fromFieldStatus.length && (!checkifToGreaterThanFrom(res[4].reason.timestamp,res[5].value,"calendar-form"))) throw new Error(" Error in  from field");

          if(!toFieldStatus.length && (checkifToGreaterThanFrom(res[4].value,res[5].value,"calendar-form"))) throw new Error("Greater than from field")


          if(fromFieldStatus.length || toFieldStatus.length || dateValidation.length || titleFieldStatus.length || urlValidation.length) throw new Error("Before Date OR InValid URL OR title Error");
          return true
        })
        .then((res)=>{
            // console.log(appointmentFormObj,'finalObj')
            saveEvents(appointmentFormObj)
            clearFormFields(false);
            $(".calendar_popup .event-form-wrap").removeClass("popupVisible");  
        })
        .catch((err)=>{
            // console.log(err,'error')
        });
		
    });
  };

  // Appointment Section Form Methods Wrapper
  function appointmentSectionFormHandler(currentTimeString, futureTimeString) {
    document.querySelector(".appointments_popup #time-from").value = currentTimeString;
    document.querySelector(".appointments_popup #time-to").value = futureTimeString;

    // from time select
    $APPOINTMENT_MODAL_ELMS.app_from_time.addEventListener("click", (e) => {
      if($APPOINTMENT_MODAL_ELMS.app_from_opt_select_state === 0){
        $APPOINTMENT_MODAL_ELMS.app_from_opt_select_state = 1;
        $APPOINTMENT_MODAL_ELMS.app_from_opt_select.style.display = "block";
        $APPOINTMENT_MODAL_ELMS.app_from_time_arrow.classList.add("rotate-arrow");
        try {
          resetScroll();
        } catch (error) {
          
        }
      }else{
        $APPOINTMENT_MODAL_ELMS.app_from_opt_select_state = 0;
        $APPOINTMENT_MODAL_ELMS.app_from_opt_select.style.display = "none";
        $APPOINTMENT_MODAL_ELMS.app_from_time_arrow.classList.remove("rotate-arrow");
      }
    });

    // from value select
    $APPOINTMENT_MODAL_ELMS.app_from_val_select.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        document.querySelector(".appointments_popup .from-wrap input").value = e.currentTarget.innerText.split(" ")[0];
        $APPOINTMENT_MODAL_ELMS.app_from_opt_select_state = 0;
        $APPOINTMENT_MODAL_ELMS.app_from_opt_select.style.display = "none";
        $APPOINTMENT_MODAL_ELMS.app_from_time_arrow.classList.remove("rotate-arrow");
      })
    });

    // to time select
    $APPOINTMENT_MODAL_ELMS.app_to_time.addEventListener("click", (e) => {
      if($APPOINTMENT_MODAL_ELMS.app_to_opt_select_state === 0){
        $APPOINTMENT_MODAL_ELMS.app_to_opt_select_state = 1;
        $APPOINTMENT_MODAL_ELMS.app_to_opt_select.style.display = "block";
        $APPOINTMENT_MODAL_ELMS.app_to_time_arrow.classList.add("rotate-arrow");
        try {
          resetScroll();
        } catch (error) {
          
        }
      }else{
        $APPOINTMENT_MODAL_ELMS.app_to_opt_select_state = 0;
        $APPOINTMENT_MODAL_ELMS.app_to_opt_select.style.display = "none";
        $APPOINTMENT_MODAL_ELMS.app_to_time_arrow.classList.remove("rotate-arrow");
      }
    });
  
    // to value select
    $APPOINTMENT_MODAL_ELMS.app_to_val_select.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        document.querySelector(".appointments_popup .to-wrap input").value = e.currentTarget.innerText.split(" ")[0];
        $APPOINTMENT_MODAL_ELMS.app_to_opt_select_state = 0;
        $APPOINTMENT_MODAL_ELMS.app_to_opt_select.style.display = "none";
        $APPOINTMENT_MODAL_ELMS.app_to_time_arrow.classList.remove("rotate-arrow");
      })
    })

    // Appointment Section to/from AM/PM toggling
    $CALENDAR.app_date_from_am.addEventListener("click", (e) => {
      $CALENDAR.app_date_from_pm.classList.remove("selected-btn");
      $CALENDAR.app_date_from_am.classList.add("selected-btn");
    });
  
    $CALENDAR.app_date_from_pm.addEventListener("click", (e) => {
      $CALENDAR.app_date_from_am.classList.remove("selected-btn");
      $CALENDAR.app_date_from_pm.classList.add("selected-btn");
    })
  
    $CALENDAR.app_date_to_am.addEventListener("click", (e) => {
      $CALENDAR.app_date_to_pm.classList.remove("selected-btn");
      $CALENDAR.app_date_to_am.classList.add("selected-btn");
    });
  
    $CALENDAR.app_date_to_pm.addEventListener("click", (e) => {
      $CALENDAR.app_date_to_am.classList.remove("selected-btn");
      $CALENDAR.app_date_to_pm.classList.add("selected-btn");
    });

    // Event Frequency Options Toggle
    $APPOINTMENT_MODAL_ELMS.app_event_freq_input.addEventListener("click", () => {
      if ($APPOINTMENT_MODAL_ELMS.app_event_freq_state === 0) {
        $APPOINTMENT_MODAL_ELMS.app_event_freq_state = 1;
        $APPOINTMENT_MODAL_ELMS.app_event_freq.style.display = "block";
        $APPOINTMENT_MODAL_ELMS.app_event_freq_arrow.classList.add("rotate-arrow")
      } else {
        $APPOINTMENT_MODAL_ELMS.app_event_freq_state = 0;
        $APPOINTMENT_MODAL_ELMS.app_event_freq.style.display = "none";
        $APPOINTMENT_MODAL_ELMS.app_event_freq_arrow.classList.remove("rotate-arrow")
      }
    });
  
    // Notify Before Options Toggle
    $APPOINTMENT_MODAL_ELMS.app_notify_before_input.addEventListener("click", () => {
      if ($APPOINTMENT_MODAL_ELMS.app_notify_before_state === 0) {
        $APPOINTMENT_MODAL_ELMS.app_notify_before_state = 1;
        $APPOINTMENT_MODAL_ELMS.app_notify_before.style.display = "block";
        $APPOINTMENT_MODAL_ELMS.app_notify_before_arrow.classList.add("rotate-arrow")
      } else {
        $APPOINTMENT_MODAL_ELMS.app_notify_before_state = 0;
        $APPOINTMENT_MODAL_ELMS.app_notify_before.style.display = "none";
        $APPOINTMENT_MODAL_ELMS.app_notify_before_arrow.classList.remove("rotate-arrow")
      }
    });

    // Select Appointment Color 
    $APPOINTMENT_MODAL_ELMS.app_color_code_options.forEach((elm) => {
      elm.addEventListener("click", (e) => {
  
        $APPOINTMENT_MODAL_ELMS.app_color_code_options.forEach((elm) => {
          elm.classList.remove("selected-color");
        });
  
        e.currentTarget.classList.add("selected-color");
      })
    });

    // Selecting Notify Value
    $APPOINTMENT_MODAL_ELMS.app_notify_options.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        document.querySelector(".appointments_popup .event-notify").value = e.currentTarget.innerText;
        $APPOINTMENT_MODAL_ELMS.app_notify_before_state = 0;
        $APPOINTMENT_MODAL_ELMS.app_notify_before.style.display = "none";
        $APPOINTMENT_MODAL_ELMS.app_notify_before_arrow.classList.remove("rotate-arrow")
      })
    });

    // Selecting Event Freq Value
    $APPOINTMENT_MODAL_ELMS.app_event_freq_options.forEach((elm) => {
      elm.addEventListener("click", (e) => {
        document.querySelector(".appointments_popup .event-freq").value = e.currentTarget.innerText;
        $APPOINTMENT_MODAL_ELMS.app_event_freq_state = 0;
        $APPOINTMENT_MODAL_ELMS.app_event_freq.style.display = "none";
        $APPOINTMENT_MODAL_ELMS.app_event_freq_arrow.classList.remove("rotate-arrow")
      })
    });


    $APPOINTMENT_MODAL_ELMS.app_create_appoint.addEventListener("click", (e) => {
      let appointmentFormObj = {
          title: document.querySelector(".appointments_popup #event-title").value,
          description: document.querySelector(".appointments_popup #event-desc").value,
          date: document.querySelector(".appointments_popup #event-date").value,
          time_from: document.querySelector(".appointments_popup #time-from").value,
          time_from_period: document.querySelector(".appointments_popup .date-from .selected-btn").innerText,
          time_to: document.querySelector(".appointments_popup #time-to").value,
          time_to_period: document.querySelector(".appointments_popup .date-to .selected-btn").innerText,
          event_freq: document.querySelector(".appointments_popup .event-freq").value,
          notify_before: document.querySelector(".appointments_popup .event-notify").value,
          meet_link: document.querySelector(".appointments_popup #event-link").value,
          color_code: document.querySelector(".appointments_popup .selected-color").getAttribute("data-value")
      }
      dateErrorpresent = false
        Promise.allSettled([
          cleanValidation([
            document.querySelector(".appointments_popup #event-title"),
            document.querySelector(".appointments_popup #event-link"),
            document.querySelector(".appointments_popup #time-from"),
            document.querySelector(".appointments_popup #time-to")
          ]),
          titleValidation(appointmentFormObj),
          urlValidation(appointmentFormObj),
          dateValidation(appointmentFormObj, "appointment-form"),
          fromFieldValidation(appointmentFormObj, "appointment-form"),
          toFieldValidation(appointmentFormObj, "appointment-form")
        ])
        .then((res)=>{
          //console.log(res,'value')
          let titleFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason === "No Title");
          let urlValidation = res.filter((ele)=> ele.status=="rejected" && ele.reason === "Invalid URL");
          let dateValidation = res.filter((ele)=> ele.status=="rejected" && ele.reason === "No Date Selected");
          let fromFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason.err === "From field");
          let toFieldStatus = res.filter((ele)=> ele.status=="rejected" && ele.reason === "To Field");

          // console.log(titleFieldStatus.length,fromFieldStatus.length,toFieldStatus.length)
          titleFieldStatus.length &&  titleError("appointment-form"); 
          urlValidation.length && urlError("appointment-form");
          dateValidation.length && dateError("appointment-form")
          fromFieldStatus.length && fromFieldError("appointment-form");
          toFieldStatus.length && toFieldError2("appointment-form");

          if(!toFieldStatus.length && fromFieldStatus.length && (!checkifToGreaterThanFrom(res[4].reason.timestamp,res[5].value,"appointment-form")))  throw new Error(" Error in  from field");

          if(!toFieldStatus.length && (checkifToGreaterThanFrom(res[4].value,res[5].value,"appointment-form"))) throw new Error("Greater than from field")
          
          if(fromFieldStatus.length || toFieldStatus.length || titleFieldStatus.length || dateValidation.length || urlValidation.length) throw new Error("Before Date OR InValid URL OR title Error");
          return true
        })
        .then((res)=>{
            // console.log(appointmentFormObj,'finalObj')
            saveEvents(appointmentFormObj)
            clearFormFields(true);
              $(".appointments_popup .event-form-wrap").removeClass("popupVisible");  
        })
        .catch((err)=>{
            // console.log(err,'error')
        });
      })
  }



  function showEventDetails(info, isAppointmentSec) {
    const popup = document.createElement("div");
    popup.classList.add("event-popup");
    var popupContent = `
      <div class="event-header">
        <div class="title-wrap">
          <div class="color-tag ${info.event.backgroundColor}"></div>
          <h3 title="${info.event.title}">${info.event.title}</h3>
        </div>
        <div class="btn-wrap">
          <button class="edit-btn"> 
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.6">
              <path d="M1.37574 10.1459C1.23741 10.1459 1.09935 10.0932 0.993706 9.98757C0.782697 9.77656 0.782697 9.43451 0.993706 9.2235L9.43786 0.779351C9.6486 0.568341 9.99091 0.568341 10.2019 0.779351C10.4129 0.99036 10.4129 1.33241 10.2019 1.54342L1.75777 9.98757C1.6524 10.0929 1.51407 10.1459 1.37574 10.1459Z" fill="black"/>
              <path d="M0.541385 14.0425C0.50383 14.0425 0.465735 14.0385 0.42764 14.0304C0.135847 13.9677 -0.0500354 13.6805 0.0126459 13.3887L0.847497 9.4973C0.910178 9.20551 1.19873 9.02017 1.48917 9.08231C1.78096 9.14499 1.96685 9.43219 1.90416 9.72398L1.06931 13.6154C1.01501 13.8691 0.790759 14.0425 0.541385 14.0425Z" fill="black"/>
              <path d="M4.43189 13.2081C4.29356 13.2081 4.1555 13.1554 4.04986 13.0498C3.83885 12.8388 3.83885 12.4967 4.04986 12.2857L12.494 3.84185C12.7047 3.63084 13.0471 3.63084 13.2581 3.84185C13.4691 4.05286 13.4691 4.39491 13.2581 4.60591L4.81419 13.0498C4.70855 13.1554 4.57022 13.2081 4.43189 13.2081Z" fill="black"/>
              <path d="M0.540006 14.0445C0.290631 14.0445 0.0666536 13.871 0.0120775 13.6173C-0.0503337 13.3255 0.135279 13.0383 0.427071 12.9757L4.31845 12.1408C4.61051 12.0789 4.89771 12.2643 4.96012 12.5558C5.02253 12.8476 4.83692 13.1348 4.54513 13.1975L0.653751 14.0323C0.615656 14.0407 0.577561 14.0445 0.540006 14.0445Z" fill="black"/>
              <path d="M11.3478 6.28952C11.2095 6.28952 11.0711 6.23683 10.9658 6.13119L7.90923 3.07466C7.69822 2.86366 7.69822 2.52161 7.90923 2.3106C8.11997 2.09959 8.46256 2.09959 8.6733 2.3106L11.7298 5.36713C11.9408 5.57814 11.9408 5.92018 11.7298 6.13119C11.6245 6.23683 11.4861 6.28952 11.3478 6.28952Z" fill="black"/>
              <path d="M12.8757 4.76216C12.7373 4.76216 12.599 4.70948 12.4934 4.60384C12.2824 4.39283 12.2824 4.05078 12.4934 3.8395C12.7941 3.5388 12.9597 3.13164 12.9597 2.69341C12.9597 2.25518 12.7941 1.84802 12.4934 1.54731C12.1924 1.24633 11.7852 1.08071 11.347 1.08071C10.9088 1.08071 10.5016 1.24633 10.2009 1.54731C9.99017 1.75832 9.64813 1.75859 9.43658 1.54731C9.22557 1.3363 9.22557 0.994256 9.43658 0.782977C9.94127 0.278013 10.6197 0 11.347 0C12.0741 0 12.7527 0.278013 13.2574 0.782977C13.7624 1.28767 14.0404 1.96609 14.0404 2.69341C14.0404 3.42073 13.7624 4.09914 13.2574 4.60384C13.1523 4.70921 13.014 4.76216 12.8757 4.76216Z" fill="black"/>
              </g>
            </svg>
          </button>
          <button class="delete-btn">
            <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g opacity="0.6">
              <path d="M10.1406 3.80078C9.9725 3.80078 9.8113 3.86756 9.69244 3.98641C9.57358 4.10527 9.50681 4.26648 9.50681 4.43457V11.5273C9.48862 11.8478 9.34454 12.1481 9.10593 12.3629C8.86733 12.5776 8.55353 12.6894 8.23289 12.6738H3.17527C2.85464 12.6894 2.54084 12.5776 2.30224 12.3629C2.06363 12.1481 1.91954 11.8478 1.90136 11.5273V4.43457C1.90136 4.26648 1.83459 4.10527 1.71573 3.98641C1.59687 3.86756 1.43567 3.80078 1.26758 3.80078C1.09949 3.80078 0.938279 3.86756 0.819421 3.98641C0.700563 4.10527 0.633789 4.26648 0.633789 4.43457V11.5273C0.65188 12.184 0.929503 12.8068 1.40586 13.2593C1.88221 13.7118 2.51846 13.957 3.17527 13.9414H8.23289C8.8897 13.957 9.52596 13.7118 10.0023 13.2593C10.4787 12.8068 10.7563 12.184 10.7744 11.5273V4.43457C10.7744 4.26648 10.7076 4.10527 10.5887 3.98641C10.4699 3.86756 10.3087 3.80078 10.1406 3.80078Z" fill="black"/>
              <path d="M10.7744 1.90136H8.23923V0.633787C8.23923 0.465696 8.17246 0.30449 8.0536 0.185632C7.93474 0.0667737 7.77353 0 7.60544 0H3.80272C3.63463 0 3.47342 0.0667737 3.35457 0.185632C3.23571 0.30449 3.16893 0.465696 3.16893 0.633787V1.90136H0.633787C0.465696 1.90136 0.30449 1.96813 0.185632 2.08699C0.0667738 2.20585 0 2.36706 0 2.53515C0 2.70324 0.0667738 2.86444 0.185632 2.9833C0.30449 3.10216 0.465696 3.16893 0.633787 3.16893H10.7744C10.9425 3.16893 11.1037 3.10216 11.2225 2.9833C11.3414 2.86444 11.4082 2.70324 11.4082 2.53515C11.4082 2.36706 11.3414 2.20585 11.2225 2.08699C11.1037 1.96813 10.9425 1.90136 10.7744 1.90136ZM4.43651 1.90136V1.26757H6.97166V1.90136H4.43651Z" fill="black"/>
              <path d="M5.07031 10.1406V5.7041C5.07031 5.53601 5.00353 5.3748 4.88468 5.25594C4.76582 5.13709 4.60461 5.07031 4.43652 5.07031C4.26843 5.07031 4.10722 5.13709 3.98837 5.25594C3.86951 5.3748 3.80273 5.53601 3.80273 5.7041V10.1406C3.80273 10.3087 3.86951 10.4699 3.98837 10.5888C4.10722 10.7076 4.26843 10.7744 4.43652 10.7744C4.60461 10.7744 4.76582 10.7076 4.88468 10.5888C5.00353 10.4699 5.07031 10.3087 5.07031 10.1406Z" fill="black"/>
              <path d="M7.60546 10.1406V5.7041C7.60546 5.53601 7.53869 5.3748 7.41983 5.25594C7.30097 5.13709 7.13977 5.07031 6.97168 5.07031C6.80359 5.07031 6.64238 5.13709 6.52352 5.25594C6.40466 5.3748 6.33789 5.53601 6.33789 5.7041V10.1406C6.33789 10.3087 6.40466 10.4699 6.52352 10.5888C6.64238 10.7076 6.80359 10.7744 6.97168 10.7744C7.13977 10.7744 7.30097 10.7076 7.41983 10.5888C7.53869 10.4699 7.60546 10.3087 7.60546 10.1406Z" fill="black"/>
              </g>
            </svg>
          </button>
          <button class="close-btn">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.2" viewBox="0 0 13 12" width="13" height="12">
              <title>Group 638-svg</title>
              <style>
                .s0 { fill: none;stroke: #666666;stroke-linecap: round;stroke-linejoin: round;stroke-width: 1.5 } 
              </style>
              <g id="cross">
                <path id="Layer" fill-rule="evenodd" class="s0" d="m1.4 11l10-10"/>
                <path id="Layer" fill-rule="evenodd" class="s0" d="m11.4 11l-10-10"/>
              </g>
            </svg>
          
          </button>
        </div>
        <div class="delete-modal">
          <div class="delete-content deleteallevent">
            <h1>Delete Appointment</h1>
            <p>Are you sure want to delete this appointment?</p>
            <div class="delete-btns-cont">
              <button class="cancel-btn">Cancel</button>
              <button class="delete-confirm-btn">Delete</button>
            </div>
            <div class="delete-recuring-event">
              <span>Delete recurring appointments</span>
            </div>
          </div>
          </div> 
          <div class="delete-recur-confirm">
            <h1>Delete Recurring Appointments</h1>
            <p>Are you sure want to delete all recurring appointments?</p>
            <div class="confrmbtwrap">
              <button class="cnfcancel-btn">No</button>
              <button class="cnfdelete-confirm-btn yes">Yes</button>
          </div>
        </div>
      </div>
      <div class="header-content-wrap">
          <div class="date-wrap">
            <div class="calendar-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 11 11" fill="none">
              <path d="M2.23923 10.1586H8.76077C9.44442 10.1586 10 9.60307 10 8.91941V2.74403C10 2.06038 9.44442 1.50479 8.76077 1.50479H8.26924V1.15865C8.26924 0.96826 8.11345 0.8125 7.92306 0.8125C7.73267 0.8125 7.57691 0.96826 7.57691 1.15865V1.50479H3.42309V1.15865C3.42309 0.96826 3.2673 0.8125 3.07691 0.8125C2.88653 0.8125 2.73076 0.96826 2.73076 1.15865V1.50479H2.23923C1.55558 1.50479 1 2.06038 1 2.74403V8.91941C1 9.60307 1.55558 10.1586 2.23923 10.1586ZM1.69232 2.74403C1.69232 2.44288 1.93809 2.19712 2.23923 2.19712H2.73076V2.54326C2.73076 2.73365 2.88653 2.88941 3.07691 2.88941C3.2673 2.88941 3.42306 2.73365 3.42306 2.54326V2.19712H7.57691V2.54326C7.57691 2.73365 7.73267 2.88941 7.92306 2.88941C8.11345 2.88941 8.26921 2.73365 8.26921 2.54326V2.19712H8.76074C9.06188 2.19712 9.30765 2.44288 9.30765 2.74403V3.75481H1.69232V2.74403ZM1.69232 4.4471H9.30771V8.91941C9.30771 9.22056 9.06194 9.46632 8.7608 9.46632H2.23923C1.93809 9.46632 1.69232 9.22056 1.69232 8.91941V4.4471Z" fill="#9C9C9E" stroke="#9C9C9E" stroke-width="0.2"/>
              </svg>
            </div>
            <p>${moment(info.event.start).format('ddd, MMM DD')}</p>
          </div>

          <div class="time-wrap">
            <div class="time-cont">
              <div class="clock-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M6.8664 6.02666L5.68641 5.14167V3.33334C5.68641 3.12139 5.51502 2.95 5.30307 2.95C5.09112 2.95 4.91973 3.12139 4.91973 3.33334V5.33336C4.91973 5.45398 4.97638 5.56785 5.07306 5.64004C5.0731 5.64006 5.07313 5.64009 5.07316 5.64011L6.4064 6.64005C6.4064 6.64005 6.4064 6.64005 6.4064 6.64005C6.47534 6.69176 6.55596 6.71672 6.63607 6.71672C6.75264 6.71672 6.86785 6.66428 6.94313 6.56297C7.07038 6.3938 7.03577 6.1535 6.8664 6.02666Z" fill="#9C9C9E" stroke="#9C9C9E" stroke-width="0.1"/>
                  <path d="M5.30336 0.95C2.90273 0.95 0.95 2.90273 0.95 5.30336C0.95 7.70399 2.90273 9.65672 5.30336 9.65672C7.70399 9.65672 9.65672 7.70399 9.65672 5.30336C9.65672 2.90273 7.70399 0.95 5.30336 0.95ZM5.30336 8.89005C3.32596 8.89005 1.71667 7.28076 1.71667 5.30336C1.71667 3.32596 3.32596 1.71667 5.30336 1.71667C7.28109 1.71667 8.89005 3.32596 8.89005 5.30336C8.89005 7.28076 7.28076 8.89005 5.30336 8.89005Z" fill="#9C9C9E" stroke="#9C9C9E" stroke-width="0.1"/>
                </svg>
              </div>
              <p>${info.event.extendedProps.eventStartTime} - ${info.event.extendedProps.eventEndTime}</p>
            </div>

            <div class="reminder-cont">
              <div class="remd-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M0.890491 6.31651C1.22093 6.92937 1.7357 7.42282 2.36198 7.72707C2.98826 8.03132 3.69435 8.13096 4.38037 8.0119C5.06638 7.89283 5.6976 7.56109 6.18473 7.0636C6.67186 6.56611 6.99025 5.92806 7.09485 5.23969C7.19946 4.55132 7.08499 3.84749 6.76763 3.22775C6.45028 2.60801 5.9461 2.10373 5.32642 1.78625C4.70675 1.46877 4.00293 1.35416 3.31455 1.45863C2.62616 1.5631 1.98804 1.88136 1.49045 2.36839H2.85626C2.98188 2.36839 3.10237 2.4183 3.1912 2.50713C3.28003 2.59596 3.32994 2.71644 3.32994 2.84207C3.32994 2.9677 3.28003 3.08818 3.1912 3.17701C3.10237 3.26585 2.98188 3.31575 2.85626 3.31575H0.487864C0.481184 3.31575 0.475642 3.31225 0.468915 3.31196L0.4647 3.31111C0.343724 3.30579 0.229439 3.2541 0.145555 3.16677C0.0616713 3.07944 0.0146275 2.96316 0.014184 2.84207V0.473679C0.014184 0.348051 0.0640888 0.227569 0.152921 0.138737C0.241753 0.0499053 0.362236 0 0.487864 0C0.613491 0 0.733973 0.0499053 0.822805 0.138737C0.911637 0.227569 0.961542 0.348051 0.961542 0.473679V1.57541C1.62018 0.985294 2.44631 0.615041 3.32509 0.516118C4.20387 0.417194 5.09164 0.594516 5.86499 1.02343C6.63835 1.45235 7.25885 2.11155 7.64027 2.9094C8.02168 3.70725 8.14504 4.60412 7.9932 5.47531C7.84137 6.34651 7.42188 7.14877 6.79305 7.77055C6.16422 8.39233 5.3573 8.80276 4.48444 8.94477C3.61159 9.08678 2.71617 8.95332 1.92267 8.56295C1.12916 8.17258 0.476993 7.54468 0.0568151 6.76655C-0.00286388 6.656 -0.0161819 6.52626 0.0197897 6.40589C0.0557623 6.28552 0.138079 6.18437 0.248631 6.12469C0.359183 6.06501 0.488916 6.05169 0.609288 6.08766C0.72966 6.12364 0.830811 6.20595 0.890491 6.31651Z" fill="#9C9C9E"/>
                </svg>
              </div>
              <p>${info.event.extendedProps.frequency}</p>
            </div>
          </div>
      </div>

      <div class="desc-cont">
        <h3>DESCRIPTION</h3>
        <p>${info.event.extendedProps.description}</p>
      </div>

      <div class="share-wrap">
        <div class="share-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
            <path d="M5.38369 6.91459L3.8533 8.44502C3.8533 8.44502 3.8533 8.44505 3.85327 8.44505C3.85327 8.44505 3.85327 8.44509 3.85323 8.44509C3.22037 9.07799 2.19056 9.07802 1.55763 8.44509C1.25101 8.13847 1.08219 7.73081 1.08219 7.29725C1.08219 6.86373 1.25101 6.45614 1.55752 6.14952C1.55755 6.14948 1.55759 6.14945 1.55763 6.14941L3.08802 4.61898C3.29929 4.40767 3.29929 4.06505 3.08798 3.85377C2.8767 3.64249 2.53408 3.64249 2.32277 3.85377L0.792376 5.3842C0.792268 5.38431 0.79216 5.38445 0.792051 5.38456C0.281296 5.89549 0 6.57478 0 7.29725C0 8.0199 0.281404 8.69929 0.792412 9.2103C1.31987 9.73772 2.01265 10.0015 2.70546 10.0015C3.39828 10.0015 4.09109 9.73772 4.61848 9.2103C4.61851 9.2103 4.61852 9.21023 4.61852 9.21023L6.1489 7.6798C6.36018 7.46852 6.36018 7.1259 6.14887 6.91459C5.93763 6.70331 5.59504 6.70331 5.38369 6.91459Z" fill="black"/>
            <path d="M10.0023 2.70417C10.0023 1.98152 9.72088 1.30213 9.20988 0.791118C8.155 -0.263724 6.43862 -0.263688 5.38381 0.791118C5.38377 0.79119 5.3837 0.791226 5.38366 0.791299L3.85331 2.32162C3.642 2.5329 3.642 2.87555 3.85331 3.08683C3.959 3.19252 4.09745 3.24533 4.23594 3.24533C4.37438 3.24533 4.5129 3.19249 4.61852 3.08683L6.14888 1.55651C6.14891 1.55644 6.14899 1.5564 6.14906 1.55633C6.78192 0.923469 7.81173 0.923433 8.44466 1.55633C8.75125 1.86295 8.92014 2.27061 8.92014 2.70417C8.92014 3.13769 8.75132 3.54528 8.44477 3.8519L8.44466 3.85201L6.91427 5.38243C6.70299 5.59371 6.70299 5.93633 6.91431 6.14765C7.01996 6.2533 7.15845 6.30615 7.2969 6.30615C7.43538 6.30615 7.57386 6.2533 7.67952 6.14765L9.20991 4.61722C9.21002 4.61711 9.21013 4.61697 9.21024 4.61686C9.72099 4.10592 10.0023 3.42664 10.0023 2.70417Z" fill="black"/>
            <path d="M3.08817 6.91421C3.19383 7.01987 3.33231 7.07272 3.47076 7.07272C3.60925 7.07272 3.74773 7.01987 3.85339 6.91421L6.91424 3.85336C7.12556 3.64208 7.12556 3.29946 6.91424 3.08815C6.70296 2.87687 6.36034 2.87687 6.14903 3.08815L3.08817 6.14896C2.87686 6.36031 2.87686 6.70293 3.08817 6.91421Z" fill="black"/>
          </svg>
        </div>
        <div class="link-cont">
          <a href="${info.event.extendedProps.event_url}" target="_blank">${info.event.extendedProps.event_url}</a>
        </div>
      </div>
    `;

    if(!isAppointmentSec){ 
      $CALENDAR.calendar_wrap.appendChild(popup);
    }else{
      document.getElementsByClassName("appointments-list-wrap")[0].appendChild(popup);
    }
    $(".event-popup").append(popupContent)
    // Add event handling logic to the edit and delete buttons
    //console.log($(".edit-btn").length)
    const editBtn = popup.querySelector(".edit-btn");
    editBtn.addEventListener("click", function() {
      let formElm = isAppointmentSec ? document.querySelector(".appointments_popup .event-form-wrap") : document.querySelector(".calendar_popup .event-form-wrap");
      formElm.classList.add("edit-form");
      formElm.classList.add("popupVisible");
      //console.log(selectedEvent,"event")
      isAppointmentSec ?  openEditEventPopupAppointments(selectedEvent) : openEditEventPopup(selectedEvent);
      //popup.hide();
      popup.remove();
    });

    const deleterecurBtn = popup.querySelector(".delete-recuring-event");
    if(info.event.extendedProps.frequency == "Once"){
      deleterecurBtn.style.display = 'none';
    }else{
      deleterecurBtn.style.display = 'block';
    }
    const deleterecurPopup = popup.querySelector(".delete-recur-confirm");
    deleterecurBtn.addEventListener("click", function() {
      deleterecurPopup.style.display = 'block';
      deleteBtn.classList.remove("active-btn");
      deleteModal.style.display = 'none';
      //popup.remove();
    });
    const deleteBtn = popup.querySelector(".delete-btn");
    const deleteModal = popup.querySelector(".delete-modal");
    deleteBtn.addEventListener("click", function() {
      deleteBtn.classList.add("active-btn");
      deleteModal.style.display = 'block';
    });

    const closeDelModal = popup.querySelector(".cancel-btn");
    closeDelModal.addEventListener("click", function(){
      deleteBtn.classList.remove("active-btn");
      deleteModal.style.display = 'none';
      deleteModal.style.display = 'none';
    });

    const closeDelCnfModal = popup.querySelector(".cnfcancel-btn");
    closeDelCnfModal.addEventListener("click", function(){
      deleteBtn.classList.remove("active-btn");
      deleterecurPopup.style.display = 'none';
      deleteModal.style.display = 'none';
      //popup.remove();
    });

    const confirmDelbtn = popup.querySelector(".cnfdelete-confirm-btn");
    confirmDelbtn.addEventListener("click", function(){
      deleteEvents(selectedEvent);
      deleterecurPopup.style.display = 'none';
      popup.remove();
    });
    
    const confirmDelOnlybtn = popup.querySelector(".delete-confirm-btn");
    confirmDelOnlybtn.addEventListener("click", function(){
      if(selectedEvent.extendedProps.frequency == "Once"){
        deleteEvents(selectedEvent);
      }else{
        deleteSingleEvents(selectedEvent);
      }
      
      deleteBtn.classList.remove("active-btn");
      deleteModal.style.display = 'none';
      popup.remove();
    });

    
    const closeEvent = popup.querySelector(".close-btn");
    closeEvent.addEventListener("click", function(){
      popup.remove();
    });

    //$CALENDAR.calendar_wrap.appendChild(popup);
    //document.getElementsByClassName("appointments-list-wrap")[0].appendChild(popup);
    // Calculate the position of the event on the page
    var eventRect = info.jsEvent.target.getBoundingClientRect();

    // Calculate the width of the popup
    var popupWidth = 280; // Adjust as needed
    var popupHeight = 300; // Adjust as needed

    // Calculate the maximum allowed position on both sides
    var maxLeft = Math.min(eventRect.left, window.innerWidth - popupWidth);
    var maxRight = Math.min(eventRect.right, window.innerWidth);
    var maxTop = Math.min(eventRect.top, window.innerHeight - popupHeight);
    var maxBottom = Math.min(eventRect.bottom, window.innerHeight);
    // Determine the actual popup position
    var popupLeft = Math.max(maxLeft, 0);
    /* if (maxRight - maxLeft < popupWidth) {
        popupLeft = Math.max(eventRect.left - popupWidth + eventRect.width, 0);
    } */
    var popupTop = Math.max(maxTop, 240);
    // Set the position of the popup
    //popup.style.left = popupLeft + 'px';
    popup.style.left = popupLeft  + 'px';
    popup.style.top = popupTop  + 'px';

    if(info.event.classNames[0] == 'holidayEvent'){
      editBtn.style.opacity = '0' 
      deleteBtn.style.opacity = '0' 
      popup.querySelector(".time-wrap").style.display = 'none' 
      popup.querySelector(".desc-cont").style.display = 'none' 
      popup.querySelector(".share-wrap").style.display = 'none' 
      //$(".edit-btn, .delete-btn, .time-wrap,.desc-cont,.share-wrap").hide();
    }else{
      if(info.event.extendedProps.description.length == 0){
        popup.querySelector(".desc-cont").style.display = 'none' 
      }
      if(info.event.extendedProps.event_url.length == 0){
        popup.querySelector(".share-wrap").style.display = 'none'
      }
    }
    
    
}

// Function Wrapper to close opened modal on outside click
function closeModalsHandler(){
    document.addEventListener("click", (e) => {
  
      // For Calendar Form Event Frequency 
      let isClickInsideFreqModal = $APPOINTMENT.event_freq.contains(e.target);
      let isFreqInpElm = $APPOINTMENT.event_freq_input.contains(e.target);
  
      if (!isClickInsideFreqModal && !isFreqInpElm && $APPOINTMENT.event_freq_state === 1) {
          $APPOINTMENT.event_freq.style.display = 'none';
          $APPOINTMENT.event_freq_state = 0;
          $APPOINTMENT.event_freq_arrow.classList.remove("rotate-arrow");
      }
  
  
      // For Calendar Form Notify Frequency 
      let isClickInsideNotModal = $APPOINTMENT.notify_before.contains(e.target);
      let isNotiInpElm = $APPOINTMENT.notify_before_input.contains(e.target);
  
      if (!isClickInsideNotModal && !isNotiInpElm && $APPOINTMENT.notify_before_state === 1) {
          $APPOINTMENT.notify_before.style.display = 'none';
          $APPOINTMENT.notify_before_state = 0;
          $APPOINTMENT.notify_before_arrow.classList.remove("rotate-arrow")
      }
  
      // For Calendar Form Time From
      let isClickInsideFromModal = $APPOINTMENT.from_opt_select.contains(e.target);
      let isFromInpElm = $APPOINTMENT.from_time.contains(e.target);
  
      if (!isClickInsideFromModal && !isFromInpElm && $APPOINTMENT.from_opt_select_state === 1) {
          $APPOINTMENT.from_opt_select.style.display = 'none';
          $APPOINTMENT.from_opt_select_state = 0;
          $APPOINTMENT.from_time_arrow.classList.remove("rotate-arrow");
      }
  
      // For Calendar To Time From
      let isClickInsideToModal = $APPOINTMENT.to_opt_select.contains(e.target);
      let isToInpElm = $APPOINTMENT.to_time.contains(e.target);
  
      if (!isClickInsideToModal && !isToInpElm && $APPOINTMENT.to_opt_select_state === 1) {
          $APPOINTMENT.to_opt_select.style.display = 'none';
          $APPOINTMENT.to_opt_select_state = 0;
          $APPOINTMENT.to_time_arrow.classList.remove("rotate-arrow");
      }
  
      // For Appointments Form Event Frequency 
      let isClickInsideFreqModalAppoint = $APPOINTMENT_MODAL_ELMS.app_event_freq.contains(e.target);
      let isFreqInpElmAppoint = $APPOINTMENT_MODAL_ELMS.app_event_freq_input.contains(e.target);
  
      if (!isClickInsideFreqModalAppoint && !isFreqInpElmAppoint && $APPOINTMENT_MODAL_ELMS.app_event_freq_state === 1) {
          $APPOINTMENT_MODAL_ELMS.app_event_freq.style.display = 'none';
          $APPOINTMENT_MODAL_ELMS.app_event_freq_state = 0;
          $APPOINTMENT_MODAL_ELMS.app_event_freq_arrow.classList.remove("rotate-arrow");
      }
  
  
      // For Appointments Form Notify Frequency 
      let isClickInsideNotModalAppoint = $APPOINTMENT_MODAL_ELMS.app_notify_before.contains(e.target);
      let isNotiInpElmAppoint = $APPOINTMENT_MODAL_ELMS.app_notify_before_input.contains(e.target);
  
      if (!isClickInsideNotModalAppoint && !isNotiInpElmAppoint && $APPOINTMENT_MODAL_ELMS.app_notify_before_state === 1) {
          $APPOINTMENT_MODAL_ELMS.app_notify_before.style.display = 'none';
          $APPOINTMENT_MODAL_ELMS.app_notify_before_state = 0;
          $APPOINTMENT_MODAL_ELMS.app_notify_before_arrow.classList.remove("rotate-arrow")
      }
  
      // For Appointments Form Time From
      let isClickInsideFromModalAppoint = $APPOINTMENT_MODAL_ELMS.app_from_opt_select.contains(e.target);
      let isFromInpElmAppoint = $APPOINTMENT_MODAL_ELMS.app_from_time.contains(e.target);
  
      if (!isClickInsideFromModalAppoint && !isFromInpElmAppoint && $APPOINTMENT_MODAL_ELMS.app_from_opt_select_state === 1) {
          $APPOINTMENT_MODAL_ELMS.app_from_opt_select.style.display = 'none';
          $APPOINTMENT_MODAL_ELMS.app_from_opt_select_state = 0;
          $APPOINTMENT_MODAL_ELMS.app_from_time_arrow.classList.remove("rotate-arrow");
      }
  
      // For Appointments To Time From
      let isClickInsideToModalAppoint = $APPOINTMENT_MODAL_ELMS.app_to_opt_select.contains(e.target);
      let isToInpElmAppoint= $APPOINTMENT_MODAL_ELMS.app_to_time.contains(e.target);
  
      if (!isClickInsideToModalAppoint && !isToInpElmAppoint && $APPOINTMENT_MODAL_ELMS.app_to_opt_select_state === 1) {
          $APPOINTMENT_MODAL_ELMS.app_to_opt_select.style.display = 'none';
          $APPOINTMENT_MODAL_ELMS.app_to_opt_select_state = 0;
          $APPOINTMENT_MODAL_ELMS.app_to_time_arrow.classList.remove("rotate-arrow");
      }
    })
  }
// Reset ScrollBar
function resetScroll(){
  $APPOINTMENT.from_opt_select.scrollTo(0,0);
  $APPOINTMENT.to_opt_select.scrollTo(0,0);
  $APPOINTMENT_MODAL_ELMS.app_from_opt_select.scrollTo(0,0);
  $APPOINTMENT_MODAL_ELMS.app_to_opt_select.scrollTo(0,0);
}
document.addEventListener('DOMContentLoaded', function () {
    storageReplacer.init().then(function () {
        updateCurrentDateTime2();
        const widget = new Widget({
            activateTarget: true,
            firstLoad: {
                attribute: 'main',
                storage: {
                    item: 'onboarding',
                    value: 'yes'
                }
            }
        });
        widget.init();
        checkPiiStored();
        if (!storageReplacer.getLocalStorageItem("onboarding")) {
            storageReplacer.setLocalStorageItem("onboarding", 1);
        }
        triggerOpenWidget()
        window.setInterval(updateCurrentDateTime2, 1000);
        searchInput.value = '';
        

        
    });
});

function previousDateDisable(){
    var todayDate = new Date();
   
    var month = todayDate.getMonth() + 1;
    var day = todayDate.getDate();
    var year = todayDate.getFullYear();
    if(month < 10)
        month = '0' + month.toString();
    if(day < 10)
     day = '0' + day.toString();
    var maxDate = year + '-' + month + '-' + day;
    document.querySelector(".calendar_popup #event-date").setAttribute('min',maxDate)
    document.querySelector(".appointments_popup #event-date").setAttribute('min',maxDate)
  }


  appointmentsWidget = new FullCalendar.Calendar(appointmentsEl, {
	initialView: 'listWeek', // Initial view when the calendar loads
	headerToolbar: { start:'prev,next',center:'title',end: ''},
  listDayFormat: 'dddd, Do MMM',
  displayEventTime: true,
  displayEventEnd: true,
  listDaySideFormat: false,
	events: getEventsFromLocalStorage(),
  eventClick: function(info) {
    selectedEvent = info.event; // Store the selected event
    // show appintment edit details here

    //document.querySelector(".appointments_popup .event-popup") ? null : showEventDetails(info, true); // Second Parameter is to determine if the event is from appointment section
    if(document.querySelector(".appointments_popup .event-popup")){
      document.querySelector(".appointments_popup .event-popup").remove()
      showEventDetails(info, true);
    }else{
      showEventDetails(info, true);
    }
  },
  });
  searchInput.addEventListener('keyup', function(event) {
    var searchKeyword = searchInput.value.trim().toLowerCase();
    if (searchKeyword.length >= 1) {
      var filteredEvents = filterEvents(searchKeyword);
      displayFilteredEvents(filteredEvents);
      $(".clear-icon").addClass("active")
    }else{
      $(".clear-icon").removeClass("active")
      $("#seach-results-wrap").hide()
      $("#filteredEventsContainer").empty()
     
    }
    if (event.key === 'Enter') {
      if (searchKeyword !== '') {
        var filteredEvents = filterEvents(searchKeyword);
        displayFilteredEvents(filteredEvents);
        searchInput.value = ''; // Clear the search input
      }
    }
  });
  $(".search-icon").click(function(){
    var searchKeyword = searchInput.value.trim().toLowerCase();
    if (searchKeyword !== '') {
      var filteredEvents = filterEvents(searchKeyword);
      displayFilteredEvents(filteredEvents);
      searchInput.value = ''; // Clear the search input
    }
  });
  $(".clear-icon").click(function(){
    searchInput.value = "";
    $(".clear-icon").removeClass("active")
  });
  
  document.onclick = function(e){
    if(e.target.id !== 'seach-results-wrap'){
      //element clicked wasn't the div; hide the div
      //$("#seach-results-wrap").hide()
    }
    /* if($("[data-for='calendar_popup']").hasClass('active')){
      $(".logo").removeClass("activeTab")
    }else{
      $(".logo").addClass("activeTab")
    } */
  }
  var triggerDOM = document.getElementById('seach-results-wrap');
  document.body.addEventListener("click", e => {
    var element = e.target;
    while (element && element !== document.body) {
      if (element === this.triggerDOM) {
        // It was a click in `this.triggerDOM` or one of its
        // children; ignore it
        return;
      }
      element = element.parentNode;
    }
    // It wasn't a click anywhere in `this.triggerDOM`
    $("#seach-results-wrap").hide()
  }, false);
  document.addEventListener(
    "ClickedOutsideWidget",
    (e) => {
      $(".logo").removeClass("activeTab")
      searchInput.value = "";
    }
    );
  $("[data-for='calendar_popup'], .logo").click(function(e){
    $(".calendar_popup").toggleClass("active")
      if($("[data-for='calendar_popup']").hasClass('active')){
        $(".calendar_popup").addClass("hiddentab")
        $(".logo").removeClass("activeTab")
        searchInput.value = "";
      }else{
        $(".calendar_popup").removeClass("hiddentab")
        $(".logo").addClass("activeTab")
      }
  })
  $("[data-for='appointments_popup']").click(function(e){
      searchInput.value = "";
      if($("[data-val='appointments_popup']").hasClass('active')){
        $(".logo").removeClass("activeTab")
      }else{
        $(".logo").addClass("activeTab")
      }
  })
  $(".event-form input, .event-form textarea").focus(function(e){
    if ($(this).parent().find('.error-field').length !== 0) {
      $(this).parent().find('.error-field').remove();
    }
  }); 
  $(".event-form .arrow-icon").click(function(e){
    if ($(this).parent().find('.error-field').length !== 0) {
      $(this).parent().find('.error-field').remove();
    }
  }); 
  
  
  
  
  $(document).on("click", ".fc-more-link", function(){
    if($(".event-popup").length == 1){
      $(".event-popup").remove()
    }
  });
  
  const timeInputs = document.querySelectorAll('.timeInput');
  
  // Add an event listener to each input element
  timeInputs.forEach(function (input) {
    input.addEventListener('input', function () {
      validateTimeInput(input);
    });
  });
  
  function validateTimeInput(input) {
    // Remove any characters that are not numbers or colons
    input.value = input.value.replace(/[^0-9:]/g, '');
  }

//Notification logic
//
function sendReminderData(type, storereminderobj) {
    storereminderobj.buttons = [
        {
            title: 'Dismiss'
        },
        {
            title: 'Snooze',
            behaviour: 'updateSnoozeButtons',
            snoozeDuration: '300000'
        }
    ];

    storereminderobj.buttons = [
        {
            title: 'Got it'
        }
    ];


    // if (storereminderobj.timestampbefore5min >= new Date().getTime()) {
        storereminderobj.title = storereminderobj.title;
        storereminderobj.timestamp = storereminderobj.timestampbefore5min;
        // storereminderobj.NotificationIdentifier = setNotificationIdentifier(storereminderobj.notify);
        // storereminderobj.eventid + '-5min';
        document.dispatchEvent(
            new CustomEvent('handleNotification', {
                detail: Object.assign(
                    {
                        type: type
                    },
                    storereminderobj,
                    {
                        faviconUrl: "https://calendarplanner.co/calendar/images/favicon2.ico"
                    }
                )
            })
        );
    // }
}

function setNotificationIdentifier(notify) {
    var uniqueId = (new Date()).getTime() + "_" + Math.random().toString(36).substring(7);
    if (notify === '5 Minutes')
        uniqueId += '_5min';
    else if (notify === '10 Minutes')
        uniqueId += '_10min';
    else if (notify === '15 Minutes')
        uniqueId += '_15min';
    else if (notify === '30 Minutes')
        uniqueId += '_30min';
    return uniqueId;
}

function ReminderNotificationContent() {
    //console.log("ReminderNotificationContent called");

    function fireNotificationEvent(request) {
        if (request.method == 'NotificationButtonClick') {
            var NotificationButtonClick = new CustomEvent(
                'NotificationButtonClick',
                {
                    detail: JSON.stringify(request.NotificationData)
                }
            );
            document.dispatchEvent(NotificationButtonClick);
        }
    }

    function getButtonData() {
        try {
            chrome.runtime.onMessage.addListener(function (request,
                                                           sender,
                                                           sendResponse) {
                fireNotificationEvent(request);
            });
        } catch (err) {
            console.log(err);
        }
    }

    function setBackgroundNotification() {
        document.addEventListener('handleNotification', function (e) {
            // logger.log("setBackgroundNotification manage Notification", e);
            chrome.runtime.sendMessage(
                {task: 'handleNotification', data: e.detail},
                function (data) {
                }
            );
        });
    }

    return {
        getButtonData: getButtonData,
        setBackgroundNotification: setBackgroundNotification
    };
}

var reminderNotificationContent = ReminderNotificationContent();
reminderNotificationContent.setBackgroundNotification();
reminderNotificationContent.getButtonData();