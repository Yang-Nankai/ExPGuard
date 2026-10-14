(function (window) {

    // Remove previous instances of the capture tool
    try {
        if (window.etfiCapture) {
            window.etfiCapture.remove();
        }
        if (window.etfiGuides) {
            window.etfiGuides.remove();
        }
    }
    catch (e) {
        console.error(e);
    }

    /**
     * Runs when the user has selected the area to capture
     * @param {left: number, top: number, width: number, height: number} box
     */
    function onCapture(box) {
        // notify the worker script that we have captured the area
        chrome.runtime.sendMessage({
            message: 'captured',
            ...box,
            devicePixelRatio: window.devicePixelRatio
        }).catch((e) => {
            console.error(e);
        });
    }

    // Manage the area selection
    window.etfiCapture = (function () {
        const rect = {};
        let box;

        const calc = () => ({
            left: Math.min(rect.lt.x, rect.rb.x + 1),
            top: Math.min(rect.lt.y, rect.rb.y + 1),
            width: Math.abs(rect.rb.x - rect.lt.x - 3),
            height: Math.abs(rect.rb.y - rect.lt.y - 3)
        });

        function update(e) {
            rect.rb.x = e.clientX;
            rect.rb.y = e.clientY;

            for (const [key, value] of Object.entries(calc())) {
                box.style[key] = value + 'px';
            }
        }
        function remove() {
            onCapture(calc());

            window.etfiGuides.remove();
            window.etfiCapture.remove();
        }
        function mousedown(e) {
            // prevent content selection on Firefox
            e.stopPropagation();
            e.preventDefault();
            box = document.createElement('div');
            box.setAttribute('class', 'etfi-capture-box');

            rect.lt = {
                x: e.clientX,
                y: e.clientY
            };
            rect.rb = {
                x: e.clientX,
                y: e.clientY
            };

            document.addEventListener('mousemove', update);
            document.addEventListener('mouseup', remove);
            document.documentElement.appendChild(box);
        }
        function keydown(e) {
            if (e.code === 'Escape') {
                window.etfiGuides.remove();
                window.etfiCapture.remove();
                chrome.runtime.sendMessage({
                    message: 'aborted'
                });
            }
        }

        return {
            install: function () {
                document.addEventListener('mousedown', mousedown);
                window.addEventListener('keydown', keydown);
            },
            remove: function () {
                document.removeEventListener('mousedown', mousedown);
                document.removeEventListener('mousemove', update);
                document.removeEventListener('mouseup', remove);
                for (const e of [...document.querySelectorAll('.etfi-capture-box')]) {
                    e.remove();
                }
                window.removeEventListener('keydown', keydown);
            }
        };
    })();

    // Manage the guides that help the user to select the area to capture
    window.etfiGuides = (function () {
        let guide1;
        let guide2;
        let guide3;
        function position(left, top) {
            guide1.style.width = left + 'px';
            guide2.style.height = top + 'px';
        }
        function update(e) {
            position(e.clientX, e.clientY);
        }
        return {
            install() {
                guide1 = document.createElement('div');
                guide2 = document.createElement('div');
                guide3 = document.createElement('div');
                guide1.setAttribute('class', 'etfi-capture-guide-1');
                guide2.setAttribute('class', 'etfi-capture-guide-2');
                guide3.setAttribute('class', 'etfi-capture-guide-3');
                document.documentElement.append(guide3, guide1, guide2);
                document.addEventListener('mousemove', update, false);
            },
            remove() {
                document.removeEventListener('mousemove', update, false);
                for (const e of [...document.querySelectorAll('.etfi-capture-guide-1, .etfi-capture-guide-2, .etfi-capture-guide-3')]) {
                    e.remove();
                }
                window.etfiCapture.remove();
            }
        };
    })();

    window.etfiGuides.install();
    window.etfiCapture.install();

})(window);
