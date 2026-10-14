(function () {
    chrome.runtime.onMessage.addListener((request, sender) => {
		console.log('onMessage', sender.tab.id, request);
        switch (request.type) {
            case 'nilread.wkx.save': return save(sender.tab, request);
            case 'nilread.wkx.restore': return restore(sender.tab, request);
            case 'nilread.wkx.focus': return focus(sender.tab, request);
            case 'nilread.wkx.fullscreen': return fullscreen(sender.tab, request);
            case 'nilread.wkx.close': return close(sender.tab, request);
        }
    });

    function save(tab, request) {
        chrome.windows.get(tab.windowId, null).then(win => {
            switch (win.state) {
                case 'normal':
                case 'maximized':
                case 'fullscreen':
                    let state = {};
                state[skey(request)] = {
                    state: win.state,
                    left: win.left,
                    top: win.top,
                    width: win.width,
                    height: win.height
                };
                console.log('save', tab.id, state);
                chrome.storage.local.set(state);
                break;
            }
        });
    }

    function restore(tab, request) {
        let key = skey(request);
        chrome.storage.local.get(key).then(values => {
            if (values && values[key]) {
                let value = values[key];
                console.log('restore', tab.id, value);
                let state = value.state;
                value.state = 'normal';
                chrome.windows.update(tab.windowId, value);
                switch (state) {
                    case 'maximized':
                    case 'fullscreen':
                        chrome.windows.update(tab.windowId, { state: state });
                        break;
                }
            }
        });
    }

    function focus(tab) {
	    chrome.windows.update(tab.windowId, {focused: true});
    }

    function fullscreen(tab, request) {
        console.log('fullscreen', tab.id, request.name);
        chrome.windows.update(tab.windowId, { state: request.name ? 'fullscreen' : 'normal' });
    }

    function close(tab) {
        console.log('close', tab.id);
        chrome.tabs.remove(tab.id);
    }

    function skey(request) {
        return 'nilread.wkx.outline.' + (request.name ?? '');
    }
})();
