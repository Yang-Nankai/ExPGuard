/* Copyright (C) 2020 claycodes.org - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Clay Smith <clay@claycodes.org>, 2020
 */

chrome.runtime.sendMessage({ type: 'showPageAction' });
const editorExtensionId = "nenibigflkdikhamlnekfppbganmojlg";
var gridview = false
var ui = false
var classList = []
var classRoster = []
var subscriptionStatus = false
var attendancefrequency = 300000
var doorClosed = false
var classroomId = ''
var automated = true
var ending = false
var ejectAll = false
var muteAll = false
var people = { captured: false, menu: false, captured: false, scroll: scrollSwitch }
var attendees = []
var sink = []
var snapshot = []
var csvControl = false
var classId = ''
var className = ''
var stat, scrollSwitch, spreadsheetId, sinksheetid, sendtosink;
var syncing = false
var authorized = false
var unknown = false
var observing = false
var account = {}
var newUI = false
var newMeet, interval


chrome.runtime.sendMessage({ "message": "activate_icon" });

function localizeHtmlPage() {
    //Localize by replacing __MSG_***__ meta tags
    var objects = document.getElementsByTagName('html');
    for (var j = 0; j < objects.length; j++) {
        var obj = objects[j];

        var valStrH = obj.innerHTML.toString();
        var valNewH = valStrH.replace(/__MSG_(\w+)__/g, function (match, v1) {
            return v1 ? chrome.i18n.getMessage(v1) : "";
        });

        if (valNewH != valStrH) {
            obj.innerHTML = valNewH;
        }
    }
}

async function init() {
    chrome.storage.local.get(null, function (settings) {
        var allKeys = Object.keys(settings);
        let removal = []
        let today = new Date()
        sendtosink = settings.sendtosink
        sinksheetid = settings.sinksheetid
        today.setDate(today.getDate() - 7)
        for (k in allKeys) {
            let key = allKeys[k]
            if (key.indexOf('sheetDate') > -1) {
                if (new Date(settings[key]) <= new Date(today)) {
                    removal.push(key.replace('sheetDate', ''))
                }
            }
        }
        for (let i = 0; i < removal.length; i++) {
            chrome.storage.local.remove(`classroom_${removal[i]}`)
            chrome.storage.local.remove(`'dnd_'${removal[i]}`)
            chrome.storage.local.remove(`${removal[i]}sheetId`)
            chrome.storage.local.remove(`${removal[i]}sheetDate`)
            chrome.storage.local.remove(`${removal[i]}`)
            if ((i + 1) * 5 == 110) {
                break
            }
        }

    })

    chrome.storage.local.get(['freq'], function (res) {
        if (res.freq == undefined) {
            attendancefrequency = attendancefrequency ? attendancefrequency : 3000000
        } else {
            attendancefrequency = res.freq
        }
    })

    chrome.storage.local.get(['status'], function (res) {
        if (res.status == undefined) {
            chrome.storage.local.set({ status: true })
            stat = true
        } else {
            stat = res.status
        }
    })
    chrome.storage.local.get(['scroll'], function (res) {
        if (res.scroll == undefined) {
            chrome.storage.local.set({ scroll: true })
            scrollSwitch = true
        } else {
            scrollSwitch = res.scroll
        }
    })

    var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')

    chrome.storage.local.get('classroom_' + meet, function (res) {
        classroomId = res['classroom_' + meet]
    })
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type == 'authorized') {
        authorized = message.authorized
    }
    if (message.type == 'unknown') {
        unknown = true
    }
    if (message.type == 'download') {

        const csvContent = "data:text/csv;charset=utf-8,"
            + message.rows.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        const d = new Date().toLocaleString().replace(/,/g, '')
        link.setAttribute(`download`, `${message.meet} ${d}.csv`);
        document.body.appendChild(link);
        link.click();
    }

    if (message.type == 'settings') {
        syncing = message.sync
        account = message.account
        spreadsheetId = message.spreadsheetId
        sinksheetid = message.sinksheetid

    }

    // if(!syncing){
    //     return
    // }

    if (message.type == 'sheet') {
        var btn = document.getElementById('attendance')
        if (btn && message.id) {
            spreadsheetId = message.id
        }

        btn.setAttribute('data-sheet', spreadsheetId)
        document.getElementById('attendancelink').setAttribute('href', 'https://docs.google.com/spreadsheets/d/' + spreadsheetId)

    }
    if (message.type == 'cooldown') {
        if (!subscriptionStatus) {
            cooldown(message.time)
        }
    }

    if (message.type == 'sheetAdded') {
        attendanceTaking()
    }
    if (message.type == 'subscription') {

        subscriptionStatus = message.subscription
        var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
        console.log('subscription status', subscriptionStatus)
        if (subscriptionStatus) {
            addClassrooms()
            attendanceFrequency()

        } else {
            subscribebutton()
        }
    }
    if (message.type == 'classList') {

        classList = message.list
    }
    if (message.type == 'classRoster') {
        if (!message.list) {
            return
        }
        classRoster = message.list
        getAttendees()
    }
})

function gridviewfix() {
    try {
        let icon = document.querySelector('.__gmgv-button').querySelector('svg')
        icon.setAttribute("style", "padding:0;height:24px;width:24px")
    } catch (e) { }
}

$(document).ready(function () {
    chrome.storage.local.get('newmeet', function (res) {
        if (res.newmeet == undefined) {
            chrome.storage.local.set({ newmeet: true })
        }
    })
    chrome.storage.local.get('newdaily', function (res) {
        if (res.newdaily == undefined) {
            chrome.storage.local.set({ newdaily: true })
        }
    })
    chrome.storage.local.get('automated', function (res) {
        if (res.automated == undefined) {
            chrome.storage.local.set({ automated: true })
            automated = true
        } else {
            automated = res.automated
        }
    })
    init()
    var data = {
        type: 'initialize',
    }
    chrome.runtime.sendMessage(data);
    moment.locale();
    waitforMeet()
    //}
})

async function waitforconnect() {
    let button = document.querySelectorAll('.NzPR9b [role="button"]')
    if (!button || button.length == 0) {
        button = document.querySelectorAll('[jsname="A5il2e"]')
        // if (button.length > 0) {
        //     newUI = true
        // }
    }
    if (button.length == 0) {
        var buttonwait = setTimeout(function () {
            clearTimeout(buttonwait)
            waitforconnect();
        }, 500);
    } else {
        // if (newUI) {
        button[1].addEventListener('click', function () {
            newCreateMenu()
        })
        $('[jsname="CQylAd"').on('click', () => {
            var regex = /[0-9]+/g;
            total = parseInt(document.querySelector('.uGOf1d').innerHTML.match(regex))
            takeAttendance(total, 'end')
        })

        if (subscriptionStatus) {
            document.querySelector('[jscontroller="soHxf"][data-panel-id="1"]').click()
            closePeople()
        }
        // } else {
        //     for (let i = 0; i < button.length; i++) {
        //         button[i].addEventListener('click', function () {
        //             peopleMenu()
        //         })

        //     }
        // }
        setTimeout(function () {
            gridviewfix()
        }, 5000);

        chrome.storage.local.get(['sendtosink'], function (res) {
            if ($('#sendtosinkauto').length == 0) {
                $('body').append('<input type="hidden" id="sendtosinkauto" value="' + res.sendtosink + '"/>')
                $('body').append('<input type ="hidden" id="substatus" value="' + subscriptionStatus + '"/>')
            }
        })
        //document.head.innerHTML += '<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">'
        ending = false

        observer.observe(document.getElementsByTagName('c-wiz')[0], config);

    }
}

async function closePeople() {
    let close = document.querySelectorAll('[jscontroller="soHxf"]')
    let closeElement
    close.forEach(cl => {
        if (cl.innerText == 'close') {
            closeElement = cl
        }
    })

    if (!closeElement) {
        var cp = setTimeout(function () {
            clearTimeout(cp)
            closePeople()
        }, 500);
        return
    }
    await wait(200)
    closeElement.click()
}

async function waitforMeet() {
    var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
    //if (syncing) {
    if (window.location.href.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/gi)) {
        var data = {
            type: 'meetinit',
            meet: meet,
            link: window.location.href
        }
        chrome.runtime.sendMessage(data);
        console.log('triggering wait for connect')
        waitforconnect()

        if (subscriptionStatus && classList.length == 0) {
            var data = {
                type: 'classlist',
                meet: meet,
                link: window.location.href
            }
            chrome.runtime.sendMessage(data);
        }

        init()
        clearTimeout(sc)
        return
    }
    // }
    var sc = setTimeout(function () {
        clearTimeout(sc)
        waitforMeet();
    }, 500);
}

function snapshotAttendees() {
    var ent = false
    let participants = document.querySelectorAll('div[data-sort-key]');
    if (participants.length == 0) {
        participants = document.querySelectorAll('div[data-participant-id]');
        ent = true
    }
    if (participants.length == 0) {
        participants = document.querySelectorAll('[role="listitem"]')
    }

    for (let i = 0; i < participants.length; i++) {
        let key
        let user
        let userid
        // if (ent) {
        //     key = participants[i].getAttribute('data-participant-id')
        //     let participant = participants[i].querySelector('.KsCJ0') ? participants[i].querySelector('.KsCJ0') : participants[i]

        //     user = participant ? participant.innerText.replace(/\(...\)/, '').replace(/^[\+\=]/, '').trim() : ''
        //     userid = key.split('/')[3]
        // }
        // else if (newUI) {
        key = participants[i].getAttribute('data-participant-id')
        let participant = participants[i].querySelector('.zWGUib')   //ZjFb7c
        console.log(JSON.stringify(key))
        user = participant ? participant.innerText.replace(/\(...\)/, '').replace(/^[\+\=]/, '').trim() : ''
        space = key.split('/')[1]
        userid = key.split('/')[3]
        // }
        // else {
        // key = participants[i].getAttribute('data-sort-key')
        // user = key.split('spaces/')[0].trim()
        // userid = key.split('spaces/')[1]
        //}
        const row = (element) => element.includes(userid);
        if (!snapshot.some(row)) {
            snapshot.push([user, userid])
        }
        if (ejectAll) {
            try {
                eject(key)
            } catch (e) { }
        }
        if (muteAll) {
            try {
                mute(key)
            } catch (e) { }
        }
    }
    document.getElementById('count').innerHTML = snapshot.length
}

var x
var end
function cooldown(time) {
    clearInterval(x);
    let cool = new Date().getTime() + time
    end = moment(cool);
    x = setInterval("countdown()", 1000)
}

function countdown() {
    if (!authorized) {
        return
    }
    let start = moment();
    let hot = start.isBefore(end)

    if (!hot) {
        clearInterval(x);
        $('#countdown').text('')
        $('#count').css('color', '#06635f')
        $('#svg_2').css('fill', '#06635f')
        return
    }

    let diff = end.diff(start);
    let f = moment.utc(diff).format("mm:ss");
    $('#count').css('color', '#DB4437')
    $('#svg_2').css('fill', '#DB4437')
    $('#countdown').css('color', '#DB4437')
    $('#countdown').text('-' + f)
}



function getAttendees() {
    var ent = false
    const date =new Date()
    let participants = document.querySelectorAll('div[data-sort-key]');
    if (participants.length == 0) {
        participants = document.querySelectorAll('div[data-participant-id]');
        ent = true
    }
    if (participants.length == 0) {
        participants = document.querySelectorAll('[role="listitem"]')
    }

    var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
    participants.forEach(p => {
        let key, user, userid, space
        //     if (ent) {
        //         key = p.getAttribute('data-participant-id')


        //         let participant = p.querySelector('.KsCJ0') ? p.querySelector('.KsCJ0') : p
        // console.log(JSON.stringify(key))
        //         user = participant ? participant.innerText.replace(/\(...\)/, '').replace(/^[\+\=]/, '').trim() : ''
        //         space = key.split('/')[1]
        //         userid = key.split('/')[3]
        //     }
        //     else if (newUI) {
        key = p.getAttribute('data-participant-id')
        let participant = p.querySelector('.zWGUib')   //ZjFb7c

        //console.log(JSON.stringify(key), participant)
        user = participant ? participant.innerText.replace(/\(...\)/, '').replace(/^[\+\=]/, '').trim() : ''
        space = key.split('/')[1]
        userid = key.split('/')[3]
        //}
        // else {
        //     key = p.getAttribute('data-sort-key')
        //     console.log('sort',JSON.stringify(key))
        //     user = key.split('spaces/')[0].trim()
        //     userid = key.split('spaces/')[1]
        // }
        const row = (element) => element.includes(userid);
        if (!attendees.some(row)) {
            
           // attendees.push([user, moment().format('l LTS'), moment().format('l LTS'), '', userid])
            attendees.push([user, date.toLocaleString().replace(/,/g, ''), date.toLocaleString().replace(/,/g, ''), '', userid])
            
        } else {
            let index = attendees.findIndex(row)
            attendees[index][0] = user
        }

        if (classRoster.length > 0) {
            try {
                const classrow = (element) => element.profile.name.fullName.includes(user.trim());
                if (!classRoster.some(classrow) && doorClosed) {
                    eject(key)
                }

            } catch (e) { }
        }

        if (!sink.some(row) && sendtosink) {
            date.toLocaleString()
            //sink.push([user, moment().format('l LTS'), moment().format('l LTS'), userid, meet, space, className, classId])
            sink.push([user,  date.toLocaleString().replace(/,/g, ''),  date.toLocaleString().replace(/,/g, ''), userid, meet, space, className, classId])
        }

        if (ejectAll) {
            try {
                eject(key, ent)
            } catch (e) { }
        }
        if (muteAll) {
            try {
                mute(key, ent)
            } catch (e) { }
        }
    })

    if (classRoster.length > 0) {
        classRoster.forEach(r => {
            if (r) {
                let student = r.profile.name.fullName
                const row = (element) => element.includes(student);
                if (!attendees.some(row)) {
                    attendees.push([student, chrome.i18n.getMessage('absent'), '', '', ''])
                }
                // if (!sink.some(row) && sendtosink) {
                //     sink.push([student, moment().format('l'), moment().format('l'), uuidv4(), meet, '', className, classId, chrome.i18n.getMessage('absent')])
                // }
            }
        })
    }

    attendees.map(row => {
        if (row[2] != chrome.i18n.getMessage('absent')) {
            row[2] = date.toLocaleString().replace(/,/g, '') //moment().format('l LTS')
        }
    })
    // for (let i = 0; i < attendees.length; i++) {

    //     if (attendees[i][2] != chrome.i18n.getMessage('absent')) {
    //         attendees[i][2] = moment().format('l LTS')
    //     }
    // }
    for (let i = 0; i < sink.length; i++) {
        if (sink[i][8] != chrome.i18n.getMessage('absent')) {
            sink[i][2] =  date.toLocaleString().replace(/,/g, '') //moment().format('l LTS')
        }
        sink[i][6] = className
        sink[i][7] = classId
    }
    //try{
    document.getElementById('count').innerHTML = attendees.length
    //}catch(e){console.log(e)}
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function eject(userkey, ent) {
    let userOptions
    let optionsButton
    let kickButton
    if (ent) {
        userOptions = document.querySelector('[data-participant-id="' + userKey + '"]');
        optionsButton = userOptions.querySelector('[jsname="z4Tpl"]')
        optionsButton.click()
        kickButton = userOptions.querySelectorAll('[jsname="BUtajd"]')
        if (kickButton) {
            kickButton[0].click()
            removetimeout('.U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.kHssdc.HvOprf[jsname="LgbsSe"]')
        }
    } else {
        userOptions = document.querySelector('[data-sort-key="' + userkey + '"]')
        optionsButton = userOptions.querySelector('[jsname="z4Tpl"]')
        optionsButton.click()
        kickButton = userOptions.querySelectorAll('[jsname="BUtajd"]')
        if (kickButton) {
            kickButton[0].click()
            removetimeout('.U26fgb.O0WRkf.oG5Srb.HQ8yf.C0oVfc.kHssdc.HvOprf[jsname="LgbsSe"]')
        }
    }
}


async function removetimeout(query) {
    while (document.querySelectorAll(query).length == 0) {
        await wait(200)
    }
    let remove = document.querySelectorAll(query)
    for (let i = 0; i < remove.length; i++) {
        remove[i].click()
    }
}

function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout)
    })
}

function captureSnapshot() {
    let list = document.querySelector('[role="tabpanel"]')
    if (list) {
        list.style.height = 'height: auto !important';
    }
    let count = document.getElementById('count')
    let regex = /[0-9]+/g;
    let total = parseInt(document.querySelectorAll('.rua5Nb')[0].innerHTML.match(regex))
    if (parseInt(count.innerHTML) > 7 && !people.scroll && scrollSwitch) {
        //if (!newUI) {
        scrollList(list, 'snap')
        people.scroll = true
        //}
    } else {
        snapshotAttendees();
        captured(false) //CSS
    }
    // && stat
    if (snapshot.length >= total) {
        captured(true)//CSS
        var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
        //let title = document.querySelector('[role="heading"]')
        //console.log(title, window.title)
        var data = {
            type: 'newattendance', //'newsnapshot',
            values: snapshot,
            meet: meet,
            snap: true,
            automated: automated,
            link: window.location.href
        }

        chrome.runtime.sendMessage(data);
        ejectAll = false
        muteAll = false
        clearTimeout(sb)
        snapshot = []
        people.scroll = false
        return
    }

    var sb = setTimeout(function () {
        clearTimeout(sb)
        captureSnapshot(true);
    }, 1000);
}

function takeAttendance(total, from) {

    if (!people.captured) { //may want to remove
        var list = document.querySelector('[role="tabpanel"]')
        if (list) {
            list.style.height = 'height: auto !important';
        }
        var count = document.getElementById('count')
        var regex = /[0-9]+/g;
        try {
            // if (newUI) {
            total = parseInt(document.querySelector('.uGOf1d').innerHTML.match(regex))
            // } else {
            //     total = total ? total : parseInt(document.querySelector('.rua5Nb').innerHTML.match(regex))
            // }
        } catch (e) {
            console.log('error', e)
            return
        }

        if (total > 0 && attendees.length >= total && stat) {
            captured(true)
            let title = document.querySelector('[role="heading"]')
            var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
            var data = {
                type: 'newattendance',
                values: attendees,
                meet: meet,
                link: window.location.href,
                from: from ? from : 'takeattendance',
            }
            console.log('attendance', data)
            chrome.runtime.sendMessage(data);

            if (sendtosink && sink.length > 0 && subscriptionStatus) {
                var data = {
                    type: 'sink',
                    values: sink,
                    meet: meet,
                    link: window.location.href,
                    spreadsheetId: sinksheetid,
                    from: from ? from : 'takeattendance',
                }
                chrome.runtime.sendMessage(data);
            }

            attendees = []
            people.scroll = false
            ejectAll = false
            muteAll = false
            return
        }
        if (count && parseInt(count.innerHTML) > 10 && !people.scroll && scrollSwitch && stat) {
            // if (!newUI) {
            //     scrollList(list, count.innerHTML)
            //     people.scroll = true
            // }
        }
        else if (stat) {
            getAttendees();
            captured(false)
        }

        let capturing = setTimeout(function () {
            clearTimeout(capturing)
            takeAttendance(total, from);
        }, 500);
    }
}


//attendance type switch
var sl
var attendanceTaking = function (elem) {
    console.log('taking')
    // if (!elem && !newUI) {
    //     let tabButtons = document.querySelectorAll('[role="tab"]')
    //     elem = tabButtons[0]
    //     if (!tabButtons) {
    //         return
    //     }
    //     if (!tabButtons[0] || tabButtons[0].getAttribute('aria-selected') != 'true') {
    //         return
    //     }
    // }

    // if (!newUI && stat && elem && elem.getAttribute('tab') == 0) {
    //     if (!automated) {
    //         captureSnapshot()
    //     } else {
    //         takeAttendance()
    //     }
    // }
    //if (stat && newUI) {
    if (!automated) {
        captureSnapshot()
    } else {
        takeAttendance()
    }
    //}
}
//set the automation attendance taking for subscribed
//attendanceTaking

function setAttendanceObserver() {

    //const MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    const targetNode = document.querySelector('[role="list"]')
    //console.log('participants_list',participants_list)
    const observer = new MutationObserver(attendanceMutation);
    const config = {
        attributes: false,
        childList: true,
        characterData: false
    }
    // Start observing the target node for configured mutations
    observer.observe(targetNode, config);

    return targetNode
}


function attendanceMutation(mutations) {

    mutations.forEach(mutation => {
        if (mutation.removedNodes.length > 0) {
            mutation.removedNodes.forEach(node => {
                formatAttendance(node, 'left')
            })
        }
        if (mutation.addedNodes.length > 0) {
            mutation.addedNodes.forEach(node => {
                formatAttendance(node, 'join')
            })
        }
    })

    let participants = document.querySelectorAll('[role="listitem"]')
    participants.forEach(formatAttendance)

    const meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
    var data = {
        type: 'newattendance',
        values: attendees,
        meet: meet,
        link: window.location.href,
        auto: true,
        new: newMeet
    }
    newMeet = false

    // The ID of the extension we want to talk to.
    data.sendMessage = true
    chrome.runtime.sendMessage(data);

    attendees = []
    if (sendtosinkauto) {
        var data = {
            type: 'sink',
            values: sink,
            meet: meet,
            link: window.location.href,
            from: 'auto'
        }
        chrome.runtime.sendMessage(data);
    }

}

function formatAttendance(node, state) {
    const date =new Date()
    const meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
    let key = node.getAttribute('data-participant-id')
    let participant = node.querySelector('.zWGUib')  //ZjFb7c
    //console.log(JSON.stringify(key))

    let user = participant ? participant.innerText.replace(/\(...\)/, '').replace(/^[\+\=]/, '').trim() : ''
    let space = key.split('/')[1]
    let userid = key.split('/')[3]
    const row = (element) => element.includes(userid);
    if (!attendees.some(row)) {
        
        //let attendee = [user, moment().format('l LTS'), moment().format('l LTS'), '', userid]
        let attendee = [user, date.toLocaleString().replace(/,/g, ''), date.toLocaleString().replace(/,/g, ''), '', userid]
        if (state) {
            attendee.push(state)
        }
        attendees.push(attendee)
    } else {
        let index = attendees.findIndex(row)
        attendees[index][0] = user
    }

    if (!sink.some(row) && sendtosink) {
        sink.push([user, date.toLocaleString().replace(/,/g, ''), date.toLocaleString().replace(/,/g, ''), userid, meet, space, className, classId])
    }
    // for (let i = attendees.length - 1; i >= 0; i--) {
    //     attendees[i][2] = moment().format('l LTS')
    // }
    // for (let i = sink.length - 1; i >= 0; i--) {
    //     sink[i][2] = moment().format('l LTS')
    //     sink[i][6] = classroomName
    //     sink[i][7] = classroomId
    // }
}


//ensures the menu is in place. creates attendancce listening
function peopleMenu() {
    createMenu()
    let tabButtons = document.querySelectorAll('[role="tab"]')
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].setAttribute('tab', i)
        tabButtons[i].getAttribute('aria-selected')
        if (i == 0) {
            if (tabButtons[i].getAttribute('aria-selected') == 'true') {
                attendanceTaking(tabButtons[i])
            }
            tabButtons[i].addEventListener('click', function () { attendanceTaking(this) })
        }
    }
    try {
        let closebutton = document.querySelector('.VUk8eb')
        closebutton.addEventListener('click', resetAttendance)
    } catch (e) { }
}

var resetAttendance = (function () {
    people.captured = false
    attendees = []
    clearInterval(x)
})

function newCreateMenu() {
    const menu = document.querySelector('[jsname="b0t70b"]') //'[jscontroller="s9UZq"]') //('[role="heading"]')//
    if (!menu) {
        let cmenu = setTimeout(function () {
            clearTimeout(cmenu)
            newCreateMenu()
        }, 500);
        return
    } else {

    }
    people.total = 0
    addMenu()
    attendanceTaking()
}

function attendanceInterval() {
    if (attendancefrequency === '') {
        clearTimeout(interval)
        return
    }
    interval = setTimeout(function () {
        clearTimeout(interval)
        attendanceTaking()
        attendanceInterval()
    },
        attendancefrequency)
    //interval = setInterval(attendanceTaking(), attendancefrequency);
    console.log('interval', attendancefrequency, attendancefrequency / 1000, interval)

}

async function addMenu() {
    people.total = 0
    const menu = document.querySelector('[jsname="b0t70b"]') //'[jscontroller="s9UZq"]')
    menu.insertAdjacentHTML('afterbegin', attendanceMenu(people))
    await wait(200)
    const atten = document.querySelector('#attendance')
    if (!atten) {
        let cmenu = setTimeout(function () {
            clearTimeout(cmenu)
            addMenu()
        }, 500);
        return
    }
    completeMenu(menu)

}

function completeMenu(menu) {
    var elems = document.querySelectorAll('.tooltipped');
    M.Tooltip.init(elems);
    let active = isVisible(menu)
    if (!active && authorized) {
        var icon = document.getElementById('svg_2')
        if (icon) {
            document.getElementById("count").style.color = '#06635f'
            icon.setAttribute('fill', '#06635f')
            document.getElementById('count').style.display = 'none'
        }
        var scroll = document.getElementById('scrollicon')
        if (scroll) {
            scroll.style.display = 'none'
        }
    } else {
        var icon = document.getElementById('svg_2')
        if (icon) {
            var ct = document.getElementById("count").style.color = '#06635f'
            icon.setAttribute('fill', '#DB4437')
            if (document.getElementById('count')) {
                document.getElementById('count').style.display = 'inline'
            }
        }
        var scroll = document.getElementById('scrollicon')
        if (scroll) {
            scroll.style.display = 'inline'
        }
    }
    if (subscriptionStatus) {
        var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
        if (classList.length == 0) {
            var data = {
                type: 'classlist',
                meet: meet,
                link: window.location.href
            }
            chrome.runtime.sendMessage(data);
        }
        addClassrooms()
        var elems = document.querySelectorAll('.tooltipped');
        M.Tooltip.init(elems);
        attendanceFrequency()
        addDataStudioSheetLink()
        //attendanceInterval()

        if (!observing) {
            const set = setAttendanceObserver()
            if (set) {
                observing = true
            } else {
                setTimeout(function () { setAttendanceObserver() }, 1000)
            }
        }
    } else {
        subscribebutton()
    }
    attendanceMouse()
    getSwitch()
    getScrollSwitch()
    $('#optionmenu').append(syncedto())
     if (!authorized) {
        let auth = chrome.i18n.getMessage('authorize')
        $('#optionmenu').append(auth)
        $('#auth').on('click', function () {
            var data = {
                type: 'auth',
                from: 'onclick'
            }
            console.log(data)
            chrome.runtime.sendMessage(data);
        })
        $('#svg_2').css('fill', '#DB4437')
    }
    if (unknown) {
        let unknown = chrome.i18n.getMessage('unknown')
        $('#optionmenu').append(unknown)
        $('#svg_2').css('fill', '#DB4437')
    }

    missingsheet(people)
    $('#moreclick').on('click', function () {
        moresettings()
    })
    document.getElementById('attendancesnap').addEventListener('click', function () {
        $('#shutter').addClass('on');
        setTimeout(function () {
            $('#shutter').removeClass('on');
        }, 30 * 2 + 45);/* Shutter speed (double & add 45) */
        captureSnapshot()
    })
}


function createMenu() {

    if (!document.getElementById('attendance')) {
        people.total = 0

        try {
            var menuItems = document.querySelectorAll('[role="tablist"]')[0].querySelectorAll('[role="tab"]')
        } catch (e) {
            var menuItems = document.querySelector('.NzPR9b').querySelectorAll('[role="button"]')
        }

        if (menuItems[0].getAttribute('class').indexOf('Z9zn3b') > -1) {
            menuItems[1].setAttribute('data-tab-id', '3')
            menuItems[0].parentElement.style['z-index'] = '999'
            menuItems[0].insertAdjacentHTML('afterend', attendanceMenu(people))

            var elems = document.querySelectorAll('.tooltipped');
            M.Tooltip.init(elems);
            var menuItems = document.querySelectorAll('[role="tablist"]')[0].querySelectorAll('[role="tab"]')
            var active = menuItems[0].getAttribute('aria-selected') == 'true'
            if (!active && authorized) {
                var icon = document.getElementById('svg_2')
                if (icon) {
                    var ct = document.getElementById("count").style.color = '#06635f'
                    icon.setAttribute('fill', '#06635f')
                    document.getElementById('count').style.display = 'none'
                }
                var scroll = document.getElementById('scrollicon')
                if (scroll) {
                    scroll.style.display = 'none'
                }
            } else {
                var icon = document.getElementById('svg_2')
                if (icon) {
                    var ct = document.getElementById("count").style.color = '#06635f'
                    icon.setAttribute('fill', '#DB4437')
                    if (document.getElementById('count')) {
                        document.getElementById('count').style.display = 'inline'
                    }
                }
                var scroll = document.getElementById('scrollicon')
                if (scroll) {
                    scroll.style.display = 'inline'
                }
            }
            if (subscriptionStatus) {
                var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
                if (classList.length == 0) {
                    var data = {
                        type: 'classlist',
                        meet: meet,
                        link: window.location.href
                    }
                    chrome.runtime.sendMessage(data);
                }
                addClassrooms()
                var elems = document.querySelectorAll('.tooltipped');
                var instances = M.Tooltip.init(elems);
                attendanceFrequency()
                addDataStudioSheetLink()
            } else {
                subscribebutton()
            }
            attendanceMouse()

            getSwitch()
            getScrollSwitch()
            $('#optionmenu').append(syncedto())

            if (!authorized) {
                let auth = chrome.i18n.getMessage('authorize')
                $('#optionmenu').append(auth)
                $('#auth').on('click', function () {
                    var data = {
                        type: 'auth',
                        from: 'onclick'
                    }
                    chrome.runtime.sendMessage(data);
                })
                $('#svg_2').css('fill', '#DB4437')
            }
            if (unknown) {
                let unknown = chrome.i18n.getMessage('unknown')
                $('#optionmenu').append(unknown)
                $('#svg_2').css('fill', '#DB4437')
            }

            missingsheet(people)
            $('#moreclick').on('click', function () {
                moresettings()
            })
            document.getElementById('attendancesnap').addEventListener('click', function () {
                $('#shutter').addClass('on');
                setTimeout(function () {
                    $('#shutter').removeClass('on');
                }, 30 * 2 + 45);/* Shutter speed (double & add 45) */
                captureSnapshot()
            })
        }
    }
}

function isVisible(element) {
    return window.getComputedStyle(element).visibility === "hidden"
}

function captured(state) {
    if ($('#svg_2').length) {
        if (!state || !authorized) {
            $('#count').css('color', '#DB4437')
            $('#svg_2').css('fill', '#DB4437')
            if ($('#count').length) {
                $('#count').css('display', 'inline')
            }
            $('#scrollicon').css('display', 'inline')
        } else {
            $('#count').css('color', '#06635f')
            $('#svg_2').css('fill', '#06635f')
            if ($('#count').length) {
                $('#count').css('display', 'none')
            }
            $('#scrollicon').css('display', 'none')
        }
    }

}

function addClassrooms() {
    const date =new Date()
    if ($('#classList').length > 0) {
        return
    }
    var html = ''
    html += '<div id="classDiv" style="width:200px;"><select id="classList">'
    html += '<option value="" selected>' + chrome.i18n.getMessage('choose') + '</option>'
    for (var i = 0; i < classList.length; i++) {

        if (classList[i]) {
            let selected = ''
            if (classList[i].id == classroomId) {
                selected = 'selected'
            }
            html += '<option value="' + classList[i].id + '" ' + selected + '>' + classList[i].name + '</option>'
            if (selected == 'selected') {
                if ($('#extclassroomid').length == 0) {
                    $('body').append('<input id="extclassroomid" type="hidden" value="' + classList[i].id + '"/>')
                    $('body').append('<input id="extclassroomname" type="hidden" value="' + classList[i].name + '"/>')
                } else {
                    $('#extclassroomid').val(classList[i].id)
                    $('#extclassroomname').val(classList[i].name)
                }
            }
        }
    }
    html += '</select></div>'
    $('#optionmenu').append(html)




    M.FormSelect.init($('#classList'))
    var csv = ''
    csv += '<div id="customDiv" style="width:200px;">'
    let v = csvControl ? classRoster.join(',') : ''

    csv += '<input placeholder="Comma Separated List" value="' + v + '"id="csvList" type="text" class="csv">'
    csv += '</div>'
    $('#optionmenu').append(csv)

    var dnd = ''
    dnd += '<a style="position: relative;top: -40px;left: 210px;"class="btn-floating btn-small waves-effect waves-light grey lighten-5 tooltipped" data-position="left" data-tooltip="' + chrome.i18n.getMessage('tooltipdnd') + '" id="doorclosed" aria-label="' + chrome.i18n.getMessage('tooltipdnd') + '">'
    dnd += '<i class="material-icons" id="doorclosedicon" style="color:#00796b;">do_not_disturb_off</i>'
    dnd += '</a>'
    $('#classDiv').append(dnd)
    var muteAllbtn = ''
    muteAllbtn += '<a style="position: relative;top: -40px;left: 150px;"class="btn-floating btn-small waves-effect waves-light grey lighten-5 tooltipped" data-position="left" data-tooltip="' + chrome.i18n.getMessage('tooltipmute') + '" id="muteall" aria-label="' + chrome.i18n.getMessage('tooltipmute') + '">'
    muteAllbtn += '<i class="material-icons" id="mutesallicon" style="color:#00796b;">volume_off</i>'
    muteAllbtn += '</a>'
    //$('#classDiv').append(muteAllbtn)
    var removeAll = ''
    removeAll += '<a style="position: relative;top: -40px;left: 150px;"class="btn-floating btn-small waves-effect waves-light grey lighten-5 tooltipped" data-position="left" data-tooltip="' + chrome.i18n.getMessage('tooltipremove') + '" id="removeall" aria-label="' + chrome.i18n.getMessage('tooltipremove') + '">'
    removeAll += '<i class="material-icons" id="removeallicon" style="color:#db3236;">report</i>'
    removeAll += '</a>'
    //$('#classDiv').append(removeAll)
    var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
    chrome.storage.local.get('classroom_' + meet, function (res) {
        if (classroomId) {
            $("#classList option").each(function () {
                if ($(this).val() == classroomId) {
                    $(this).attr('selected', 'selected');
                }
            });
            M.FormSelect.init($('#classList'))
            $('#optionmenu').append(html)

            var data = {
                type: 'classroster',
                classId: classroomId,
                className: $("#classList option:selected").text(),
                title: `${date.toLocaleDateString()} ${$("#classList option:selected").text() ? $("#classList option:selected").text() : meet}`, //moment().format('L')
                meet: meet,
                link: window.location.href
            }

            chrome.runtime.sendMessage(data);
        }
    })

    chrome.storage.local.get(['dnd_' + meet], function (res) {
        if (res['dnd_' + meet]) {
            $('#doorclosedicon').text('do_not_disturb_on')
            $('#doorclosedicon').css('color', '#DB4437')
            doorClosed = true
        } else if (!res['dnd_' + meet]) {
            $('#doorclosedicon').text('do_not_disturb_off')
            $('#doorclosedicon').css('color', '#00796b')
            doorClosed = false
        }
    })
    $('#removeall').on('click', function () {
        ejectAll = true
        attendanceTaking()
    })
    $('#muteall').on('click', function () {
        muteAll = true
        attendanceTaking()
    })

    $('#doorclosed').on('click', function () {
        var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
        if ($('#doorclosedicon').text() == 'do_not_disturb_off' && $('#classList').val() != '') {
            $('#doorclosedicon').text('do_not_disturb_on')
            $('#doorclosedicon').css('color', '#DB4437')
            doorClosed = true
        } else {
            $('#doorclosedicon').text('do_not_disturb_off')
            $('#doorclosedicon').css('color', '#00796b')
            doorClosed = false
        }
        if ($('#classList').val() == '') {
            $('#doorclosedicon').text('do_not_disturb_off')
            $('#doorclosedicon').css('color', '#00796b')
            doorClosed = false
        }
        let obj = {}
        obj['dnd_' + meet] = doorClosed
        chrome.storage.local.set(obj)
    })
    $('#csvList').on('change', function () {
        let list = $('#csvList').val().replace(/\n/g, ",").split(',')
        list = list.map(e => e.trim())
        var filtered = list.filter(Boolean);
        csvControl = true
        classRoster = filtered

        var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
        roster = []
        for (var i = 0; i < classRoster.length; i++) {
            if (classRoster[i]) {
                var user = classRoster[i].trim()
                const row = (element) => element.includes(user);
                if (!roster.some(row)) {
                    roster.push([user, chrome.i18n.getMessage('absent'), '', ''])
                }
            }
        }
        if (roster.length > 0) {
            var data = {
                type: 'newattendance',
                values: roster,
                meet: meet,
                link: window.location.href,
                attendance: true
            }

            chrome.runtime.sendMessage(data)
        }

    })

    $('#classList').on('change', function () {
        csvControl = false
        if ($('#classList').val() == '') {
            $('#doorclosedicon').text('do_not_disturb_off')
            $('#doorclosedicon').css('color', '#00796b')
            doorClosed = false
        }

        var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
        classId = $('#classList').val() ? $('#classList').val() : ''
        className = $("#classList option:selected").text() ? $("#classList option:selected").text() : ''
        var data = {
            type: 'classroster',
            classId: $('#classList').val(),
            className: $("#classList option:selected").text(),
            title: `${date.toLocaleDateString()} ${$("#classList option:selected").text()}`,
            meet: meet,
            link: window.location.href
        }
        let obj = {}
        obj['classroom_' + meet] = $('#classList').val()
        classroomId = $('#classList').val()
        chrome.storage.local.set(obj)
        chrome.runtime.sendMessage(data);

        if ($('#extclassroomid').length == 0) {
            $('body').append('<input id="extclassroomid" type="hidden" value="' + $('#classList').val() + '"/>')
            $('body').append('<input id="extclassroomname" type="hidden" value="' + $("#classList option:selected").text() + '"/>')

        } else {
            $('#extclassroomid').val($('#classList').val())
            $('#extclassroomname').val($("#classList option:selected").text())
        }

    })
    if ($('#sinkarray').length == 0) {
        $('body').append('<input id="sinkarray" type="hidden"/>')
    }
}
function subscribebutton() {
    if ($('#subscribebutton').length > 0) {
        return
    }
    var html = ''
    html += '<p></p><a id="subscribebutton" class="waves-effect waves-light btn tooltipped" data-position="top" data-tooltip="' + chrome.i18n.getMessage('subscribemessage') + '" href="https://claycodes.web.app" target="_blank">' + chrome.i18n.getMessage('subscribe') + '</a>'
    $('#optionmenu').append(html)
    $('#subscribebutton').on('click', function (res) {
        chrome.storage.sync.set({ subclick: new Date().getTime() })
        chrome.storage.local.set({ subclick: new Date().getTime() })
    })
    var elems = document.querySelectorAll('.tooltipped');
    var instances = M.Tooltip.init(elems);
}

function addDataStudioSheetLink() {
    chrome.storage.local.get(['sinksheetid', 'sendtosink'], function (res) {
        sinksheetid = res['sinksheetid']
        sendtosink = res['sendtosink']

        sendtosink = sendtosink ? 'checked' : ''
        let link = sinksheetid = sinksheetid ? `https://docs.google.com/spreadsheets/d/${sinksheetid}` : ''

        var html = ''

        html += '<div class="row">'
        html += '<div class="col s8">'
        html += '<input type="text" id="datastudiolink" value="' + link + '" placeholder="' + chrome.i18n.getMessage('datastudioplaceholder') + '" autocomplete="off"/>'
        html += '</div>'
        html += '<div class="col s4">'
        html += '<div class="switch" style="padding:5px 0px 5px 0px;"><label><input type="checkbox" id="datastudio" ' + (link && link != '' ? sendtosink : 'disabled') + '><span class="lever"></span>' + chrome.i18n.getMessage('datastudio') + '</label></div>'
        html += '</div>'
        html += '</div>'
        html += '<div class="row">'
        html += '<a href="https://datastudio.google.com/reporting/ea574acb-080c-473c-adf4-2d84ab699a96/page/9R2tB/preview" target="_blank" >Data Studio Template</a>'
        html += '</div>'
        if (link && sendtosink) {
            $('#sendtosinkauto').val(true)
        }
        $('#optionmenu').append(html)
        if ($('#sendtosinkauto').length == 0) {
            $('body').append('<input type="hidden" id="sendtosinkauto"/>')
        }
        document.getElementById('sendtosinkauto')
        $('#datastudiolink').on('keyup', function () {
            let valid = $('#datastudiolink').val() ? linkValidation($('#datastudiolink').val()) : false;
            if (valid) {
                sinksheetid = $('#datastudiolink').val().match(/[-\w]{25,}/)[0]
                chrome.storage.local.set({ 'sinksheetid': sinksheetid })
                $('#datastudio').prop('disabled', false)
                $('#datastudio').prop('checked', true)
                sendtosink = $('#datastudio').prop('checked')
                $('#sendtosinkauto').val(true)
                chrome.storage.local.set({ 'sendtosink': sendtosink })
                let data = {
                    type: 'updatesink',
                }
                chrome.runtime.sendMessage(data);
            }
            else {
                chrome.storage.local.remove('sinksheetid')
                chrome.storage.local.set({ 'sendtosink': false })
                $('#sendtosinkauto').val(false)
                $('#datastudio').prop('disabled', true)
                $('#datastudio').prop('checked', false)
            }
        })
        $('#datastudio').on('change', function () {
            sendtosink = $('#datastudio').prop('checked')
            $('#sendtosinkauto').val(sendtosink)
            chrome.storage.local.set({ 'sendtosink': sendtosink })
        })

    })

}


function linkValidation(url) {
    let id = url.match(/[-\w]{25,}/)[0];
    let sheet = url.indexOf('spreadsheets') > -1
    return id && sheet
}

function attendanceFrequency() {
    if ($('#attendanceFreq').length > 0) {
        return
    }
    var html = ''
    html += '<select id="attendanceFreq">'
    //html += '<option value="">' + chrome.i18n.getMessage('frequency') + '</option>'
    html += '<option value="120000">02:00</option>'
    html += '<option value="180000">03:00</option>'
    html += '<option value="300000" selected>05:00</option>'
    html += '<option value="600000">10:00</option>'
    html += '</select>'
    //html+='<label>'+chrome.i18n.getMessage(('classroomLabel'))+'</label>'
    $('#optionmenu').append(html)
    $('#attendanceFreq').val(attendancefrequency)
    M.FormSelect.init($('#attendanceFreq'))
    $('#attendanceFreq').on('change', function () {
        attendancefrequency = $('#attendanceFreq').val() != '' ? parseInt($('#attendanceFreq').val()) : ''
        // attendanceInterval()
        chrome.storage.local.set({ freq: attendancefrequency })
        let data = {
            type: 'settings',
            setting: 'freq',
            value: attendancefrequency
        }
        chrome.runtime.sendMessage(data);
    })

}

function attendanceCycle() {
    getAttendees()
}

function continuedAttendance() {
    const freq = parseInt($('#attendanceFreq').getVal())
    setInterval(attendanceCycle, freq)
}


async function scrollList(element, type) {
    var se;
    let h = parseInt(element.querySelector('div').style.height)
    element.scrollTop = h
    var num = element.scrollTop
    let direction = element.scrollTop == 0 ? false : true
    function scroll(n) {
        element.scrollTop = n

        if (direction) {
            num = n - 100
            if (element.scrollTop > 0) {
                if (type == 'snap') {
                    snapshotAttendees()
                } else {
                    getAttendees();
                }

                se = setTimeout(function () {
                    scroll(num)
                }, 200);
            } else {
                element.scrollHeight = h
                clearTimeout(se)
                return
            }
        } else {
            num = n + 100
            if (n < h) {
                if (type == 'snap') {
                    snapshotAttendees()
                } else {
                    getAttendees();
                }
                se = setTimeout(function () {
                    scroll(num)
                }, 200);
            } else {
                clearTimeout(se)
                return
            }
        }
    }
    //if (element.scrollTop > 0) {
    getAttendees();
    clearTimeout(se)
    se = setTimeout(function () {
        scroll(num)
    }, 200);
    // }
}


function missingsheet(people) {

    var attend = document.getElementById('attendance')
    if (attend) {

        if (!attend.getAttribute('data-sheet')) {
            //console.log('missingsheet', people)
            chrome.storage.local.get('spreadsheetId', (res) => {
                if (res.spreadsheetId) {
                    spreadsheetId = res.spreadsheetId
                    //console.log('missingsheet stored', res)
                    var attend = document.getElementById('attendance')
                    attend.setAttribute('data-sheet', res.spreadsheetId)
                    document.getElementById('attendancelink').setAttribute('href', 'https://docs.google.com/spreadsheets/d/' + res.spreadsheetId)
                    people.requested = false
                } else {
                    var data = {
                        type: 'people',
                    }
                    //console.log('missingsheet asking', data)
                    chrome.runtime.sendMessage(data);
                }
            })
        }
    }
}



document.addEventListener('click', function (e) {

    if (e.target && e.target.matches('#manualswitch')) {
        var sw = document.getElementById('manualswitch')
        if (sw) {
            var status = sw.checked
            stat = sw.checked
            chrome.storage.local.set({ status: status });
            let data = {
                type: 'settings',
                setting: 'status',
                value: status
            }
            chrome.runtime.sendMessage(data);
        }
    }
    if (e.target && e.target.matches('#scrollswitch')) {
        var sw = document.getElementById('scrollswitch')
        if (sw) {
            var status = sw.checked
            scrollSwitch = sw.checked
            chrome.storage.local.set({ scroll: status });
        }
    }
    if (e.target && e.target.matches('.download')) {
        var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
        var data = {
            type: 'export',
            meet: meet
        }

        chrome.runtime.sendMessage(data);
    }

    if (e.target && e.target.matches('.addsheet')) {
        var sheetid = document.getElementById('attendance')
        var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
        if (sheetid) {
            if (sheetid.getAttribute('data-sheet')) {
                var data = {
                    type: 'addsheet',
                    title: undefined,
                    id: sheetid.getAttribute('data-sheet'),
                    meet: meet,
                    clicked: true
                }
                chrome.runtime.sendMessage(data);
            }

        } else {
            var data = {
                type: 'create',
                meet: meet
            }
            chrome.runtime.sendMessage(data, function (response) {

            });
        }

    }
    if (e.target && e.target.matches('.addspreadsheet')) {
        var meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
        var data = {
            type: 'create',
            meet: meet
        }
        chrome.runtime.sendMessage(data, function (response) {

        });
    }

});

async function getSwitch() {
    chrome.storage.local.get(['status'], function (res) {
        if (res.status != null) {
            document.getElementById('manualswitch').checked = res.status
        } else {
            document.getElementById('manualswitch').checked = true
        }
    });
}

async function getScrollSwitch() {
    chrome.storage.local.get(['scroll'], function (res) {
        if (res.scroll != null) {
            document.getElementById('scrollswitch').checked = res.scroll
        } else {
            document.getElementById('scrollswitch').checked = true
        }
    });
}

function attendanceMouse() {
    $('.attendance').hover(function () {
        $('#optionmenu').css('display', 'inline')
    },
        function (e) {

            if (!e.target.matches('#csvList')) {
                $('#optionmenu').css('display', 'none')
            }
        });

}


function attendanceMenu(people) {
    let UIstyle
    //if (newUI) {
    UIstyle = 'width: 100px!important;text-align: center;position: absolute;top: 15px;display: block;z-index:900;left:175px;'
    // } else {
    //     UIstyle = 'width:100px!important;text-align:center;position:relative;top:10px;display:inline'
    // }

    var html = `<div id="attendance" data-sheet="" role="tab" class="attendance" aria-label="Take Attendance" aria-selected="true" tabindex="0" data-tab-id="2" style="${UIstyle}">`
    html += '<a id="attendancelink" href="https://docs.google.com/spreadsheets/d/' + spreadsheetId + '" target="_blank">'
    html += '<div id="attendanceicon" class="attendanceicon">'
    html += '<span id="countdown"></span>'
    html += '<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" class="attendance attendanceicon" style="top:5px;position:relative;"><rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none" class="attendance attendanceicon"/><g class="currentLayer attendance attendanceicon" style=""><title>Layer 1</title><path d="M0 0h24v24H0V0z" fill="none" id="svg_1" class="attendance attendanceicon"/><path d="M18 9l-1.41-1.42L10 14.17l-2.59-2.58L6 13l4 4zm1-6h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-.14 0-.27.01-.4.04-.39.08-.74.28-1.01.55-.18.18-.33.4-.43.64-.1.23-.16.49-.16.77v14c0 .27.06.54.16.78s.25.45.43.64c.27.27.62.47 1.01.55.13.02.26.03.4.03h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7-.25c.41 0 .75.34.75.75s-.34.75-.75.75-.75-.34-.75-.75.34-.75.75-.75zM19 19H5V5h14v14z" id="svg_2" class="selected attendance attendanceicon" fill="#DB4437" fill-opacity="1"/></g></svg>'

    html += '<span class="rua5Nb attendance attendanceicon" id="count" style="color:#DB4437">' + people.total + '</span>'
    html += '<i class="material-icons small attendanceicon" id="scrollicon" style="color:#DB4437" aria-label="Scroll">arrow_downward</i>'
    html += '</div>'
    html += '</a>'
    html += '</div>'//end attendance

    let optionleft = '5px' //newUI ? '30px' :
    let optiontop = '30px' //newUI ? '40px' :
    html += `<div id="optionmenu" class="menu attendance menubox" style="width:300px!important;left:${optionleft};top:${optiontop};position:absolute;z-index:9999!important;boxing-sizing:border-box;overflow:visible;background:white !important;">`//start menu options

    html += '<div id="menuactions" style="display:inline;text-align:left;">'//start menu actions

    html += '<button id="newsheet" class="menu addsheet" style="width:40px; display:inline;cursor:pointer"><i class="material-icons small menu addsheet tooltipped" style="color:#00796b" aria-label="Add Sheet" data-position="top" data-tooltip="' + chrome.i18n.getMessage('tooltipaddsheet') + '">add_to_photos</i></button>' //new sheet button

    html += '<button id="newspreadsheet" class="menu addspreadsheet" style="width:40px;display:inline;cursor:pointer"><i class="material-icons small menu addspreadsheet tooltipped" style="color:#00796b;cursor:pointer" aria-label="Add Spreadsheet" data-position="top" data-tooltip="' + chrome.i18n.getMessage('tooltipaddspreadsheet') + '">note_add</i></button>'//new spreadsheet

    html += '<div class="switch menu tooltipped" style="display:inline;" data-position="top" data-tooltip="' + chrome.i18n.getMessage('tooltiponoff') + '"><label><input type="checkbox" class="menu" id="manualswitch" aria-label="On/Off Switch"><span class="lever"></span><label></div>'//switch
    html += '<div class="switch menu tooltipped" style="display:inline;" data-position="top" data-tooltip="' + chrome.i18n.getMessage('tooltipscroll') + '"><label><input type="checkbox" class="menu" id="scrollswitch" aria-label="Scroll Switch"><span class="lever" style="transform: rotate(90deg)"></span><label></div>'//switch
    html += '<div class="menu tooltipped download" style="display:inline;" id="download"  data-position="top" data-tooltip="' + chrome.i18n.getMessage('tooltipexport') + '"><i class="material-icons download"  style="color:#00796b">file_download</i></div>'
    html += '<div class="menu tooltipped" style="display:inline;" id="attendancesnap" data-position="top" data-tooltip="' + chrome.i18n.getMessage('tooltipsnapshot') + '"><i class="material-icons button" style="color:#00796b">camera_alt</i></div>'
    html += '<div class="menu tooltipped" style="display:inline;" id="moreclick" data-position="top" data-tooltip="' + chrome.i18n.getMessage('tooltipmore') + '"><i class="material-icons button" style="color:#00796b">more_vert</i></div>'
    html += '</div>'//end menuactions

    html += '<div id="shutter"></div>'
    html += '<div id="menucontrols" style="display:inline;text-align:right;float: right;">'//start menu controls
    html += '</div>'//end menucontrol

    html += '</div>'//end menuoption


    return html


}

function syncedto() {
    let email =''
    if(account && account.email ){
        email =account.email
    }
    let html = ''
    html += '<div>'
    html += 'Synced to: ' + email
    html += '</div>'
    return html
}

function moresettings() {
    if ($('#meetattendancesetting').length == 0) {
        let html = ''
        html += '<div id="meetattendancesetting" style="text-align:left;zindex:999;background-color:white;">'
        html += '<div class="switch" style="padding:5px 0px 5px 0px;"><label><input type="checkbox" id="newmeet"><span class="lever"></span>' + chrome.i18n.getMessage('newmeet') + '</label></div>'
        html += '<div class="switch" style="padding:5px 0px 5px 0px;"><label><input type="checkbox" id="newdaily"><span class="lever"></span>' + chrome.i18n.getMessage('newdaily') + '</label></div>'
        html += '<div class="switch" style="padding:5px 0px 5px 0px;" data-tooltip="' + chrome.i18n.getMessage('tooltipclasstoomna') + '"><label><input type="checkbox" id="automated"><span class="lever"></span>' + chrome.i18n.getMessage('automated') + '</label></div>'
        html += '</div>'
        $('#optionmenu').append(html)
        var elems = document.querySelectorAll('.tooltipped');
        var instances = M.Tooltip.init(elems);
        //newmeet 
        chrome.storage.local.get('newmeet', function (res) {
            $('#newmeet').prop('checked', res.newmeet != undefined ? res.newmeet : true)
        })
        $('#newmeet').on('click', function () {
            let data = { type: 'setting', setting: 'newmeet', value: $('#newmeet').prop('checked') }
            chrome.runtime.sendMessage(data)
            chrome.storage.local.set({ newmeet: $('#newmeet').prop('checked') })
            $('#newdaily').prop('checked', $('#newmeet').prop('checked'))
            //chrome.storage.local.set({newdaily:$('#newmeet').prop('checked'))
        })
        //newdailly
        chrome.storage.local.get('newdaily', function (res) {
            $('#newdaily').prop('checked', res.newdaily != undefined ? res.newdaily : true)
        })
        $('#newdaily').on('click', function () {
            chrome.storage.local.set({ newdaily: $('#newdaily').prop('checked') })
        })
        //automated
        chrome.storage.local.get('automated', function (res) {
            $('#automated').prop('checked', res.automated != undefined ? res.automated : true)
        })
        $('#automated').on('click', function () {
            automated = $('#automated').prop('checked')
            chrome.storage.local.set({ automated: $('#automated').prop('checked') })
        })


    } else {
        $('#meetattendancesetting').remove()
    }
}

let menuVisible = false;
var optionmenu;


function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

window.addEventListener("message", function (event) {
    if (event.source != window)
        return;
});



function callback(mutationsList) {
    const date =new Date()
    mutationsList.forEach(mutation => {
        if (mutation.attributeName === 'class') {
            if (!ending && mutation.target.classList.contains('S9luX')) {
                let meet = window.location.href.split('/')[3].split('?')[0].replace(/-/g, '')
                ending = true
                let enddata = {
                    type: 'end',
                    meet: meet
                }

                chrome.runtime.sendMessage(enddata)
                if (sendtosink && subscriptionStatus) {
                    let newsink = JSON.parse(document.getElementById('sinkarray').value)
                    if (newsink && newsink.length > 0) {
                        sink = newsink
                    }
                    for (let i = 0; i < sink.length; i++) {
                        sink[i][2] = date.toLocaleString().replace(/,/g, '') //moment().format('l LTS')
                        sink[i][6] = className
                        sink[i][7] = classId
                    }
                    var data = {
                        type: 'sink',
                        values: sink,
                        meet: meet,
                        link: window.location.href,
                        from: 'end'
                    }
                    chrome.runtime.sendMessage(data);
                }
                clearTimeout(sl)
                observer.disconnect()
            }
        }
    })
}

var config = {
    attributes: true,
};
const observer = new MutationObserver(callback);



