var _docents = {};

function getUserInfo() {
    var url = baseURL.api + 'user';
    var ajax = $.get(url, function(response) {
        if (response) {
            cacheUserInfo(response);
            $(window).trigger('checked-user-type');
        }
        else if (LessonLinkReferrer.isGoogleClassroom()) {
            userSignup.callback = GoogleClassroom.syncEnrollment;
            userSignup('student');
        }
        else if (LessonLinkReferrer.exists()) {
            userSignup('student');
        }
        else {
            $('#new-user').show();
            $('.lesson-templates-dialog').hide();
            showIframe();
        }
    }).fail(function() {
        console.log('Failed to get user info');
    });
    return ajax;
}
function checkDocentMetadata(data) {
    if (typeof data === 'undefined' || typeof data.docent === 'undefined' || typeof data.docent.title === 'undefined') {
        var msg = {
            type: 'metadata'
        };
        sendMessage(msg);
    }
    if (!$('body').attr('data-docentID') && typeof data !== 'undefined' && typeof data.docent !== 'undefined') {
        $('body').attr('data-docentID', data.docent._id.$id);
        $(window).trigger('hasDocentID');
        data.docent.isOwner = true;
        _docents[data.docent._id.$id] = data.docent;
        if (window.Intercom) {
            var eventName = 'created-docent';
            var eventParams = {
                docent_id: data.docent._id.$id
            };
            if (document.referrer == 'https://insertlearning.com/v1/example/') {
                eventName = 'started-tutorial';
            }
            // Want a more robust solution using data.docent.isTutorial but that won't be set here
            else if (document.referrer == 'https://www.tweentribune.com/article/tween78/false-stories-travel-way-faster-truth/') {
                eventName = 'did-extended-tutorial';
            }
            if (data.docent.parentDocent) {
                eventName = 'created-child-docent';
                eventParams.parent_docent_id = data.docent.parentDocent.$id;
            }
            Intercom('trackEvent', eventName, eventParams);
            updateIntercom(eventName);
        }
        $.post(baseURL.api + 'user/hubspot');
        // Refresh socket credentials
        connect();
    }
    if (!$('body').attr('data-url') && typeof data !== 'undefined' && typeof data.docent !== 'undefined') {
        $('body').attr('data-url', data.docent.url);
    }
    if (typeof checkDocentMetadata.callback == 'function') {
        checkDocentMetadata.callback(data);
        delete checkDocentMetadata.callback;
    }
    console.log(data);
}
var ExtensionVersion = {
    get: function() {
        var versionString = $('body').attr('data-extension-version');
        return this.parse(versionString);
    },
    parse: function(versionString) {
        var versionArray = (versionString || 'NaN').split('.');
        var versionObject = {
            major: Number(versionArray[0]),
            minor: Number(versionArray[1]),
            patch: Number(versionArray[2])
        };
        return versionObject;
    },
    isGreaterOrEqual: function(targetVersionString) {
        var targetVersion = this.parse(targetVersionString);
        var currentVersion = this.get();
        if (currentVersion.major == targetVersion.major) {
            if (currentVersion.minor == targetVersion.minor) {
                return currentVersion.patch >= targetVersion.patch;
            }
            return currentVersion.minor > targetVersion.minor;
        }
        return currentVersion.major > targetVersion.major;
    }
}
function userSignup(userType) {
    var url = baseURL.api + 'user';
    var data = {
        userType: userType
    };
    $.post(url, data, function(response) {
        if (response) {
            cacheUserInfo(response);
            // quick hack so new user can copy a docent
            if (typeof userSignup.callback === 'function') {
                userSignup.callback();
            }
            else if (Object.keys(window._docents).length == 0) {
                showLessonTemplatesPrompt();
            }
        }
    });
    var msg = {
        type: 'hideIframe'
    };
    sendMessage(msg);
    $('#new-user').hide();
}
function cacheUserInfo(response) {
    window._userInfo = response;
    var msg = {
        type: 'userType',
        userType: response.userType,
        relay: true
    };
    // Block video recording for students on rbocesapps.org
    if (_userInfo.userType == 'student' && _userInfo.userEmail && _userInfo.userEmail.split('@')[1] == 'rbocesapps.org') {
        msg.disableVideoRecording = true;
    }
    sendMessage(msg);
    
    // window._googleProfile is set when signing in with gapi.auth2 as it let's us immediately access some info without waiting for getUserInfo()
    // However, _googleProfile won't get set when signing in through the extension
    // We'll shim it here if it's not already set
    // Look into if the immediate access of _googleProfile is necessary or it can be replaced with _userInfo
    if (typeof _googleProfile == 'undefined') {
        window._googleProfile = {
            id: _userInfo.googleID,
            name: _userInfo.userName,
            imageUrl: _userInfo.profileImage,
            email: _userInfo.userEmail
        };
        Sync.handlers.login();
    }
    
    if (window.Intercom) {
        Intercom('shutdown');
        if (response.userType != 'student' && !response.spoofed) {
            Intercom('boot', {
                app_id: 'yy1u1uw5',
                name: response.userName,
                email: response.userEmail,
                user_id: response._id.$id,
                user_hash: response.intercom_user_hash,
                created_at: parseInt(response._id.$id.substr(0,8), 16),
                extension_version: $('body').attr('data-extension-version'),
                hide_default_launcher: true,
                role: response.role,
                subject: JSON.stringify(response.subjectArea) || '',
                grade: JSON.stringify(response.gradeLevel) || '',
                subscription_plan: response.subscription && response.subscription.plan,
                subscription_ends_at: (response.subscription && response.subscription.current_period_end) || null
            });
            $(window).trigger('intercom-boot');
            Intercom('onUnreadCountChange', badgeFeedbackButton);
        }
    }
    
    $('.docent-options-list-item')
        .has('.fa-gear')[response.userType == 'student' ? 'show' : 'hide']()
        .end()
        .has('.fa-check,.fa-info-circle,.fa-share,.fa-eye,.fa-print,.fa-heart-o,.fa-support')[response.userType == 'teacher' ? 'show' : 'hide']();
    
    $('body').attr('data-userType', response.userType);
    
    Payment.testIfNecessary(null, response.subscription);
    
    ga('set', 'dimension1', response.userType);
}
function enroll(classCode) {
    var url = baseURL.api + 'courses';
    var data = {
        classCode: classCode
    };
    $.post(url, data, function(response) {
        if (response) {
            if (response.ok) {
                if (response.n == 1) {
                    if (response.nModified == 1) {
                        statusMessage('Success! You are now enrolled.');
                        sendMessage({type: 'login' });
                    }
                    else if (response.nModified == 0) {
                        statusMessage('You are already in that class, and this lesson is not assigned to that class.', 5000);
                    }
                    else console.log(response);
                }
                else if (response.n == 0) {
                    statusMessage("Couldn't find your class. Please check that you have the correct class code.");
                }
                else console.log(response);
            }
        }
        else {
            statusMessage('Something went wrong, please try again.');
        }
    });
}

// For payment to be necessary there are two conditions:
// 1: the user needs to have an expired subscription
// 2: the user doesn't already have a docent on this webpage
var Payment = {
    showFirstView: function() {
        $('.payment-details').hide();
        $('.payment-intro').show();
        $('.payment-continue').prop('disabled', false);
    },
    showLastView: function(coupon) {
        var plan = $('[name="plan"]:checked').val();
        $('.payment-description').attr('data-plan', plan);
        if (typeof coupon == 'object' && coupon.valid) {
            var amount = (plan == 'year') ? 4000 : 800;
            if (coupon.amount_off) {
                amount -= coupon.amount_off;
            }
            if (coupon.percent_off) {
                amount *= (100 - coupon.percent_off) / 100;
            }
            amount = Math.round(amount) / 100;
            if (amount % 1 > 0) {
                amount = amount.toFixed(2);
            }
            if (amount == 0) {
                var data = $('.payment-form').serializeArray();
                $.post(baseURL.api + 'user/subscription', data, Payment.callback).fail(Payment.error);
                return false;
            }
            $('.payment-description').attr('data-amount', amount);
            $('.payment-continue').prop('disabled', false);
        }
        else {
            $('.payment-description').removeAttr('data-amount');
        }
        $('.payment-intro').hide();
        $('.payment-details').show();
    },
    submit: function(event) {
        $('.payment-input').removeClass('error');
        var expiry = $('.payment-cc-exp').payment('cardExpiryVal');
        var data = {
            number: $('.payment-cc-num').val(),
            cvc: $('.payment-cc-cvc').val(),
            exp_month: expiry.month,
            exp_year: expiry.year,
            name: $('.payment-cc-name').val(),
            address_zip: $('.payment-cc-zip').val()
        };
        var $error = $();
        if ($.payment.validateCardCVC(data.cvc) == false) {
            $error = $('.payment-cc-cvc');
            $error.parent().addClass('error');
        }
        if ($.payment.validateCardExpiry(data.exp_month, data.exp_year) == false) {
            $error = $('.payment-cc-exp');
            $error.parent().addClass('error');
        }
        if ($.payment.validateCardNumber(data.number) == false) {
            $error = $('.payment-cc-num');
            $error.parent().addClass('error');
        }
        if ($error.length > 0) {
            $error.focus();
            return false;
        }
        $('.payment-submit').prop('disabled', true);
        Stripe.createToken(data, Payment.stripeHandler);
    },
    stripeHandler: function(status, response) {
        if (response.error) {
            Payment.error({responseJSON: response.error });
        }
        else {
            var data = $('.payment-form').serializeArray();
            var token = {
                name: 'token',
                value: response.id
            };
            data.push(token);
            $.post(baseURL.api + 'user/subscription', data, Payment.callback).fail(Payment.error);
        }
    },
    callback: function(response) {
        // Subscription's end is after today
        if (response && response.subscription && response.subscription.current_period_end > Date.now() / 1000) {
            _userInfo.subscription = response.subscription;
            hideIframe();
            if (Payment.activationCode) {
                window.parent.$('.activating').remove();
                window.parent.alert('Your yearly subscription to InsertLearning is now active.');
            }
            if (window.Intercom) {
                Intercom('update', {
                    'subscription_coupon': $('[name="coupon"]').val()
                });
            }
        }
        //$('.payment-submit').prop('disabled', false);
    },
    error: function(xhr) {
        console.log(arguments);
        $('.payment-continue').prop('disabled', false);
        $('.payment-submit').prop('disabled', false);
        alert(xhr.responseJSON.message);
    },
    prompt: function() {
        Payment.resetTests();
        $('.lesson-templates-dialog').hide();
        if (typeof chrome != 'undefined' && chrome.runtime && typeof chrome.runtime.getURL == 'function' && location.href == chrome.runtime.getURL('/lib/iframe/bridge.html')) {
            Payment.openNewWindow();
            return;
        }
        $('.payment-form').show().find('button').prop('disabled', false);
        showIframe();
        if (window._googleProfile) {
            $('.payment-cc-name').val(_googleProfile.name);
            $('.payment-cc-email').val(_googleProfile.email);
        }
    },
    openNewWindow: function() {
        var top = 0;
        var left = 0;
        var height = 390;
        var width = 300;
        if (screen.height > height) {
            top = Math.round((screen.height - height) / 3);
        }
        if (screen.width > width) {
            left = Math.round((screen.width - width) / 2);
        }
        var url = baseURL.domain + baseURL.version + '/subscribe/';
        Payment.__window = window.open(url, '_blank', 'width=' + width + ',height=' + height + ',top=' + top + ',left=' + left);
        $('body').addClass('require-action');
        showIframe();
        $(window).on('beforeunload', function() {
            Payment.__window.close();
        })
    },
    messageHandler: function(message, origin) {
        switch (message.type) {
            case 'open':
                clearInterval(Payment.__timer);
                var msg = {
                    type: 'credentials',
                    token: gapi.auth.getToken(),
                    email: window._userInfo && _userInfo.userEmail
                };
                Payment.__window.postMessage(msg, origin);
                break;
            case 'subscribe':
                $('body').removeClass('require-action');
                Payment.__window.close();
                delete Payment.__window;
                Payment.callback({
                    subscription: message.subscription
                });
                break;
            case 'close':
                Payment.__timer = setInterval(function() {
                    if (Payment.__window.closed) {
                        var msg = {
                            type: 'unload'
                        };
                        sendMessage(msg);
                    }
                }, 100);
                break;
        }
    },
    testIfNecessary: function(docents, subscription) {
        // callback for /api/user
        if (!docents && subscription && subscription.current_period_end < Date.now() / 1000) {
            Payment.subscriptionIsExpired = true;
            if (Payment.noExistingDocents) {
                Payment.prompt();
            }
            if (subscription.plan != 'trial') {
                $('.payment-reason').text('Your previous subscription has expired.');
            }
        }
        // callback for /api/docents
        else if (docents && Object.keys(docents).length == 0) {
            Payment.noExistingDocents = true;
            if (Payment.subscriptionIsExpired) {
                Payment.prompt();
            }
        }
        // Disable "lesson making" for students on rbocesapps.org
        if (window._userInfo && _userInfo.userType == 'student' && _userInfo.userEmail && _userInfo.userEmail.split('@')[1] == 'rbocesapps.org') {
            Payment.disableStudentDocents = true;
        }
        if (Payment.noExistingDocents && Payment.disableStudentDocents) {
            var msg = {
                type: 'unload'
            };
            sendMessage(msg);
        }
    },
    resetTests: function() {
        Payment.noExistingDocents = false;
        Payment.subscriptionIsExpired = false;
    },
    subscriptionIsExpired: false,
    noExistingDocents: false
};



///// Taken from dashboard and modified
///// should probably refactor this into a separate file that is shared between both contexts
var GoogleClassroom = {
    getConfig: function() {
        var config = {
            url: 'https://classroom.googleapis.com/v1/courses?teacherId=me&courseStates=ACTIVE',
            scopes: 'https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.coursework.students',
            done: GoogleClassroom.listCoursesDone,
            fail: GoogleClassroom.listCoursesFail,
            denied: function() {
                $('.share-to-google-classroom').prop('disabled', false);
            }
        };
        return config;
    },
    listCourses: function() {
        var config = GoogleClassroom.getConfig();
        useOtherGoogleAPI(config);
        $('.share-to-google-classroom').prop('disabled', true);
    },
    listCoursesDone: function(response) {
        var $select = $('.share-to-google-classroom-select');
        $select.empty();
        if (!response.courses) {
            GoogleClassroom.listCoursesFail({
                responseJSON: {
                    error: {
                        message: '@NoClassesFound'
                    }
                }
            });
            return;
        }
        var assigned = [];
        $('.docent-assign-dialog .docent-assigned').each(function() {
            assigned.push($(this).attr('value'));
        });
        for (var i in response.courses) {
            var googleClass = response.courses[i];
            if (googleClass.section) {
                googleClass.name += ' (' + googleClass.section + ')';
            }
            var $option = $('<div>', {
                class: 'share-to-google-classroom-option',
                text: googleClass.name,
                'data-id': googleClass.id
            });
            var courseID = GoogleClassroom.__data[googleClass.id];
            if (!courseID) {
                $option.addClass('needs-import');
            }
            else if (assigned.indexOf(courseID) != -1) {
                $option.addClass('selected');
            }
            $option.appendTo($select);
        }
        $('.share-to-google-classroom-modal').fadeIn(100, function() {
            $('.share-to-google-classroom').prop('disabled', false); 
        });
        GoogleClassroom.schedule.setup();
    },
    listCoursesFail: function(xhr) {
        $('.share-to-google-classroom').prop('disabled', false);
        switch (xhr.responseJSON.error.message.split(' ')[0]) {
            case '@ClassroomDisabled':
                statusMessage('Talk to your admin about enabling Google Classroom.');
                break;
            case '@NotGoogleAppsUser':
                statusMessage('Sign in with a Google Apps for Education account.');
                break;
            // This is a custom error message that we defined
            case '@NoClassesFound':
                statusMessage('No classes found. Make sure you are signed in to the correct account.');
                break;
            default:
                statusMessage('Something went wrong, please try again.');
                break;
        }
    },
    importCourse: function(courseName, googleClassroomID) {
        var url = baseURL.api + 'courses';
        var data = {
            courseName: courseName,
            googleClassroomID: googleClassroomID
        }
        $.post(url, data, function(response) {
            console.log('Class imported');
        });
    },
    syncEnrollment: function() {
        $.post(baseURL.api + 'courses', {sync: 'GoogleClassroom'}, function(resp) {
            var msg = {
                type: 'login'
            };
            sendMessage(msg);
            // Refresh socket credentials
            connect();
            
            GoogleClassroom.__synced = true;
        });
    },
    schedule: {
        setup: function() {
            var date = new Date();
            date.setDate(date.getDate() + 1);
            var $inputs = $('.share-to-google-classroom-schedule-input');
            $inputs.filter('[type="date"]').val(date.toISOString().split('T')[0]).removeClass('error').on('change', function() {
                $(this)[this.value ? 'removeClass' : 'addClass']('error');
            });
            $inputs.filter('[type="time"]').val('08:00');

            $('.share-to-google-classroom-schedule-toggle').addClass('fa-calendar-plus-o').removeClass('fa-calendar-minus-o');
        },
        getTimestamp: function() {
            var $inputs = $('.share-to-google-classroom-schedule-input');
            // Replace - with / for Safari
            var dateString = $inputs.filter('[type="date"]').val().replace(/\-/g, '/');
            // Need a space before AM/PM
            var timeString = $inputs.filter('[type="time"]').val().replace(/(a|p)m/i, ' $1m')
            var datetime = new Date(dateString + ' ' + timeString);
            try {
                return datetime.toISOString();
            }
            catch(e) {
                return e.message;
            }
        }
    },
    shareToClassroom: function() {
        $('.share-to-google-classroom-confirm').prop('disabled', true);
        var data = $('.share-to-google-classroom')[0].dataset;
        var courseWork = {
            title: data.title,
            description: 'This is an InsertLearning assignment.',
            materials: [{
                link: {
                    url: data.url
                }
            }],
            maxPoints: 100,
            workType: 'ASSIGNMENT',
            state: 'PUBLISHED'
        };
        if ($('.share-to-google-classroom-schedule-input').is(':visible')) {
            courseWork.state = 'DRAFT';
            courseWork.scheduledTime = GoogleClassroom.schedule.getTimestamp();
        }
        var settings = {
            type: 'POST',
            data: JSON.stringify(courseWork),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
        };
        var deferreds = [];
        var assigned = [];
        $('.docent-assign-dialog .docent-assigned').each(function() {
            assigned.push($(this).attr('value'));
        });
        $('.share-to-google-classroom-modal .selected').each(function() {
            settings.url = 'https://classroom.googleapis.com/v1/courses/' + this.dataset.id + '/courseWork';
            var ajax = $.ajax(settings);
            deferreds.push(ajax);
            var courseID = GoogleClassroom.__data[this.dataset.id];
            if (!courseID) {
                $(window).one('imported-google-class-' + this.dataset.id, function(event) {
                    var params = {
                        docentID: $('.share-to-google-classroom').attr('data-id'),
                        courseID: event.courseID
                    };
                    assignCourse(params);
                    $('.docent-assign-option[value="' + event.courseID + '"]').addClass('docent-assigned');
                });
            }
            else if (assigned.indexOf(courseID) == -1) {
                $('.docent-assign-option[value="' + courseID + '"]').click();
            }
        });
        $('.docent-assign-confirm').click();
        $.when.apply($, deferreds).done(function() {
            var courseWorkArray = [];
            for (var i=0, l=deferreds.length; i<l; ++i) {
                var response = arguments[i][0] || arguments[0];
                courseWorkArray[i] = {
                    id: response.id,
                    course: {
                        id: GoogleClassroom.__data[response.courseId],
                        googleClassroomID: response.courseId
                    }
                };
            }
            $.post(baseURL.api + 'docents/' + data.id + '/courseWork', {courseWork: courseWorkArray }, function() {
                console.log('CourseWork saved to server');
            });
            $('.share-to-google-classroom-confirm').prop('disabled', false);
            $('.share-to-google-classroom-modal').fadeOut(100);
            statusMessage('Done!', 1500);
            hideIframe();
        })
        .fail(function(xhr) {
            console.log('Error :(', arguments);
            $('.share-to-google-classroom-confirm').prop('disabled', false);
            statusMessage('Error - ' + xhr.responseJSON.error.message);
        });
    },
    __data: {}
};
function useOtherGoogleAPI(config) {
    var auth2 = gapi.auth2.getAuthInstance();
    var user = auth2.currentUser.get();
    var fn = function() {
        fixAccessToken(user);
        $.get(config.url, config.data)
            .done(config.done)
            .fail(config.fail);
    };
    if (user.hasGrantedScopes(config.scopes)) {
        fn();
    }
    else if (config.prompt !== false) {
        var promise = user.grant({scope: config.scopes }).then(fn);
        if (window.Promise && typeof(Promise.resolve) === 'function' && typeof(config.denied) === 'function') {
            Promise.resolve(promise).catch(config.denied);
        }
    }
    else if (typeof config.denied === 'function') {
        config.denied();
    }
}
function fixAccessToken(user) {
    for (var i in user) {
        if (user[i] && user[i].access_token) {
            gapi.auth.getToken = function() { return user[i]; };
            break;
        }
    }
}
var JWT = {
    originWhitelist: [
        'https://okeebo.com',
        'https://insertlearning.com',
        'https://chinchilla-ferret-m7hm.squarespace.com',
        'https://www.lumpybones.com'
    ]
};
/////



function getCourses() {
    var url = baseURL.api + 'courses';
    var ajax = $.get(url, function(response) {
        var courseList = {};
        var students = {};
        var teachers = {};
        var rosters = {};
        var isModerator = {};
        var courseCount = {
            created: 0,
            enrolled: 0
        };
        for (var i in response) {
            rosters[i] = [];
            courseList[i] = response[i].name;
            isModerator[i] = response[i].isModerator;
            for (var j in response[i].students) {
                var student = response[i].students[j];
                students[student._id.$id] = student.userName;
                rosters[i].push(student._id.$id);
            }
            if (response[i].teacher) {
                teachers[i] = response[i].teacher;
            }
            if (response[i].googleClassroomID) {
                GoogleClassroom.__data[response[i].googleClassroomID] = i;
            }
            if (response[i].isAdmin) {
                courseCount.created += 1;
            }
            else if (!response[i].isModerator) {
                courseCount.enrolled += 1;
            }
        }
        window._courses = courseList;
        window._isModerator = isModerator;
        window.getStudentName = function(studentID) {
            return students[studentID];
        };
        window.getTeacherForCourse = function(courseID) {
            return teachers[courseID];
        };
        window.newStudentInCourse = function(student, courseID) {
            if (courseID in rosters == false) {
                rosters[courseID] = [];
            }
            rosters[courseID].push(student._id.$id);
            students[student._id.$id] = student.userName;
        };
        window.countAllStudents = function() {
            return Object.keys(students).length;
        };
        window._courseCount = courseCount;
        window._rosters = rosters;
    })
    .fail(function() {
        console.log('Failed to get courses');
    });
    return ajax;
}
var baseURL = {
    domain: 'https://insertlearning.com/',
    version: 'v1'
};
baseURL.api = baseURL.domain + baseURL.version + '/api/';
baseURL.util = baseURL.domain + baseURL.version + '/util/';
baseURL.dashboard = baseURL.domain + baseURL.version + '/dashboard/';

function showSettings() {
    if (window._userInfo && _userInfo.userType == 'teacher' && $('body').attr('data-parentDocentID') == undefined) {
        if (!window._courses) {
            hideIframe();
        }
        selectCourse();
        return;
    }
    var $settings = $('#settings');
    $settings.children('img').attr('src', _googleProfile.imageUrl);
    var $p = $settings.children('p');
    $p.eq(0).html(_googleProfile.name);
    $p.eq(1).html(_googleProfile.email);
    
    var $select = $('<select>');
    if (window._docents) {
        var skip = {};
        for (var i in _docents) {
            if (i in skip) {
                continue;
            }
            var groups = _docents[i].groups;
            if (_docents[i].parentDocent) {
                var parentDocentID = _docents[i].parentDocent.$id;
                // if an <option> has already been built for the parentDocent, replace the value
                var $parentOption = $select.children('option[value="' + parentDocentID + '"]');
                if ($parentOption.length) {
                    $parentOption.val(i);
                    continue;
                }
                groups = _docents[parentDocentID] && _docents[parentDocentID].groups;
                skip[parentDocentID] = 1;
            }
            var groupName = '';
            if (groups) for (var j=0, l=groups.length; j<l; ++j) {
                var course = _courses[groups[j].$id];
                if (course) {
                    if (groupName.length > 0) groupName += ' / ';
                    groupName += course;
                    if (window.getTeacherForCourse) {
                        groupName += ' (' + getTeacherForCourse(groups[j].$id) + ')';
                    }
                }
            }
            if (!groupName) {
                groupName = (window._userInfo && _userInfo.userType == 'teacher') ? '(unassigned)' : '(personal notes)';
            }
            var $option = $('<option>', {
                value: i,
                html: groupName,
                selected: ($('body').attr('data-docentID') == i || $('body').attr('data-parentDocentID') == i)
            });
            $select.append($option);
        }
    }
    $settings.children('select').html($select.html());
    
    actionButtonForSettings();
    
    $settings.show();
    var width = Math.max($p.eq(0).width(), $p.eq(1).width()) + 125;
    $settings.css('width', width);
    if ($settings.children('select').outerHeight() < 25) {
        $settings.children('select').css({
            'background-color': 'white',
            'height': 31
        });
    }
}
function actionButtonForSettings() {
    var $settings = $('#settings');
    var $select = $settings.children('select');
    var $actionButton = $settings.children('.docent-mark,.docent-done,.docent-assign,.docent-share');
    if ($('body').attr('data-parentDocentID') == undefined) {
        $actionButton.attr('class', 'docent-share');
    }
    else {
        var newClass = 'docent-mark';
        var docentID = $select.val();
        if (window._docents && _docents[docentID] && _docents[docentID].parentDocent) {
            docentID = _docents[docentID].parentDocent.$id;
        }
        if (Array.isArray(_userInfo.done_docents) && $.grep(_userInfo.done_docents, function(o) { return o.$id == docentID; }).length > 0) {
            newClass = 'docent-done';
        }
        $actionButton.attr('class', newClass);
    }
}

function sendMessage(msg) {
    var useWithoutExtension;
    // "?extension=no" in the query string is docent.js requesting we don't send messages through the extension
    // We'll allow this request if the parent origin is on our whitelist for using the JS library
    if (location.search == '?extension=no') {
        var link = document.createElement('a');
        link.href = document.referrer;
        useWithoutExtension = (JWT.originWhitelist.indexOf(link.origin) != -1);
    }
    if (!useWithoutExtension && ExtensionVersion.isGreaterOrEqual('1.11.0') && location.origin != 'https://www.okeebo.com') {
        if (!sendMessage.key) {
            var array = new Uint32Array(5);
            window.crypto.getRandomValues(array);
            sendMessage.key = array.join('');
            sendMessage({
                type: 'setMessagingKey',
                key: sendMessage.key
            });
        }
        window.postMessage({
            type: 'relayFromIframeBridge',
            msg: msg
        }, location.origin);
    }
    else {
        window.parent.postMessage(JSON.stringify(msg), '*');
    }
}

function showIframe(speed) {
    var msg = {
        type: 'showIframe',
        speed: speed
    };
    sendMessage(msg);
}

function hideIframe(speed) {
    var $body = $('body');
    if ($body.hasClass('return-to-share-dialog')) {
        $('.modal-dialog').hide();
        $('.share-dialog').show();
        var docentID = $body.removeClass('return-to-share-dialog').attr('data-docentID');
        $('.share-publicly > input').prop('checked', !!_docents[docentID].public);
        return;
    }
    setTimeout(function() {
        $('#settings,.payment-form,.docent-options-list,.modal-dialog,.referral-modal').hide();
        $('.help-center').addClass('hidden');
        $('body').removeClass('gray-background');
    }, 400);
    var msg = {
        type: 'hideIframe'
    };
    if (typeof speed === 'number') {
        msg.speed = speed;
    }
    sendMessage(msg);
}

function selectCourse(quick) {
    var docentID = $('#settings > select').val() || $('body').attr('data-docentID');
    var docent = _docents[docentID];
    var groups = (docent && docent.groups) || [];
    var assigned = [];
    groups.forEach(function(id) {
        if (id) assigned.push(id.$id);
    });
    var list = _courses;
    var $dialog = $('.docent-assign-dialog');
    var $select = $dialog.children('.docent-assign-select');
    if (!quick) {
        var $options = $();
        for (var i in list) {
            if (!_isModerator[i]) continue;
            var $option = $('<p />', {
                class: 'docent-assign-option',
                text: list[i],
                value: i
            });
            if (assigned.indexOf(i) != -1) {
                $option.addClass('docent-assigned unassign-warning');
            }
            $options = $options.add($option);
        }
        $options.sort(function(a,b) {
            return a.textContent > b.textContent ? 1 : -1;
        });
        $select.html($options);
        
        var $newCourseOption = $('<p />', {
            class: 'docent-assign-new-course',
            html: '<i class="fa fa-plus-circle" style="margin-right: 4px;"></i> Create a new class'
        });
        $dialog.children('.docent-assign-select').prepend($newCourseOption);
    }
    
    var url = baseURL.domain + baseURL.version + '/lesson/' + docentID;
    
    if (docent && docent.distilled) {
        url = baseURL.domain + baseURL.version + '/refine/?url=' + encodeURIComponent(url);
    }

    $dialog.children('.share-to-google-classroom')
        .attr('data-id', docentID)
        .attr('data-url', url)
        .attr('data-title', docent && docent.title);
        
    $dialog.children('.docent-assign-hidden-link').val(url);
    
    var queues = {
        assign: {},
        unassign: {}
    };
    function appendQueue(queueType, courseID) {
        var otherQueue = (queueType == 'assign') ? 'unassign' : 'assign';
        if (queues[otherQueue][courseID]) {
            delete queues[otherQueue][courseID];
        }
        else {
            queues[queueType][courseID] = 1;
        }
    }
    
    $dialog.off('click').on('click', '.docent-assign-option', function(event) {
        var $this = $(this);
        if ($this.attr('disabled')) {
            return false;
        }
        $this.toggleClass('docent-assigned');
        /*
        var params = {
            docentID: docentID,
            courseID: $this.attr('value')
        };
        */
        var courseID = $this.attr('value');
        if ($this.hasClass('docent-assigned')) {
            //assignCourse(params);
            appendQueue('assign', courseID);
        }
        else if ($this.hasClass('unassign-warning')) {
            $this.addClass('docent-assigned');
            var $warning = $('.warning-modal').fadeIn(100).off('click');
            $warning.on('click', '.warning-confirm', function(event) {
                $this.removeClass('docent-assigned unassign-warning');
                //unassignCourse(params);
                appendQueue('unassign', courseID);
                $warning.fadeOut(100).off('click');
            })
            .on('click', '.warning-cancel', function(event) {
                $warning.fadeOut(100).off('click');
            });
            $warning.children('.warning-info').text('This will delete student answers and responses');
        }
        else {
            //unassignCourse(params);
            appendQueue('unassign', courseID);
        }
    })
    .on('click', '.docent-assign-new-course', function(event) {
        window.open(baseURL.dashboard + '#/classes/new', '_blank', null);
    })
    .on('click', '.docent-assign-confirm', function(event) {
        var $this = $(this).prop('disabled', true);
        if (!docentID) {
            newDocent(function() {
                docentID = $('body').attr('data-docentID');
                $this.prop('disabled', false).click();
            });
            return;
        }
        var requests = [];
        for (var i in queues.assign) {
            requests.push(assignCourse({docentID: docentID, courseID: i }));
        }
        for (var i in queues.unassign) {
            requests.push(unassignCourse({docentID: docentID, courseID: i }));
        }
        $.when.apply($, requests).then(function(schemas) {
            console.log('Successfully assigned courses', this);
            $this.prop('disabled', false);
            
            // Refresh socket credentials
            connect();
            
            if (!$('.share-to-google-classroom-modal').is(':visible')) {
                hideIframe();
            }
        }, function(e) {
            console.log('Failed to assign courses:', e);
            $this.prop('disabled', false);
        });
    })
    .on('click', '.share-to-google-classroom', function(event) {
        GoogleClassroom.listCourses();
    })
    .on('click', '.docent-assign-copy-link', function(event) {
        if ($('.docent-assign-option.docent-assigned').length == 0) {
            statusMessage('Assign to a class first');
            return;
        }
        if (!docentID) {
            var link = document.createElement('a');
            link.href = $('body').attr('data-url');
            // Have to synchronously create a lesson since document.execCommand('copy') doesn't really work async
            $.post({
                async: false,
                url: baseURL.api + 'docents',
                data: {
                    title: 'test',
                    domain: link.origin,
                    path: link.pathname
                },
                success: function(response) {
                    docentID = response._id.$id;
                    url = url.replace('undefined', docentID);
                    $dialog.children('.docent-assign-hidden-link').val(url);
                    $('body').attr('data-docentID', docentID);
                    _docents[docentID] = response;
                }
            });
            var msg = {
                type: 'metadata'
            };
            sendMessage(msg);
        }
        $dialog.children('.docent-assign-hidden-link').select();
        document.execCommand('copy');
        $('.docent-assign-confirm').click();
        statusMessage('Lesson link copied to clipboard');
        
        if (window.Intercom) {
            Intercom('trackEvent', 'copied-lesson-link', {
                docent_id: docentID
            });
        }
    });
    if ($dialog.height() > window.innerHeight) {
        $dialog.addClass('overflowing');
    }
    else {
        $dialog.removeClass('overflowing');
    }
    $('#settings').hide();
    $dialog.show();
}

// makes a new docent by posting metadata to the "docents" endpoint without a docentID
function newDocent(callback) {
    $('body').removeAttr('data-docentID data-parentDocentID data-childDocentID');
    $('.docent-assign-option').attr('disabled', 'disabled');
    
    checkDocentMetadata.callback = function(data) {
        $('.docent-assign-option').removeAttr('disabled');
        if (typeof callback == 'function') {
            callback(data);
        }
        if ($('.docent-assign-dialog').is(':visible')) {
            selectCourse(true);
        }
        renderDocent(data.docent._id.$id);
    }
    var msg = {
        type: 'metadata'
    };
    sendMessage(msg);
}

function assignCourse(params) {
    /*
    if (!params.docentID) {
        newDocent(function(data) {
            params.docentID = data.docent._id.$id;
            return assignCourse(params);
        });
        return;
    }
    */
    var url = baseURL.api + 'docents/' + params.docentID + '/courses/' + params.courseID;
    var data = {
        status: 'assigned'
    };
    var ajax = $.post(url, data, function(response) {
        console.log('Docent was successfully assigned to course.');
        /*
        statusMessage('Lesson assigned');
        */
        if (window._courses && window._docents) {
            if (!_docents[params.docentID]) {
                _docents[params.docentID] = {};
            }
            var groups = _docents[params.docentID].groups;
            if (groups) {
                for (var j=0, l=groups.length; j<l; ++j) {
                    if (groups[j].$id == params.courseID) return true;
                }
            }
            else {
                _docents[params.docentID].groups = [];
                groups = _docents[params.docentID].groups;
            }
            groups.push({$id: params.courseID});
        }
        if (window.Intercom) {
            Intercom('trackEvent', 'assigned-docent', {
                docent_id: params.docentID,
                course_id: params.courseID
            });
        }
    })
    .fail(function(xhr) {
        Sync.onFail(xhr, this);
    });
    
    return ajax;
}

function unassignCourse(params) {
    var url = baseURL.api + 'docents/' + params.docentID + '/courses/' + params.courseID;
    var data = {
        status: 'unassigned'
    }
    var ajax = $.post(url, data, function(response) {
        console.log('Docent was successfully unassigned from course.');
        if (window._courses && window._docents) {
            var groups = _docents[params.docentID] && _docents[params.docentID].groups;
            if (groups) {
                for (var j=0, l=groups.length; j<l; ++j) {
                    if (groups[j].$id == params.courseID) {
                        groups.splice(j, 1);
                        break;
                    }
                }
            }
        }
        if (window.Intercom) {
            Intercom('trackEvent', 'unassigned-docent', {
                docent_id: params.docentID,
                course_id: params.courseID
            });
        }
    })
    .fail(function(xhr) {
        Sync.onFail(xhr, this);
    });
    
    return ajax;
}

var Sync = {
    detectOnline: function() {
        if (Sync.detectOnline.timer) {
            clearTimeout(Sync.detectOnline.timer);
        }
        $.ajax({
            url: baseURL.domain,
            success: function(response) {
                console.log('Online!');
                Sync.serveQueue(Sync._queue.length);
            },
            error: function(xhr) {
                if (xhr.status == 0) {
                    Sync.detectOnline.timer = setTimeout(Sync.detectOnline, Sync.detectOnline.milliseconds);
                    console.log('Offline, testing again in six seconds...');
                }
                else {
                    $(window).trigger('online');
                    console.log('Online but error:', xhr.status, xhr.statusText);
                }
            }
        });
    },
    onFail: function(xhr, that, fromQueue) {
        if (xhr.status == 0) {
            Sync.addToQueue(that, fromQueue);
            Sync.detectOnline.timer = setTimeout(Sync.detectOnline, Sync.detectOnline.milliseconds);
        }
        else if (xhr.status == 401) {
            Sync.addToQueue(that, fromQueue);
            location.reload();
        }
        else {
            console.log('Error:', xhr.status, xhr.statusText);
        }
    },
    addToQueue: function(that, fromQueue) {
        if (!fromQueue) {
            Sync._queue.push({
                url: that.url,
                data: that.data
            });
        }
    },
    serveQueue: function(denominator, repeated) {
        if (denominator > 0) {
            var percent = denominator - Sync._queue.length;
            percent /= denominator;
            percent *= 100;
            console.log('Sync: ' + percent.toFixed(1) + ' %');
        }
        if (Sync._queue.length > 0) {
            var that = Sync._queue[0];
            $.post(that.url, that.data, function() {
                Sync._queue.shift();
                Sync.serveQueue(denominator, true);
            }).fail(function(xhr) {
                Sync.onFail(xhr, this);
            });
        }
        else if (repeated) {
            console.log('Synced!');
            var docentID = $('body').attr('data-docentID') || $('body').attr('data-parentDocentID');
            var location = $('<a>', {
                href: (window._docents && _docents[docentID] && _docents[docentID].url) || $('body').attr('data-url')
            })[0];
            getDocents(location.origin, location.pathname, function(docents) {
                if (docentID) renderDocent(docentID);
            });
        }
        else {
            console.log('Synced already!');
        }
    },
    handlers: {
        login: function() {
            console.log('Syncing...');
            var localStorage_queue = Sync.handlers.util.getLocalStorage();
            var googleID = window._googleProfile && _googleProfile.id;
            if (googleID != undefined) {
                $.merge(Sync._queue, localStorage_queue[undefined] || []);
                localStorage_queue[undefined] = [];
            }
            $.merge(Sync._queue, localStorage_queue[googleID] || []);
            localStorage_queue[googleID] = [];
            try {
                window.localStorage.setItem('SyncQueue', JSON.stringify(localStorage_queue));
            }
            catch(e) {
                console.log(e.message);
            }
            Sync.serveQueue(Sync._queue.length);
        },
        logout: function() {
            Sync.handlers.util.saveToLocalStorage();
            Sync._queue = [];
        },
        unload: function() {
            if (!Sync.handlers._unloaded) {
                Sync.handlers.util.saveToLocalStorage();
                Sync.handlers._unloaded = true;
            }
        },
        util: {
            getLocalStorage: function() {
                var localStorage_queue;
                try {
                    localStorage_queue = JSON.parse(window.localStorage.getItem('SyncQueue')) || {};
                }
                catch(e) {
                    localStorage_queue = {};
                    console.log(e.message);
                }
                return localStorage_queue;
            },
            saveToLocalStorage: function() {
                if (Sync._queue.length > 0) {
                    var localStorage_queue = Sync.handlers.util.getLocalStorage();
                    var googleID = window._googleProfile && _googleProfile.id;
                    if (!localStorage_queue[googleID]) {
                        localStorage_queue[googleID] = Sync._queue;
                    }
                    else {
                        $.merge(localStorage_queue[googleID], Sync._queue)
                    }
                    try {
                        window.localStorage.setItem('SyncQueue', JSON.stringify(localStorage_queue));
                    }
                    catch(e) {
                        console.log(e.message);
                    }
                }
            }
        }
    },
    _queue: []
};
Sync.detectOnline.milliseconds = 6000;  // test every six seconds

var LessonLinkReferrer = {
    get: function() {
        if (typeof(LessonLinkReferrer.__cache) == 'string') {
            return LessonLinkReferrer.__cache;
        }
        try {
            var resultingPage = sessionStorage.getItem('lessonLinkResultingPage');
            var currentPage = $('body').attr('data-url') || (document.referrer && document.referrer.split('?')[0]);
            if (resultingPage && resultingPage != currentPage) {
                LessonLinkReferrer.__cache = '';
            }
            else {
                sessionStorage.setItem('lessonLinkResultingPage', currentPage);
                LessonLinkReferrer.__cache = sessionStorage.getItem('lessonLinkReferrer');
            }
            return LessonLinkReferrer.__cache;
        }
        catch(e) {
            console.log(e.message);
            LessonLinkReferrer.__cache = '';
        }
    },
    isGoogleClassroom: function() {
        return !GoogleClassroom.__synced && this.get() == 'https://classroom.google.com';
    },
    exists: function() {
        return !!this.get();
    }
}


function getDocents(domain, path, callback) {
    var url = baseURL.api + 'docents';
    // Fix for Google Docs
    if (domain == 'https://docs.google.com') {
        path = path.replace(/(\/a\/[\w.]+)?\/document\/(u\/[0-9]+\/)?/,'/document/');
        var pathParts = path.split('/');
        if (pathParts[pathParts.length - 1] == "edit") {
            $('.publish-google-doc-dialog').show().one('click', '.publish-google-doc-confirm, .publish-google-doc-cancel', function(event) {
                var msg = {
                    type: 'unload',
                    google: $(this).is('.publish-google-doc-confirm')
                };
                sendMessage(msg);
            });
            showIframe();
            return;
        }
    }
    // Fix for Wikipedia
    domain = domain.replace(/\.m\.wikipedia\.org$/, '.wikipedia.org');
    // Fix for Newsela
    if (domain == 'https://newsela.com') {
        path = path.replace(/\/activities\/$/, '/');
    }
    
    var data = {
        url: domain + path
    };
    $.get(url, data, function(docents) {
        for (var i in docents) {
            _docents[i] = docents[i];
        }
        if (typeof callback === 'function') {
            callback(docents);
        }
        if (docents.length == 0) {
            var msg = {
                type: 'renderDocent',
                data: data
            };
            sendMessage(msg);
            $('body').removeAttr('data-docentID data-parentDocentID data-childDocentID');
        }
        Payment.testIfNecessary(docents);
        
        if (!LessonLinkReferrer.isGoogleClassroom() || docents.length != 0) {
            var msg = {
                type: 'doneLoading'
            };
            sendMessage(msg);
        }
    }).fail(function() {
        console.log('Failed to get docents');
    });
    $('body').attr('data-url', domain + path).attr('data-origin', domain);
    
    if (window.Intercom) {
        try {
            if (window.sessionStorage && sessionStorage.getItem && sessionStorage.getItem('pdf_url') == $('body').attr('data-url')) {
                Intercom('trackEvent', 'tried-experimental-pdf');
            }
        }
        catch(e) {
            console.log('Error', e.message);
        }
    }
}
function showLessonTemplatesPrompt() {
    if (window.Intercom) {
        Intercom('trackEvent', 'loaded-toolbar-on-new-page');
    }
    // disable templates for now
    return false;
    // don't show templates to student
    if (window._userInfo && _userInfo.userType == 'student') {
        return false;
    }
    // don't show templates to new users that are picking an account type
    if ($('#new-user').is(':visible')) {
        return false;
    }
    // show if the user hasn't opted out
    else if (!window._userInfo || !_userInfo.prompts || _userInfo.prompts.templates !== false) {
        $('.lesson-templates-dialog').show();
        showIframe();
        ga('send', 'event', 'Lesson Templates', 'show');
        return true;
    }
}
function getChildDocents(parentDocentID) {
    var url = baseURL.api + 'docents';
    var data = {
        parentDocentID: parentDocentID
    };
    $.get(url, data, function(docents) {
        var count = Object.keys(docents).length;
        console.log('Student annotations:', count);
        var msg = {
            type: (count ? 'show' : 'hide') + 'AnnotationSwitcher'
        };
        var $select = $('.annotation-switcher-select');
        $select.children().not(':first').remove();
        for (var i in docents) {
            // skip student annotations for students that are no longer in an assigned class
            if (window.getStudentName && getStudentName(docents[i].userID.$id) != docents[i].userName && !isCurrentUser(docents[i].userID)) {
                continue;
            }
            _docents[i] = docents[i];
            annotationSwitcher.addOption(i, docents[i].userName, $select);
        }
        sendMessage(msg);
        annotationSwitcher.sort();
    });
}
var annotationSwitcher = {
    sort: function() {
        var $options = $('.annotation-switcher-option');
        var $first = $options.first();
        $first.after($options.not($first).sort(function(a,b) { 
            return a.textContent < b.textContent ? -1 : 1; 
        }));
    },
    addOption: function(docentID, userName, $select) {
        $select = $select || $('.annotation-switcher-select');
        var $option = $('<div>', {
            class: 'annotation-switcher-option',
            'data-value': docentID,
            text: userName
        });
        $select.append($option);
    }
}
var questionStems = {
    __data: [
        'Summarize the above text.',
        'Identify the main idea of the text.',
        'List at least 2 supporting details of the paragraph.',
        'Explain how you know the purpose of the text as to inform, persuade, entertain.',
        'Predict, based on what you’ve read and seen so far, what the next paragraph is about.',
        'Paraphrase the previous sentence.',
        'Write one question that you’ve thought of based on the previous text.',
        'Find one vocabulary word and write a sentence about the content of the text using the word.',
        'Skim the text. What is your purpose for reading?',
        'What is a key word in the above text?'
    ],
    addOption: function(stemText, $select) {
        $select = $select || $('.question-stems-select');
        var $option = $('<div>', {
            class: 'question-stems-option',
            text: stemText
        });
        $select.append($option);
    },
    build: function() {
        var $select = $('.question-stems-select').empty();
        //questionStems.__data.sort();
        for (var i in questionStems.__data) {
            questionStems.addOption(questionStems.__data[i], $select);
        }
    }
};
var lessonTemplates = {
    __data: {
        'General Lesson': [{
            type: 'sticky',
            text: Math.random().toString().slice(2) + Date.now(),
            html: [
                'Use the highlighter tool to do the following in each paragraph.<br>',
                'Highlight in GREEN the main idea of each section.<br>',
                'Highlight in YELLOW one supporting detail of each section<br>',
                'Highlight in BLUE at least three things you have a question about or want to know more about.  Add a comment with your question.'
            ]
        }, {
            index: 0,
            type: 'discussion',
            text: 'What do you think this article will be about?'
        }, {
            index: -1,
            type: 'question',
            text: 'What was this article about?'
        }]
    },
    insert: function(templateName) {
        newDocent(function() {
            var msg = {
                type: 'lessonTemplate',
                elements: lessonTemplates.__data[templateName]
            };
            setTimeout(function() {
                sendMessage(msg);
            }, 0);
        });
    }
}
function renderDocent(docentID) {
    var isStudent = false;
    if (!window._docents) {
        console.log('No docents found');
        return false;
    }
    var data = _docents[docentID];
    
    // for backwards compatibiltiy
    if (data) {
        data.isOwner = data.isOwner || data.isModerator;
        data.owner = data.isOwner;
    }
    
    var msg = {
        type: 'renderDocent',
        data: data,
        docentID: docentID
    };
    if (data && data.parentDocent) {
        var parentDocentID = data.parentDocent.$id;
        var m = {
            type: 'renderDocent',
            data: _docents[parentDocentID],
            docentID: parentDocentID
        };
        sendMessage(m);
        msg.overlap = true;
        $('body').attr('data-parentDocentID', parentDocentID);
        isStudent = m.data && !m.data.isOwner && !m.data.isModerator;
    }
    else {
        if (data && data.isOwner && !data.accessCode && $('body').attr('data-docentID') != docentID) {
            getChildDocents(docentID);
        }
        $('body').removeAttr('data-parentDocentID');
    }
    sendMessage(msg);
    $('body').attr('data-docentID', docentID);
    if (data && !data.isOwner && !data.parentDocent) {
        $('body').removeAttr('data-docentID').attr('data-parentDocentID', docentID);
        isStudent = true;
    }
    if (isStudent) {
        var msg = {
            type: 'userType',
            userType: 'student'
        };
        sendMessage(msg);
        
        var changeOptionsListSpeed = 0;
        
        // Record that student viewed a lesson in the database
        var postData = {
            docentID: $('body').attr('data-parentDocentID')
        };
        if (!_docents[postData.docentID].teacherViewingAsStudent) {
            $.post(baseURL.api + 'viewings', postData, function(response) {
                console.log('Recorded lesson viewing:', response);
            });
        }
        else {
            changeOptionsListSpeed = 400;
        }
        
        setTimeout(function() {
            $('.docent-options-list-item')
                .has('.fa-gear').show()
                .end()
                .has('.fa-check,.fa-info-circle,.fa-share,.fa-eye,.fa-print,.fa-heart-o,.fa-support').hide();
        }, changeOptionsListSpeed);
    }
    if (data && data.isOwner && data.queryString) {
        var $newLessonOption = $('<div>', {
            class: 'docent-options-list-item',
            html: '<i class="fa fa-fw fa-plus-circle"></i>Make New Lesson'
        });
        $('.docent-options-list-item:has(.fa-info-circle)').after($newLessonOption);
        
        var link = document.createElement('a');
        link.href = document.referrer;
        if (data.queryString != link.search) {
            setTimeout(function() {
                alert(
`InsertLearning may have loaded the wrong lesson:
"${data.title}"

If that's the wrong lesson, click on the ellipsis (...) at the bottom of the InsertLearning toolbar and a list of options will appear. Choose "Make New Lesson" if you want a new lesson or "Go to Dashboard" if you want to load a different lesson.`
                );
            }, 0);
            if (window.Intercom) {
                Intercom('trackEvent', 'experienced-querystring-mismatch', {
                    docent_id: data._id.$id,
                    url: data.url,
                    docent_querystring: data.queryString,
                    page_querystring: link.search
                });
            }
        }
    }
    else {
        $('.docent-options-list-item:has(.fa-plus-circle)').remove();
    }
}
// get ID of question,discussion,sticky
function getElementID(msg) {
    if (msg.elementID) {
        return msg.elementID;
    }
    // backwards compatibility
    else if (msg.created != msg.modified) {
        var testCondition = function(item) {
            return item.ref == msg.ref && item.created == msg.created;
        };
        // Local convenience function that's preconfigured with elementType and testCondition
        var _getElement = function(docentID) {
            return getElement(docentID, msg.elementType, testCondition);
        };
        var element = _getElement($('body').attr('data-docentID')) || _getElement($('body').attr('data-parentDocentID'));
        if (element) {
            return element._id.$id;
        }
    }
    return false;
}
function getElement(docentID, elementType, testCondition) {
    var _docent = _docents[docentID];
    if (_docent && _docent[elementType + 's']) {
        var el = _docent[elementType + 's'].filter(testCondition);
        if (el.length > 0) {
            el[0].docentID = docentID;
            return el[0];
        }
    }
    return false;
}

// Have all ajax request send login credentials
$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        var request = $('<a>', {
            href: settings.url
        })[0];
        var token = window.gapi && gapi.auth && gapi.auth.getToken && gapi.auth.getToken();
        if (token) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token.access_token);
            if (token.id_token && request.hostname == window.location.hostname) {
                xhr.setRequestHeader('X-Id-Token', token.id_token);
            }
        }
    },
    cache: false
});

// window.postMessage from an iframe sometimes doesn't fire if the tab is in the background
$(document).on('visibilitychange', function(event) {
    if (document.visibilityState == 'visible' && window.gapi && gapi.auth && typeof $('body').attr('data-url') == 'undefined') {
        var msg = {
            type: 'login' 
        };
        sendMessage(msg);
        // Replace initial time for 'loadTime' event when this bug happens
        window._t0 = Date.now();
    }
});

$(document).ready(function() {
    $(document).on('click', function(event) {
        /*
        var $modal = $('.modal-dialog,#settings,.warning-modal,.share-to-google-classroom-modal,.docent-options-list,.help-center:not(.hidden)').not('.enroll-dialog');
        if ($modal.is(':visible') && !$modal.is(event.target) && $modal.has(event.target).length === 0) {
            hideIframe();
        }
        else if ($('body').hasClass('show-discussion-filter') && $(event.target).closest('.discussion-filter-select').length == 0) {
            hideIframe(0);
        }
        else if ($('body').hasClass('show-annotation-switcher') && $(event.target).closest('.annotation-switcher-select').length == 0) {
            hideIframe(0);
        }
        else if ($('body').hasClass('show-question-stems') && $(event.target).closest('.question-stems-select').length == 0) {
            hideIframe(0);
        }
        */
        if (event.target == document.body && !$('.require-action').is(':visible')) {
            var speed;
            if ($('body').is('.show-discussion-filter,.show-annotation-switcher,.show-question-stems')) {
                speed = 0;
            }
            hideIframe(speed);
        }
        else if (Payment.__window && !Payment.__window.closed && typeof Payment.__window.focus == 'function') {
            Payment.__window.focus();
        }
        else {
            $('.lesson-templates-select').removeClass('show');
        }
    });
    $('.help-center').on('click', '.fa-times', function(event) {
        hideIframe();
    });
    $(window).on('beforeunload unload', Sync.handlers.unload);
    
    $('#settings').on('click', '.sign-out', function(event) {
        gapi.auth.signOut();
        $('#settings').hide();
    }).on('click', '.close', function(event) {
        hideIframe();
    }).on('change', 'select', function(event) {
        var docentID = $(this).val();
        renderDocent(docentID);
        actionButtonForSettings();
    }).on('click', '.docent-mark', function(event) {
        var $this = $(this);
        $this.prop('disabled', true);
        var docentID = $('#settings > select').val();
        if (window._docents && _docents[docentID] && _docents[docentID].parentDocent) {
            docentID = _docents[docentID].parentDocent.$id;
        }
        var url = baseURL.api + 'docents/' + docentID;
        var data = {
            status: 'done'
        };
        $.post(url, data, function(response) {
            console.log('Marked as done');
            $this.attr('class', 'docent-done').prop('disabled', false);
        }).fail(function() {
            console.log('Failed');
            $this.prop('disabled', false);
        });
    }).on('click', '.docent-done', function(event) {
        var $this = $(this);
        $this.prop('disabled', true);
        var docentID = $('#settings > select').val();
        if (window._docents && _docents[docentID] && _docents[docentID].parentDocent) {
            docentID = _docents[docentID].parentDocent.$id;
        }
        var url = baseURL.api + 'docents/' + docentID;
        var data = {
            status: 'undone'
        };
        $.post(url, data, function(response) {
            console.log('No longer marked');
            $this.attr('class', 'docent-mark').prop('disabled', false);
        }).fail(function() {
            console.log('Failed');
            $this.prop('disabled', false);
        });
    })
    .on('click', '.docent-share', function(event) {
        $('.docent-options-list-item').has('.fa-share').click();
    });
    
    $('.docent-assign-close').on('click', function(event) {
        hideIframe();
    });
    
    $('.share-to-google-classroom-modal').on('click', function(event) {
        $(event.target).filter(event.delegateTarget).fadeOut(100);
    })
    .on('click', '.share-to-google-classroom-option', function(event) {
        var $this = $(this);
        if ($this.hasClass('needs-import')) {
            if (!confirm('InsertLearning needs to import this class')) {
                return false;   
            }
            GoogleClassroom.importCourse($this.text(), this.dataset.id);
            $this.removeClass('needs-import');
        }
        $this.toggleClass('selected');
    })
    .on('click', '.share-to-google-classroom-schedule-toggle', function(event) {
        $(this).toggleClass('fa-calendar-plus-o fa-calendar-minus-o');
    })
    .on('click', '.share-to-google-classroom-confirm', function(event) {
        if (!$('body').attr('data-docentID')) {
            newDocent(function(data) {
                var $assigned = $('.docent-assigned');
                selectCourse(true);
                $assigned.removeClass('docent-assigned').click();
                GoogleClassroom.shareToClassroom();
            });
            return;
        }
        GoogleClassroom.shareToClassroom();
    });
    
    $('.docent-options-list').on('click', '.docent-options-list-item', function(event) {
        ga('send', 'event', 'Toolbar Options', 'click', $(this).text().trim());
    })
    .on('click', ':has(.fa-check)', function(event) {
        $('.docent-options-list').hide();
        selectCourse();
    })
    .on('click', ':has(.fa-share)', function(event) {
        var $this = $(this);
        var docentID = $('body').attr('data-docentID');
        if (!docentID) {
            $this.prop('disabled', true).addClass('disabled');
            newDocent(function() {
                $this.prop('disabled', false).click();
            });
        }
        var done = function() {
            $('.docent-options-list,#settings').hide();
            $('.share-input').val(_docents[docentID].shareLink);
            $('.share-publicly > input').prop('checked', !!_docents[docentID].public);
            $('.share-dialog').show();
        }
        if (_docents[docentID].shareLink) {
            done();
        }
        else {
            $this.prop('disabled', true).addClass('disabled');
            var url = baseURL.api + 'docents/' + docentID + '/shareLink';
            $.post(url, function(response) {
                _docents[docentID].shareLink = response.shareLink;
                done();
                $this.prop('disabled', false).removeClass('disabled');
            });
        }
    })
    .on('click', ':has(.fa-info-circle)', function(event) {
        var done = function(docent) {
            $('.docent-options-list').hide();
            var $dialog = $('.rename-dialog').show();
            $('.rename-input').val(docent.title).focus();
            
            var $checkboxes = $dialog.find('input[type="checkbox"]');
            $checkboxes.prop('checked', false);

            var metadataArray = [];
            var metadataTypes = ['subjectArea', 'gradeLevel'];
            for (var i in metadataTypes) {
                metadataArray = metadataArray.concat(docent[metadataTypes[i]]);
            }
            $checkboxes.filter(function() {
                return metadataArray.indexOf(this.value) != -1;
            })
            .prop('checked', true);

            $checkboxes.filter('[name="public"]').prop('checked', docent.public);

            $('.lesson-metadata-custom-tags input').val((docent.customTags || []).join(', '));
        };
        var $this = $(this);
        var docentID = $('body').attr('data-docentID');
        if (!docentID) {
            $this.prop('disabled', true).addClass('disabled');
            newDocent(function(data) {
                $this.prop('disabled', false).removeClass('disabled');
                done(data.docent);
            });
            console.log('Create a new lesson before assiging.');
        }
        else {
            done(_docents[docentID]);
        }
    })
    .on('click', ':has(.fa-plus-circle)', function(event) {
        newDocent(function(data) {
            hideIframe();
            statusMessage('New lesson created');
            try {
                localStorage.setItem('docentID', data.docent._id.$id);
                localStorage.setItem('docentURL', data.docent.url);
            }
            catch(e) {
                console.log('Error', e.message);
            }
        });
    })
    .on('click', ':has(.fa-eye)', function(event) {
        viewLessonAsStudent();
        hideIframe();
    })
    .on('click', ':has(.fa-print)', function(event) {
        var msg = {
            type: 'print'
        };
        //sendMessage(msg);
        statusMessage('This feature is currently not available. Thank you for showing interest in it.');
        if (window.Intercom) {
            Intercom('trackEvent', 'tried-print-lesson');
        }
    })
    .on('click', ':has(.fa-heart-o)', function(event) {
        referral.GooglePeople.listConnections(false);
    })
    .on('click', ':has(.fa-gear)', function(event) {
        $('.docent-options-list').hide();
        showSettings();
    })
    .on('click', ':has(.fa-support)', function(event) {
        $('.docent-options-list').hide();
        $('.help-center').removeClass('hidden');
    })
    .on('click', ':has(.fa-dashboard)', function(event) {
        if (window.dashboard) {
            try {
                if (window.dashboard.location.href == baseURL.dashboard) {
                    window.dashboard.focus();
                    return;
                }
            }
            catch(e) {
                console.log('Error', e.message);
            }
        }
        window.dashboard = window.open(baseURL.dashboard, '_blank', null);
    });
    
    $('.modal-dialog').on('click', '.modal-close, .modal-cancel', function(event) {
        hideIframe();
    })
    .on('keypress', '.modal-input', function(event) {
        if (event.which == 13) {
            $(this).closest('.modal-dialog').find('.modal-confirm').click();
            event.preventDefault();
        }
    })
    
    $('.enroll-dialog').on('click', '.enroll-confirm', function(event) {
        var classCode = $('.enroll-input').val();
        enroll(classCode);
    });
    
    // Assign, Share, and Edit Info could probably share code with the dashboard
    $('.share-dialog').on('click', '.share-input', function(event) {
        $(this).select();
    })
    .on('click', '.share-publicly > input', function(event) {
        var docentID = $('body').attr('data-docentID');
        var url = baseURL.api + 'docents/' + docentID;
        var isChecked = $(this).prop('checked');
        if (isChecked) {
            setTimeout(function() {
                $('.share-dialog').hide();
                $('.docent-options-list .fa-info-circle').click();
                $('[type="checkbox"][name="public"]').prop('checked', isChecked);
                $('body').addClass('return-to-share-dialog');
            }, 100);
        }
        else {
            var data = {
                public: isChecked ? 1 : 0
            };
            $.post(url, data, function() {
                console.log('Public:', isChecked);
            });
            _docents[docentID].public = isChecked;
        }
    })
    .on('click', '.share-social > .fa', function(event) {
        var $this = $(this);
        var url;
        if ($this.hasClass('fa-twitter-square')) {
            var data = {
                text: 'Check out this lesson I made:',
                url: $('.share-input').val(),
                via: 'InsertLearning'
            };
            url = 'https://twitter.com/intent/tweet?' + $.param(data);
        }
        else if ($this.hasClass('fa-facebook-square')) {
            var data = {
                u: $('.share-input').val()
            };
            url = 'https://www.facebook.com/sharer/sharer.php?' + $.param(data);
        }
        else if ($this.hasClass('fa-envelope-square')) {
            location.href = 'mailto:?body=Check out this lesson I made with InsertLearning: ' + $('.share-input').val();
            return;
        }
        var top = 0;
        var left = 0;
        if (screen.height > 414) {
            top = Math.round((screen.height - 414) / 3);
        }
        if (screen.width > 568) {
            left = Math.round((screen.width - 568) / 2);
        }
        var ref = window.open(url, '_blank', 'location=no,width=568,height=414,top=' + top + ',left=' + left + ',closebuttoncaption=Cancel');
    });
    $('.rename-dialog').on('click', '.rename-confirm', function(event) {
        var $checked = $('.rename-dialog [type="checkbox"]:checked');
        var docentID = $('body').attr('data-docentID');
        var docent = _docents[docentID];
        var wasPublic = docent.public;
        if ($checked.filter('[name="public"]').length == 1) {
            var noSubjectArea = $checked.filter('[name="subject-area[]"]').length == 0;
            var noGradeLevel = $checked.filter('[name="grade-level[]"]').length == 0;
            if (noSubjectArea && noGradeLevel) {
                alert('Please select a subject area and grade level');
                return;
            }
            else if (noSubjectArea) {
                alert('Please select a subject area');
                return;
            }
            else if (noGradeLevel) {
                alert('Please select a grade level');
                return;
            }
            docent.public = true;
        }
        var title = $('.rename-input').val();
        var url = baseURL.api + 'docents/' + docentID;
        var data = $('.rename-dialog').serialize();
        $.post(url, data, function(response) {
            statusMessage('Done!', 1500);
            docent.subjectArea = response.subjectArea;
            docent.gradeLevel = response.gradeLevel;
            docent.customTags = response.customTags;
            docent.public = response.public;
            if (response.shareLink) {
                docent.shareLink = response.shareLink;
            }
            if (!wasPublic && docent.public && window.Intercom) {
                Intercom('trackEvent', 'published-docent', {
                    docent_id: docentID
                });
            }
        });
        docent.title = title;
        hideIframe();
    });
    
    $('.lesson-templates-dialog').on('click', '.lesson-templates-option', function(event) {
        ga('send', 'event', 'Lesson Templates', 'click', this.textContent.trim());
        if (location.origin == 'https://www.okeebo.com' && this.textContent.trim() == 'General Lesson') {
            lessonTemplates.insert(this.textContent.trim());
            hideIframe();
            return;
        }
        if (this.dataset.url) {
            /*
            $('.help-center').find('iframe').attr('src', this.dataset.url).end().removeClass('hidden');
            $('.lesson-templates-dialog').hide();
            */
            //var options = "width=" + (screen.width * 0.5) + ",left=" + (screen.width * 0.5) + ",height=" + screen.height + ',top=0';
            window.open(this.dataset.url, '_blank'/*, options*/);
            hideIframe();
            if (window.Intercom) {
                Intercom('trackEvent', 'viewed-lesson-template', {
                    template_name: this.textContent.trim()
                });
            }
            return;
        }
        statusMessage('Coming soon');
    })
    .on('click', '.lesson-templates-dont-show-again input', function(event) {
        var data = {
            status: !this.checked
        };
        $.post(baseURL.api + 'user/prompts/templates', data, function(response) {
            if (!_userInfo.prompts) {
                _userInfo.prompts = {};
            }
            _userInfo.prompts.templates = response.prompts.templates;
        });
        ga('send', 'event', 'Lesson Templates', this.checked ? 'click' : 'unclick', "Don't show again");
    })
    .on('click', 'a', function(event) {
        $('#intercom-container').show();
        Intercom('showNewMessage', 'Lesson template suggestion: ');
        event.preventDefault();
        ga('send', 'event', 'Lesson Templates', 'click', 'Suggest a template');
    })
    .on('click', '.lesson-templates-more', function(event) {
        $('.lesson-templates-select').toggleClass('show');
        event.stopPropagation();
    })
    .on('mouseenter', '.lesson-templates-select > *', function(event) {
        $('.lesson-templates-select > *').removeClass('hover');
        $(this).addClass('hover');
    })
    .on('click', '.lesson-templates-cancel', function(event) {
        ga('send', 'event', 'Lesson Templates', 'click', 'Dimiss');
    });
    
    // Could merge with some Dashboard code
    $('.view-answers-dialog').on('keypress', '.score', function(event) {
        var input;
        if (event.metaKey || event.ctrlKey) {
            return true;
        }
        if (event.which === 32) {
            return false;
        }
        if (event.which === 0) {
            return true;
        }
        if (event.which < 33) {
            return true;
        }
        // allow decimal point if there isn't one already
        if (event.which === 46) {
            return this.value.indexOf('.') == -1;
        }
        input = String.fromCharCode(event.which);
        return !!/[\d\s]/.test(input);
    })
    // Navigate scores with arrow keys
    .on('keydown', '.score', function(event) {
        // 38 is Up. 40 is down.
        if (event.which == 38 || event.which == 40) {
            var $score = $('.score:visible');
            $score.eq(Math.max(0, $score.index(this) - 39 + event.which)).focus();
        }
    })
    .on('blur', '.feedback', function(event) {
        var $feedback = $(this);
        var $answer = $feedback.parent();
        var $question = $('.view-answers-header');
        var url = baseURL.api + 'answerFeedback';
        var data = {
            docentID: $('body').attr('data-docentID'),
            questionID: $question.attr('data-question-id'),
            answerIndex: $answer.attr('data-answer-index'),
            studentID: $answer.attr('data-student-id'),
            feedbackText: $feedback.text(),
            feedbackIndex: $feedback.attr('data-index'),
            feedbackID: $feedback.attr('data-id'),
            timezoneOffset: (new Date()).getTimezoneOffset()
        };
        if (data.answerIndex == -1) {
            data.ref = $question.attr('data-question-ref');
            data.created = $question.attr('data-question-created');
            data.score = $answer.children('.score').val();
        }
        $.post(url, data, function(response) {
            console.log('Feedback saved to server.', response);
            var testCondition = function(item) {
                return item._id.$id == $question.attr('data-question-id');
            }
            var question = getElement(data.docentID, 'question', testCondition);
            if (data.answerIndex == -1 && response.answerIndex !== false) {
                $answer.attr('data-answer-index', response.answerIndex);
                saveScoreForBlankAnswer(question, response.answerIndex, data.studentID, data.score);
            }
            if (!data.feedbackIndex && response.index) {
                $feedback.attr('data-index', response.index);
            }
            if (!data.feedbackID && response._id) {
                $feedback.attr('data-id', response._id.$id);
            }
            var answer = question.answers[response.answerIndex];
            if (!answer.feedback) {
                answer.feedback = [];
            }
            answer.feedback[response.index || 0] = {
                _id: response._id,
                text: response.text,
                userID: response.userID,
                userName: response.userName,
                created: response.created
            };
        });
        if (window.Intercom) {
            Intercom('trackEvent', 'provided-feedback');
        }
    })
    .on('change', '.score', function(event) {
        var $score = $(this);
        var $answer = $score.parent();
        var $question = $('.view-answers-header');
        var url = baseURL.api + 'grades';
        var data = {
            docentID: $('body').attr('data-docentID'),
            ref: $question.attr('data-question-ref'),
            created: $question.attr('data-question-created'),
            index: $answer.attr('data-answer-index'),
            studentID: $answer.attr('data-student-id'),
            score: $score.val()
        }
        $.post(url, data, function(response) {
            console.log('Grade saved to server.');
            var testCondition = function(item) {
                return item._id.$id == $question.attr('data-question-id');
            }
            var question = getElement(data.docentID, 'question', testCondition);
            if (data.index == -1 && response.index !== false) {
                $answer.attr('data-answer-index', response.index);
                saveScoreForBlankAnswer(question, response.index, data.studentID, data.score);
            }
            else {
                question.answers[data.index].score = data.score;
            }
        });
    });
    function saveScoreForBlankAnswer(question, answerIndex, studentID, score) {
        if (!question.answers) {
            question.answers = [];
        }
        question.answers[answerIndex] = {
            userID: {
                $id: studentID
            },
            userName: getStudentName(studentID),
            score: score
        };
    };
    
    $('#new-user').on('click', '.signup-as-student', function(event) {
        userSignup('student');
    }).on('click', '.signup-as-teacher', function(event) {
        userSignup('teacher');
    });
    
    $('.signin-troubleshooting-modal').on('click', function(event) {
        $(event.target).filter(event.delegateTarget).fadeOut(100);
    }).on('click', '.close', function(event) {
        $('.signin-troubleshooting-modal').fadeOut(100);
    });
    
    $('.annotation-switcher-select').on('click', '.annotation-switcher-option', function(event) {
        var $body = $('body');
        var docentID = $body.attr('data-docentID');
        var childDocentID = this.dataset.value;
        console.log('Child docent:', childDocentID);
        console.log('Student name:', this.textContent);
        if (childDocentID == '') {
            renderDocent(docentID);
            $body.removeAttr('data-childDocentID');
        }
        else {
            renderDocent(childDocentID);
            $body.attr('data-childDocentID', childDocentID).attr('data-docentID', docentID).removeAttr('data-parentDocentID');
        }
        hideIframe(0);
        var msg = {
            type: 'setAnnotationSwitcher',
            text: this.textContent,
            value: childDocentID
        };
        sendMessage(msg);
        ga('send', 'event', 'Annotation Switcher', 'click', childDocentID ? '[some student]' : 'Choose student:');
    })
    .on('mouseenter', '.annotation-switcher-option', function(event) {
        $('.annotation-switcher-option').removeClass('hover');
        $(this).addClass('hover');
    });
    
    $('.question-stems-select').on('click', '.question-stems-option', function(event) {
        hideIframe(0);
        var msg = {
            type: 'setQuestionStem',
            text: this.textContent
        };
        sendMessage(msg);
        
        ga('send', 'event', 'Question Stems', 'click', msg.text);
    })
    .on('mouseenter', '.question-stems-option', function(event) {
        $('.question-stems-option').removeClass('hover');
        $(this).addClass('hover');
    });
    
    $('.convert-pdf-dialog').on('click', '.convert-pdf-confirm', function(event) {
        window.open('https://help.insertlearning.com/creating-a-lesson/working-with-pdfs', '_blank');
    })
    .on('click', '.convert-pdf-cancel', function(event) {
        var msg = {
            type: 'unload'
        };
        sendMessage(msg);
    });
    
    $('.payment-form').on('click', '.payment-cancel', function(event) {
        var msg = {
            type: 'unload'
        };
        sendMessage(msg);
    }).on('click', '.payment-continue', function(event) {
        var coupon = $('[name="coupon"]').val();
        if (coupon) {
            $.get(baseURL.api + 'coupons/' + coupon, function(response) {
                if (response.valid) {
                    Payment.showLastView(response);
                }
                else {
                    $('.payment-continue').prop('disabled', false);
                    if (Payment.activationCode) {
                        window.parent.payment.activationCode = '';
                        window.parent.payment.showBanner();
                    }
                    try {
                        window.parent.$('.activating').remove();
                    }
                    catch(e) {
                        console.log('Error', e.message);
                    }
                    alert('Incorrect code');
                }
            });
            $('.payment-continue').prop('disabled', true);
        }
        else {
            Payment.showLastView();
        }
    }).on('click', '.payment-back', function(event) {
        Payment.showFirstView();
    }).on('focus', 'input', function(event) {
        $(this).parent('.payment-input').addClass('focus');
    }).on('blur', 'input', function(event) {
        $(this).parent('.payment-input').removeClass('focus');
    }).on('click', '.payment-input', function(event) {
        $(this).children('input').focus();
    }).on('click', '.payment-submit', Payment.submit);
    
    if (typeof Stripe != 'undefined') {
        if (location.origin == 'https://docentedu.com' || location.origin == 'https://insertlearning.com') {
            Stripe.setPublishableKey('pk_live_9wDqfQQBDy7xYgwMZrsuaWDB');
        }
        else {
            Stripe.setPublishableKey('pk_test_TInSTrHYbeAl2qNPvQrKEVZs');
        }
        $('.payment-cc-num').payment('formatCardNumber');
        $('.payment-cc-exp').payment('formatCardExpiry');
        $('.payment-cc-cvc').payment('formatCardCVC');
    }
    
    $(window).on('message', function(event) {
        event = event.originalEvent;

        if (event.source == window && typeof event.data == 'object') {
            if (event.data.googleClassroom == 'share') {
                gapi.auth.getToken = function() { 
                    var token = {
                        access_token: event.data.token
                    };
                    return token;
                };
                config = GoogleClassroom.getConfig();
                $.get(config.url, config.data).done(config.done).fail(config.fail);
            }
            else if (event.data.token) {
                showSignedIn({access_token: event.data.token });
                onSignOut.prevent = true;
            }
            else if (event.data.logout) {
                delete onSignOut.prevent;
                onSignOut();
            }
        }
        else if (event.origin == 'chrome-extension://dehajjkfchegiinhcmoclkfbnmpgcahj') {
            if (event.source == window.top) {
                return;
            }
            window.parent = event.source.parent;
            window.parent.postMessage(event.data, '*');
            return;
        }
        else if (event.source == Payment.__window && event.origin == 'https://insertlearning.com') {
            Payment.messageHandler(event.data, event.origin);
        }
        if (event.source == window.parent && event.data) {
            // Quit if event.data isn't JSON
            if (!/^{.*}$/.test(event.data)) return;

            var msg = JSON.parse(event.data);
            
            // Quit if we set a messaging key earlier and the key of the incoming message doesn't match it
            if (sendMessage.key && msg.key != sendMessage.key) return;
            
            switch (msg.type) {
                case 'checkURL':
                    var url = baseURL.util + 'checkURL.php';
                    var data = {
                        url: msg.url
                    };
                    $.get(url, data, function(response) {
                        if (response[0] == 200 && response[2]) {
                            var msg = {
                                type: 'wrapString',
                                string: response[1],
                                withURL: response[2]
                            };
                            sendMessage(msg);
                        }
                        else {
                            console.log('Error:', response[0]);
                        }
                    });
                    break;
                case 'getDocents':
                    if (shared_docent()) return true;
                    if (msg.isPDF) {
                        if (window.Intercom && window._userInfo) {
                            Intercom('trackEvent', 'viewed-pdf');
                        }
                        else {
                            $(window).one('intercom-boot', function() {
                                Intercom('trackEvent', 'viewed-pdf');
                            });
                        }
                        $('.convert-pdf-dialog').show();
                        showIframe();
                        if (window.sessionStorage && sessionStorage.setItem) {
                            sessionStorage.setItem('pdf_url', event.origin + msg.forPath);
                        }
                        return false;
                    }
                    getDocents(event.origin, msg.forPath, function(docents) {
                        var docentID, docentURL;
                        try {
                            docentID = $('body').attr('data-docentID') || $('body').attr('data-parentDocentID') || localStorage.getItem('docentID');
                            docentURL = localStorage.getItem('docentURL');
                            var elementID = sessionStorage.getItem('elementID');
                            if (elementID && docents[docentID]) {
                                docents[docentID].scrollTo = elementID;
                            }
                        }
                        catch(e) {
                            console.log(e.message);
                        }
                        var keys = Object.keys(docents);
                        if (keys.length > 0) {
                            // Don't want to include childDocents that teachers make on their own lessons
                            var owned = $.grep(keys, function(k) {
                                if (!docents[k].isOwner) {
                                    return false;
                                }
                                if (!docents[k].parentDocent) {
                                    return true;
                                }
                                var parentDocent = docents[docents[k].parentDocent.$id];
                                if (!parentDocent || parentDocent.isOwner || parentDocent.isModerator) {
                                    return false;
                                }
                                return true;
                            });
                            if (owned.indexOf(docentID) != -1) {
                                renderDocent(docentID);
                                return;
                            }
                            var current = $.grep(owned, function(k) {
                                return docentID && docents[k].parentDocent && docents[k].parentDocent.$id == docentID;
                            });
                            if (current.length > 0) {
                                renderDocent(current[0]);
                            }
                            else if (keys.indexOf(docentID) != -1) {
                                renderDocent(docentID);
                            }
                            else if (owned.length > 0) {
                                renderDocent(owned[0]);
                            }
                            else {
                                renderDocent(keys[0]);
                            }
                        }
                        else if (LessonLinkReferrer.isGoogleClassroom()) {
                            var fn = function() {
                                var auth2 = gapi.auth2.getAuthInstance();
                                var user = auth2.currentUser.get();
                                if (user.hasGrantedScopes('https://www.googleapis.com/auth/classroom.courses.readonly')) {
                                    fixAccessToken(user);
                                    GoogleClassroom.syncEnrollment();
                                }
                                else {
                                    $('#signinButton').show().children('.g-signin2').addClass('custom');

                                    showSignedIn.altCallback = function() {
                                        GoogleClassroom.syncEnrollment();
                                        $('#signinButton').hide().children('.g-signin2').removeClass('custom');
                                    };
                                    showIframe();
                                }
                            };
                            if (window._userInfo && _userInfo.userType) {
                                fn();
                            }
                            $(window).one('checked-user-type', fn);
                        }
                        else if (LessonLinkReferrer.exists()) {
                            $('.enroll-dialog').show();
                            showIframe();
                            setTimeout(function() {
                                $('.enroll-input').focus();
                            }, 400);
                        }
                        else {
                            showLessonTemplatesPrompt();
                        }
                        if (keys.length == 0 && docentURL) {
                            var data = {
                                url: docentURL,
                                follow: 'no'
                            };
                            $.get(baseURL.util + 'checkURL.php', data, function(response) {
                                // Fix for Newsela
                                if (response[0] == '302' && event.origin == 'https://newsela.com') {
                                    response[0] = '301';
                                    response[2] = response[1].replace(/#insertlearning$/, '').replace(/\/articles\//, '/read/');
                                }
                                if (response[0] == '301' && response[2] == $('body').attr('data-url')) {
                                    var location = $('<a>', {
                                        href: response[1]
                                    })[0];
                                    getDocents(location.origin, location.pathname, function(docents) {
                                        if (docentID && docents[docentID]) {
                                            $('#signinButton').hide();
                                            hideIframe();
                                            renderDocent(docentID);
                                        }
                                    });
                                    console.log('Detected Permanent Redirect');
                                }
                            });
                        }
                    });
                    break;
                case 'rerenderCurrentDocent':
                    renderDocent($('body').attr('data-docentID') || $('body').attr('data-parentDocentID'));
                    break;
                case 'loadTime':
                    // Use replacement initial time from "visibilitychange" fix when the tab was opened in the background
                    if (window._t0) {
                        msg.time = Date.now() - window._t0;
                    }
                    // If the load time was longer than 10 seconds, record a 'loaded-slowly' event in Intercom
                    if (msg.time > 10000 && window.Intercom) {
                        Intercom('trackEvent', 'loaded-slowly', {
                            time: msg.time
                        });
                    }
                    console.log('Load time:', msg.time);
                    break;
                case 'copyDocent':
                    var done = function(should_fire) {
                        if (should_fire === false) {
                            return false;
                        }
                        var url = baseURL.api + 'docents';
                        var data = {
                            shareCode: sessionStorage.getItem('docentShareCode')
                        };
                        // Safeguard from double-clicking "Copy Lesson" button
                        if (!data.shareCode) {
                            return false
                        }
                        sessionStorage.removeItem('docentShareCode');
                        $.post(url, data, function(response) {
                            var copied_from = $('body').attr('data-docentID');
                            $('body').attr('data-docentID', response._id.$id);
                            _docents[response._id.$id] = response;
                            var msg = {
                                type: 'docentCopied'
                            };
                            sendMessage(msg);
                            renderDocent(response._id.$id);
                            if (window.Intercom) {
                                Intercom('trackEvent', 'created-docent', {
                                    docent_id: response._id.$id,
                                    copied_from: copied_from
                                });
                                Intercom('trackEvent', 'copied-docent', {
                                    share_code: data.shareCode
                                });
                                updateIntercom('copied-docent');
                            }
                            $.post(baseURL.api + 'user/hubspot');
                        })
                        .fail(function(xhr) {
                            if (xhr && xhr.responseJSON && xhr.responseJSON.error == 'Subscription expired') {
                                // let user continue viewing shared docent
                                $('.payment-cancel').one('click', function(event) {
                                    event.stopImmediatePropagation();
                                    hideIframe();
                                });
                                Payment.prompt();
                            }
                            sessionStorage.setItem('docentShareCode', data.shareCode);
                        });
                    }
                    if (window._googleProfile) {
                        done(true);
                    }
                    else {
                        // quick hack so new user can copy a docent
                        userSignup.callback = done;
                        promptSignIn(done);
                    }
                    ga('send', 'event', 'Alert Bar Buttons', 'click', 'Copy Docent');
                    break;
                case 'postNotes':
                    var url = baseURL.api + 'notes';
                    var data = {
                        domain: event.origin,
                        //notes: msg.notes,
                        path: msg.forPath,
                    };
                    var parentDocentID = $('body').attr('data-parentDocentID');
                    if (parentDocentID) {
                        data.parentDocentID = parentDocentID;
                    }
                    var docentID = $('body').attr('data-docentID');
                    if (docentID) {
                        data.docentID = docentID;
                    }
                    data.notes = msg.notes;
                    
                    var success = function(response) {
                        checkDocentMetadata(response);
                        _docents[$('body').attr('data-docentID')].notes = response.notes;
                        console.log('Notes were successfully saved to server.', 'Sent:', data.notes.length, 'Received:', response.notes.length);
                    };
                    // Right now, 100 highlights gets close to the limit of max_input_vars = 1000 since each highlight can have 10 attributes
                    // We're setting this check at > 80 to be safe and provide some leeway for adding a couple highlight properties
                    // Maybe should always send highlights as JSON?
                    // Or we finally split highlights into individual requests rather than sending all of them whenever one is added, edited, or deleted
                    if (data.notes.length > 80) {
                        console.log('Sending highlights as JSON');
                        $.ajax({
                            url: url,
                            type: 'POST',
                            data: JSON.stringify(data),
                            contentType: 'application/json; charset=utf-8',
                            dataType: 'json',
                            success: success
                        })
                        .fail(function(xhr) {
                            Sync.onFail(xhr, this);
                        });
                        break;
                    }
                    $.post(url, data, success).fail(function(xhr) {
                        Sync.onFail(xhr, this);
                    });
                    break;
                case 'deleteElement':
                    $.ajax({
                        method: 'DELETE',
                        url: baseURL.api + msg.elementType + 's/' + getElementID(msg),
                        success: function(response) {
                            console.log('Successfully deleted ' + msg.elementType + ' from server.');
                            var _docent = _docents[$('body').attr('data-docentID')];
                            if (!_docent || !_docent[msg.elementType + 's']) {
                                return false;
                            }
                            _docent[msg.elementType + 's'] = _docent[msg.elementType + 's'].filter(function(element) {
                                return !(element._id.$id == response._id.$id);
                            });
                        }
                    })
                    .fail(function(xhr) {
                        Sync.onFail(xhr, this);
                    });
                    break;
                case 'postElement':
                    var url = baseURL.api + msg.elementType + 's';
                    var data = {
                        domain: event.origin,
                        text: msg.text,
                        ref: msg.ref,
                        ref_check: msg.ref_check,
                        created: msg.created,
                        modified: msg.modified,
                        path: msg.forPath
                    };
                    var elementID = getElementID(msg);
                    if (elementID) {
                        url += '/' + elementID;
                    }
                    var parentDocentID = $('body').attr('data-parentDocentID');
                    if (parentDocentID) {
                        data.parentDocentID = parentDocentID;
                    }
                    var docentID = $('body').attr('data-docentID');
                    if (docentID) {
                        data.docentID = docentID;
                    }
                    if (msg.elementType == 'question') {
                        data.score = msg.score;
                    }
                    if (msg.md5) {
                        data.md5 = msg.md5;
                    }
                    if (msg.md5_v2) {
                        data.md5_v2 = msg.md5_v2;
                    }
                    console.log(msg);
                    if (msg.top && msg.left) {
                        data.top = msg.top;
                        data.left = msg.left;
                    }
                    $.post(url, data, function(response) {
                        console.log('Successfully saved ' + msg.elementType + ' to server.');
                        checkDocentMetadata(response);
                        
                        // prevent "too much recursion" error when deep cloning the element
                        delete response.docent;
                        
                        var _docent = _docents[$('body').attr('data-docentID')];
                        if (!_docent[msg.elementType + 's']) {
                            _docent[msg.elementType + 's'] = [];
                        }
                        var elements = _docent[msg.elementType + 's'];
                        var preventDuplicate = false;
                        elements.forEach(function(element, index) {
                            if (element._id.$id == response._id.$id) {
                                if (response.created == response.modified) {
                                    preventDuplicate = true;
                                }
                                // Keep answers (to questions) and responses (to discussions) when editing
                                response.answers = elements[index].answers;
                                response.responses = elements[index].responses;
                                // Keep choices when editing questions
                                response.choices = elements[index].choices;
                                response.rightChoice = elements[index].rightChoice;
                                // Swap old data with new
                                elements[index] = response;
                            }
                        });
                        if (!preventDuplicate && response.created == response.modified) {
                            elements.push(response);
                        }
                        if (!elementID && msg.nonce) {
                            var m = {
                                type: 'elementSaved',
                                nonce: msg.nonce,
                                elementID: response._id.$id,
                                elementType: msg.elementType
                            };
                            sendMessage(m);
                        }
                    })
                    .fail(function(xhr) {
                        Sync.onFail(xhr, this);
                    });
                    break;
                case 'postChoices':
                    msg.elementType = 'question';
                    var url = baseURL.api + 'questions/' + getElementID(msg) + '/choices';
                    var data = {
                        domain: event.origin,
                        ref: msg.ref,
                        docentID: $('body').attr('data-parentDocentID') || $('body').attr('data-docentID'),
                        created: msg.created,
                        modified: msg.modified,
                        choices: msg.choices,
                        rightChoice: msg.rightChoice,
                        path: msg.forPath
                    };
                    $.post(url, data, function(response) {
                        console.log('Choices for question were successfully saved to server.');
                    })
                    .fail(function(xhr) {
                        Sync.onFail(xhr, this);
                    });
                    break;
                case 'postAnswer':
                    msg.elementType = 'question';
                    var url = baseURL.api + 'questions/' + getElementID(msg) + '/answer';
                    var data = {
                        domain: event.origin,
                        ref: msg.ref,
                        docentID: $('body').attr('data-parentDocentID'),
                        created: msg.created,
                        answer: msg.answer,
                        path: msg.forPath,
                        isMultipleChoice: msg.isMultipleChoice
                    };
                    if (msg.index !== false) {
                        data.index = msg.index;
                    }
                    $.post(url, data, function(response) {
                        console.log('Answer was successfully saved to server.');
                        if (response) {
                            console.log(response);
                            /// lets users modify answers and marks answer as saved
                            var msg = {
                                type: 'answerSaved',
                                index: response.index,
                                ref: response.ref,
                                created: response.created,
                                text: response.text,
                                status: response.status,
                                score: response.score
                            };
                            sendMessage(msg);
                        }
                    })
                    .fail(function(xhr) {
                        Sync.onFail(xhr, this);
                    });
                    break;
                case 'postResponse':
                    msg.elementType = 'discussion';
                    var url = baseURL.api + 'discussions/' + getElementID(msg) + '/response';
                    var data = {
                        domain: event.origin,
                        ref: msg.ref,
                        docentID: $('body').attr('data-parentDocentID') || $('body').attr('data-docentID'),
                        created: msg.created,
                        response: msg.response,
                        path: msg.forPath,
                        groups: msg.groups || ''
                    };
                    if (data.groups == '') {
                        var docent = _docents[data.docentID];
                        if (docent && docent.groups) for (var i=0, l=docent.groups.length; i<l; ++i) {
                            var groupID = docent.groups[i].$id;
                            if (!_courses[groupID]) {
                                continue;
                            }
                            if (i > 0) data.groups += ',';
                            data.groups += groupID;
                        }
                    }
                    $.post(url, data, function(response) {
                        console.log('Response was successfully saved to server.');
                    })
                    .fail(function(xhr) {
                        Sync.onFail(xhr, this);
                    });
                    var msg = {
                        type: 'newResponse',
                        discussion: {
                            ref: msg.ref,
                            created: msg.created
                        },
                        response: {
                            userID: window._userInfo && _userInfo._id,
                            userName: window._googleProfile && _googleProfile.name,
                            created: Date.now(),
                            text: msg.response,
                            groups: data.groups
                        }
                    };
                    sendMessage(msg);
                    /*
                    var testCondition = function(item) {
                        return item.ref == data.ref && item.created == data.created;
                    };
                    var discussion = getElement(data.docentID, 'discussion', testCondition);
                    if (!discussion.responses) {
                        discussion.responses = [];
                    }
                    discussion.responses.push(msg.response);
                    */
                    break;
                case 'banResponse':
                    var url = baseURL.api + 'discussions/' + getElementID(msg) + '/response/' + msg.index;
                    var data = {
                        banned: msg.banned ? 1 : 0
                    };
                    $.post(url, data, function(response) {
                        console.log('Discussion response was successfully ' + (msg.banned ? '' : 'un') + 'banned');
                    })
                    .fail(function(xhr) {
                        Sync.onFail(xhr, this);
                    });
                    break;
                case 'getUserMedia':
                    // Block video recording for students on rbocesapps.org
                    if (window._userInfo && _userInfo.userType == 'student' && _userInfo.userEmail && _userInfo.userEmail.split('@')[1] == 'rbocesapps.org') {
                        break;
                    }
                    var width = 640;
                    var height = 430;
                    var top = 0;
                    var left = (window.screen.width - width) / 2;
                    var options = 'height=' + height + ',width=' + width + ',top=' + top + ',left=' + left;
                    var ref = window.open(baseURL.domain + baseURL.version + '/video/', '_blank', options);
                    ref.elementID = msg.elementID;
                    ref.text = msg.text || '';
                    break;
                case 'metadata':
                    var docentID = $('body').attr('data-docentID');
                    var url = baseURL.api + 'docents';
                    if (docentID) {
                        url += '/' + docentID;
                        _docents[docentID].title = msg.data.title;
                        _docents[docentID].distilled = msg.data.distilled;
                    }
                    var data = msg.data;
                    data.domain = event.origin;
                    data.path = msg.path;
                    $.post(url, data, function(response) {
                        console.log('Sent metadata to server.');
                        response.title = response.title || '';
                        checkDocentMetadata({docent: response });
                    }).fail(function(xhr) {
                        Sync.onFail(xhr, this);
                    });
                    break;
                case 'setQueryString':
                    if (!msg.queryString) {
                        return false;
                    }
                    $(window).one('hasDocentID', function() {
                        var url = baseURL.api + 'docents/' + $('body').attr('data-docentID');
                        var data = {
                            queryString: msg.queryString
                        };
                        $.post(url, data, function(response) {
                            console.log('Set query string for docent.');
                        }).fail(function(xhr) {
                            Sync.onFail(xhr, this);
                        });
                    });
                    if ($('body').attr('data-docentID')) {
                        $(window).trigger('hasDocentID');
                    }
                    break;
                case 'login':
                    var auth2 = gapi.auth2.getAuthInstance();
                    if (auth2.isSignedIn.get() == false) {
                        auth2.signIn();
                    }
                    break;
                case 'jwt':
                    if (JWT.originWhitelist.indexOf(event.origin) == -1) {
                        break;
                    }
                    var url = baseURL.api + 'user/jwt';
                    $.get(url, function(response) {
                        var msg = {
                            jwt: response.jwt
                        };
                        window.parent.postMessage(msg, event.origin);
                    });
                    break;
                // prepDiscussionFilter has been removed from docent.js and is here for backwards compatibility
                case 'prepDiscussionFilter':
                    $('body').addClass('show-discussion-filter');
                    break;
                case 'showDiscussionFilter':
                    $('body').addClass('show-discussion-filter');
                    var $select = $('.discussion-filter-select').empty().attr('data-element-id', msg.elementID).css({
                        top: msg.top,
                        left: msg.left,
                        width: msg.width,
                        bottom: ''
                    });
                    var testCondition = function(item) {
                        return item._id.$id == msg.elementID;
                    }
                    var getDiscussion = function(docentID) {
                        return getElement(docentID, 'discussion', testCondition);
                    };
                    var discussion = getDiscussion($('body').attr('data-docentID')) || getDiscussion($('body').attr('data-parentDocentID'));
                    var docent = _docents[discussion.docentID || $('body').attr('data-docentID')];
                    
                    // Handle "empty" discussion filter
                    if (!docent) {
                        docent = {};
                    }
                    if (!docent.groups) {
                        docent.groups = [];
                    }
                    
                    if (docent && docent.groups) {
                        var $optgroup = $('<div>', {
                            class: 'discussion-filter-optgroup',
                            label: 'Classes'
                        });
                        var $option = $('<div>', {
                            class: 'discussion-filter-option',
                            'data-value': '',
                            text: 'All classes'
                        });
                        $optgroup.append($option);
                        
                        var $options = $();
                        for (var i=0, l=docent.groups.length; i<l; ++i) {
                            var groupID = docent.groups[i].$id;
                            if (!_courses[groupID]) {
                                continue;
                            }
                            var $option = $('<div>', {
                                class: 'discussion-filter-option',
                                'data-value': groupID,
                                text: _courses[groupID]
                            });
                            $options = $options.add($option);
                        }
                        $options.sort(function(a,b) {
                            return a.innerHTML > b.innerHTML ? 1 : -1;
                        });
                        $select.append($optgroup.append($options));
                    }
                    if (discussion.responses) {
                        var people = {};
                        for (var i=0, l=discussion.responses.length; i<l; ++i) {
                            var response = discussion.responses[i];
                            people[response.userID.$id] = response.userName;
                        }
                        var $optgroup = $('<div>', {
                            class: 'discussion-filter-optgroup',
                            label: 'People'
                        });
                        var $option = $('<div>', {
                            class: 'discussion-filter-option',
                            'data-value': '',
                            text: 'Everyone'
                        });
                        $optgroup.append($option);
                        
                        var $options = $();
                        for (var i in people) {
                            var $option = $('<div>', {
                                class: 'discussion-filter-option',
                                'data-value': i,
                                text: people[i]
                            });
                            $options = $options.add($option);
                        }
                        $options.sort(function(a,b) {
                            return a.innerHTML > b.innerHTML ? 1 : -1;
                        });
                        $select.append($optgroup.append($options));
                    }
                    $('.discussion-filter-option').on('mouseenter', function(event) {
                        $('.discussion-filter-option').removeClass('hover');
                        $(this).addClass('hover');
                    })
                    .on('click', function(event) {
                        hideIframe(0);
                        var $this = $(this);
                        var msg = {
                            type: 'setDiscussionFilter',
                            elementID: $select.attr('data-element-id'),
                            value: $this.attr('data-value'),
                            text: $this.text()
                        };
                        sendMessage(msg);
                        
                        var label;
                        if (!msg.value) {
                            label = msg.text;
                        }
                        else if ($this.parent().is('[label="Classes"]')) {
                            label = '[some class]';
                        }
                        else {
                            label = '[some student]';
                        }
                        ga('send', 'event', 'Discussion Filter', 'click', label);
                    })
                    .filter(function() {
                        return $(this).attr('data-value') == (msg.value || '');
                    })
                    .eq(msg.eq || 0).addClass('hover');
                    
                    var maxHeight = window.innerHeight - msg.top - 10;
                    var bottom = window.innerHeight - msg.top + 44;
                    var altHeight = msg.top - 54;
                    
                    $select.css('max-height', '');
                    
                    if ($select.height() > maxHeight && altHeight > maxHeight) {
                        $select.css({
                            top: '',
                            bottom: bottom
                        });
                        maxHeight = altHeight;
                    }
                    $select.css('max-height', maxHeight);
                    
                    showIframe(0);
                    ga('send', 'event', 'Discussion Filter', 'show');
                    break;
                // hideDiscussionFilter is also doing hideAnnotationSwitcher
                // maybe rename this?
                case 'hideDiscussionFilter':
                    setTimeout(function() {
                        $('body').removeClass('show-discussion-filter show-annotation-switcher show-question-stems');
                    }, 100);
                    break;
                // prepAnnotationSwitcher has been removed from docent.js and is here for backwards compatibility
                case 'prepAnnotationSwitcher':
                    $('body').addClass('show-annotation-switcher');
                    break;
                case 'showAnnotationSwitcher':
                    $('body').addClass('show-annotation-switcher');
                    showIframe(0);
                    ga('send', 'event', 'Annotation Switcher', 'show');
                    break;
                case 'showQuestionStems':
                    $('body').addClass('show-question-stems');
                    
                    var $select = $('.question-stems-select').css({
                        top: msg.top,
                        left: msg.left,
                        width: msg.width,
                        bottom: ''
                    });
                    
                    questionStems.build();
                    
                    var maxHeight = window.innerHeight - msg.top - 10;
                    var bottom = window.innerHeight - msg.top + 44;
                    var altHeight = msg.top - 54;
                    
                    $select.css('max-height', '');
                    
                    if ($select.height() > maxHeight && altHeight > maxHeight) {
                        $select.css({
                            top: '',
                            bottom: bottom
                        });
                        maxHeight = altHeight;
                    }
                    $select.css('max-height', maxHeight);
                    
                    showIframe(0);
                    ga('send', 'event', 'Question Stems', 'show');
                    break;
                case 'prepIntercomMessenger':
                    $('body').addClass('show-intercom-messenger');
                    break;
                case 'showIntercomMessenger':
                    if (!Intercom.hasListeners) {
                        Intercom('onHide', function() {
                            var msg = {
                                type: 'hideIntercomMessenger'
                            };
                            if ($('body').hasClass('show-intercom-messenger')) {
                                sendMessage(msg);
                            }
                        });
                    }
                    $('body').addClass('show-intercom-messenger');
                    Intercom.hasListeners = true;
                    Intercom('show');
                    break;
                case 'hideIntercomMessenger':
                    $('body').removeClass('show-intercom-messenger');
                    Intercom('hide');
                    break;
                case 'resumeTeacherView':
                    resumeTeacherView();
                    ga('send', 'event', 'Alert Bar Buttons', 'click', 'Resume Teacher View');
                    break;
                case 'viewAnswers':
                    ViewAnswers.show(msg);
                    break;
                case 'showSettings':
                    showSettings();
                    break;
                case 'showShareToGoogleClassroom':
                    $('.share-to-google-classroom').click();
                    break;
                case 'showOptions':
                    $('.docent-options-list').show();
                    if (window._userInfo && _userInfo.userType == 'student') {
                        var canShare = ($('body').attr('data-parentDocentID') == undefined);
                        $('.docent-options-list-item')
                            .has('.fa-share')[canShare ? 'show' : 'hide']()
                            .end()
                            .has('.fa-gear')[canShare ? 'hide' : 'show']();
                    }
                    else if (!ExtensionVersion.isGreaterOrEqual('1.7.0')) {
                        $('.docent-options-list-item').has('.fa-eye').hide();
                    }
                    break;
                case 'showHelpCenter':
                    $('.help-center').removeClass('hidden');
                    break;
                case 'makeElementScreenshot':
                    var url = baseURL.api + 'screenshot';
                    var data = msg;
                    $.post(url, data, function(response) {
                        console.log(response);    
                    });
                    break;
                case 'completed-tutorial':
                    if (window.Intercom) {
                        var eventParams = {
                            docent_id: $('body').attr('data-docentID')
                        };
                        Intercom('trackEvent', 'completed-tutorial', eventParams);
                    }
                    break;
                case 'ga':
                    ga('send', 'event', msg.category, msg.action, msg.label);
                    break;
            }
        }
    });
});
if (baseURL.domain == 'https://www.okeebo.com/') {
    window.ga = console.log;
}
else if (location.origin != 'https://insertlearning.com') {
    window.ga = function(){};
}

function viewLessonAsStudent() {
    var msg = {
        type: 'hideAnnotationSwitcher'
    };
    sendMessage(msg);
    
    var docentID = $('body').attr('data-docentID');
    // Might want to store isOwner and isModerator first
    // Right now they don't give any different permissions with the toolbar so it's fine if their values get conflated
    _docents[docentID].isOwner = false;
    _docents[docentID].isModerator = false;
    
    _docents[docentID].teacherViewingAsStudent = true;
    
    // Might be better to handle this in docent.js so that the multiple choice box and the answer box are different elements rather than rewriting data here
    // Would require this locked behind an extension version. That might be necessary anyway though
    var questions = _docents[docentID].questions;
    var examMode = _docents[docentID].examMode;
    for (var i in questions) {
        for (var j in questions[i].answers) {
            if (isCurrentUser(questions[i].answers[j].userID)) {
                questions[i].answer = questions[i].answers[j];
            }
        }
        questions[i]._rightChoice = questions[i].rightChoice;
        // If rightChoice isn't set on a MC question, then it should behave like a poll and the answer is marked correct.
        if (!examMode && !questions[i].rightChoice && questions[i].answer) {
            questions[i].rightChoice = questions[i].answer.text;
        }
        else if (examMode || !questions[i].answer || questions[i].answer.text != questions[i].rightChoice) {
            delete questions[i].rightChoice;
        }
    }
    for (var i in _docents) {
        if (isCurrentUser(_docents[i].userID) && _docents[i].parentDocent && _docents[i].parentDocent.$id == docentID) {
            _docents[i].isOwner = true;
            renderDocent(i);
            return;
        }
    }
    renderDocent(docentID);
}

function resumeTeacherView() {
    var docentID = $('body').attr('data-parentDocentID');
    _docents[docentID].isOwner = true;
    _docents[docentID].isModerator = true;
    
    delete _docents[docentID].teacherViewingAsStudent;
    
    var questions = _docents[docentID].questions;
    for (var i in questions) {
        delete questions[i].answer;
        questions[i].rightChoice = questions[i]._rightChoice;
        delete questions[i]._rightChoice;
    }
    renderDocent(docentID);
    
    cacheUserInfo(_userInfo);
}

function isCurrentUser(userID) {
    if (!userID) {
        return false;
    }
    else if (userID.$id) {
        userID = userID.$id
    }
    return (window._userInfo && _userInfo._id.$id == userID);
}

// Might want to merge this with code from Dashboard
var ViewAnswers = {
    show: function(msg) {
        var docentID = $('body').attr('data-docentID');
        var testCondition = function(item) {
            return item._id.$id == msg.elementID;
        }
        var question = getElement(docentID, 'question', testCondition);
        var groups = _docents[docentID].groups;
        var students = [];
        if (!window._rosters) {
            window._rosters = [];
        }
        for (var i in groups) {
            students = students.concat(window._rosters[groups[i].$id]);
        }
        $('.view-answers-header').html(question.text || 'What is your question?').attr({
            'data-maxscore': question.score || 0,
            'data-question-id': msg.elementID,
            'data-question-ref': question.ref,
            'data-question-created': question.created
        });
        var $container = $('.view-answers-container').empty();
        for (var i in question.answers) {
            var answer = question.answers[i];
            answer.index = i;
            var index = students.indexOf(answer.userID && answer.userID.$id);
            if (index != -1 || isCurrentUser(answer.userID)) {
                ViewAnswers.constructRow(answer, question.rightChoice, !!question.choices).appendTo($container);
                students.splice(index, 1);
            }
        }
        for (var i in students) {
            ViewAnswers.constructRow({
                userName: window.getStudentName(students[i]),
                userID: { 
                    $id: students[i] 
                },
                index: -1
            })
            .appendTo($container);
        }
        $('.view-answers-dialog').show();
    },
    constructRow: function(answer, rightChoice, isMultipleChoice) {
        var $row = $('<div>', {
            class: 'view-answers-row',
            html: [
                $('<span>', {
                    class: 'student',
                    text: answer.userName
                }),
                $('<span>', {
                    class: 'answer',
                    text: $('<div>').html(answer.text).text()
                }),
                $('<span>', {
                    class: 'feedback',
                    contenteditable: true,
                    text: (answer.feedback && answer.feedback[0].text),
                    'data-id': (answer.feedback && answer.feedback[0]._id.$id),
                    'data-index': 0
                }),
                $('<input>', {
                    class: 'score',
                    placeholder: 'Score',
                    value: answer.score || ''
                })
            ],
            'data-student-id': answer.userID && answer.userID.$id,
            'data-answer-index': answer.index
        });
        if (answer.attempts && isMultipleChoice) {
            var $ul = $('<ul class="fa-ul">');
            for (var i=0,l=answer.attempts.length; i<l; ++i) {
                var $li = $('<li>', {
                    text: answer.attempts[i]
                });
                var isCorrect = (rightChoice ? (answer.attempts[i] == rightChoice) : !!answer.score);
                var $i = $('<i>', {
                    class: 'fa fa-li ' + (isCorrect ? 'fa-check' : 'fa-times')
                });
                $ul.append($li.prepend($i));
            }
            $row.children('.answer').html($ul);
        }
        var timestamp = answer.modified || answer.created;
        if (timestamp) {
            $row.children('.student').append([
                '<br>',
                $('<span>', {
                    css: {
                        'font-size': '12px',
                        color: '#555'
                    },
                    text: ViewAnswers.getDateString(timestamp)
                })
            ]);
        }
        return $row;
    },
    getDateString: function(timestamp) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var d = new Date(Number(timestamp));
        var h = d.getHours();
        var hourString = h % 12;
        if (hourString == 0) {
            hourString = 12;
        }
        var minuteString = d.getMinutes();
        if (minuteString < 10) {
            minuteString = '0' + minuteString;
        }
        var datetime = months[d.getMonth()] + ' ' + d.getDate() + ' at ' + hourString + ':' + minuteString + (h < 12 ? 'am' : 'pm');
        
        return datetime;
    }
};

function updateIntercom(eventName) {
    if (window.Intercom) {
        $.get(baseURL.api + 'docents/count', function(data) {
            var coursesFromGoogleClassroom = 0;
            if (window.GoogleClassroom && typeof(GoogleClassroom.__data) == 'object') {
                coursesFromGoogleClassroom = Object.keys(GoogleClassroom.__data).length;
            }
            Intercom('update', {
                docents: data.count,
                courses: (window._courseCount && _courseCount.created) || 0,
                courses_from_google_classroom: coursesFromGoogleClassroom,
                enrolled_courses: (window._courseCount && _courseCount.enrolled) || 0,
                students: (window.countAllStudents && countAllStudents()) || 0
            });
            if (data.count === 1) {
                if (eventName == 'created-docent') {
                    statusMessage('When you\'re ready to assign, click the IL logo at the top of our toolbar', 4000);
                }
                if (eventName == 'copied-docent') {
                    setTimeout(function() {
                        statusMessage('When you\'re ready to assign, click the IL logo at the top of our toolbar', 4000);
                    }, 3000);
                    
                }
            }
        });
    }
}
function badgeFeedbackButton(amount) {
    var msg = {
        type: 'badgeFeedbackButton',
        amount: Number(amount)
    };
    sendMessage(msg);
}

function statusMessage(news, duration) {
    var msg = {
        type: 'news',
        news: news,
        duration: duration
    };
    sendMessage(msg);
}

function shared_docent() {
    try {
        if (window.sessionStorage && sessionStorage.getItem) {
            var shareCode = sessionStorage.getItem('docentShareCode');
            var resultingPage = sessionStorage.getItem('docentShareCodeResultingPage');
            var currentPage = $('body').attr('data-url') || (document.referrer && document.referrer.split('?')[0]);
            if (resultingPage && resultingPage != currentPage) {
                return false;
            }
            if (typeof shareCode === 'string') {
                var url = baseURL.api + 'docents';
                var data = {
                    shareCode: shareCode
                };
                $.get(url, data, function(docent) {
                    if (docent) {
                        _docents[docent._id.$id] = docent;
                        renderDocent(docent._id.$id);
                        if (sessionStorage.setItem) {
                            sessionStorage.setItem('docentShareCodeResultingPage', currentPage);
                        }
                    }
                    var msg = {
                        type: 'doneLoading'
                    };
                    sendMessage(msg);
                });
                if (window.Intercom) {
                    var eventName = (sessionStorage.getItem('exampleDocent') == shareCode) ? 'viewed-example-docent' : 'viewed-shared-docent';
                    var eventParams = {
                        share_code: shareCode
                    };
                    if (window._userInfo) {
                        Intercom('trackEvent', eventName, eventParams);
                    }
                    else {
                        $(window).one('intercom-boot', function() {
                            Intercom('trackEvent', eventName, eventParams);
                        });
                    }
                }
                return true;
            }
        }
    }
    catch(e) {
        console.log('Error', e.message);
    }
    return false;
}
