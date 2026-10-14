
(function () {

    const randomString = (Math.random() + 1).toString(36).substring(7);

    // create popup container
    let appContainer = document.querySelector('.etfi-app-container');;
    const appContainerId = `app-container-${chrome.runtime.id}-${randomString}`;
    if (!appContainer) {
        appContainer = document.createElement('div');
        appContainer.style.position = 'absolute';
        appContainer.style.left = `-${Number.MAX_SAFE_INTEGER}px`;
        appContainer.setAttribute('id', appContainerId);
        appContainer.setAttribute('class', 'etfi-app-container');
        document.body.appendChild(appContainer);

        const width = 500;
        const height = 250;

        const shadowRoot = appContainer.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
            <style>
                #container {
                    position: fixed;
                    bottom: 20px;
                    right: 30px;
                    width: ${width}px;
                    height: ${height - 10}px;
                    background-color: #fff;
                    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15),
                        0 5px 10px rgba(0, 0, 0, 0.05);
                    display: flex;
                    flex-direction: column;
                    z-index: 9999990;
                    border-radius: 8px;
                    overflow: hidden;
                }
                iframe {
                    width: 100%;
                    height: 100%;
                    border: none;
                    border-radius: 8px;
                }
            </style>

            <div id="container">
                <iframe class="etfi-app-content-iframe" src="${chrome.runtime.getURL('/content.html#/content/')}?appContainerId=${appContainerId}"></iframe>
            </div>
        `;
    }

    // this sets focus to the iframe content which allows to use keyboard shortcuts,
    // for example Escape to close the app container
    setTimeout(function () {
        appContainer.shadowRoot.querySelector('iframe').contentWindow.focus();
    }, 100);

})();

