function initGoogle() {
    gapi.load('auth2:signin2', function() {
        gapi.signin2.render('g-signin2', {
            theme: 'dark',
            longtitle: true,
            height: 40,
            width: 200,
            scope: 'profile email'
        });
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.currentUser.listen(onSignIn);

        $('.g-signin2').on('click', function(event) {
            var $this = $(this);
            if ($this.hasClass('custom') && !$this.hasClass('no-cookies')) {
                auth2.currentUser.get().grant({
                    scope: 'https://www.googleapis.com/auth/classroom.courses.readonly'
                });
            }
            $('#signin-trouble').delay(200).fadeIn(0);
        });
        $('#signin-trouble').on('click', function(event) {
            $('.signin-troubleshooting-modal').fadeIn(100);
        });
        setTimeout(function() {
            if (!auth2.isSignedIn.get()) {
                onSignOut();
            }
        }, 2000);

        if (auth2.isSignedIn.get() == true) {
            console.log('Already signed in');
            onSignIn(auth2.currentUser.get());
        }
        
        try {
            window.localStorage;
        }
        catch(e) {
            $('.g-signin2').addClass('custom no-cookies');
        }
    });
}
function onSignIn(googleUser) {
    $('#signin-trouble').fadeOut(0);
    if (window.Intercom) {
        Intercom('shutdown');
    }
    if (!googleUser.isSignedIn()) {
        onSignOut();
        return false;
    }
    var profile = googleUser.getBasicProfile();
    var token = googleUser.getAuthResponse();
    showSignedIn(token, profile);
}
function onSignOut() {
    if (onSignOut.prevent) {
        return false;
    }
    if (shared_docent()) {
        hideIframe();
        return false;
    }
    // Update the app to reflect a signed out user
    var msg = {
        type: 'logout'
    };
    sendMessage(msg);
    $('#settings,#new-user,.payment-form,.modal,.docent-options-list,.modal-dialog,.referral-modal').hide();
    $('.help-center').addClass('hidden');
    $('body').attr('class', '');
    $('#signinButton').show();
    Sync.handlers.logout();
    delete _googleProfile;
    delete _userInfo;
    delete _docents;
    $('body').removeAttr('data-docentID data-parentDocentID');
    
    if (LessonLinkReferrer.isGoogleClassroom()) {
        $('.g-signin2').addClass('custom');
    }
};
function promptSignIn(listener) {
    var msg = {
        type: 'showIframe'
    };
    sendMessage(msg);
    $('#signinButton').show();
    if (typeof listener === 'function') {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.currentUser.listen(listener);
    }
}
function showSignedIn(token, profile) {
    if (!window.gapi) {
        gapi = {};
    }
    gapi.auth = {
        getToken: function() {
            return token;
        },
        signOut: signOut
    };
    if (typeof showSignedIn.altCallback === 'function') {
        showSignedIn.altCallback();
        delete showSignedIn.altCallback;
        return;
    }
    if (window._userInfo && profile && profile.getId() == _userInfo.googleID) {
        console.log('User already signed in');
        return;
    }
    // Update the app to reflect a signed in user
    var msg = {
        type: 'login'
    };
    sendMessage(msg);
    // Hide the sign-in button now that the user is authorized, for example:
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    $.when(getUserInfo(), getCourses()).then(updateIntercom);
    if (profile) {
        window._googleProfile = {
            id: profile.getId(),
            email: profile.getEmail(),
            imageUrl: profile.getImageUrl() || 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg?sz=100',
            name: profile.getName()
        };
        Sync.handlers.login();
    }
    // Socket.IO connection for live discussions
    connect();
}
function signOut() {
    if (!window.gapi || !gapi.auth2) {
        return false;
    }
    var auth2 = gapi.auth2.getAuthInstance();
    if (auth2) {
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
}
function connect() {
    if (!window.gapi || !gapi.auth || !window.io) {
        return false;
    }
    var url = baseURL.api + 'user/jwt';
    $.get(url, function(res) {
        if (connect.socket) {
            connect.socket.removeAllListeners();
            connect.socket.disconnect();
        }
        var socket = io.connect(baseURL.domain.slice(0,-1), {
            query: 'token=' + res.jwt,
            forceNew: true
        });
        socketHandlers(socket);
        connect.socket = socket;
        
        var origin = $('body').attr('data-origin');
        if (JWT.originWhitelist.indexOf(origin) != -1) {
            var msg = {
                jwt: res.jwt
            };
            window.parent.postMessage(msg, origin);
        }
    });
}
function socketHandlers(socket) {
    socket.on('news', function(data) {
        console.log(data);
    })
    .on('error', function(error) {
        console.log('Error:', error);
    })
    .on('newResponse', function(data) {
        if (window._userInfo && _userInfo._id && _userInfo._id.$id == data.userID) {
            var msg = {
                type: 'updateResponse',
                discussion: data.discussion,
                response: data.response
            };
            sendMessage(msg);
        }
        else if (data.docentID == $('body').attr('data-parentDocentID') || data.docentID == $('body').attr('data-docentID')) {
            var msg = {
                type: 'newResponse',
                discussion: data.discussion,
                response: data.response
            };
            sendMessage(msg);
        }
        var testCondition = function(item) {
            return item.ref == data.discussion.ref && item.created == data.discussion.created;
        };
        var discussion = getElement(data.docentID, 'discussion', testCondition);
        if (!discussion.responses) {
            discussion.responses = [];
        }
        discussion.responses.push(data.response);
    })
    .on('postNotes', function(data) {
        var docentID = data.docent._id.$id;
        var docent = getDocentFromCache(docentID, data);
        docent.notes = data.notes;
        var msg = {
            type: 'postNotes',
            notes: data.notes,
            isOwner: docent.isOwner
        };
        postMessageIfDocentIsRendered(msg, docentID);
    })
    .on('newElement', function(data) {
        socketHandlers.collaborativeEditing(data);
    })
    .on('editElement', function(data) {
        socketHandlers.collaborativeEditing(data);
    })
    .on('deleteElement', function(data) {
        socketHandlers.collaborativeEditing(data);
    })
    .on('postChoices', function(data) {
        var docentID = data.docent._id.$id;
        var docent = getDocentFromCache(docentID, data);
        var question = getElement(docentID, 'question', function(element) { return element._id.$id == data._id.$id; });
        var msg = {
            type: 'postChoices',
            isOwner: docent.isOwner,
            questionID: data._id.$id,
            modified: data.modified,
            choices: data.choices,
            currentChoices: question.choices,
            rightChoice: data.rightChoice
        };
        postMessageIfDocentIsRendered(msg, docentID);
        question.modified = data.modified;
        question.choices = data.choices;
        question.rightChoice = data.rightChoice;
    })
    .on('newAnswer', function(data) {
        var testCondition = function(item) {
            return item._id.$id == data.question.id;
        };
        var question = getElement(data.docent.id, 'question', testCondition);
        // Prevent errors when the question isn't found
        // this happens because socketIO is sending events from all docents
        // look at having socketIO sessions be docent specific
        if (!question) {
            return false;
        }
        if (!question.answers) {
            question.answers = [];
        }
        var answer = question.answers[data.answer.index];
        if (!answer) {
            answer = question.answers[data.answer.index] = {
                userID: {
                    $id: data.user.id
                },
                userName: data.user.displayName
            };
        }
        answer.text = data.answer.text;
        answer.modified = Date.now();
        if (data.answer.status) {
            if (!answer.attempts) {
                answer.attempts = [];
            }
            answer.attempts.push(answer.text);
        }
        if (data.answer.score) {
            answer.score = data.answer.score;
        }
        if ($('.view-answers-header[data-question-id="' + question._id.$id + '"]').is(':visible')) {
            var $row = ViewAnswers.constructRow(answer, question.rightChoice);
            $('.view-answers-row[data-student-id="' + answer.userID.$id + '"]').replaceWith($row);
            if ($row.index() == -1) {
                $('.view-answers-container').prepend($row);
            }
        }
    })
    .on('answerFeedback', function(data) {
        var msg = {
            type: 'answerFeedback',
            feedback: data.feedback,
            questionID: data.questionID
        };
        sendMessage(msg);
    })
    .on('banResponse', function(data) {
        var msg = data;
        msg.type = 'banResponse';
        msg.banned = Number(msg.banned);
        sendMessage(msg);
        
        var testCondition = function(item) {
            return item._id.$id == data.discussionID;
        };
        var discussion = getElement(data.docent._id.$id, 'discussion', testCondition);
        var response;
        for (var i in discussion.responses) {
            if (discussion.responses[i].index == data.index) {
                response = discussion.responses[i];
            }
        }
        (response || discussion.responses[data.index]).banned = msg.banned;
    })
    .on('newCourse', function(data) {
        socketHandlers.courseEvent(data, 'newCourse');
    })
    .on('editCourse', function(data) {
        socketHandlers.courseEvent(data, 'editCourse');
    })
    .on('deleteCourse', function(data) {
        socketHandlers.courseEvent(data, 'deleteCourse');
    })
    .on('newStudentInCourse', function(data) {
        newStudentInCourse(data.newStudent, data._id.$id);
    });
}
// Might want to refactor this to merge it with the 'postElement' logic in bridge.js
socketHandlers.collaborativeEditing = function(data) {
    console.log(data.event, data.score);
    var docentID = data.docent._id.$id;
    var docent = getDocentFromCache(docentID, data);
    var msg = {
        type: data.event,
        isOwner: docent.isOwner
    };
    // elementType is plural here. this is a bit inconsistent with other sections in bridge.js
    var elements = docent[data.elementType];
    if (!elements) {
        elements = docent[data.elementType] = [];
    }
    delete data.event;
    delete data.docent;
    data.elementType = data.elementType.slice(0,-1);
    msg.element = data;
    postMessageIfDocentIsRendered(msg, docentID);
    var preventDuplicate = false;
    for (var i in elements) {
        if (elements[i]._id.$id == msg.element._id.$id) {
            if (msg.type == 'newElement') {
                preventDuplicate = true;
            }
            else if (msg.type == 'editElement') {
                // Keep answers (to questions) and responses (to discussions) when editing
                msg.element.answers = elements[i].answers;
                msg.element.responses = elements[i].responses;
                msg.element.answer = elements[i].answer;
                // Keep choices when editing questions
                msg.element.choices = elements[i].choices;
                msg.element.rightChoice = elements[i].rightChoice;
                // Swap old data with new
                elements[i] = msg.element;
            }
            else {
                elements.splice(i,1);
            }
            break;
        }
    }
    if (!preventDuplicate && msg.type == 'newElement') {
        elements.push(msg.element);
    }
}
socketHandlers.courseEvent = function(data, event) {
    if (event == 'deleteCourse') {
        delete _courses[data._id.$id];
        delete GoogleClassroom.__data[data.googleClassroomID];
    }
    else {
        _courses[data._id.$id] = data.name;
        _isModerator[data._id.$id] = !data.isStudent;
        if (data.googleClassroomID) {
            GoogleClassroom.__data[data.googleClassroomID] = data._id.$id;
            var event = $.Event('imported-google-class-' + data.googleClassroomID, {
                courseID: data._id.$id,
                courseName: data.name
            });
            $(window).trigger(event);
        }
    }
    if ($('.docent-assign-dialog').is(':visible')) {
        selectCourse();
    }
}
function postMessageIfDocentIsRendered(msg, docentID) {
    var $body = $('body');
    if (docentID == $body.attr('data-docentID') || docentID == $body.attr('data-parentDocentID') || docentID == $body.attr('data-childDocentID')) {
        sendMessage(msg);
    }
}
function getDocentFromCache(docentID, data) {
    if (!_docents[docentID]) {
        var userName;
        if (typeof getStudentName == 'function') {
            userName = getStudentName(data.docent.userID.$id);
        }
        _docents[docentID] = data.docent;
        if (data.docent && data.docent.parentDocent && data.docent.parentDocent.$id == $('body').attr('data-docentID')) {
            annotationSwitcher.addOption(docentID, userName);
            annotationSwitcher.sort();
            var msg = {
                type: 'showAnnotationSwitcher'
            };
            sendMessage(msg);
        }
    }
    return _docents[docentID];
}
