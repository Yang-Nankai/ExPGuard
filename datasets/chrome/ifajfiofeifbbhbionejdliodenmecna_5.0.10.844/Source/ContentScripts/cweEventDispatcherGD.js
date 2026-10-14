/**************************************************************************
**
** cweEventDispatcherGD.js
**
** Created by Codrin Juravle on Nov 1, 2013.
** Copyright (c) 2015 Don Johnston, Inc. All rights reserved.
**
**************************************************************************/

(function () {
    "use strict";

    //---------------------------------------------------------------------------------------------------------------------------
    //
    const __replaceTextUsingSelection = false;

    const __proxyWindow = document.querySelector("dji-cowriter");

    let __textEventTargetIframe = document.querySelector(".docs-texteventtarget-iframe");
    let __textEventTargetDoc = __textEventTargetIframe ? __textEventTargetIframe.contentDocument : null;
    let __textEventTargetBody = __textEventTargetDoc ? __textEventTargetDoc.body : null;

    //---------------------------------------------------------------------------------------------------------------------------
    //
    __proxyWindow.addEventListener("__DJI_CWE_IME_RELOAD", function (event) {
        __findElements();
    }, false);

    //---------------------------------------------------------------------------------------------------------------------------
    //
    //
    __proxyWindow.addEventListener("__DJI_CWE_IME_REPLACETEXT", function (event) {
        const info = event.detail;

        if (__replaceTextUsingSelection) {
            let leftStrikes = info.extended.backspaceKey - info.extended.rightKey;
            let rightStrikes = info.extended.backspaceKey;

            if (leftStrikes > 0) {
                moveLeft(leftStrikes);
            }

            if (rightStrikes > 0) {
                moveRight(rightStrikes, true);
            }
        } else {
            if (info.extended.rightKey > 0) {
                moveRight(info.extended.rightKey);
            }

            if (info.extended.backspaceKey > 0) {
                deleteTo(-1, info.extended.backspaceKey);
            }
        }

        writeText(info.text);
    });

    //---------------------------------------------------------------------------------------------------------------------------
    //
    //
    function writeText(text) {
        if (!text || text.length <= 0) {
            return;
        }

        let events = textKeyboardEvents(text);
        dispatchKeyEvents(events);
    }

    function deleteTo (direction, repeats) {
        let events = prepareMultipleKeyboardEventsEx([
            {
                id: 1,
                type: "keydown",
                key: (direction < 0 ? "Backspace" : "Delete"),
                keyCode: (direction < 0 ? 8 : 46),
                repeats: repeats
            },
            {
                type: "keyup",
                key: (direction < 0 ? "Backspace" : "Delete"),
                keyCode: (direction < 0 ? 8 : 46),
            }
        ]);

        dispatchKeyEvents(events);
    }

    function moveLeft(positions, useShift) {
        const params = [
            {
                type: "keydown",
                key: "ArrowLeft",
                keyCode: 37,
                shiftKey: Boolean(useShift),
                repeats: positions
            },
            {
                type: "keyup",
                key: "ArrowLeft",
                keyCode: 37
            }
        ];

        if (useShift) {
            params.unshift({
                type: "keydown",
                key: "Shift",
                keyCode: 16,
                shiftKey: true
            });

            params.push({
                type: "keyup",
                key: "Shift",
                keyCode: 16,
                shiftKey: false
            });
        }

        let events = prepareMultipleKeyboardEventsEx(params);
        dispatchKeyEvents(events);
    }

    function moveRight(positions, useShift) {
        const params = [
            {
                type: "keydown",
                key: "ArrowRight",
                keyCode: 39,
                shiftKey: Boolean(useShift),
                repeats: positions
            },
            {
                type: "keyup",
                key: "ArrowRight",
                keyCode: 39
            }
        ];

        if (useShift) {
            params.unshift({
                type: "keydown",
                key: "Shift",
                keyCode: 16,
                shiftKey: true
            });

            params.push({
                type: "keyup",
                key: "Shift",
                keyCode: 16,
                shiftKey: false
            });
        }

        let events = prepareMultipleKeyboardEventsEx(params);
        dispatchKeyEvents(events);
    }

    //---------------------------------------------------------------------------------------------------------------------------
    //
    //
    function dispatchKeyEvents(events) {
        let activeElement = __textEventTargetDoc;

        for (let index = 0; index < events.length; index++) {
            let event = events[index];
            activeElement.dispatchEvent(event);
        }
    }

    //---------------------------------------------------------------------------------------------------------------------------
    //
    //
    function textKeyboardEvents(text) {
        let events = [];

        for (let index = 0; index < text.length; index++) {
            let _charCode = text.charCodeAt(index);
            let _char = text.charAt(index);
            let _upperCaseChar = _char.toUpperCase();
            let _shiftKey = (_upperCaseChar === _char);

            let keyEvent;

            //-----------------------------------------------------------------------------------
            //
            if (_shiftKey) {
                keyEvent = new Event("keydown", { bubbles: true, cancelable: true });

                keyEvent.__isDjiSyntheticEvent = true;

                keyEvent.altKey = false;
                keyEvent.ctrlKey = false;
                keyEvent.metaKey = false;
                keyEvent.shiftKey = _shiftKey;

                keyEvent.code = "Shift";
                keyEvent.key = "Shift";
                keyEvent.keyCode = 16;
                keyEvent.which = 16;

                keyEvent.location = 0;

                keyEvent.repeat = false;
                keyEvent.isComposing = false;

                //events.push(keyEvent);
            }

            //-----------------------------------------------------------------------------------
            //
            keyEvent = new Event("keydown", { bubbles: true, cancelable: true });

            keyEvent.__isDjiSyntheticEvent = true;

            keyEvent.altKey = false;
            keyEvent.ctrlKey = false;
            keyEvent.metaKey = false;
            keyEvent.shiftKey = _shiftKey;

            keyEvent.code = "KeySynthetic";
            keyEvent.key = _char;
            keyEvent.keyCode = _charCode;
            keyEvent.which = _charCode;

            keyEvent.location = 0;

            keyEvent.repeat = false;
            keyEvent.isComposing = false;

            //events.push(keyEvent);

            //-----------------------------------------------------------------------------------
            //
            keyEvent = new Event("keypress", { bubbles: true, cancelable: true });

            keyEvent.__isDjiSyntheticEvent = true;
            keyEvent.__char = _char;

            keyEvent.altKey = false;
            keyEvent.ctrlKey = false;
            keyEvent.metaKey = false;
            keyEvent.shiftKey = _shiftKey;

            keyEvent.key = _char;
            keyEvent.keyCode = _charCode;
            keyEvent.charCode = _charCode;
            keyEvent.which = _charCode;

            keyEvent.location = 0;

            keyEvent.repeat = false;
            keyEvent.isComposing = false;

            events.push(keyEvent);

            //-----------------------------------------------------------------------------------
            //
            keyEvent = new Event("textInput", { bubbles: true, cancelable: true });

            keyEvent.__isDjiSyntheticEvent = true;

            keyEvent.data = _char;
            keyEvent.which = 0;

            keyEvent.detail = 0;

            keyEvent.repeat = false;
            keyEvent.isComposing = false;

            events.push(keyEvent);

            //-----------------------------------------------------------------------------------
            //
            // keyEvent = new Event("keyup", { bubbles: true, cancelable: true });

            // keyEvent.__isDjiSyntheticEvent = true;

            // keyEvent.altKey = false;
            // keyEvent.ctrlKey = false;
            // keyEvent.metaKey = false;
            // keyEvent.shiftKey = _shiftKey;

            // keyEvent.code = "KeySynthetic";
            // keyEvent.key = _char;
            // keyEvent.keyCode = _charCode;
            // keyEvent.which = _charCode;

            // keyEvent.location = 0;

            // keyEvent.repeat = false;
            // keyEvent.isComposing = false;

            //events.push(keyEvent);

            //-----------------------------------------------------------------------------------
            //
            if (_shiftKey) {
                keyEvent = new Event("keyup", { bubbles: true, cancelable: true });

                keyEvent.__isDjiSyntheticEvent = true;

                keyEvent.altKey = false;
                keyEvent.ctrlKey = false;
                keyEvent.metaKey = false;
                keyEvent.shiftKey = false;

                keyEvent.code = "Shift";
                keyEvent.key = "Shift";
                keyEvent.keyCode = 16;
                keyEvent.which = 16;

                keyEvent.location = 0;

                keyEvent.repeat = false;
                keyEvent.isComposing = false;

                //events.push(keyEvent);
            }
        }

        return events;
    }

    //---------------------------------------------------------------------------------------------------------------------------
    //
    //
    function prepareMultipleKeyboardEventsEx(data) {
        let events = [];

        for (let dIndex = 0; dIndex < data.length; dIndex++) {
            let params = data[dIndex];
            let repeats = params.repeats || 1;
            let autodetectRepeat = !params.hasOwnProperty("repeat");

            for (let rIndex = 0; rIndex < repeats; rIndex++) {
                if (autodetectRepeat) {
                    params.repeat = Boolean(rIndex > 0);
                }

                events.push(prepareSingleKeyboardEvent(params));
            }
        }

        return events;
    }

    function prepareSingleKeyboardEvent(params) {
        let event = new Event(params.type, { bubbles: true, cancelable: true });
        let isKeyPress = (params.type === "keypress");

        event.__isDjiSyntheticEvent = true;

        if (params.hasOwnProperty("id")) {
            event.__id = params.id;
        }

        event.altKey = Boolean(params.altKey);
        event.ctrlKey = Boolean(params.ctrlKey);
        event.metaKey = Boolean(params.metaKey);
        event.shiftKey = Boolean(params.shiftKey);

        event.key = params.key;
        event.keyCode = params.keyCode;
        event.code = params.key;
        event.charCode = isKeyPress ? params.keyCode : 0;
        event.which = params.keyCode;

        event.location = 0;

        event.repeat = Boolean(params.repeat);
        event.isComposing = false;

        return event;
    }

    //---------------------------------------------------------------------------------------------------------------------------
    //
    //
    function __findElements() {
        __textEventTargetIframe = document.querySelector(".docs-texteventtarget-iframe");
        __textEventTargetDoc = __textEventTargetIframe ? __textEventTargetIframe.contentDocument : null;
        __textEventTargetBody = __textEventTargetDoc ? __textEventTargetDoc.body : null;
    }

    //---------------------------------------------------------------------------------------------------------------------------
    //
    setTimeout(function () {
        __findElements();
    }, 0);

}());
