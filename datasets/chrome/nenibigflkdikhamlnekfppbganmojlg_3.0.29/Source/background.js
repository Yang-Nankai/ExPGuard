
/* Copyright (C) 2020 claycodes.org - All Rights Reserved
 * Unauthorized copying of this file, via any medium is strictly prohibited
 * Proprietary and confidential
 * Written by Clay Smith <clay@claycodes.org>, 2020
 */



var folderId, readtimer, writetimer, sinkdate, sinkbuffer, title, colCount, sheet, roster;
var writebuffer = 90000, readbuffer = 30000;
var lastSend = {}, sheetCol = {}, sendingObject = {}, settings = {};

var cacheObjectArray = [[]]
var subscribed = false, ending = false, sinkLock = false, addSheetLock = false, valueFilterLock = false, getSheetLock = false, syncing = false, authorized = false

const durationArray = '=arrayformula(if(row(C:C)=1,"Duration Seconds",if(not(isblank(C:C)),((C:C-B:B)*3600*24),"")))'

//asociate with meet for x time

chrome.tabs.onRemoved.addListener(function (tabId) {
    if (sendingObject[tabId]) {
        endMeet(tabId,)
    }
});

chrome.runtime.onInstalled.addListener(function () {
    clearAlarms()
    var data = {
        type: 'auth',
    }
    try {
        chrome.identity.getAuthToken({ interactive: false }, async function (token) {
            if (!token) {
                newRequest(data)
            }
        })
    } catch (e) { console.log(e) }

    languageUpdate()
})

chrome.runtime.onStartup.addListener(function () {
    console.log('startup')
    clearAlarms()
    chrome.identity.getProfileUserInfo((userInfo) => {
        if (userInfo.id) {
            try {
                chrome.identity.getAuthToken({ interactive: false }, async function (token) {
                })
            } catch (e) { console.log(e)}
        }
    })
    chrome.storage.local.clear()
    sendingObject = {}
    languageUpdate()
})

chrome.tabs.onCreated.addListener((tab) => {
    if (typeof tab.openerTabId != "undefined") console.log("this tab open from tab: " + tab.openerTabId);
    chrome.tabs.sendMessage(tab.id, { type: 'opened', tabid: tab.openerTabId });
});

chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        request.sendingTab = sender.tab.id
        sendResponse(await newRequest(request))
    }
);

chrome.runtime.onMessageExternal.addListener(
    async function (req, sender, sendResponse) {
        console.log('external sender', sender)
        req.sendingTab = sender.tab.id
        sendResponse(await newRequest(req))
    })

function endMeet(tabId, meet) {
    console.log('sending Object', sendingObject)
    clearAlarms()
    if (!meet) {
        meet = sendingObject[tabId] ? sendingObject[tabId].meet : ''
    }
    let ct = 0
    for (let m in sendingObject) {
        if (sendingObject[m].request) {
            let request = sendingObject[m].request
            request.end = true
            addDataCache(request)
        }
        console.log(m, meet, m == meet)
        if (m == meet) {
            ct = ct + 1
        }
    }

    if (!tabId && meet) {
        try {
            tabId = sendingObject[meet].tabid
        } catch (e) { }
    }
    console.log(meet, ct)
    delete sendingObject[tabId]
    if (ct == 1) {
        sendingObject[meet] = undefined
        delete sendingObject[meet]
        chrome.storage.local.remove(['cacheObject' + meet])
        chrome.storage.local.remove(['cache' + meet])

    } else {
        for (let m in sendingObject) {
            if (sendingObject[m].meet == meet) {
                sendingObject[meet].tabid = sendingObject[m].tabid
                break
            }
        }
    }
    chrome.tabs.query({}, function (tabs) {
        let meets = []
        tabs.forEach(tab => {
            if (tab.url.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/gi)) {
                meets.push(tab.url.split('/')[3].split('?')[0].replace(/-/g, ''))
            }
        });
        for (let m in sendingObject) {
            if (meets.indexOf(m) == -1) {
                sendingObject[meet] = ''
                delete sendingObject[meet]
            }
        }

    })

    console.log('end of ending', tabId, meet, sendingObject)
    //cacheArray = undefined
    ending = false
}


async function initialize(request) {
    const initsetting = await initsettings()
    request.token = await getToken();
    settings.account = await fetchUser(request)
    initsetting.account = settings.account
    initsetting.type = 'settings'
    chrome.tabs.sendMessage(request.sendingTab, initsetting);
    request.token = await getToken();
    let userInfo = await fetchUser(request)
    console.log('user', userInfo)
    syncing = (userInfo && userInfo.id && userInfo.id != "")
    request.email = (userInfo && userInfo.email) ? userInfo.email : 'Unknown User'
    if (request.email == 'Unknown User') {
        chrome.tabs.sendMessage(request.sendingTab, { type: 'unknown', message: true });
    }
    request.subscription = 'prod_Hmgytm7tNFfpVD'
    let statusofsub = false
    const syncSub = await getStorage('sync', 'subscription')
    const localSub = await getStorage('local', 'subscription')
    let subscriptionRes = syncSub.subscription ? syncSub.subscription : localSub.subscription
    if (!subscriptionRes) {
        const statusOfSub = await triggerSubCheck()
        if (!statusOfSub) {
            return
        }
    }
    await setSubScription(request)
    setAlarm()
}

async function setSubScription(request) {
    let sub = await subscription(request)
    let active = false
    if (sub.period_end) {
        if (sub.period_end * 1000 > new Date().getTime()) {
            active = true
            subscribed = true
        }
    }
    chrome.storage.sync.set({ subscription: active, substatus: active })
    chrome.storage.local.set({ subscription: active, substatus: active })
    chrome.tabs.sendMessage(request.sendingTab, { type: 'subscription', subscription: active });
}

async function triggerSubCheck() {
    const syncClick = await getStorage('sync', 'subclick')
    const localClick = await getStorage('local', 'subclick')
    const subclick = syncClick.subclick ? syncClick.subclick : localClick.subclick
    const syncStatus = await getStorage('sync', 'substatus')
    const localStatus = await getStorage('local', 'substatus')
    let statusofsub = false
    if (new Date() >= subclick) {
        statusofsub = true
        if (Number.isInteger(subclick) && new Date().getTime() >= subclick + (1000 * 60 * 60 * 24)) {
            chrome.storage.sync.remove('subclick')
            chrome.storage.local.remove('subclick')
        }
    } else {
        statusofsub = syncStatus.substatus ? syncStatus.substatus : localStatus.substatus
    }
    return statusofsub
}

async function getStorage(type, key) {
    return new Promise(function (resolve, reject) {
        chrome.storage[type].get(key, function (val) {
            resolve(val)
        })
    })
}

async function getAuth(request) {
    return new Promise(function (resolve, reject) {
        chrome.identity.getAuthToken({ interactive: false }, async function (token) {
            if (!token) {
                reject()
                return
            }
            request.token = token
            chrome.tabs.sendMessage(request.sendingTab, { type: 'authorized', authorized: true });
            resolve(request)
        })
    })
}

async function createSink(request) {
    if (!settings.spreadsheetId) {
        dataRefresh(request)
    }
    if (settings.sendtosink) {
        request.id = settings.sinksheetid
        if (!sinkLock) {
            try {
                sinkLock = true
                sinkSend(request)
                await wait(1000)
                sinkLock = false
            } catch (e) {
                sinkLock = false
            }
        }
        if (!sinkdate || sinkdate < new Date().getTime()) {
            clearSession()
            updateSinkHeaders(request)
            sinkdate = new Date().getTime() + (1000 * 60 * 60 * 24)
        }
    }
}

async function dataRefresh(request) {
    await initsettings()
    settings.account = await fetchUser(request)
    await initlocalsettings(request.meet)

}

async function meetInit(request) {
    let meet = request.meet
    await dataRefresh(request)
    addSheetLock = false
    valueFilterLock = false
    const list = await classroomList(request)

    let meets = []
    chrome.tabs.query({}, function (tabs) {
        meets = tabs.filter(tab => tab.url.match(/[a-z]{3}-[a-z]{4}-[a-z]{3}/gi)).map(tab => tab.url.split('/')[3].split('?')[0].replace(/-/g, ''))

        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            let tabid = tabs[0].id;
            for (let i in sendingObject) {
                if (meets.indexOf(sendingObject[i].meet) > -1) {
                    if (sendingObject[i].tabid == tabid && parseInt(i) > 0) {
                        if (sendingObject[i].meet != request.meet) {
                            sendingObject[i] = { tabid: tabid, meet: request.meet }
                        }
                    }
                } else {
                    let end = sendingObject[i].meet ? sendingObject[i].meet : i
                    endMeet(null, end)
                }
            }
            chrome.tabs.sendMessage(tabid, { type: 'classList', list: list });
            sendingObject[tabid] = { tabid: tabid, meet: request.meet }
            if (!sendingObject[meet]) {
                sendingObject[meet] = { tabid: tabid, meet: request.meet }
            }
        });
    })

}

async function sheetCheck(request) {
    if (!settings.spreadsheetId) {
        await dataRefresh(request)
    }
    if (!settings.spreadsheetId) {
        const syncSheetId = await getStorage('sync', 'spreadsheetId')
        const localSheetId = await getStorage('local', 'spreadsheetId')
        spreadsheetId = syncSheetId.spreadsheetId ? syncSheetId.spreadsheetId : localSheetId.spreadsheetId
        if (!spreadsheetId) {
            await createSpreadSheet(request)
        }
    } else {
        request.id = settings.spreadsheetId
        chrome.tabs.sendMessage(request.sendingTab, { type: 'sheet', id: request.id, token: request.token });

    }
}

async function newAttendance(request) {
    console.log('new', settings, request)
    if (!subscribed && request.auto) {
        return
    }
    if (!settings.spreadsheetId) {
        await dataRefresh(request)
    }

    if (!request.id) {
        request.id = settings.spreadsheetId
    }
    if (!request.id && !settings.spreadsheetId) {
        var spreadsheet = await createSpreadSheet(request)
        request.id = spreadsheet.id
    }
    if (!settings.newmeet) {
        if (!request.sheetId) {
            request.sheetId = settings.sheetId
        }

        if (!request.sheetId) {
            let ss = await getSpreadsheet(request)
            request.sheetId = ss.sheets[0].properties.sheetId
            settings.sheetId = ss.sheets[0].properties.sheetId
            chrome.storage.local.set({ sheetId: ss.sheets[0].properties.sheetId })
            if (!request.sheetId) {
                try {
                    request = await addSheet(request)
                } catch (e) {
                    addSheetLock = false
                }
            }
        }

        if (request.values.length > 0) {
            if (request.snap) {
                addData(request)
            } else {
                addDataCache(request)
            }
        }

    } else {
        if (!settings.newdaily) {
            request.sheetId = settings[`${request.meet}sheetId`]
            if (!request.sheetId) {
                request.title = request.meet
                try {
                    request = await addSheet(request)
                } catch (e) {
                    addSheetLock = false
                }
            }
            if (request.values && request.values.length > 0) {
                if (request.snap) {
                    addData(request)
                } else {
                    addDataCache(request)
                }
            }
        } else {

            if (!request.sheetId) {
                request.sheetId = settings[`${request.meet}sheetId`]
            }

            if (!request.sheetDate) {
                request.sheetDate = settings[`${request.meet}sheetDate`]
            }

            if (!request.sheetId && request.sheetDate != new Date().toLocaleDateString()) {
                var d = new Date().toLocaleDateString()
                console.log(d)
                var sheetname = `${d} ${request.meet}`
                request.tempSheetname = sheetname

                try {
                    request = await addSheet(request)
                } catch (e) {
                    addSheetLock = false
                }

                if (request.values.length > 0) {
                    if (request.snap) {
                        addData(request)
                    } else {
                        addDataCache(request)
                    }
                }
            } else if (request.sheetId) {
                if (request.values.length > 0) {
                    if (request.snap) {
                        addData(request)
                    } else {
                        addDataCache(request)
                    }
                }
            }
            else {
                var d = new Date().toLocaleDateString()
                var sheetname = `${d} ${request.meet}`
                request.tempSheetname = sheetname

                try {
                    request = await addSheet(request)
                } catch (e) {
                    addSheetLock = false
                }
                if (request.values.length > 0) {
                    if (request.snap) {
                        addData(request)
                    } else {
                        addDataCache(request)
                    }
                }
            }
        }
    }
}

async function getClasslist(request) {
    const list = await classroomList(request)
    console.log('sendingtab', request.sendingTab) //may be able to replace the query
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        console.log('query tab', tabs[0].id)
        chrome.tabs.sendMessage(tabs[0].id, { type: 'classList', list: list });
    })
}

async function getClassRoster(request) {
    if (!settings.spreadsheetId) {
        await dataRefresh(request)
    }
    request.id = settings.spreadsheetId
    request.sheetId = settings[`${request.meet}sheetId`]
    const list = await classroomRoster(request)
    request.title = request.className
    let tabid
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        tabid = tabs[0].id;
        if (!tabid) { tabid = sendingObject[request.meet].tabid }
        chrome.tabs.sendMessage(tabid, { type: 'classRoster', list: list });
    })

    roster = []
    const absent = await getLanguageMessage('absent')
    for (let i = 0; i < list.length; i++) {
        if (list[i] && list[i].profile) {
            const user = list[i].profile.name.fullName.trim()
            const row = (element) => element.includes(user);
            if (!roster.some(row)) {
                roster.push([user, absent, '', ''])
            }
        }
    }
    if (roster.length > 0) {
        const data = { type: 'newattendance', values: roster, meet: request.meet, link: request.link, attendance: true }
        newRequest(data)
    }
}

async function addNewSheet(request) {
    request.title = request.title ? request.title : new Date().toLocaleString()
    try {
        await addSheet(request)
    } catch (e) {
        addSheetLock = false
    }
    chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { type: 'sheetAdded' });
    })
}

async function newRequest(request) {

    try {
        request = await getAuth(request)
    } catch (e) { console.log(e) }

    switch (request.type) {
        case 'auth':
            chrome.tabs.create({ url: 'auth.html', openerTabId: request.sendingTab });
            break
        case 'initialize':
            initialize(request)
            break;
        case 'sink':
            createSink(request)
            break;
        case 'updatesink':
            updateSinkHeaders(request)
            break;
        case 'end':
            if (!ending) {
                ending = true
                endMeet(null, request.meet)
            }
            break;
        case 'meetinit':
            meetInit(request)
            setAlarm()
            break;
        case 'setting':
            settings[request.setting] = request.value
            break;
        case 'people':
        case 'popup':
            sheetCheck(request)
            break;
        case 'newattendance':
            newAttendance(request)
            break;
        case 'classlist':
            getClasslist(request)
            break;
        case 'classroster':
            getClassRoster(request)
            break;
        case 'export':
            exportCSV(request)
            break;
        case 'create':
            request.id = await createSpreadSheet(request)
            break;
        case 'addsheet':
            addNewSheet(request)
            break;
    }
}

function clearAlarms() {
    chrome.alarms.clearAll()
}

function setAlarm() {
    if (subscribed) {
        chrome.alarms.get('timedBackground', a => {
            console.log('alarm', a)
            if (!a) {
                const freq = settings.freq | 300000
                chrome.alarms.create('timedBackground', { periodInMinutes: parseInt(freq / (1000 * 60)) })
            }
        });
    }
}


function exportCSV(request) {
    const rows = sendingObject[request.meet].request.body.data[0].values
    chrome.tabs.sendMessage(request.sendingTab, { type: 'download', rows: rows, meet: request.meet });
}

function tabObject() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        const meet = tabs[0].url.split('/')[3].split('?')[0].replace(/-/g, '')
        return { tabid: tabs[0].id, meet: meet }
    });
}

function initsettings() {
    return new Promise(function (resolve, reject) {
        chrome.storage.sync.get(null, function (result) {
            chrome.storage.local.get(null, function (lresult) {
                settings.newdaily = result.newdaily ? result.newdaily : (lresult.newdaily ? lresult.newdaily : true)
                settings.newmeet = result.newmeet ? result.newmeet : (lresult.newmeet ? lresult.newmeet : true)
                settings.spreadsheetId = result.spreadsheetId ? result.spreadsheetId : lresult.spreadsheetId
                settings['freq'] = result['freq'] ? result['freq'] : (lresult['freq'] ? lresult['freq'] : 300000)
                settings['status'] = result['status'] ? result['status'] : (lresult['status'] ? lresult['status'] : true)
                settings['automated'] = result['automated'] ? result['automated'] : (lresult['automated'] ? lresult['automated'] : true)
                addSheetLock = false
                resolve(settings);
            });
        });
    });
}

function getToken() {
    return new Promise(function (resolve, reject) {
        try {
            chrome.identity.getAuthToken({ interactive: false }, async function (token) {
                resolve(token);
            })
        } catch (e) {
            reject()
        }
    })
}

function initlocalsettings(meet) {
    return new Promise(function (resolve, reject) {
        chrome.storage.local.get(null, function (result) {
            if (meet) {
                settings[`${meet}sheetId`] = result[`${meet}sheetId`]
                settings[`${meet}sheetDate`] = result[`${meet}sheetDate`]
                settings['sheetId'] = result['sheetId']
                settings['sinksheetid'] = result['sinksheetid']
                settings['sendtosink'] = result['sendtosink']
            }
            resolve(settings);
        });
    });
}


async function getSpreadsheet(request) {
    if (!request.id) {
        return
    }
    if (subscribed) {
        request.function = 'getSpreadsheet'
        var ss = await sendtoScript(request)
    } else {
        let options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + request.token,
                'content-type': 'application/json',
            }
        }
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${request.id}`
        var ss = await fetchRetry(url, options)
    }
    return ss
}

// async function checkForSheet(request) {
//     var ss = await getSpreadsheet(request)
//     getSheetLock = false
//     var sheets = ss.sheets
//     var has

//     for (var i = 0; i < sheets.length; i++) {
//         console.log(request.tempSheetname, sheets[i].properties.title, request.tempSheetname == sheets[i].properties.title)
//         if (request.tempSheetname == sheets[i].properties.title) {
//             has = sheets[i].properties
//             var sheetId = {}
//             var sheetDate = {}
//             let d = `${moment().format('L')}`
//             let id = sheets[i].properties.sheetId
//             sheetId[`${request.meet}sheetId`] = id
//             settings[`${request.meet}sheetId`] = id
//             sheetDate[`${request.meet}sheetDate`] = d
//             settings['sheetDate'] = d
//             settings[`${request.meet}sheetDate`] = d
//             settings['sheetId'] = id
//             request[`${request.meet}sheetId`] = id
//             chrome.storage.local.set({ sheetId: id })
//             chrome.storage.local.set(sheetId)
//             chrome.storage.local.set(sheetDate)
//             request.sheetId = id
//             request.sheetDate = d
//             break
//         }
//     }
//     return has
// }

async function addSheet(request) {
    if (settings.automated || settings.daily || settings.newmeet) {
        request.automated = true
    }

    let cach = {}
    cach['cache' + request.meet] = [[]]
    chrome.storage.local.set(cach)
    if (addSheetLock) {
        return request
    }
    addSheetLock = true
    const d = new Date().toLocaleDateString()

    if (!request.meet) {
        return request
    }

    //check for sheet name?
    let sheetname = request.title ? request.title : `${d} ${request.meet}`
    request.body = {
        requests: [
            {
                addSheet: {
                    properties: {
                        title: sheetname,
                        index: 0,
                        gridProperties: {
                            frozenRowCount: 1,
                        },
                    }
                },
            },

        ],
        includeSpreadsheetInResponse: true,
    }

    if (!request.id) { return }
    if (subscribed) {
        request.function = 'sendToBatch'
        var sheet = await sendtoScript(request)
    } else {
        let options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + request.token,
                'content-type': 'application/json',
            },
            body: JSON.stringify(request.body)
        }
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${request.id}:batchUpdate`
        var sheet = await fetchRetry(url, options)
    }



    var sheetId = {}
    var sheetDate = {}
    sheetId[`${request.meet}sheetId`] = sheet.replies[0].addSheet.properties.sheetId
    settings[`${request.meet}sheetId`] = sheet.replies[0].addSheet.properties.sheetId
    sheetDate[`${request.meet}sheetDate`] = d
    settings['sheetDate'] = d
    request['sheetDate'] = d
    settings[`${request.meet}sheetDate`] = d
    settings['sheetId'] = sheet.replies[0].addSheet.properties.sheetId
    request['sheetId'] = sheet.replies[0].addSheet.properties.sheetId
    request[`${request.meet}sheetId`] = sheet.replies[0].addSheet.properties.sheetId
    chrome.storage.local.set({ sheetId: sheet.replies[0].addSheet.properties.sheetId })
    chrome.storage.local.set(sheetId)
    chrome.storage.local.set(sheetDate)

    request.sheetId = sheet.replies[0].addSheet.properties.sheetId
    request.sheetDate = d

    sheet.sheetId = sheet.replies[0].addSheet.properties.sheetId
    sheet.token = request.token
    sheet.id = request.id

    if (request.automated) {
        colCount = 5
    } else {
        colCount = 0
    }
    sheetCol[request.sheetId] = colCount

    formatCells(request, sheet)
    addSheetLock = false
    console.log('sheet adding', request)
    return request;

}

async function getBySheetId(request) {
    console.log('getbyId')
    request.body = {
        majorDimension: 'ROWS',
        valueRenderOption: 'UNFORMATTED_VALUE',
        dataFilters: [
            {
                gridRange: {
                    sheetId: request.sheetId
                }
            }
        ]
    }
    console.log('subscribed', subscribed)
    if (subscribed) {
        request.function = 'getBySheetId'
        sheet = await sendtoScript(request)
        //console.log('post await', sheet)
    } else {
        if (readtimer + readbuffer >= new Date().getTime() && !subscribed && request.type != 'newsnapshot') {
            return
        }
        readtimer = new Date().getTime()
        let options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + request.token,
                'content-type': 'application/json',
            },
            body: JSON.stringify(request.body)
        }

        let url = `https://sheets.googleapis.com/v4/spreadsheets/${request.id}/values:batchGetByDataFilter`
        sheet = await fetchRetry(url, options)
        //console.log('fetched', sheet)
    }
    return sheet
}

async function tabRename(request) {
    if (request.title == '') {
        return
    }
    request.body = {
        requests: [
            {
                updateSheetProperties: {
                    properties: {
                        sheetId: request.sheetId,
                        title: request.title
                    },
                    fields: 'title'
                }
            }
        ]
    }
    let sheet = await sendToBatch(request)
    return sheet
}

async function sinkSend(request) {
    //clearSession()

    console.log('sink', request)
    let data = []
    let sinkstorage = []
    let newsink = []
    let matchRows = []
    let adds, newRows
    //sink cache from storage? 
    //compare? 
    if (typeof (Storage) !== "undefined") {
        sinkstorage = sessionStorage.sink ? JSON.parse(sessionStorage.sink) : []
        console.log('sink storage', sinkstorage)
        if (sinkstorage.length > 0) {
            let rowid
            const rowe = (element) => element.includes(rowid);
            newRows = request.values.filter(row => {
                rowid = row[3]
                return !sinkstorage.some(rowe)
            })
            console.log('sink newrows', newRows)

            //matchRows =request.values

            matchRows = request.values.filter(row => {
                rowid = row[3]
                return sinkstorage.some(rowe)
            })
            matchRows = matchRows.map(row => {
                let foundRow = sinkstorage.find(r => { return row[3] == r[3] })
                row[8] = foundRow[8]
                return row
            })
        } else {
            //send in header
            newRows = request.values
            updateSinkHeaders(request)
        }

        if (newRows.length > 0) {
            let newreq = request

            newreq.function = 'appendSink'
            newreq.body = {
                majorDimension: 'ROWS',
                values: newRows
            }
            let res = await sendtoScript(newreq)

            //response
            let range = res.updates.updatedRange.split('!')
            let rangesheet = range[0]
            let cells = range[1].split(':')
            if (cells.length > 1) {
                let startCol = parseInt(cells[0].replace(/[a-zA-Z]+/g, ''))
                let startRow = cells[0].replace(/[0-9]+/g, '')
                let endRow = cells[1].replace(/[0-9]+/g, '')
                let i = 0
                newRows.forEach(row => {
                    let rangestring = `${rangesheet}!${startRow}${startCol + i}:${endRow}${startCol + i}`
                    i++
                    row[8] = rangestring
                })
                console.log('sink', newRows)
                newsink = newsink.concat(newRows)
            }
        }

        if (matchRows.length > 0) {
            newsink = newsink.concat(matchRows)
            //process matches
            request.body = {
                valueInputOption: 'USER_ENTERED',
                data: [],
                includeValuesInResponse: false,
                responseValueRenderOption: 'FORMATTED_VALUE',
                responseDateTimeRenderOption: 'FORMATTED_STRING'
            }

            request.body.data = matchRows.map(row => {
                let range = row[8]
                //let dimension =row.splice(-1,1)
                let data = [...row]
                data.pop()
                if (data[0].constructor != Array) {
                    data = [data]
                }
                return {
                    dataFilter: {
                        a1Range: range
                    },
                    majorDimension: 'ROWS',
                    values: data
                }
            })
            if (request.from == 'end' || !sinkbuffer || sinkbuffer < new Date().getTime()) {
                sendToValueFilterBatch(request)
                sinkbuffer = new Date().getTime() + settings.freq
            }
        }

    }
    sessionStorage.sink = JSON.stringify(newsink)
}

function clearSession() {
    sessionStorage.sink = []
}

async function updateSinkHeaders(request) {
    let formula = '=arrayformula(if(row(C:C)=1,"Duration Seconds",if(not(isblank(C:C)),((C:C-B:B)*3600*24),"")))'
    let headerRow = ['Participants', 'Joined', 'Left', 'TempDeviceId', 'Meet', 'Space', 'Classname', 'ClassId']

    headerRow = headerRow.map(cell => {
        return { userEnteredValue: { stringValue: cell } }
    })
    headerRow.push({ userEnteredValue: { formulaValue: formula } })
    let cells = {
        updateCells: {
            rows: [{
                values: [headerRow]
            }],
            fields: '*',
            start: {
                sheetId: 0,
                rowIndex: 0,
                columnIndex: 0
            },

        }
    }
    let cellformat = {
        repeatCell: {
            range: {
                sheetId: request.sheetId,
                startRowIndex: 1,
                endRowIndex: 1000,
                startColumnIndex: headerRow.length - 1,
                endColumnIndex: headerRow.length
            },
            cell: {
                userEnteredFormat: {
                    numberFormat: {
                        type: "TIME",
                        pattern: "hh:mm:ss"
                    }
                }
            },
            fields: "userEnteredFormat.numberFormat"
        }
    }
    //cellformat
    request.body = {
        requests: [cells],
        includeSpreadsheetInResponse: false
    }

    sendToBatch(request)
}

async function addData(request) {

    if (!sheetCol[request.sheetId]) {
        sheet = await getBySheetId(request)
        sheetValues = sheet.valueRanges[0].valueRange.values
        if (request.automated) {
            colCount = sheetValues ? (sheetValues[0].length > 5 ? sheetValues[0].length + 1 : 6) : 6
        } else {
            colCount = sheetValues ? sheetValues[0].length + 1 : 1
        }
    } else {
        colCount = sheetCol[request.sheetId] + 1
    }
    sheetCol[request.sheetId] = colCount
    let sheetId = request.sheetId
    let object = {
        valueInputOption: 'USER_ENTERED',
        data: [{
            dataFilter: {
                gridRange: {
                    sheetId: sheetId,
                    startRowIndex: 0,
                    endRowIndex: 0,
                    startColumnIndex: 0,
                    endColumnIndex: 0
                }
            },
            majorDimension: 'ROWS',
            values: []
        }
        ],
        includeValuesInResponse: false,
        responseValueRenderOption: 'FORMATTED_VALUE',
        responseDateTimeRenderOption: 'FORMATTED_STRING'
    }

    let values = []
    var d = new Date().toLocaleString().replace(/,/g, '')
    values.push([d])
    values.push([request.link])
    for (let i = 0; i < request.values.length; i++) {
        values.push([request.values[i][0]])
    }
    object.data[0].dataFilter.gridRange.startRowIndex = 0
    object.data[0].dataFilter.gridRange.endRowIndex = values.length
    object.data[0].dataFilter.gridRange.startColumnIndex = colCount - 1
    object.data[0].dataFilter.gridRange.endColumnIndex = colCount
    object.data[0].values = values
    request.body = object
    sendToValueFilterBatch(request)

}

async function formatCells(request, sheet) {
    const header1 = await getLanguageMessage('header1')
    const header2 = await getLanguageMessage('header2')
    const header3 = await getLanguageMessage('header3')
    const header4 = await getLanguageMessage('header4')

    var header = [header1, header2, header3, header4]
    var map = {}

    for (var i = 0; i < header.length; i++) {
        map[header[i]] = i;
    }

    var formatting = {
        repeatCell: {
            range: {
                sheetId: request.sheetId,
                startRowIndex: 1,
                endRowIndex: 1000,
                startColumnIndex: map[header[3]],
                endColumnIndex: map[header[3]] + 1
            },
            cell: {
                userEnteredFormat: {
                    numberFormat: {
                        type: "TIME",
                        pattern: "hh:mm:ss"
                    }
                }
            },
            fields: "userEnteredFormat.numberFormat"
        }
    }
    var formatting2 = {
        repeatCell: {
            range: {
                sheetId: request.sheetId,
                startRowIndex: 1,
                endRowIndex: 1000,
                startColumnIndex: map[header[1]],
                endColumnIndex: map[header[2]] + 1
            },
            cell: {
                userEnteredFormat: {
                    numberFormat: {
                        type: "DATE_TIME",
                    }
                }
            },
            fields: "userEnteredFormat.numberFormat"
        }
    }
    request.body = {
        requests: [formatting, formatting2],
        includeSpreadsheetInResponse: true
    }

    sendToBatch(request)
}


var backgroundsend
async function addDataCache(request) {
    if (!settings['status'] || !settings['automated']) {
        try {
            clearInt()
        } catch (e) { }
    }
    //request.sheetId =request.sheetId?request.sheetId:'csv'
    const result = await getStorage('local', `cache${request.meet}`)
    const d = new Date().toLocaleString().replace(/,/g, '')
    const cacheArray = result['cache' + request.meet] ? result['cache' + request.meet] : [[]]

    let dataValues = request.values

    let sheetId = request.sheetId

    const head1 = await getLanguageMessage('header1')
    const head2 = await getLanguageMessage('header2')
    const head3 = await getLanguageMessage('header3')
    const head4 = await getLanguageMessage('header4')
    const absent = await getLanguageMessage('absent')

    const header = [head1, head2, head3, head4, 'id', 'status']
    const map = {}
    for (let i = 0; i < header.length; i++) {
        map[header[i]] = i
    }

    const start = columnToLetter(map[header[0]] + 1)
    const join = columnToLetter(map[header[1]] + 1)
    const left = columnToLetter(map[header[2]] + 1)
    const end = columnToLetter(map[header[2]] + 2)

    const object = {
        valueInputOption: 'USER_ENTERED',
        data: [{
            dataFilter: {
                gridRange: {
                    sheetId: sheetId,
                    startRowIndex: 0,
                    endRowIndex: 0,
                    startColumnIndex: 0,
                    endColumnIndex: 0
                }
            },
            majorDimension: 'ROWS',
            values: []
        }
        ],
        includeValuesInResponse: false,
        responseValueRenderOption: 'FORMATTED_VALUE',
        responseDateTimeRenderOption: 'FORMATTED_STRING'
    }

    if (cacheArray[0][0] != head1) {
        cacheArray[0] = header
    }
    let newUser = false
    for (let i = 0; i < dataValues.length; i++) {
        let coord = getIndexOfK(cacheArray, dataValues[i][0])
        let datarow = dataValues[i]
        if (!coord) {
            datarow[map[header[3]]] = `=iferror(${left}${cacheArray.length + 1}-${join}${cacheArray.length + 1})`
            datarow[5] = 'joined'

            if (datarow[map[header[1]]] == absent && datarow[4]) {

                datarow[map[header[1]]] = d
            }
            cacheArray.push(datarow)
            if (subscribed) {
                newUser = true
            }
        } else {
            //updating user time
            let row = coord[0]

            if (cacheArray[row][map[header[1]]] == absent && datarow[4]) {
                cacheArray[row][map[header[1]]] = d
            }

            if (datarow[5] == 'left' && cacheArray[row][5] != 'left') {
                cacheArray[row][5] = 'left'
                cacheArray[row][map[header[2]]] = d
                console.log('datacache left', cacheArray[row])
            }
        }
    }

    for (let i = 1; i < cacheArray.length; i++) {
        const coord = getIndexOfK(dataValues, cacheArray[i][0])
        if (!coord) {
            cacheArray[i][5] = 'left'
        }
        if (cacheArray[i][5] != 'left' && cacheArray[i][map[header[1]]] != absent) {
            cacheArray[i][map[header[2]]] = d
        }
    }

    const values = cacheArray.slice()
    for (let i = 0; i < values.length; i++) {
        values[i] = values[i].slice(0, 4)
    }
    object.data[0].dataFilter.gridRange.startRowIndex = 0
    object.data[0].dataFilter.gridRange.endRowIndex = values.length
    object.data[0].dataFilter.gridRange.startColumnIndex = 0
    object.data[0].dataFilter.gridRange.endColumnIndex = values[0].length
    object.data[0].values = values

    request.body = object
    if (!sendingObject[request.meet] && !request.end) {
        sendingObject[request.meet] = {}
    }
    if (!request.end) {
        sendingObject[request.meet].request = request
    }

    const cach = {}
    cach['cache' + request.meet] = cacheArray
    chrome.storage.local.set(cach)

    if ((!subscribed && !request.new && !request.end && (lastSend[request.meet] && lastSend[request.meet] > new Date().getTime()))) {
        const milliseconds = lastSend[request.meet] - new Date().getTime()
        chrome.tabs.query({ currentWindow: true, active: true }, async function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { type: 'cooldown', time: milliseconds });
        })
    }

    if (!valueFilterLock && (request.new || request.end || (!lastSend[request.meet] || lastSend[request.meet] < new Date().getTime() || newUser))) {
        valueFilterLock = true
        console.log('sending', request)
        sendToValueFilterBatch(request)
        let freq = settings.freq
        if (!subscribed) {
            freq = freq * 3
        }
        lastSend[request.meet] = new Date().getTime() + freq
        valueFilterLock = false
    }
}

function clearInt() {
    clearInterval(backgroundsend)
}

chrome.alarms.onAlarm.addListener((e) => {
    sendTimedBackground()
});

function sendTimedBackground() {
    console.log('sendingObject', sendingObject)
    for (let m in sendingObject) {
        console.log('backgroundTrigger object', sendingObject[m].request)
        if (sendingObject[m].request) {
            newRequest(sendingObject[m].request)
        }
    }
}

async function sendToValueFilterBatch(request) {
    if (request.body.data[0].values.length == 0 || !request.id) {
        return
    }
    console.log('send batch', subscribed, request.auto, request.new, request.end)

    if (subscribed) {
        request.function = 'sendToValueFilterBatch'
        sheet = await sendtoScript(request)
    } else {
        if (writetimer + writebuffer >= new Date().getTime() && !subscribed) {
            //!request.snap && 
            if (!request.new && !request.end && request.auto) {
                return
            }
        }
        writetimer = new Date().getTime()
        let options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + request.token,
                'content-type': 'application/json',
            },
            body: JSON.stringify(request.body)
        }
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${request.id}/values:batchUpdateByDataFilter`
        sheet = await fetchRetry(url, options)
        console.log('sent to sheet', sheet)
    }
    if (request.snap) {
        sheetCol[request.sheetId] = colCount
    }
}

async function sendToValueBatch(request) {
    if (!request.id) { return }
    if (subscribed) {
        request.function = 'sendToValueBatch'
        sheet = await sendtoScript(request)
    } else {
        let options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + request.token,
                'content-type': 'application/json',
            },
            body: JSON.stringify(request.body)
        }
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${request.id}/values:batchUpdate`
        sheet = await fetchRetry(url, options)
    }
}

async function sendToBatch(request) {
    if (!request.id) { return }
    if (subscribed) {
        request.function = 'sendToBatch'
        var sheetUpdate = await sendtoScript(request)
    } else {
        let options = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + request.token,
                'content-type': 'application/json',
            },
            body: JSON.stringify(request.body)
        }
        let url = `https://sheets.googleapis.com/v4/spreadsheets/${request.id}:batchUpdate`
        fetchRetry(url, options)
    }
}

async function subscription(request) {
    request.body = { email: request.email, subscription: request.subscription }
    let options = {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Headers': '*'
        },
        body: JSON.stringify(request.body)
    }
    let url = `https://us-central1-claycodes.cloudfunctions.net/usersubscription`
    var sub = await fetchRetry(url, options)
    return sub
}

async function classroomList(request) {
    var pagetoken;
    var classList = []
    do {
        let options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + request.token,
                'content-type': 'application/json',
            }
        }
        let url = pagetoken ? `https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE&pageToken=${pagetoken}` : `https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE`
        var classes = await fetchRetry(url, options)
        pagetoken = classes.nextPageToken
        classList = classList.concat(classes.courses)
    } while (pagetoken)
    return classList
}

async function classroomRoster(request) {
    var token;
    var rosterList = []
    if (!request.classId) {
        return rosterList
    }
    do {
        let options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + request.token,
                'content-type': 'application/json',
            }
        }
        let url = token ? `https://classroom.googleapis.com/v1/courses/${request.classId}/students?pageSize=30&pageToken=${token}` : `https://classroom.googleapis.com/v1/courses/${request.classId}/students?pageSize=30`
        var roster = await fetchRetry(url, options)
        token = roster.nextPageToken
        rosterList = rosterList.concat(roster.students)
    } while (token)
    do {
        let options = {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + request.token,
                'content-type': 'application/json',
            }
        }
        let url = token ? `https://classroom.googleapis.com/v1/courses/${request.classId}/teachers?pageSize=30&pageToken=${token}` : `https://classroom.googleapis.com/v1/courses/${request.classId}/teachers?pageSize=30`
        var roster = await fetchRetry(url, options)
        token = roster.nextPageToken
        rosterList = rosterList.concat(roster.teachers)
    } while (token)

    if (request.title && request.title != '') {
        try {
            tabRename(request)
        } catch (e) { }
    }
    return rosterList
}

async function sendtoScript(request) {
    const scriptId = "1pgHq6__4P6ygW1i-QE2vfrIR_2PI_BRlVZiNvFK4xNraobQ22_yP9RjS"
    const options = {
        url: 'https://script.googleapis.com/v1/scripts/' + scriptId + ':run',
        token: request.token,
        request: {
            function: request.function,
            parameters: request
        }
    }
    return await sendingtoApp(options)
}

//turn to a fetch call 
async function sendingtoApp(options) {
    const option = {
        method: 'POST',
        headers: {
            Authorization: 'Bearer ' + options.token,
            'content-type': 'application/json',
        },
        body: JSON.stringify(options.request)
    }
    const result = await fetchRetry(options.url, option)
    if (!result) {
        return
    }
    return result.response.result
}

async function createSpreadSheet(request) {
    let ss;
    chrome.storage.sync.get('folderid', async function (res) {
        chrome.storage.local.get('folderid', async function (lres) {

            request.folderid = res.folderid ? res.folderid : lres.folderid
            const appName = await getLanguageMessage('appName')
            const sheetTitle = await getLanguageMessage('sheetTitle')
            request.folderName = appName
            var d = new Date().toLocaleDateString()
            request.body = {
                properties: {
                    title: `${sheetTitle} ${d}`
                }
            };
            if (subscribed) {
                request.function = 'createSpreadSheet'
                ss = await sendtoScript(request)
                if (request.folderid != ss.folderid) {
                    chrome.storage.sync.set({ folderid: ss.folderid })
                    chrome.storage.local.set({ folderid: ss.folderid })
                }
            } else {
                let options = {
                    method: 'POST',
                    headers: {
                        Authorization: 'Bearer ' + request.token,
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(request.body)
                }
                let url = `https://sheets.googleapis.com/v4/spreadsheets?fields=spreadsheetId`
                ss = await fetchRetry(url, options)
            }
            chrome.storage.sync.set({ spreadsheetId: ss.spreadsheetId });
            chrome.storage.local.set({ spreadsheetId: ss.spreadsheetId });
            settings.spreadsheetId = ss.spreadsheetId
            var data = {
                type: 'sheet',
                id: ss.spreadsheetId,
                token: request.token
            }
            request.id = ss.spreadsheetId
            console.log('create', request.id)

            chrome.tabs.sendMessage(request.sendingTab, data);
            // chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            //     chrome.tabs.sendMessage(tabs[0].id, data);
            // })
            //chrome.runtime.sendMessage(data);
            try {
                addSheet(request)
            } catch (e) {
                addSheetLock = false
            }
            return ss
        })
    })

}

async function fetchUser(request) {
    console.log('token', request.token)
    if (!request.token) {
        return
    }
    const url = `https://www.googleapis.com//oauth2/v2/userinfo`;
    const options = {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + request.token,
            'content-type': 'application/json',
        },
    }
    return await fetchRetry(url, options)
}

function columnToLetter(column) {
    var temp, letter = '';
    while (column > 0) {
        temp = (column - 1) % 26;
        letter = String.fromCharCode(temp + 65) + letter;
        column = (column - temp - 1) / 26;
    }
    return letter;
}

function wait(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, timeout)
    })
}

async function fetchRetry(url, options) {
    console.log('FETCH', options.method, url, options)
    const MAX_RETRIES = 2
    let backoff = 2
    for (let i = 0; i <= MAX_RETRIES; i++) {

        let res = await fetch(url, options)

        console.log('fetchok', res.ok, !res.error)
        if (res.ok && !res.error) {
            let response = await res.json()
            console.log(response)
            console.log(!response.error)

            if (!response.error) {
                return response
            }
        } else {
            console.log(res, await res.json())
        }
        if (backoff >= 256) {
            backoff = backoff * 2
        } else {
            backoff = Math.pow(backoff, 2)
        }
        console.log(backoff)
        let timeout = (backoff * 200) + Math.floor(Math.random() * (5000))

        if (!isFinite(timeout)) {
            timeout = 10234
        }
        console.log('Waiting', timeout, 'ms')
        await wait(timeout)
        console.log('Retrying', i)
    }
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
        currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

function getIndexOfK(arr, k) {
    for (var i = 0; i < arr.length; i++) {
        var index = arr[i].indexOf(k);
        if (index > -1) {
            return [i, index];
        }
    }
}

async function getLanguageMessage(message) {
    const msg = await chrome.storage.local.get(message)
    if (msg) {
        return JSON.parse(msg[message]).message
    }
}

async function languageUpdate() {

    const language = getLanguage().replace('-', '_')
    const lang = language.split('_')[0]
    let path = `_locales/${language}/messages.json`
    //usage:
    let res
    try {
        const url = chrome.runtime.getURL(path)
        res = await fetch(url)
    } catch (e) {
        try {
            path = `_locales/${lang}/messages.json`
            const url = chrome.runtime.getURL(path)
            res = await fetch(url)
        } catch (e) {
            path = `_locales/en/messages.json`
            const url = chrome.runtime.getURL(path)
            res = await fetch(url)
        }
    }
    const jsonres = await res.json()

    for (let key in jsonres) {
        const obj = {}
        obj[key] = JSON.stringify(jsonres[key])
        chrome.storage.local.set(obj)
    }

}


function getLanguage() {
    if (typeof Intl !== 'undefined') {
        try {
            return Intl.NumberFormat().resolvedOptions().locale;
        } catch (err) {
            console.error("Cannot get locale from Intl")
        }
    }
}