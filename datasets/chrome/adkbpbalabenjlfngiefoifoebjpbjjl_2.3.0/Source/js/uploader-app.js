
(function () {

    const randomString = (Math.random() + 1).toString(36).substring(7);

    // create popup container
    let appContainer = document.querySelector('.etfi-uploader-container');;
    const appContainerId = `uploader-container-${chrome.runtime.id}-${randomString}`;
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.style.position = 'absolute';
        appContainer.style.left = `-${Number.MAX_SAFE_INTEGER}px`;
        appContainer.setAttribute('id', appContainerId);
        appContainer.setAttribute('class', 'etfi-uploader-container');
        document.body.appendChild(appContainer);

        const shadowRoot = appContainer.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <style>
                #container {
                    position: fixed;
                    bottom: 0;
                    right: 0;
                    left: 0;
                    top: 0;
                    z-index: 9999989;
                    overflow: hidden;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                }
            </style>

            <div id="container">
                <iframe class="etfi-uploader-iframe" src="${chrome.runtime.getURL('/content.html#/content/upload/')}" allow="clipboard-read ${chrome.runtime.getURL('/content.html#/content/upload/')}"></iframe>
            </div >
            `;
    }

    // this sets focus to the iframe content which allows to use keyboard shortcuts,
    // for example Escape to close the app container
    setTimeout(function () {
        appContainer.shadowRoot.querySelector('iframe').contentWindow.focus();
    }, 100);

})();

