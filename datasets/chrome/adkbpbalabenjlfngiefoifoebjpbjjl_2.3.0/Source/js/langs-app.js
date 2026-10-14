(function () {

    // prevent onResize event from firing too often
    let timer;
    function debounce(func) {
        return function (event) {
            if (timer) clearTimeout(timer);
            timer = setTimeout(func, 300, event);
        };
    }

    // calculate popup dimensions based on the visible area
    function getPopupDimensions() {
        // visible area width and height
        const cw = window.innerWidth;
        const ch = window.innerHeight;
        // gap between popup and client window borders
        const gap = 60;
        // initial popup width and height
        const width = Math.min(cw - (gap * 2), 900);
        const height = Math.min(ch - (gap * 2), 800);
        return { width, height };
    }

    // resize popup container
    function resizeContainer(langsContainerId) {
        let langsContainer = document.getElementById(langsContainerId);
        if (langsContainer) {
            const { width, height } = getPopupDimensions();
            const shadowContainer = langsContainer.shadowRoot.getElementById('container');
            shadowContainer.style.width = `${width}px`;
            // set additional 'padding' in the bottom to improve the look
            shadowContainer.style.height = `${height - 10}px`;
            shadowContainer.style.marginTop = `-${height / 2}px`;
            shadowContainer.style.marginLeft = `-${width / 2}px`;
        }
    }

    // create popup container
    const langsContainerId = `langs-container-${chrome.runtime.id}`;
    let langsContainer = document.getElementById(langsContainerId);
    if (!langsContainer) {
        langsContainer = document.createElement('div');
        langsContainer.style.position = 'absolute';
        langsContainer.style.left = `-${Number.MAX_SAFE_INTEGER}px`;
        langsContainer.setAttribute('id', langsContainerId);
        langsContainer.setAttribute('class', 'etfi-langs-container');
        document.body.appendChild(langsContainer);

        // resize popup container on window resize
        window.addEventListener('resize', debounce(function (e) {
            resizeContainer(langsContainerId);
        }));
    }

    const { width, height } = getPopupDimensions();

    const shadowRoot = langsContainer.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = `
        <style>
            #backdrop {
                position: fixed;
                top: 0;
                left: 0;
                bottom: 0;
                right: 0;
                background-color: rgba(0, 0, 0, 0.4);
                overflow: hidden;
                z-index: 9999998;
            }
            #container {
                position: fixed;
                top: 50%;
                left: 50%;
                width: ${width}px;
                height: ${height - 10}px;
                margin-top: -${height / 2}px;
                margin-left: -${width / 2}px;
                background-color: #fff;
                box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15),
                    0 5px 10px rgba(0, 0, 0, 0.05);
                display: flex;
                flex-direction: column;
                z-index: 9999991;
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

        <div id="backdrop">
            <div id="container">
                <iframe src="${chrome.runtime.getURL('/content.html#content/langs/')}"></iframe>
            </div>
        </div>
    `;

    // this sets focus to the iframe content which allows to use keyboard shortcuts,
    // for example Escape to close the container
    setTimeout(function () {
        shadowRoot.querySelector('iframe').contentWindow.focus();
    }, 100);

})();

