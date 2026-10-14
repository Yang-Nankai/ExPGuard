var exist_modal = false;
var curr_right_click_target = null;
var right_click_ele = null;
const slackSecondaryClass = 'p-workspace__secondary_view';
const slackPrimaryClass = 'p-workspace__primary_view';
var slackParentClass = slackPrimaryClass;

function detectServiceHost(hostname) {
    chrome.storage.sync.get(null, function (res) {
        const options = res && res.options ? res.options : null;
        if (options) {
            if ((hostname === 'mail.google.com' || hostname === 'inbox.google.com') && options.gmail) {
                loadGmail();
            } else if (hostname.endsWith('.slack.com') && options.slack) {
                loadSlack();
            } else if (hostname === 'www.chatwork.com' && options.chatwork) {
                loadChatwork();
            }
        }
    });
}

function loadGmail() {
    const composeViewHandler = function(composeView) {
        var btn_icon = chrome.runtime.getURL('/images/rakuten-drive.svg');
        composeView.addButton({
            title: chrome.i18n.getMessage('gmail_hover_title'),
            iconUrl: btn_icon,
            onClick: function(event) {
                loadEmbeddedWebapp('gmail', composeView);
            }
        });
    };

    InboxSDK.load('2', INBOX_APP_ID).then(function(sdk) {
        sdk.Compose.registerComposeViewHandler(composeViewHandler);
    });
}

function loadSlack() {
    let $portal = null;
    const portalSelector = 'div.ReactModalPortal';
    const buttonSelector = 'button.c-button-unstyled.c-wysiwyg_container__button';

    const createMenuItem = function ($menu) {
        const $menuItem = $('<div/>');
        $menuItem.css({
            width: '100%',
            height: '28px',
            cursor: 'pointer',
            display: 'flex',
            padding: '0 24px',
        });
        $menuItem.addClass('c-menu_item__li sa-menu_item');

        const iconUrl = chrome.runtime.getURL('/images/rakuten-drive.svg');
        const iconHoverUrl = chrome.runtime.getURL('/images/rakuten-drive.svg');
        const $icon = $('<img src="' + iconUrl + '"/>');
        const $iconHover = $('<img src="' + iconHoverUrl + '"/>');
        const iconStyle = {
            width: '28px',
            height: '28px',
            padding: '4px',
            margin: '0 12px 0 0',
            display: 'none',
        };
        $icon.css(iconStyle);
        $icon.css({display: 'block'});
        $iconHover.css(iconStyle);

        $menuItem.append($icon);
        $menuItem.append($iconHover);

        const itemLabel = chrome.i18n.getMessage('sendy');
        const $label = $('<div>' + itemLabel + '</div>');
        $label.css({
            flex: '1 1 auto',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            verticalAlign: 'middle',
            lineHeight: '28px',
        });
        $menuItem.append($label);

        let $activeItem = null;
        $menuItem.hover(function () {
            $(this).css({backgroundColor: '#1264a3'});
            $label.css({color: '#fff'});
            $icon.css({display: 'none'});
            $iconHover.css({display: 'block'});

            $activeItem = $menu.find('div.c-menu_item__li.c-menu_item__li--highlighted');
            if ($activeItem.length) {
                $activeItem.removeClass('c-menu_item__li--highlighted');
                const $button = $activeItem.find('button');
                if ($button.length) {
                    $button.removeClass('c-menu_item__button--highlighted');
                }
            }

        }, function () {
            $(this).css({backgroundColor: 'transparent'});
            $label.css({color: '#1d1c1d'});
            $icon.css({display: 'block'});
            $iconHover.css({display: 'none'});

            if ($activeItem && $activeItem.length) {
                $activeItem.addClass('c-menu_item__li--highlighted');
                const $button = $activeItem.find('button');
                if ($button.length) {
                    $button.addClass('c-menu_item__button--highlighted');
                }
            }
            $activeItem = null;
        });

        return $menuItem;
    }
    const onChildInserted = function (e) {
        if ($portal === null) return;

        const $element = $(e.target);
        const $menu = $element.find('div.c-menu__items');
        if ($menu.length) {
            $portal.off('DOMNodeInserted');
            $portal = null;

            const $menuItem = createMenuItem($menu);
            $menuItem.click(function () {
                const $overlay = $('.ReactModal__Overlay.ReactModal__Overlay--after-open');
                if ($overlay && $overlay.length) {
                    setTimeout(function() {
                        $overlay.click();
                    }, 100);
                }
                sendBackgroundMessage({type: 'click_slack'});
                loadEmbeddedWebapp('slack');
            });
            $menu.append($menuItem);
        }
    };
    const onNodeInserted = function (e) {
        $portal = $(e.target);
        $('body').off('DOMNodeInserted', portalSelector);
        $('body').on('DOMNodeRemoved', portalSelector, onNodeRemoved);
        $portal.on('DOMNodeInserted', onChildInserted);
    };
    const onFinishTask = function () {
        if ($portal !== null) {
            $portal.off('DOMNodeInserted');
            $portal = null;
        }
        $('body').off('DOMNodeRemoved', portalSelector);
        isButtonClicked = false;
    }
    const onNodeRemoved = function (e) {
        let $element = $(e.target);
        if (!$element.is(portalSelector)) {
            return;
        }
        onFinishTask();
    }
    let isButtonClicked = false;
    const onInputFileButtonClicked = function (e) {
        slackParentClass = $(this).parents().hasClass(slackSecondaryClass) ? slackSecondaryClass : slackPrimaryClass;
        if (!isButtonClicked) {
            isButtonClicked = true;
            $('body').on('DOMNodeInserted', portalSelector, onNodeInserted);
        }
    };
    $('body').on('click', buttonSelector, onInputFileButtonClicked);
}

function loadChatwork() {
    const css = {
        width: '16px',
        height: '16px',
    }
    const $button = createButton(css, () => {
        loadEmbeddedWebapp('chatwork');
    });
    const $li = $('<li/>');
    $li.append($button);
    setTimeout(() => {
        const $toolbar = $('ul#_chatSendTool');
        if ($toolbar.length) {
            $toolbar.append($li);
        }
    }, 500);
}

function createButton(css, onClick) {
    const icon = chrome.runtime.getURL('/images/rakuten-drive.svg');
    const title = chrome.i18n.getMessage('gmail_hover_title');
    const $button = $(`<div title="${title}"/>`);
    $button.css({
        ...css,
        background: `url(${icon}) no-repeat`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
        cursor: 'pointer',
    });
    $button.click(onClick);
    return $button;
}

function loadEmbeddedWebapp(service, composeView = null) {
    const create_attachment_tag_ele = function(data) {
        if (!data) {
            return null;
        }
        const $root = $('<div contentEditable="false"/>');
        $root.css({
            width: '412px',
            padding: '12px 12px 12px 12px',
        });
        const $title = $('<div/>');
        $title.css({
            height: '24px',
            width: '100%',
        });

        const $span = $('<span/>');
        const $img = $('<img/>');
        $img.attr({
            src: MAIL_LOGO_URL,
            alt: chrome.i18n.getMessage('extension_short_name'),
        });
        $img.css({
            width: '71px',
            height: '17px',
        });
        $span.append($img);
        $title.append($span);

        let $text = $('<span/>');
        $text.text(chrome.i18n.getMessage('attachments_title'));
        $text.css({
            display: 'inline-block',
            height: '100%',
            fontSize: '14px',
            lineHeight: '100%',
            verticalAlign: 'middle',
            color: '#495057',
            marginLeft: '4px',
        });
        $title.append($text);
        
        $root.append($title);

        const $content = $('<div/>');
        $content.css({
            width: '100%',
            //marginTop: '6px',
            borderRadius: '4px',
            border: '1px solid rgba(0, 20, 61, 0.08)',
            padding: '12px 12px 12px 12px',
        });
        if (data.file.summary) {
            $text = $('<div/>');
            $text.text(data.file.summary);
            $text.css({
                width: '100%',
                fontSize: '14px',
                lineHeight: '1.43',
                letterSpacing: '-0.4px',
                color: '#495057',
                overflowX: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                marginBottom: '4px',
            });
            $content.append($text);
        }
        
        $text = $('<div/>');
        const fileCount = data.file.count > 1 ? chrome.i18n.getMessage('more_files', [data.file.count - 1]) : null;
        const linkInfo = `${getFileSize(data.file.size)} • ${getExpirationTime(data.expires_at)}`;
        // + 42 files • 5.99 GB • 07h 28m left
        if (fileCount) {
            $text.text(`${fileCount} • ${linkInfo}`);
        } else {
            $text.text(linkInfo);
        }
        $text.css({
            width: '100%',
            fontSize: '12px',
            fontWeight: 'bold',
            lineHeight: '1.33',
            color: '#adb5bd',
        });
        $content.append($text);

        const $linkContainer = $('<div/>');
        $linkContainer.css({
            width: '100%',
            borderRadius: '4px',
            border: '1px solid rgba(0, 20, 61, 0.08)',
            backgroundColor: '#f8f9fa',
            marginTop: '16px',
            padding: '12px 12px 16px 12px',
            boxSizing: 'border-box',
        });
        const downloadText = chrome.i18n.getMessage('download_link');
        $text = $(`<div>${downloadText}</div>`);
        $text.css({
            fontSize: '14px',
            lineHeight: '1.14',
            color: '#495057',
        });
        $linkContainer.append($text);
        const linkText = data.link.replace(/(^\w+:|^)\/\//, '');
        const $link = $(`<a href=${data.link}>${linkText}</a>`);
        $link.css({
            fontSize: '14px',
            fontWeight: 'bold',
            lineHeight: '1.14',
            color: '#1255cc',
            marginTop: '8px',
        });
        $linkContainer.append($link);
        $content.append($linkContainer);
        
        $root.append($content);

        return $root.get(0);
    };

    function dispatchChangeEvent(element) {
        const evt = document.createEvent("Events");
        evt.initEvent("change", true, true);
        element.dispatchEvent(evt);
    }
    
    const show_modal = function(composeView) {
        var on_close, on_message, on_complete, remove_listener, create_modal,
            toggle_modal, close_modal, $sa_overlay, $sa_selector, $sa_content_wrap;

        on_complete = function(data) {
            if (service === 'gmail' && composeView && data) {
                const attachment = create_attachment_tag_ele(data);
                if (attachment) {
                    composeView.insertHTMLIntoBodyAtCursor(document.createElement('br'));
                    composeView.insertHTMLIntoBodyAtCursor(document.createElement('br'));
                    composeView.insertHTMLIntoBodyAtCursor(attachment);
                    composeView.insertHTMLIntoBodyAtCursor(document.createElement('br'));    
                }
            } else if (service === 'editable' && data && right_click_ele) {
                const input_id = right_click_ele.element;

                if (right_click_ele.insert_type === 'value') {
                    const $input = $(input_id)
                    if ($input.length) {
                        const text = $input.val();
                        $input.val(text + data.link + '\n');
                        if (window.location.hostname === 'www.chatwork.com') {
                            dispatchChangeEvent($input.get(0));
                        }    
                    }
                } else if(right_click_ele.insert_type === 'innerHTML') {
                    const text = $(input_id).text();
                    $(input_id).text(text + data.link + '\n');
                }

                $(input_id).focus();
            } else if (service === 'chatwork' && data) {
                const $input = $('textarea#_chatText');
                if ($input.length) {
                    const text = $input.val();
                    $input.val(`${text}${data.link}\n`);
                    dispatchChangeEvent($input.get(0));
                }
            } else if (service === 'slack' && data) {
                const $editor = $('.' + slackParentClass + ' div.ql-editor');
                if ($editor.length) {
                    const $input = $editor.find('p');
                    if ($input.length) {
                        const text = $input.text();
                        $input.text(text + data.link + '\n');
                    }
                    $editor.focus();
                }
            }
        };

        on_close = function() {
            if (!exist_modal) return;

            close_modal();
            remove_listener();

            if (right_click_ele) {
                const input = right_click_ele.element;
                if (input) {
                    $(input).focus();
                }
                right_click_ele = null;
            }
        };

        on_message = function(msg) {
            if (msg.source !== $sa_selector.contentWindow && !msg.data) return;

            var data = msg.data;

            if (data.type === 'send-link') {
                on_complete(data);
                //on_close();
            } else if (data.type === 'close-extension') {
                on_close();
            } else if (data.type === 'update-setting') {
                sendBackgroundMessage(data);
            }
        };

        create_modal = function() {
            if (exist_modal) return;

            $sa_overlay = document.createElement('div');
            $sa_content_wrap = document.createElement('div');
            $sa_selector = document.createElement('iframe');

            // overlay elem
            $sa_overlay.id = 'sa-overlay';
            $sa_overlay.style.position = 'fixed';
            $sa_overlay.style.background = '#FFF';
            $sa_overlay.style.zIndex = '2147483640';
            $sa_overlay.style.opacity = '.75';
            $sa_overlay.style.right = '0';
            $sa_overlay.style.left = '0';
            $sa_overlay.style.top = '0';
            $sa_overlay.style.bottom = '0';
            $sa_overlay.style.display = 'block';

            // content elem
            $sa_content_wrap.id = 'sa-content-wrap';
            $sa_content_wrap.style.position = 'fixed';
            $sa_content_wrap.style.zIndex = '2147483641';
            $sa_content_wrap.style.right = '0';
            $sa_content_wrap.style.left = '0';
            $sa_content_wrap.style.top = '50%';
            $sa_content_wrap.style.transform = 'translateY(-50%)';
            $sa_content_wrap.style.display = 'block';

            // iframe elem
            $sa_selector.id = 'sa-selector';
            $sa_selector.src = chrome.runtime.getURL(`/html/embedded_webapp.html?target=${service}`);
            $sa_selector.style.display = 'block';
            $sa_selector.style.height = '500px';
            $sa_selector.style.width = '400px';
            $sa_selector.style.margin = '0 auto';
            $sa_selector.style.border = '1px solid #d0d0d0';
            $sa_selector.style.boxShadow = 'rgba(123, 137, 148, .1) 0px 0px 10px 2px';
            $sa_selector.style.boxSizing = 'content-box';

            // append
            $sa_content_wrap.appendChild($sa_selector);
            document.body.appendChild($sa_overlay);
            document.body.appendChild($sa_content_wrap);

            // create complete
            exist_modal = true;
        };

        remove_listener = function() {
            window.removeEventListener('message', on_message, false);
        };

        toggle_modal = function(isShown) {
            messageToModal({type: 'change_modal_status', data: isShown});

            $sa_overlay = document.getElementById('sa-overlay');
            $sa_content_wrap = document.getElementById('sa-content-wrap');
            $sa_overlay.style.display = isShown ? 'block' : 'none';
            $sa_content_wrap.style.display = isShown ? 'block' : 'none';
        };

        close_modal = function() {
            $sa_overlay = document.getElementById('sa-overlay');
            $sa_content_wrap = document.getElementById('sa-content-wrap');

            document.body.removeChild($sa_overlay);
            document.body.removeChild($sa_content_wrap);

            $sa_overlay = null;
            $sa_content_wrap = null;
            $sa_selector = null;
            exist_modal = false;
        };

        function messageToModal(msgObj) {
            var selector = document.getElementById('sa-selector');

            if (selector) {
                selector.contentWindow.postMessage(msgObj, '*');
            }
        }

        if (exist_modal) {
            toggle_modal(true);
        } else {
            create_modal();
            window.addEventListener('message', on_message, false);
        }
    };

    show_modal(composeView);
}

function getFileSize(n) {
    if (n <= 1024) {
        return n + ' B';
    } else if (n <= 1024 * 1024) {
        return Math.round(n / 1024 * 100) / 100.0 + ' KB';
    } else if (n <= 1024 * 1024 * 1024) {
        return Math.round(n / 1024 / 1024 * 100) / 100.0 + ' MB';
    } else {
        return Math.round(n / 1024 / 1024 / 1024 * 100) / 100.0 + ' GB';
    }
}

function getExpirationTime(time) {
    const now = +new Date();
    const diff = Math.trunc(time - now / 1000);
    const hours = Math.trunc(diff / 3600);
    const remainedMinutes = Math.ceil((diff - hours * 60 * 60) / 60);

    if (diff < 0) {
        return 'expired';
    }

    return hours > 0
        ? chrome.i18n.getMessage('expiration_time_hm', [hours, remainedMinutes])
        : chrome.i18n.getMessage('expiration_time_m', [hours, remainedMinutes]);
}

function sendBackgroundMessage(msg, callback) {
    chrome.runtime.sendMessage(chrome.runtime.id, msg, function(res) {
        if (callback) callback(res);
    });
}

function holdRightClickElement() {
    right_click_ele = {
        'element' : curr_right_click_target,
        'insert_type' : (curr_right_click_target.is('textarea,input')) ? 'value' : 'innerHTML',
    };
}


chrome.runtime.onMessage.addListener(
    function(req, sender, sendResponse) {
        if (!(req && req.type)) return;

        if (req.type === 'load_embedded_webapp' && req.item === 'editable') {
            holdRightClickElement();
            loadEmbeddedWebapp('editable', null);
        }
    }
);

$('body').on('contextmenu', function(e) {
    var target = $(e.target);
    curr_right_click_target = target;
});

detectServiceHost(window.location.hostname);
