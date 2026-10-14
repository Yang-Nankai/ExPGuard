(function (d, w){

    if (w['CaptSurfe']) return;

    var token, lang, nlang, canvas,
        width, height, onSolve, captWrap,
        _solved, _inited, _captImgCounter=0;

    w['CaptSurfe'] = {
        init: function (opt) {
            if (_inited) return;
            _inited = true;
            _solved = false;

            var targetNode = d.querySelector(opt.target);
            if (typeof targetNode !== 'object' || targetNode.nodeType !== 1) {
                console.error('CaptSurfe: element not found')
                return;
            }
            if (!('onSolve' in opt) || typeof opt.onSolve !== 'function') {
                console.error('CaptSurfe: callback `onSolve` is required')
                return;
            }

            targetNode.innerHTML = '';

            onSolve = opt.onSolve
            width = opt.width || 360;
            height = opt.height || 70;
            let max_radio = width * height / 100;
            token = opt.token || genToken(20)
            lang = opt.lang === 'ru' ? 'ru' : 'en';
            nlang = lang === 'ru' ? 'en' : 'ru';


            captWrap = d.createElement("div");
            captWrap.id = genToken(10)
            captWrap.style.width = width + 'px';
            captWrap.style.height = height + 'px';
            targetNode.appendChild(captWrap);

            var btnRefresh = d.createElement('div')
            btnRefresh.id = genToken(10);
            btnRefresh.addEventListener('click', function () {
                Refresh();
            })
            captWrap.appendChild(btnRefresh);

            var btnLang = d.createElement('div')
            btnLang.id = genToken(10);
            btnLang.classList.add(nlang)
            btnLang.addEventListener('click', function () {
                btnLang.classList.remove(nlang)
                lang = nlang
                nlang = lang === 'ru' ? 'en' : 'ru';
                Refresh();
                btnLang.classList.add(nlang)
            })
            captWrap.appendChild(btnLang);

            var btnHelp = d.createElement('a')
            btnHelp.id = genToken(10);
            btnHelp.attributes.title = "Help";
            btnHelp.addEventListener('click', function () {
                w.open()
            })
            captWrap.appendChild(btnHelp);

            canvas = document.createElement('div')
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            canvas.style.display = 'block';
            canvas.style.position = 'absolute';
            canvas.style.backgroundSize = 'cover';
            Refresh()
            captWrap.appendChild(canvas);

            let classRadio = genToken(10);

            for (var i = 0; i < max_radio; ++i) {
                var radio = d.createElement('input')
                radio.classList.add(classRadio);
                radio.type = 'radio';
                radio.name = classRadio;
                radio.value = i;
                radio.style.cssText = 'width:10px!important;height:10px!important;margin:0!important;padding:0!important;';
                radio.addEventListener('click', function (e) {
                    Solve(e.target.value, token)
                })
                canvas.appendChild(radio);
            }

            let styles = d.createElement('style')
            styles.innerText = style(captWrap.id, btnRefresh.id, btnLang.id, btnHelp.id)
            captWrap.appendChild(styles);
        },
    }
    function genToken (length) {
        let result = 'T';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        while (result.length < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    // обновляем картинку
    function Refresh () {
        canvas.style.backgroundImage = '';
        chrome.runtime.sendMessage({loadCaptImg:{
        	token, lang, width, height
        }}, () => {
            loadImgData()
        })
    }

    const loadImgData = async () => {
        if (++_captImgCounter > 100) {
            _captImgCounter = 0;
            return;
        }
        let img = await ChromeStorage.get('captImg')
        if (img) {
            canvas.style.backgroundImage = 'url('+img+')';
            ChromeStorage.set({captImg: null})
        }
        setTimeout(loadImgData, 500)
    }

    function Solve (v,t) {
        if (_solved) return;
        _solved = true
        _inited = false
        captWrap.style.outline = '2px solid #5f4'
        onSolve(v,t)
    }


    function style (wrap, refresh, lang, help) {
        return '#'+help+',#'+lang+'{position:absolute;display:block;width:24px;height:24px;cursor:pointer;right:-30px;background-size:contain}#'+wrap+'{position:relative;outline:#ddd solid 2px;line-height:0;background-image:url("data:image/svg+xml,%0A%3Csvg xmlns=\'http://www.w3.org/2000/svg\' xmlns:xlink=\'http://www.w3.org/1999/xlink\' style=\'margin:auto;background:none;display:block;\' width=\'75px\' height=\'25px\' viewBox=\'0 37 100 25\' preserveAspectRatio=\'xMidYMid\'%3E%3Ccircle cx=\'84\' cy=\'50\' r=\'4.9263\' fill=\'%233f8efa\'%3E%3Canimate attributeName=\'r\' repeatCount=\'indefinite\' dur=\'0.7352941176470589s\' calcMode=\'spline\' keyTimes=\'0;1\' values=\'10;0\' keySplines=\'0 0.5 0.5 1\' begin=\'0s\'%3E%3C/animate%3E%3Canimate attributeName=\'fill\' repeatCount=\'indefinite\' dur=\'2.9411764705882355s\' calcMode=\'discrete\' keyTimes=\'0;0.25;0.5;0.75;1\' values=\'%233f8efa;%233f8efa;%233f8efa;%233f8efa;%233f8efa\' begin=\'0s\'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx=\'16\' cy=\'50\' r=\'0\' fill=\'%233f8efa\'%3E%3Canimate attributeName=\'r\' repeatCount=\'indefinite\' dur=\'2.9411764705882355s\' calcMode=\'spline\' keyTimes=\'0;0.25;0.5;0.75;1\' values=\'0;0;10;10;10\' keySplines=\'0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\' begin=\'0s\'%3E%3C/animate%3E%3Canimate attributeName=\'cx\' repeatCount=\'indefinite\' dur=\'2.9411764705882355s\' calcMode=\'spline\' keyTimes=\'0;0.25;0.5;0.75;1\' values=\'16;16;16;50;84\' keySplines=\'0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\' begin=\'0s\'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx=\'16\' cy=\'50\' r=\'5.0737\' fill=\'%233f8efa\'%3E%3Canimate attributeName=\'r\' repeatCount=\'indefinite\' dur=\'2.9411764705882355s\' calcMode=\'spline\' keyTimes=\'0;0.25;0.5;0.75;1\' values=\'0;0;10;10;10\' keySplines=\'0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\' begin=\'-0.7352941176470589s\'%3E%3C/animate%3E%3Canimate attributeName=\'cx\' repeatCount=\'indefinite\' dur=\'2.9411764705882355s\' calcMode=\'spline\' keyTimes=\'0;0.25;0.5;0.75;1\' values=\'16;16;16;50;84\' keySplines=\'0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\' begin=\'-0.7352941176470589s\'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx=\'33.2506\' cy=\'50\' r=\'10\' fill=\'%233f8efa\'%3E%3Canimate attributeName=\'r\' repeatCount=\'indefinite\' dur=\'2.9411764705882355s\' calcMode=\'spline\' keyTimes=\'0;0.25;0.5;0.75;1\' values=\'0;0;10;10;10\' keySplines=\'0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\' begin=\'-1.4705882352941178s\'%3E%3C/animate%3E%3Canimate attributeName=\'cx\' repeatCount=\'indefinite\' dur=\'2.9411764705882355s\' calcMode=\'spline\' keyTimes=\'0;0.25;0.5;0.75;1\' values=\'16;16;16;50;84\' keySplines=\'0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\' begin=\'-1.4705882352941178s\'%3E%3C/animate%3E%3C/circle%3E%3Ccircle cx=\'67.2506\' cy=\'50\' r=\'10\' fill=\'%233f8efa\'%3E%3Canimate attributeName=\'r\' repeatCount=\'indefinite\' dur=\'2.9411764705882355s\' calcMode=\'spline\' keyTimes=\'0;0.25;0.5;0.75;1\' values=\'0;0;10;10;10\' keySplines=\'0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\' begin=\'-2.2058823529411766s\'%3E%3C/animate%3E%3Canimate attributeName=\'cx\' repeatCount=\'indefinite\' dur=\'2.9411764705882355s\' calcMode=\'spline\' keyTimes=\'0;0.25;0.5;0.75;1\' values=\'16;16;16;50;84\' keySplines=\'0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1\' begin=\'-2.2058823529411766s\'%3E%3C/animate%3E%3C/circle%3E%3C/svg%3E");background-repeat:no-repeat;background-position:center}#'+wrap+' input[type="radio"]{opacity:0;width:10px!important;height:10px!important;margin:0!important;padding:0!important;position:relative;display:inline-block;appearance:none;-webkit-appearance:none;-moz-appearance:none}#'+wrap+' input[type="radio"]:checked{border:2px solid #5f4;opacity:.5;border-radius:15px;outline-offset:0;width:30px!important;height:30px!important;margin:-10px;background:#5f4}#'+refresh+'{position:absolute;display:block;background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjBEOEMzQjc3MkNFNzExRThCMzBFQjRBQ0IxMkFEQjQyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjBEOEMzQjc4MkNFNzExRThCMzBFQjRBQ0IxMkFEQjQyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MEQ4QzNCNzUyQ0U3MTFFOEIzMEVCNEFDQjEyQURCNDIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MEQ4QzNCNzYyQ0U3MTFFOEIzMEVCNEFDQjEyQURCNDIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6bBfLMAAAFfklEQVR42qxWa2xURRQ+d+bevffuo9vdPrZIhdYKpUUNj1JBm4C2gBEqQV6agMojhoghQkijPAxGAU0F+aGNKD4wNfzAAAINCBJipfYhr5S0JiBQQFO27S67vfvofc04d/tWXP4wm9lsZmbPOXO+7ztnOEopJB8mAFEBkMh+4+FrnNA7kwze+lq/fj1cunRpYNFySvU4yLIMrpzJo5yFs5/GWU9MUnn3CGsfa+EOvf3yZfPm2brItforSvgucDY7cBwCYhqAjDh40zNh3/4DvQ4aGhqgvr5+mGd33tRCsXTD26H0qfO0gCMF/AbzrPVucg7mpQQE9xTVO2bmKfPszsqu3w7V9v8384Xt67ym/w9TjZ1IOJAkacCwyCPIKH9/TWTKhh0BQ3BxehQE0IGKGEhvPICAAkd16y5il/fJufKig3NGPravMnZy63Z7+a4P23Pmr8726C12FzrJD43aMp67av+2G6MWbzTjMZZxFQhvB4HHYNc7/7YTpR0jMCNEzlRlX27c4ACxANQYcJ2PLq1wPly6oMvmyyMRBcwUTAHZuYSDfpgz5763+sboxRtJLAIc+yDJBR5/3TF6bs9n+vVf68OxYJjj2HmbU7aPKnrcMXHF6+HRz7+mayoGPQbdOC0PGT39QJIBkElPBFJyp+RHiis+tiJnSQabKJnupm1vhY5v/TSuGf/iRnc83HmkCZ8/0jSi9I0fg9N3HdB1XUTUuDeLZFkCqaxiC8u5A1MVMIvceXbLGv/xD/aQJBQUJJnTR5bMMikncED/j6Ymo2JRdihj2nyOXZPwMqR11B0Lntqe1LgkO4W0ZdVVnaPnraI9Crvz8EE5hK1F3qKekD97phZLs2NEQLIzjpyo+kQ1SFIBCU6PXcudvdAK3Lrx0IGZDu04EgZDJzylCGQj1J5258whphMkGXfvBFtO1N1H3hDpuh3G380pFT1jCqhp0H6uUEvbCNOo0NEUfWkvTaj22eklCTBwguMPZmSleyAc7u4FmYEEBjzoQfpAZnR1uL2CI3faOJMC5rghbOAwx2uhgPJXy637mWMChIxn1i4x0/LHU2Yo1x5s5IhWw1tZ8y3Y/a4+4aGNvECHZYj5A5tAFO/X04uCVxuuJHPg8j3iMcoqvwoRm8PiR4HY+i0PRg1iUUJczi7QVA0xscDQqRGOVc7uIGiKksy4RVG5eOUrCjOOGGV5QiDefPCwqmp9mBJds+LlhkxgNHart1uM6vJZwZst7ckcpI8rGdtTtHYzq55gsurjMf1tasvRnykv3Zs0FgpYEEFu3rszlCQ1Fusyx88oMF6sPqyYYjoiJvCSDMKFz3cEbrVGLRv8f42zrDEGWNGEiip2Z3nyxuiNVV8obRfaaJ/4EKu6ctbYDHvxymXxyWs2KRr2IjMOpi0FRgSaavwnP9qb5nEP1qK+NAJFAkisGKnUJgKrihpBKZ3jlr/jzF/ypjtwudGLlTarmHaDKzvuzp/cgVIzSTzKQtLBFFLAp13/Xale8iqrrgRhYdABL8oC2FgXo+3X0A/LF7kmLF0WLly6Lh7XAKsKKIBckDqprCvRaiBxQ46RALEdynKOJAdkBpqOKt+/vCLsbwsMJjqhAxPMi/u/Sb2ToWunN23pvnH+T9T808WsGbVnnE9VbA6KOcUG4zVorIOxs733RRZIgHmRAdpxVW6srPQf3/alpmkDqbZYmDhqlYqF88vhXGMDWAUOCRLTHovQiEFqVg6yFzw3A+WVlpH0wolU8mYRBhJvKAEucLWZ3PzljNpaczp4qzVislcHwoOQ+nw+qK2t7XUQjUbBMAz2KhhedE2DRcFeCAKTqcj6Phadls450HtYjwqBzvYpZlQUbIkOOEwbzJbT6YR/BBgALjh5Yc0TRXQAAAAASUVORK5CYII=);width:24px;height:24px;cursor:pointer;top:0;right:-30px}#'+lang+'{top:25px}#'+lang+'.ru{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAB0SURBVGiB7dcxEYBADETRDYMOwAhasIBHJGAAMHJXHT1QLJn5r0qZP6kiAQCQWLThOK/iXOSpaRxCkjr3Il8R4EaAGwFuBLj1bVjW3bnHa+kvQIAbAW4EuBHgdv/EZVaqnzg28RP/AgFuBLgR4JY+AACA1CqqGQjfe3MWHQAAAABJRU5ErkJggg==)}#'+lang+'.en{background-image:url(data:image/png;base64,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)}#'+help+'{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAuIwAALiMBeKU/dgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAN9SURBVFiF1dlbb1VFFAfwn4XGB4qopd5CqqhtE8ulJGiA+FD9EsY3ffcraOBR5SaGjwBq+Ag+IBJJY0wE9UGMQMVWoqFeKJEmFvFhTrMPa+9z2Jdziv0nk5OZWbPWP+vMrFmzNmsMDzRcvw67MI0pTGAYD7fm/8R1/IDzON36vd3QbmVM4BCu4U7F9gsOYny1iJ6SPFSVaGy38QnG+kF0EAew1AOisS1hP9aXIVJmD4/iY+ztInMJZ/AdruBma3wIW7FN2ufPdtFxDq9hrgSnjtiGecWeuYHDLZmy2IEjWOygcw6TTcguFCj9p2X00bqKpUhyDMsF+hfqkB5V7NnLeKkB0Yg90haKdn7GlrJKBqX9FJWc08yrnTCMmQJ7Z5U8iAc6kN3QB7IrGFJM+p0oGKPEBC7gwbaxK9iN30sY3oC3wthxWdTohs34Ck+3jS1hO37stOiU/AGrsmefkPfSkxXW75U/iB91Ep6Qv8GOVDDWC8LwYVi/rMNteCgI3pT+ptUmPCwfp9+LQuvkE5nDFQ2RosinodWJLEcDl3kMtAu8KO+Z7TUM9QpTBXx2kbGeDgsu4dtVIleE81J0aserZIR3hskz/WZUApHDTrKbJCbTdb07gE1h7C/8W0NX5DBORvixMDlbw8CKnmth7KmCsTKIHB4n2xIbw+RiDQO9xo3Q30gIFWsBK4SjR6PH7wceCv1FMsK/hcmtfadzb0QOv5IRvhgmqzx7+oV4cV0kI3whTE73m00JTIf+XRx3y1+FO2oY6UXyQ7qGo54pMg9/LR8r36xhqFd4I/Tn8U0UOuj/m16+WyQ4Lp/tH7sPhI+H9R0TeFKtKwrvWUXC++SddqJdID5Cx6Sko/0ROisdyoUSBps8QkekR+ho29gtKcRe7rZwv7yXZqSneL8whC8L7L5dZvEgvihYPKP6ISyDkQ5kP1eykEIqE80VKJnVvYpZFfvwU4Gdq1JaWgmTiouBy9JTvIm3R6S9XVQMvI4X6iqelApzUekdKVYelX9edcMUPpAOYZHOq/ciW6agvUWqvrzcRWYWn8kK2ivJ9yY8I530V9xdhoo4i9elW60x1kuFuVuKPdOk/S1Fg9IHrAqew0nFe69qW5YuhW6fEXqGMbyv8+eEbm1Oyg2er2O46YfFAekgTcs+LG7GI635P6RT/72Uz55u/dZ59q9N/AcDTq4YJ0GiEQAAAABJRU5ErkJggg==);top:50px}'
    }

})(document, window);