/*
 * InsertLearning JavaScript
 *
 */

// InsertLearning Namespace (using old "docent" namespace from DocentEDU)
var docent = {
    t0: Date.now(),
    init: function() {
        // Set textHighlighter defaults
        $.textHighlighter.defaults.highlightedClass = 'docent-highlighted';
        $.textHighlighter.defaults.color = '';

        // Inject stylesheets
        docent.insertStyles();

        // Create container and append it to page
        docent.container = $('<div />', {class: "docent"}).appendTo('body');

        // Build initial sidebar for the page
        docent.sidebar.build();

        // Show that InsertLearning is loading
        docent.util.loading.show();

        // Reformat old websites to be compatible with InsertLearning
        docent.util.reformatWithParagraphs();
        docent.util.markCertainDivsAsCompatible();

        // Wrap images so we can append there
        docent.util.wrapImages();

        // Get login iframe
        docent.iframeBridge();

        // Watch if InsertLearning gets detached
        docent.util.watch();
    },
    insertStyles: function() {
        if (window.location.host == 'docs.google.com') {
            docent.util.resizeImages();
            $(window).on('resize', docent.util.resizeImages);
        }
    },
    sidebar: {
        build: function () {
            // cancel if sidebar already exists
            if ($('.docent-sidebar').length > 0) {
                return false;
            }
            // Build sidebar and buttons within it
            var sidebar = $('<div />', {css: {left: 0}, class: 'docent-sidebar docent-shown docent-student'});

            function appendButton(docentClass, icon, title) {
                sidebar.append($('<div />', {class: 'docent-' + docentClass + ' docent-fa ' + icon, 'data-title': title}));
            }
            appendButton('sidebar-toggle', 'fa-caret-right');
            sidebar.append($('<div />', {class: 'docent-logo', 'data-title': 'Assign'}));
            appendButton('highlight', 'fa-pencil', 'Highlight Text');
            appendButton('sticky', 'fa-sticky-note', 'Insert a Sticky Note');
            appendButton('question', 'fa-question-circle', 'Insert a Question');
            appendButton('discussion', 'fa-comments', 'Insert a Discussion');
            //appendButton('dashboard', 'fa-dashboard', 'Go to Dashboard');
            sidebar.append($('<div />', {class: 'docent-options', 'data-title': 'More Options'}));
            appendButton('feedback', 'fa-support', 'Help and Support');

            sidebar.css('z-index', docent.maxZ() + 100);
            docent.container.append(sidebar);
            docent.sidebar.bindEvents();
            docent.comments.bindEvents();
            docent.notes.bindEvents();

            if (window.FastClick) FastClick.attach(sidebar[0]);
        },
        triggerGoogleAnalyticsEvent: function(label, isUnclick) {
            var msg = {
                type: 'ga',
                category: 'Toolbar Buttons',
                action: 'click',
                label: label
            };
            if (isUnclick) {
                msg.action = 'unclick'
            }
            docent.iframeBridge.postMessage(msg);
        },
        bindEvents: function() {
            var sidebar = $('.docent-sidebar');

            sidebar.on('click', '.docent-sidebar-toggle', function(event) {
                sidebar.animate({left: sidebar.hasClass('docent-shown') ? -50 : 0 });
                sidebar.toggleClass('docent-shown');
                
                docent.sidebar.triggerGoogleAnalyticsEvent('Toogle Toolbar ' + (sidebar.hasClass('docent-shown') ? '(show)' : '(hide)'));
            })
            .on('mouseenter', '[data-title]', function(event) {
                var speed = $(event.relatedTarget).is('[data-title]') ? 0 : docent.tooltip.__speed;
                docent.tooltip.show(event.target, speed);
            })
            .on('mouseleave click', '[data-title]', function(event) {
                docent.tooltip.hide(event.target);
            })
            .on('click', '[data-title]', function(event) {
                docent.sidebar.triggerGoogleAnalyticsEvent(this.dataset.title, $(this).hasClass('docent-on'));
            })
            .on('click', '.docent-logo', function(event) {
                if (!$(this).hasClass('docent-logged-in')) {
                    docent.iframeBridge.showIframe();
                }
                else {
                    var msg = {
                        type: 'showSettings'
                    };
                    docent.iframeBridge.postMessage(msg);

                    docent.iframeBridge.showIframe();
                }
            })
            .on('touchstart mousedown', '.docent-highlight,.docent-sticky,.docent-question,.docent-discussion', function(event) {
                var sel = document.getSelection();
                if (sel.rangeCount > 0 && !sel.isCollapsed) {
                    docent.__range = sel.getRangeAt(0);
                }
            })
            .on('click', '.docent-highlight', function(event) {
                var $this = $(this);
                var range = docent.__range || false;
                $('.docent-on').not(this).click();
                var msg = {
                    type: 'ga',
                    category: 'Highlights',
                    action: 'select text'
                };
                if ($this.hasClass('docent-on')) {
                    $('body').getHighlighter().destroy();
                }
                else if (range) {
                    var cancel;
                    if (range.toString().length > 1000) {
                        cancel = !confirm("That's a lot of text. Are you sure you want to highlight all of it?");
                    }
                    delete docent.__range;
                    if (cancel) {
                        return false;
                    }
                    var highlights = docent.notes.makeFromRange({
                        range: range
                    });
                    docent.notes.save();
                    document.getSelection().removeAllRanges();
                    var $highlight = $(highlights[0]);
                    docent.comments.showComment($highlight);
                    docent.comments.showColorSwitcher($highlight);
                    msg.label = 'before toolbar click';
                    docent.iframeBridge.postMessage(msg);
                    return;
                }
                else {
                    $('body').textHighlighter({
                        onBeforeHighlight: function(range) {
                            if (range.toString().length > 1000) {
                                return confirm("That's a lot of text. Are you sure you want to highlight all of it?");
                            }
                            return true;
                        },
                        onAfterHighlight: function(highlights, rangeText) {
                            $(highlights).each(function() {
                                this.id = docent.util.ObjectID();
                            });
                            docent.notes.save();
                            var $highlight = $(highlights[0]);
                            docent.comments.showComment($highlight);
                            docent.comments.showColorSwitcher($highlight);
                            msg.label = 'after toolbar click';
                            docent.iframeBridge.postMessage(msg);
                        }
                    });
                }
                $this.toggleClass('docent-on');
            })
            .on('click', '.docent-sticky,.docent-question,.docent-discussion', function(event) {
                var $this = $(this);
                $('.docent-on').not(this).click();

                var elementType = $this.hasClass('docent-sticky') ? 'sticky' : ($this.hasClass('docent-question') ? 'question' : 'discussion');

                // toggles between adding event handlers and removing them
                var method = $this.hasClass('docent-on') ? 'off' : 'on';

                $('body')
                    [method]('mouseenter', 'p,li,.docent-compatible', docent[elementType + 's'].accentParagraph)
                    [method]('click', 'p,li,.docent-compatible', docent[elementType + 's']['add' + docent.elements.capitalizeType(elementType)]);

                $this.toggleClass('docent-on');

                if (docent.__range && method == 'on') {
                    //docent.notes.hintAnimation();
                    /**/
                    var string = 'Now click on a paragraph to insert a ' + elementType;
                    if (elementType == 'sticky') {
                        string += ' note';
                    }
                    docent.util.showNews(string);
                    /**/
                    //$(docent.__range.endContainer).closest('p,li,.docent-compatible').click();
                    delete docent.__range;
                }
            })
            .on('click', '.docent-dashboard', function(event) {
                if (docent.dashboard) {
                    docent.dashboard.close();
                }
                docent.dashboard = window.open(docent.baseURL.dashboard, '_blank', null);
            })
            .on('click', '.docent-options', function(event) {
                var msg = {
                    type: 'showOptions'
                };
                docent.iframeBridge.postMessage(msg);

                docent.iframeBridge.showIframe();
            })
            .on('click', '.docent-feedback', function(event) {
                var msg = {
                    type: 'showHelpCenter'
                };
                docent.iframeBridge.postMessage(msg);

                docent.iframeBridge.showIframe();
            });
            // Re-enable clicking on world.mathigon.org
            if (window.location.host == 'world.mathigon.org') {
                $('body').on('mousedown', function(event) { event.type = 'click'; $('body').trigger(event); });
            }
            // Re-enable user-select on www.frontera.info
            if (window.location.host == 'www.frontera.info') {
                $('#page_content').css('user-select', '').removeAttr('unselectable').off('selectstart');
            }
        }
    },
    tooltip: {
        show: function(element, speed) {
            if (typeof speed != 'number') {
                speed = docent.tooltip.__speed;
            }
            docent.tooltip.__timer = setTimeout(function() {
                var $element = $(element);
                var offset = $element.offset();
                var $tooltip = $('<div>', {
                    class: 'docent-tooltip',
                    text: element.dataset.title,
                    css: {
                        top: offset.top - $(window).scrollTop() + 3,
                        left: offset.left + $element.width() + 10,
                        'z-index': docent.maxZ()
                    }
                });
                docent.container.append($tooltip);
            }, speed);
        },
        hide: function(element) {
            clearTimeout(docent.tooltip.__timer);
            $('.docent-tooltip').filter(function() {
                return this.textContent == element.dataset.title;
            }).remove();
        },
        __speed: 0,
        __timer: null
    },
    notes: {
        bindEvents: function() {
            // should docent.comments.bindEvents() go here?
            
            // 'selectstart' fixes nytimes "no highlighting" issue
            // 'mousedown' fixes washington post "no highlighting"
            $('p,li,.docent-compatible').on('selectstart mousedown', function(event) {
                preventHijacking(event);
                // fix "highlight all" bug (part 1)
                $('.docent-highlight-color,.docent-unhighlight,.docent-element-comment').css('pointer-events', 'none');
            });
            // prevent swipe navigation while highlighting
            $('body').on('mousemove', preventHijacking);
            
            // fix "highlight all" bug (part 2, comment UI need to become clickable again)
            $('body').on('mouseup mouseleave', function(event) {
                $('.docent-highlight-color,.docent-unhighlight,.docent-element-comment').css('pointer-events', '');
            });
            
            function preventHijacking(event) {
                if ($('.docent-highlight').hasClass('docent-on')) {
                    event.stopImmediatePropagation();
                }
            }
        },
        hintAnimation: function() {
            $('.docent-highlight')
                .animate({'font-size': '27px' }, 200)
                .animate({'font-size': '25px' }, 200)
                .animate({'font-size': '27px' }, 200)
                .animate({'font-size': '25px' }, 200);
        },
        remove: function($highlight, saveChanges) {
            if ($highlight.index() == -1) {
                $highlight = $('.docent-highlighted#' + $highlight.attr('id'));
            }
            // Get highlighter object
            var highlighter = $('body').textHighlighter().getHighlighter();
            // Remove $this highlight
            highlighter.removeHighlights($highlight);
            if (saveChanges) docent.notes.save();
            // Clean up highlighter
            if (!$('.docent-highlight').hasClass('docent-on')) {
                highlighter.destroy();
            }
        },
        changeColor: function($highlight) {
            if ($highlight.index() == -1) {
                $highlight = $('.docent-highlighted#' + $highlight.attr('id'));
            }
            var possibleColors = ['green', 'cyan'];
            var index = possibleColors.indexOf($highlight.attr('data-color')) + 1;
            if (possibleColors.length <= index) {
                $highlight.removeAttr('data-color');
            }
            else {
                $highlight.attr('data-color', possibleColors[index]);
            }
            docent.notes.save();
        },
        asObjects: function(asArrays) {
            if (typeof asArrays === 'string') {
                asArrays = JSON.parse(asArrays);
            }
            var asObjects = [];
            for (var i=0, l=asArrays.length; i<l; ++i) {
                var $span = $(asArrays[i][0]);
                // Skip highlights by other people
                if ($span.is('.docent-not-owner')) {
                    continue;
                }
                var comment = $span.attr('data-docent-comment');
                var noteObject = {
                    text: asArrays[i][1],
                    ref: asArrays[i][2],
                    start: asArrays[i][3],
                    length: asArrays[i][4]
                };
                if (comment) {
                    noteObject.comment = comment;
                }
                // DOM reference check
                var ref_check = [];
                var ref = noteObject.ref.split(':');
                var node = document.body;
                for (var j=0, n=ref.length; j<n && node; ++j) {
                    ref_check.push(node.childNodes.length);
                    node = node.childNodes[ref[j]];
                }
                noteObject.ref_check = ref_check.join(':');
                
                var $parent = $(node).parent();

                noteObject.md5 = docent.util.MD5($parent);
                noteObject.md5_v2 = docent.util.MD5($parent, true);

                noteObject.id = $span.attr('id') || docent.util.ObjectID();
                noteObject.color = $span.attr('data-color');

                asObjects.push(noteObject);
            }
            return asObjects;
        },
        getRange: function($elements) {
            var results = [];
            if (typeof $elements === 'number') {
                $elements = $('.docent-highlighted').eq($elements);
            }
            else if (typeof $elements === 'undefined') {
                $elements = $('.docent-highlighted');
            }
            else if ($elements instanceof jQuery) {
                $elements = $elements.filter('.docent-highlighted');
            }
            else {
                return [];
            }
            $elements.each(function() {
                var $this = $(this);
                var comment = $this.attr('data-docent-comment');
                var className = this.className;
                var node = this.childNodes[0];
                if (!node) {
                    $this.remove();
                    return;
                }
                var range = document.createRange();
                $(node).unwrap();
                range.selectNode(node);
                node.parentNode.normalize();
                var data = {
                    range: range,
                    comment: comment,
                    class: className,
                    id: this.id,
                    color: this.dataset.color
                };
                results.push(data);
            });
            return results;
        },
        makeFromRange: function(data) {
            var results = [];
            if (Array.isArray(data)) {
                for (var i=0, l=data.length; i<l; ++i) {
                    results = results.concat(docent.notes.makeFromRange(data[i]));
                }
            }
            else if (data.range) {
                var highlighter = $('body').textHighlighter().getHighlighter();
                var options = $.extend(true, {}, highlighter.options);
                if (data.class) {
                    options.highlightedClass = data.class;
                }
                var $wrapper = $.textHighlighter.createWrapper(options).attr('id', data.id || docent.util.ObjectID());
                if (data.comment) {
                    $wrapper.addClass('docent-hasComment').attr('data-docent-comment', data.comment);
                }
                if (data.color) {
                    $wrapper.attr('data-color', data.color);
                }
                var createdHighlight = highlighter.highlightRange(data.range, $wrapper);
                results = results.concat(highlighter.normalizeHighlights(createdHighlight));
                if (!$('.docent-highlight').hasClass('docent-on')) {
                    highlighter.destroy();
                }
            }
            return results;
        },
        save: function() {
            var isTeacher = !!$('.docent-teacher').length;
            // Store student highlights
            if (isTeacher) {
                var studentNotes = docent.notes.getRange($('.docent-highlighted.docent-not-owner'));
            }
            // Get highlighter object
            var highlighter = $('body').textHighlighter().getHighlighter();
            // Get JSON representation of notes
            var notes = highlighter.serializeHighlights();
            // Convert arrays to objects for saving on server
            notes = docent.notes.asObjects(notes);
            // Post notes to server if user is logged in
            if ($('.docent-logged-in').length != 0) {
                var msg = {
                    type: 'postNotes',
                    notes: notes,
                    forPath: window.location.pathname
                };
                docent.iframeBridge.postMessage(msg);
            }
            // Clean up highlighter
            if (!$('.docent-highlight').hasClass('docent-on')) {
                highlighter.destroy();
            }
            // Restore student highlights
            if (isTeacher) {
                docent.notes.makeFromRange(studentNotes);
            }
        },
        load: function(notes, isOwner) {
            if (notes) {
                var options = $.extend(true, {}, $.textHighlighter.defaults);
                if (!isOwner) {
                    options.highlightedClass += ' docent-not-owner';
                }
                for (var i=0, l=notes.length; i<l; ++i) {
                    var $span = $.textHighlighter.createWrapper(options);
                    if (notes[i].comment) {
                        $span.addClass('docent-hasComment').attr('data-docent-comment', notes[i].comment);
                    }
                    if (notes[i].color) {
                        $span.attr('data-color', notes[i].color);
                    }
                    $span.attr('id', notes[i].id || docent.util.ObjectID());

                    var textNode = docent.util.apply_ref_check(notes[i], true);
                    if (textNode) {
                        var paragraph = textNode.parentNode;
                        $(textNode).wrap($span);
                        if (paragraph) paragraph.normalize();
                    }
                }
            }
        },
    },
    //// will be merged into notes when the new highlight/comment system is designed
    comments: {
        bindEvents: function() {
            $('body').on('click', '.docent-highlighted', function(event) {
                var $this = $(this);
                if (docent.comments.hideComment(event)) {
                    if (!$this.is('.docent-not-owner')) {
                        docent.comments.showComment($this);
                        docent.comments.showColorSwitcher($this);
                        docent.comments.showUnhighlightButton($this);
                    }
                    else if ($this.is('.docent-hasComment')) {
                        docent.comments.showComment($this);
                    }
                }
            }).on('click', '.docent-element-comment', function(event) {
                var $this = $(this);
                var $note = $('.docent-highlighted#' + $this.attr('data-highlight-id'));
                if (!$note.hasClass('docent-not-owner')) {
                    docent.comments.makeModal($note);
                    clearTimeout($this.attr('data-timer'));
                    docent.comments.triggerGoogleAnalyticsEvent($note.hasClass('docent-hasComment') ? 'Edit Comment' : 'Add Comment');
                }
            }).on('click', docent.comments.hideComment);

            $(window).on('resize', function(event) {
                $('.docent-element-comment').each(function() {
                    var $this = $(this);
                    var $note = $('.docent-highlighted#' + $this.attr('data-highlight-id'));
                    $this.css(docent.comments.calculateCommentCSS($note));
                });
                $('.docent-unhighlight,.docent-highlight-color').each(function() {
                    var $this = $(this);
                    var $note = $('.docent-highlighted#' + $this.attr('data-highlight-id'));
                    $this.css({
                        left: $note.offset().left + ($this.is('.docent-unhighlight') ? $note.outerWidth() : 0),
                        top: $note.offset().top
                    });
                });
            });
        },
        addComment: function($note, comment) {
            if (comment !== null) {
                if ($note.index() == -1) {
                    $note = $('.docent-highlighted#' + $note.attr('id'));
                }
                $note[comment ? 'addClass' : 'removeClass']('docent-hasComment');
                $note.attr('data-docent-comment', comment);
                docent.comments.save();
                var highlightID = $note.attr('id');
                var $comment = $('.docent-element-comment').filter(function() {
                    return this.dataset.highlightId == highlightID;
                });
                $comment.text(comment);
                if (docent.emoji) {
                    docent.emoji.parse($comment);
                }
                $comment[comment ? 'removeClass' : 'addClass']('docent-fa fa-plus');
                $comment.css(docent.comments.calculateCommentCSS($note));
                clearTimeout($comment.attr('data-timer'));
            }
        },
        showComment: function($note) {
            var $comment = $('<div />', {
                class: 'docent-element-comment' + ($note.hasClass('docent-hasComment') ? '' : ' docent-fa fa-plus'),
                text: $note.attr('data-docent-comment'),
                'data-highlight-id': $note.attr('id'),
                css: docent.comments.calculateCommentCSS($note)
            })
            .appendTo(docent.container).fadeIn(function() {
                docent.comments.checkCommentForURLs();
            });
            if (docent.emoji) {
                docent.emoji.parse($comment);
            }
        },
        calculateCommentCSS: function($note) {
            var rectangles = $note[0].getClientRects();
            var rect = rectangles[rectangles.length - 1];
            
            var data = {
                top: rect.bottom + $(window).scrollTop() - 2,
                left: Math.max(rect.left - 10, 5),
                right: '',
                'margin-left': '',
                'margin-right': '',
                'min-width': rect.width,
                'max-width': 250,
                'cursor': '',
                'z-index': docent.maxZ()
            };
            if (data.left + data['max-width'] > window.innerWidth) {
                data.right = window.innerWidth - data.left - data['min-width'] - 20;
                if (data.left <= data.right) {
                    data.right = '';
                    data['margin-right'] = 5;
                }
                else {
                    data.left = '';
                    data['margin-left'] = 5;
                }
            }
            if (!$note.hasClass('docent-hasComment')) {
                data['min-width'] = '';
                data['max-width'] = '';
                if (data.left) data.left += rect.width - 10;
                data.top += 2;
            }
            if (!$note.hasClass('docent-not-owner')) {
                data.cursor = 'pointer';
            }
            docent.comments.cssCorrectionForNonStaticBody(data);
            return data;
        },
        cssCorrectionForNonStaticBody: function(data) {
            var $body = $(document.body);
            if ($body.css('position') != 'static') {
                var offset = $body.offset();
                data.top -= offset.top;
                if (data.left) data.left -= offset.left;
            }
        },
        checkCommentForURLs: function() {
            var $element = $('.docent-element-comment');
            var html = $element.html();
            var words = html.split(' ');
            for (var i=0; i<words.length; ++i) {
                var nextIndex = $.inArray(words[i], words, i+1);
                while (nextIndex != -1) {
                    words.splice(nextIndex, 1);
                    nextIndex = $.inArray(words[i], words, i+1);
                }
                if (/\./.test(words[i]) && $('.docent-logged-in').length != 0) {
                    var msg = {
                        type: 'checkURL',
                        url: words[i]
                    };
                    docent.iframeBridge.postMessage(msg);
                }
            }
        },
        hideComment: function(event) {
            var $target = $(event.target);
            var $comments = $('.docent-element-comment');
            var $comment = $comments.eq(0);
            var $unhighlight = $('.docent-unhighlight').eq(0);
            var highlightID = $comment.length ? $comment.attr('data-highlight-id') : $unhighlight.attr('data-highlight-id');
            var $note = $('.docent-highlighted#' + highlightID);
            var $commentModal = $('.docent-comment-modal');
            var $highlightColorButtons = $('.docent-highlight-color');
            var $highlightColor = $highlightColorButtons.eq(0);
            if ($target.is($comment) || $target.is($note) || $commentModal.find($target).addBack($target).length || $target.parent().is($comment) || $target.is($highlightColor)) {
                return false;
            }
            else {
                if (!$unhighlight.is(':visible') && !$note.hasClass('docent-not-owner')) {
                    $comments.each(function(i, el) {
                        var $el = $(el).add($highlightColorButtons[i]);
                        var done = function(event) {
                            if (event && ($el.is(event.target) || $(event.target).closest('.docent-comment-modal').length)) return;
                            clearTimeout($el.attr('data-timer'));
                            $el.fadeOut(function() {
                                $(this).remove();
                            });
                            $('body').off('click', done);
                        };
                        if (i == $comments.length - 1 && $el.text() == '') {
                            $el.attr('data-timer', setTimeout(done, 2000));
                            $('body').on('click', done);
                        }
                        else done();
                    });
                }
                else {
                    $comment.add($highlightColor).fadeOut(function() {
                        $(this).remove();
                    });
                }
                $unhighlight.filter(function() { return this.dataset.highlightId == highlightID; }).fadeOut(function() {
                    $(this).remove();
                });
                return true;
            }
        },
        makeModal: function($note) {
            $note = $note || $('.docent-highlighted').eq(0);
            var $modal = $('<div>', {
                class: 'docent-comment-modal'
            });
            var $wrapper = $('<div>', {
                class: 'docent-comment-wrapper'
            });
            var $p = $('<p>', {
                class: 'docent-comment-p',
                text: 'Enter comment:'
            });
            var $input = $('<input>', {
                class: 'docent-comment-input',
                value: $note.attr('data-docent-comment')
            })
            .on('keydown', function(event) {
                switch (event.which) {
                    // Enter
                    case 13:
                        $ok.click();
                        break;
                    // Esc
                    case 27:
                        $cancel.click();
                        break;
                    // Spacebar
                    case 32:
                        if (event.ctrlKey && event.metaKey && docent.emoji) {
                            docent.emoji.emojiKeyboard($modal);
                            event.preventDefault();
                        }
                        break;
                }
                event.stopPropagation();
            })
            .on('keyup keypress', function(event) {
                event.stopPropagation();
            });
            var $cancel = $('<button>', {
                type: 'button',
                class: 'docent-comment-cancel',
                text: 'Cancel'
            })
            .on('click', function() {
                docent.comments.removeModal($modal);
            });
            var $ok = $('<button>', {
                type: 'button',
                class: 'docent-comment-ok',
                text: 'OK'
            })
            .on('click', function() {
                var comment = $input.val();
                docent.comments.addComment($note, comment);
                docent.comments.removeModal($modal);
            });
            $wrapper.append($p, $input, $cancel, $ok);
            $modal.append($wrapper).appendTo(docent.container).fadeIn(100).css('z-index', docent.maxZ());
            if (docent.emoji) {
                //docent.emoji.emojiKeyboard($modal);
                var $toggleEmoji = $('<button>', {
                    type: 'button',
                    class: 'docent-comment-toggle-emoji',
                    html: '<i class="docent-fa fa-smile-o"></i>'
                })
                .on('click', function(event) {
                    var $this = $(this);
                    $this.toggleClass('docent-toggled');
                    if ($this.hasClass('docent-toggled')) {
                        docent.emoji.emojiKeyboard($modal);
                        docent.comments.triggerGoogleAnalyticsEvent('Show Emoji Panel');
                    }
                    else {
                        $('.docent-emoji-keyboard,.docent-emoji-controls').remove();
                        docent.comments.triggerGoogleAnalyticsEvent('Hide Emoji Panel');
                    }
                });
                $wrapper.append($toggleEmoji);
            }
            $input.select();
        },
        removeModal: function($modal) {
            $modal = $modal || $('.docent-comment-modal');
            $modal.fadeOut(100, function() {
                $modal.remove();
            });
        },
        // hideUnhighlightButton is in comments.hideComment
        // the unhighlight button is resized in a handler attached in comments.bindEvents
        // this function is attached in comments.bindEvents
        showUnhighlightButton: function($note) {
            var rectangles = $note[0].getClientRects();
            var rect = rectangles[rectangles.length - 1];
            var data = $.extend({}, rect);
            data.left = data.right;
            docent.comments.cssCorrectionForNonStaticBody(data);
            
            var $unhighlightButton = $('<div />', {
                class: 'docent-unhighlight docent-fa fa-trash',
                'data-highlight-id': $note.attr('id'),
                css: {
                    left: data.left,
                    top: data.top + $(window).scrollTop(),
                    'z-index': docent.maxZ() + 10
                }
            })
            .on('click', function(event) {
                docent.notes.remove($note, true);
                docent.comments.triggerGoogleAnalyticsEvent('Unhighlight');
            })
            .appendTo(docent.container).fadeIn();
        },
        showColorSwitcher: function($note) {
            var rectangles = $note[0].getClientRects();
            var rect = rectangles[0];
            var data = $.extend({}, rect);
            docent.comments.cssCorrectionForNonStaticBody(data);
            
            $('<div />', {
                class: 'docent-highlight-color docent-fa fa-paint-brush',
                'data-highlight-id': $note.attr('id'),
                css: {
                    left: data.left,
                    top: data.top + $(window).scrollTop(),
                    'z-index': docent.maxZ() + 10
                }
            })
            .on('click', function(event) {
                docent.notes.changeColor($note);
                clearTimeout(this.dataset.timer);
                docent.comments.triggerGoogleAnalyticsEvent('Change Color');
            })
            .appendTo(docent.container).fadeIn();
        },
        triggerGoogleAnalyticsEvent: function(label) {
            var msg = {
                type: 'ga',
                category: 'Highlight Buttons',
                action: 'click',
                label: label
            };
            docent.iframeBridge.postMessage(msg);
        },
        // Comments attach to notes.
        // This means docent.notes.save() will also save comments
        save: function() {
            docent.notes.save.apply(this, arguments);
        },
        // and docent.notes.load() will load comments as well.
        load: function() {
            docent.notes.load.apply(this, arguments);
        }
    },
    // This section is a shared group of methods for the elements (stickys, questions, discussions) that append to the end of a paragraph.
    // The specific element type will call these methods and then do additional things as necessary
    elements: {
        accentParagraph: function(elementType, event) {
            if (event.type == 'mouseenter' || event.type == 'dragenter') {
                var leaveEvent = event.type.replace('enter', 'leave');
                var $this = $(event.target).closest('p,li,.docent-compatible');
                // prevent weird Google Doc glitch with spacer paragraphs of fixed height
                if ($this.text() == '' && $this.has('img').length == 0) {
                    return false;
                }
                $this.addClass('docent-' + elementType + '-anchor');
                $this.one(leaveEvent, function(event) {
                    $this.removeClass('docent-' + elementType + '-anchor');
                });
            }
        },
        constructElement: function(elementType, element) {
            var $element = $('<docent-element class="docent-element-' + elementType + '" />');
                $element.append('<docent-element class="docent-element-' + elementType + '-content needsclick" contenteditable="true">' + element.text + '</docent-element>');

            $element.attr('data-ref', element.ref);
            $element.attr('data-ref-check', element.ref_check);
            var newElement = false;
            // this would be a new element
            if (!element.created) {
                element.created = Date.now();
                element.modified = element.created;
                newElement = true;
            }
            $element.attr('data-element-id', element._id && element._id.$id);
            $element.attr('data-created', element.created);
            $element.attr('data-modified', element.modified);

            if (element.md5) {
                $element.attr('data-md5', element.md5);
            }
            if (element.md5_v2) {
                $element.attr('data-md5-v2', element.md5_v2);
            }
            if (docent.isPDF && element.top && element.left) {
                $element.css({
                    position: 'absolute',
                    top: element.top,
                    left: element.left
                })
                .addClass('docent-collapsed');
            }

            if (newElement) {
                $element.attr('data-nonce', docent.util.ObjectID());
                docent.elements.saveOne(elementType, $element);
            }

            docent[elementType + 's']['bindEventsTo' + this.capitalizeType(elementType)]($element);

            // prevent website from hijacking typing and clicking
            $element.on('keydown keyup keypress mousedown mouseup', function(event) {
                event.stopPropagation();
            });
            // fix nytimes "no typing" issue
            $element.on('touch', '[contenteditable="true"]', function(event) {
                if (!window.inappbrowser || inappbrowser.platformId != 'ios') {
                    $(this).focus();
                }
            }).on('selectstart', '[contenteditable="true"]', function(event) {
                event.stopImmediatePropagation();
            });
            // fix booksthatgrow "no typing" issue and Google Sites loss of focus
            if (location.host == 'app.booksthatgrow.com' || location.host == 'sites.google.com') {
                $element.on('click', '[contenteditable="true"]', function(event) {
                    event.stopPropagation();
                });
            }
            // fix Google Drive PDF focus hijacking
            if (docent.isPDF) {
                $element.on('mousedown mouseup', function(event) {
                    event.stopPropagation();
                });
            }
            
            // prototype custom content
            if (window.location.host == 'www.okeebo.com') {
                $element.attr('contenteditable', 'false');
            }

            return $element;
        },
        addElement: function(elementType, event, text, returnEarlyWithElement) {
            var $node = $(event.target).closest('p,li,.docent-compatible');
            var node = $node[0];
            var ref = [];
            var ref_check = [];
            while (node && !$(node).is('body')) {
                ref.unshift($(node.parentNode.childNodes).index(node));
                node = node.parentNode;
                ref_check.unshift(node.childNodes.length);
            }
            ref = ref.join(':');
            ref_check = ref_check.join(':');

            var element = {
                text: text,
                ref: ref,
                ref_check: ref_check,
                md5: docent.util.MD5($node),
                md5_v2: docent.util.MD5($node, true)
            };
            if (docent.isPDF) {
                var pageOffset = $node.offset();
                element.top = event.clientY - pageOffset.top - 15;
                element.left = event.clientX - pageOffset.left;
            }
            // Will call elementType's construct method
            // Example: docent.questions.constructQuestion()
            var $newElement = docent[elementType + 's']['construct' + this.capitalizeType(elementType)](element, true);

            $node.append($newElement).removeClass('docent-' + elementType + '-anchor').each(docent.util.setHeightToAuto);
            
            // If the returnEarlyWithElement flag is set, then we're using $newElement for something else
            // In that case we probably don't want the standard side-effects, hence the early return
            if (returnEarlyWithElement) {
                return $newElement;
            }

            $('body').off('mouseenter', 'p,li,.docent-compatible', docent[elementType + 's'].accentParagraph)
                .off('click', 'p,li,.docent-compatible', docent[elementType + 's']['add' + this.capitalizeType(elementType)]);
            $('.docent-' + elementType).removeClass('docent-on');
            
            var msg = {
                type: 'ga',
                category: this.capitalizeType(elementType) + ' Anchors',
                action: 'click'
            };
            if (event.currentTarget) {
                msg.label = (event.currentTarget.tagName || '').toLowerCase();
            }
            docent.iframeBridge.postMessage(msg);
            
            var newScrollTop = $newElement.offset().top + Math.min($newElement.outerHeight() - window.innerHeight + 15, -15);
            if ($(window).scrollTop() < newScrollTop) {
                $('html,body').animate({
                    scrollTop: newScrollTop
                });
            }
            
            $newElement.find('.docent-element-' + elementType + '-content').focus();

            event.stopImmediatePropagation();
            event.preventDefault();
        },
        setFocusCallback: function(inputSelector, $element, focusCallback) {
            $element.on('focus', inputSelector, function(event) {
                var $this = $(this);
                if ($this.parent().hasClass('docent-can-reply') && typeof focusCallback === 'function') {
                    focusCallback($this);
                }
            });
        },
        setBlurCallback: function(inputSelector, $element, blurCallback) {
            $element.on('blur', inputSelector, function(event) {
                var $this = $(this);
                if (typeof blurCallback === 'function') blurCallback($this);
            });
        },
        capitalizeType: function(elementType) {
            return elementType.slice(0,1).toUpperCase() + elementType.slice(1);
        },
        deleteOne: function(elementType, $element) {
            $element.remove();
            var msg = {
                ref: $element.attr('data-ref'),
                created: $element.attr('data-created'),
                elementID: $element.attr('data-element-id'),
                type: 'deleteElement',
                elementType: elementType,
                forPath: window.location.pathname
            };
            docent.iframeBridge.postMessage(msg);
        },
        saveOne: function(elementType, $element) {
            var msg = {
                text: $element.children('.docent-element-' + elementType + '-content').html(),
                ref: $element.attr('data-ref'),
                ref_check: $element.attr('data-ref-check'),
                created: $element.attr('data-created'),
                modified: $element.attr('data-modified'),
                elementID: $element.attr('data-element-id'),
                md5: $element.attr('data-md5'),
                md5_v2: $element.attr('data-md5-v2'),
                nonce: $element.attr('data-nonce'),
                type: 'postElement',
                elementType: elementType,
                forPath: window.location.pathname
            };
            if (elementType == 'question') {
                msg.score = $element.children('.docent-element-question-score').text();
            }
            if (docent.isPDF) {
                msg.top = $element.css('top');
                msg.left = $element.css('left');
            }
            docent.iframeBridge.postMessage(msg);
        },
        save: function(elementType) {
            $('.docent-element-' + elementType).each(function() {
                docent[elementType + 's'].saveOne($(this));
            });
        },
        load: function(__elementType, elements, isOwner) {
            if (elements && typeof elements === 'string') {
                elements = JSON.parse(elements);
            }
            if (elements) {
                for (var i=0, l=elements.length; i<l; ++i) {
                    var elementType = __elementType || elements[i].elementType;
                    var $element = docent[elementType + 's']['construct' + this.capitalizeType(elementType)](elements[i], isOwner);
                    if (!isOwner) {
                        $element.addClass('docent-not-owner');
                        $element.children('.docent-element-sticky-content').removeAttr('contenteditable');
                        $element.children('.docent-element-question-score').removeAttr('contenteditable').css('display', 'block').html(function() {
                            return $(this).text();
                        });
                    }
                    var node = docent.util.apply_ref_check(elements[i]);

                    var duplicateElements = $('.docent-element-' + elementType).filter(function() {
                        var $this = $(this);
                        return ($this.attr('data-ref') == elements[i].ref && $this.attr('data-created') == elements[i].created);
                    });
                    var test = true;
                    duplicateElements.each(function() {
                        if (elements[i].responses && elements[i].responses.length > $(this).find('.docent-element-discussion-responses').length - 1) {
                            return true;
                        }
                        if ($(this).attr('data-modified') >= elements[i].modified) {
                            test = false;
                            return false;
                        }
                    });
                    if (test) {
                        duplicateElements.remove();
                        $(node).append($element);
                        $element.addClass('docent-can-reply');
                    }
                    else if (elements[i]._id) {
                        duplicateElements.attr('data-element-id', elements[i]._id.$id);
                    }
                }
            }
        }
    },
    stickys: {
        accentParagraph: function(event) {
            docent.elements.accentParagraph('sticky', event);
        },
        constructSticky: function(sticky) {
            // Backwards compatibility for old placeholder method
            if (sticky.text == docent.stickys.placeholderText) {
                sticky.text = '';
            }
            var $sticky = docent.elements.constructElement('sticky', sticky);
                $sticky.prepend('<docent-element class="docent-element-sticky-delete"><i class="docent-fa fa-times"></i></docent-element>');
            
            $sticky.children('.docent-element-sticky-delete').after($('<docent-element>', {
                class: 'docent-element-sticky-video',
                html: '<i class="docent-fa fa-video-camera">'
            }));

            if (docent.experimental) {
                $sticky.children('.docent-element-sticky-video').after($('<docent-element>', {
                    class: 'docent-element-sticky-size',
                    html: '<i class="docent-fa fa-expand">'
                }));
            }

            return $sticky;
        },
        addSticky: function(event) {
            docent.elements.addElement('sticky', event, '');
        },
        triggerGoogleAnalyticsEvent: function(label) {
            var msg = {
                type: 'ga',
                category: 'Sticky Note Buttons',
                action: 'click',
                label: label
            };
            docent.iframeBridge.postMessage(msg);
        },
        bindEventsToSticky: function($sticky) {
            var delaySave = false;
            docent.elements.setBlurCallback('.docent-element-sticky-content', $sticky, function() {
                $sticky.attr('data-modified', Date.now());
                if (!delaySave) docent.stickys.saveOne($sticky);
            });
            $sticky.on('paste', '.docent-element-sticky-content', function(event) {
                var $this = $(this);
                var insertNode = function($node) {
                    event.preventDefault();
                    try {
                        var sel = document.getSelection();
                        var range = sel.getRangeAt(0);
                        range.deleteContents();
                        /*
                        range.insertNode($node[0]);
                        */
                        $($node.get().reverse()).each(function() {
                            range.insertNode(this);
                        });
                        range.collapse(true);
                    }
                    catch(e) {
                        console.log(e);
                        $this.append($node);
                    }
                };
                var clipboardData = '';
                if (window.clipboardData) clipboardData = window.clipboardData.getData('text');
                if (clipboardData == '') clipboardData = event.originalEvent.clipboardData.getData('text/html');
                if (clipboardData == '') clipboardData = event.originalEvent.clipboardData.getData('text/plain');
                var items = event.originalEvent.clipboardData.items;
                for (var i=0, l=items.length; i<l; ++i) {
                    var blob = items[i].getAsFile();
                    if (blob && items[i].type.indexOf('image/') == 0) {
                        var reader = new FileReader();
                        reader.onload = function(event) {
                            var $node = $('<img>', {
                                src: event.target.result
                            });
                            insertNode($node);
                        };
                        reader.readAsDataURL(blob);
                        event.preventDefault();
                        $this.trigger('input');
                        return;
                    }
                }
                var $dummy = $('<div />');
                $dummy.html(clipboardData);
                $dummy.children('.twitter-tweet').each(function() {
                    var $this = $(this);
                    var url = $this.children('a').attr('href');
                    var $iframe = $('<iframe>', {
                        src: docent.baseURL.domain + docent.baseURL.version + '/util/tweet.php?url=' + encodeURIComponent(url),
                        frameborder: 0
                    });
                    $this.next('br').remove();
                    $this.next('script').remove();
                    $this.replaceWith($iframe);
                });
                // Copying from the address bar in Chrome 73 will return text/html when it wouldn't before
                // <meta charset="utf-8"><a href="https://www.youtube.com/watch?v={id}">https://www.youtube.com/watch?v={id}</a>
                // Need to test YouTube first. Otherwise ($dummy.children().length > 0) will be true and paste in just the link
                if (docent.util.youtube.test($dummy.text()) > 0) {
                    var data = docent.util.youtube.extractData($dummy.text());
                    var $iframe = docent.util.youtube.construct(data.videoId, data.parameters, data.protocol);
                    insertNode($iframe);
                }
                else if ($dummy.children().length > 0) {
                    var $dummy2 = $('<div>');
                    $dummy2.html($dummy.text());
                    if ($dummy2.find('iframe').length > 0) {
                        $dummy = $dummy2;
                    }
                    insertNode($dummy.children());
                }
                else if (docent.util.url.regex.test($dummy.text())) {
                    var url = $dummy.text();
                    document.execCommand('insertHTML', 0, url.replace(docent.util.url.regex, docent.util.url.replacement));
                    var $img = $('<img>', {
                        src: url
                    });
                    $img.on('load', function() {
                        $sticky.find('a[href="' + url + '"]').replaceWith($img);
                        $this.trigger('input');
                    });
                    event.preventDefault();
                }
                else {
                    $dummy.html($dummy.text());
                    if ($this.html() == '' && $dummy.children().length > 0) {
                        event.preventDefault();
                        $this.html($dummy.html());
                    }
                }
                if (window.location.host == 'docs.google.com') {
                    $this.find('iframe').each(function() {
                        var $node = $(this);
                        var desired_height = parseInt($node.attr('height'));
                        if (desired_height > 0) {
                            $node.css('height', desired_height + 'px');
                        }
                    });
                }
                $this.trigger('input');
            })
            .on('input', '.docent-element-sticky-content', function(event) {
                var timer = $sticky.attr('data-timer');
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    $sticky.attr('data-modified', Date.now());
                    docent.stickys.saveOne($sticky);
                }, 1000);
                $sticky.attr('data-timer',timer);
            })
            .on('keydown', '.docent-element-sticky-content', function(event) {
                if (event.ctrlKey && event.metaKey && event.which == 32 && docent.emoji) {
                    docent.emoji.makeTooltip($sticky.children('.docent-element-sticky-content'));
                    event.preventDefault();
                }
                if (event.which == 27) {
                    $('.docent-emoji-tooltip').remove();
                }
            })
            .on('mousedown', '.docent-element-sticky-video', function(event) {
                if ($sticky.children('.docent-element-sticky-content').is(':focus')) {
                    delaySave = true;
                }
            })
            .on('mouseleave', '.docent-element-sticky-video', function(event) {
                if (delaySave) {
                    docent.stickys.saveOne($sticky);
                    delaySave = false;
                }
            })
            .on('click', '.docent-element-sticky-video', function(event) {
                var width = 640;
                var height = 430;
                var top = 0;
                var left = (window.screen.width - width) / 2;
                var options = 'height=' + height + ',width=' + width + ',top=' + top + ',left=' + left;
                var videoWindow = window.open(docent.baseURL.domain + docent.baseURL.version + '/video/', '_blank', options);
                var msg = {
                    type: 'info',
                    elementID: $sticky.attr('data-element-id')
                };
                var timer;
                function handler(event) {
                    event = event.originalEvent;
                    if (event.source == videoWindow && event.origin == 'https://insertlearning.com') {
                        if (event.data.type == 'open') {
                            videoWindow.postMessage(msg, event.origin);
                            clearInterval(timer);
                        }
                        if (event.data.type == 'record') {
                            var $content = $sticky.children('.docent-element-sticky-content');
                            var text = $content.html() || '';
                            if (text == docent.stickys.placeholderText) {
                                text = '';
                            }
                            $content.html(text + '<br>' + event.data.video + '<br>');
                            $sticky.attr('data-modified', Date.now());
                            docent.stickys.saveOne($sticky);
                        }
                        if (event.data.type == 'close') {
                            timer = setInterval(function() {
                                if (videoWindow.closed) {
                                    $(window).off('message', handler);
                                    clearInterval(timer);
                                }
                            }, 100);
                        }
                    }
                }
                $(window).on('message', handler);
                docent.stickys.triggerGoogleAnalyticsEvent('Record Video');
                if (delaySave) {
                    delaySave = false;
                    docent.stickys.saveOne($sticky);
                }
            })
            .on('click', '.docent-element-sticky-size', function(event) {
                $sticky.toggleClass('docent-full-width');
                $(this).children('i.docent-fa').toggleClass('fa-expand fa-compress');
            })
            .on('click', '.docent-element-sticky-delete', function(event) {
                docent.stickys.deleteOne($sticky);
                docent.stickys.triggerGoogleAnalyticsEvent('Delete');
            })
            .on('click', function(event) {
                if (docent.isPDF && event.target == event.currentTarget) {
                    $sticky.toggleClass('docent-collapsed');
                }
            });
        },
        deleteOne: function($sticky) {
            docent.elements.deleteOne('sticky', $sticky);
        },
        saveOne: function($sticky) {
            docent.elements.saveOne('sticky', $sticky);
        },
        save: function() {
            docent.elements.save('sticky');
        },
        load: function(stickys, isOwner) {
            docent.elements.load('sticky', stickys, isOwner);
        },
        // experimental idea to get large embedded iframes to play well in smaller content areas
        fit_iframes: function() {
            $('.docent-element-sticky-content').each(function() {
                var $content = $(this);
                $content.css('height', '');
                $content.find('iframe').each(function() {
                    var $iframe = $(this);
                    $iframe.css('width', '');
                    var desired = {
                        w: $iframe.attr('width'),
                        h: $iframe.attr('height')
                    };
                    var actual = {
                        w: $content.width(),
                        h: $iframe.height()
                    };
                    var fit_ratio = actual.w / desired.w;
                    var translate = (1/fit_ratio - 1)/2 * 100;
                    $iframe.css({
                        transform: 'scale(' + fit_ratio + ') translate(-' + translate + '%, -' + translate + '%)',
                        width: desired.w,
                        'max-width': desired.w + 'px'
                    });
                    var content_padding = $content.outerHeight() - actual.h;
                    $content.css({
                        height: desired.h * fit_ratio + content_padding
                    });
                });
            });
        },
        placeholderText: 'Type here or paste anything: images, YouTube links, embed codes...'
    },
    questions: {
        accentParagraph: function(event) {
            docent.elements.accentParagraph('question', event);
        },
        constructQuestion: function(question, isOwner) {
            // Backwards compatibility for old placeholder method
            if (question.text == 'What is your question?') {
                question.text = '';
            }
            var answerText = question.answer && question.answer.text || '';
            // Backwards compatibility for old placeholder method
            if (answerText == 'Answer...') {
                answerText = '';
            }
            var $question = docent.elements.constructElement('question', question);
                $question.prepend('<docent-element class="docent-element-question-stem" />');
                $question.prepend('<docent-element class="docent-element-question-title" />');
                $question.append('<docent-element class="docent-element-question-answer docent-element-question-saved needsclick" contenteditable="true">' + answerText + '</docent-element>');
                $question.append('<docent-element class="docent-element-question-delete" />');
                $question.append('<docent-element class="docent-element-question-create" />');
                $question.append('<docent-element class="docent-element-question-edit" />');
                $question.prepend('<docent-element class="docent-element-question-score needsclick" contenteditable="true">' + (typeof(question.score) === 'undefined' ? 10 : question.score) + '<br></docent-element>');
                //$question.append('<docent-element class="docent-element-question-saved"></docent-element>');
            
            docent.questions.populateQuestionStems($question);
            
            if (isOwner) {
                var $viewAnswers = $('<docent-element>', {
                    class: 'docent-element-question-view-answers',
                    html: [
                        '<button type="button">View all responses</button>',
                        '<i class="docent-fa fa-angle-right"></i>',
                        '<i class="docent-fa fa-angle-left"></i>'
                    ]
                })
                .on('click', 'button', function(event) {
                    var msg = {
                        type: 'viewAnswers',
                        elementID: $question.attr('data-element-id')
                    };
                    docent.iframeBridge.postMessage(msg);
                    docent.iframeBridge.showIframe();
                    docent.questions.triggerGoogleAnalyticsEvent('View All Responses');
                })
                .on('click', '.docent-fa', function(event) {
                    var $everyQuestion = $('.docent-element-question');
                    var direction = $(event.target).hasClass('fa-angle-left') ? -1 : 1;
                    var index = $everyQuestion.index($question) + direction;
                    if (index < 0) {
                        index = $everyQuestion.length - 1;
                    }
                    else if (index == $everyQuestion.length) {
                        index = 0;
                    }
                    $('html,body').animate({
                        scrollTop: $(window).scrollTop() - $question.offset().top + $everyQuestion.eq(index).offset().top
                    });
                    var directionAsWord = direction < 0 ? 'Previous' : 'Next';
                    docent.questions.triggerGoogleAnalyticsEvent('Go to ' + directionAsWord + ' Question');
                });
                $question.append($viewAnswers);
            }

            if (question.answer && typeof question.answer.index === 'number') {
                $question.attr('data-index', question.answer.index);
            }
            if (question.answer && typeof question.answer.score !== 'undefined' && question.answer.score !== '') {
                $question.children('.docent-element-question-score').text(question.answer.score).addClass('docent-fraction');
            }
            $question.children('.docent-element-question-score').attr('data-max', question.score || 10);

            if (question.choices) {
                if (!isOwner) {
                    question.choices = docent.util.shuffle(question.choices);
                }
                for (var i=0; i < question.choices.length; ++i) {
                    $question.children('.docent-element-question-answer').text(question.choices[i]);
                    docent.questions.newChoice($question, isOwner);
                }
            }
            var attempts = question.answer && question.answer.attempts;
            if (question.rightChoice || attempts) {
                $question.children('.docent-element-question-choice').each(function() {
                    var $this = $(this);
                    var text = $this.text();
                    if (question.rightChoice == text) {
                        $this.addClass('docent-right').find('button .docent-fa').toggleClass('fa-check-square-o fa-square-o');
                    }
                    else if (attempts && attempts.indexOf(text) != -1) {
                        $this.addClass('docent-wrong');
                        if (typeof question.answer.score === 'undefined') {
                            docent.questions.updateScore($question);
                        }
                    }
                });
            }
            else if (question.answer && question.answer.text) {
                $question.children('.docent-element-question-choice').each(function() {
                    var $this = $(this);
                    var text = $this.text();
                    if (question.answer.text == text) {
                        $this.addClass('docent-selected');
                        if (question.score == 0) {
                            $this.addClass('docent-element-question-saved');
                        }
                        else if (question.answer.score >= question.score) {
                            $this.addClass('docent-right');
                        }
                        else if (question.answer.score === '0') {
                            $this.addClass('docent-wrong');
                        }
                        else {
                            $this.addClass('docent-element-question-saved');
                        }
                    }
                });
            }
            if (question.answer && Array.isArray(question.answer.feedback)) {
                $question.children('.docent-element-question-answer').after($('<docent-element>', {
                    class: 'docent-element-question-feedback',
                    text: question.answer.feedback[0].text,
                    'data-name': question.answer.feedback[0].userName,
                    'data-time': docent.util.getDateString(question.answer.feedback[0].modified || question.answer.feedback[0].created),
                }));
            }
            return $question;
        },
        addQuestion: function(event) {
            docent.elements.addElement('question', event, '');
        },
        triggerGoogleAnalyticsEvent: function(label) {
            var msg = {
                type: 'ga',
                category: 'Question Buttons',
                action: 'click',
                label: label
            };
            docent.iframeBridge.postMessage(msg);
        },
        bindEventsToQuestion: function($question) {
            docent.elements.setFocusCallback('.docent-element-question-content', $question, function($this) {
                $this.blur();
                if (!docent.experimental) $this.next('.docent-element-question-answer').focus();
            });
            docent.elements.setBlurCallback('.docent-element-question-answer', $question, function($this) {
                if (!$question.is('.docent-not-owner')) {
                    docent.questions.newChoice($question, true);
                }
                else if (!$question.has('.docent-element-question-choice').length) {
                    docent.questions.postAnswer($this);
                }
            });
            
            $question.on('click', '.docent-element-question-delete', function(event) {
                docent.questions.deleteOne($question);
                docent.questions.triggerGoogleAnalyticsEvent('Delete');
            })
            .on('click', '.docent-element-question-create', function(event) {
                $question.attr('data-modified', Date.now());
                docent.questions.saveOne($question);
                docent.questions.triggerGoogleAnalyticsEvent($question.hasClass('docent-edit') ? 'Save' : 'Create');
                $question.addClass('docent-can-reply').removeClass('docent-edit');
            })
            .on('click', '.docent-element-question-edit', function(event) {
                $question.removeClass('docent-can-reply').addClass('docent-edit');
                var $questionContent = $question.find('.docent-element-question-content').focus();
                docent.util.moveCaretToEnd($questionContent[0]);
                docent.questions.triggerGoogleAnalyticsEvent('Edit');
            })
            .on('click', '.docent-element-question-score', function(event) {
                docent.questions.triggerGoogleAnalyticsEvent('Score');
            })
            .on('keypress', '.docent-element-question-score', function(event) {
                var input;
                if (event.metaKey || event.ctrlKey) {
                    return true;
                }
                if (event.which === 32) {
                    return false;
                }
                if (event.which === 0) {
                    return true;
                }
                if (event.which < 33) {
                    return true;
                }
                input = String.fromCharCode(event.which);
                return !!/[\d\s]/.test(input);
            })
            .on('input', '.docent-element-question-answer', function(event) {
                var $this = $(this);
                if ($this.parent('.docent-not-owner').length == 0) {
                    return;
                }
                var timer = $this.attr('data-timer');
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(function() {
                    docent.questions.postAnswer($this);
                }, 1000);
                $this.attr('data-timer',timer);
                $question.children('.docent-element-question-saved')
                    .addClass('docent-element-question-saving')
                    .removeClass('docent-element-question-saved');
            });
            $question.on('keydown', '.docent-element-question-answer', function(event) {
                if (event.ctrlKey && event.metaKey && event.which == 32 && docent.emoji) {
                    docent.emoji.makeTooltip($question.children('.docent-element-question-answer'));
                    event.preventDefault();
                }
                if (event.which == 27) {
                    $('.docent-emoji-tooltip').remove();
                }
                if ($question.is('.docent-not-owner')) return;
                if (event.which == 13) {
                    docent.questions.newChoice($question, true, true);
                    event.preventDefault();
                }
            }).on('keydown', '.docent-element-question-choice', function(event) {
                if (event.which == 13) {
                    document.getSelection().removeAllRanges();
                    $(':focus').blur();
                    event.preventDefault();
                    return false;
                }
            }).on('click', '.docent-element-question-choice', function(event) {
                var $this = $(this);
                if ($question.is('.docent-not-owner')) {
                    if ($question.has('.docent-selected:not(.docent-element-question-saved),.docent-right').length == 0 && !$this.hasClass('docent-wrong')) {
                        $question.children('.docent-selected').removeClass('docent-selected docent-element-question-saved');
                        $this.addClass('docent-selected');
                        var $answer = $question.children('.docent-element-question-answer');
                        $answer.text($this.text());
                        docent.questions.postAnswer($answer, true);
                    }
                    event.preventDefault();
                    return false;
                }
                else if ($(event.target).closest('.docent-element-question-choice-check').length > 0) {
                    $question.children('.docent-right').not($this).removeClass('docent-right').each(function() {
                        $(this).find('button .docent-fa').toggleClass('fa-check-square-o fa-square-o');
                    });
                    $this.toggleClass('docent-right');
                    $this.find('button .docent-fa').toggleClass('fa-check-square-o fa-square-o');
                    docent.questions.postChoices($question);
                }
                else {
                    $this.children('.docent-element-question-choice-text').focus();
                }
            }).on('blur', '.docent-element-question-choice', function(event) {
                var $this = $(this);
                if ($this.text() == '') docent.questions.deleteChoice($this);
                else {
                    docent.questions.postChoices($question);
                }
            }).on('click', function(event) {
                if (docent.isPDF && event.target == event.currentTarget) {
                    $question.toggleClass('docent-collapsed');
                }
            });
        },
        newChoice: function($question, isOwner, notBlur, dontPost) {
            var $answer = $question.children('.docent-element-question-answer');
            var text = $answer.text();
            if (text != '' && text != 'Answer...') {
                var $choice = $('<docent-element>', {
                    class: 'docent-element-question-choice'
                });
                $choice.append($('<docent-element>', {
                    class: 'docent-element-question-choice-text',
                    text: text,
                    contenteditable: !!isOwner
                }));
                if (isOwner) {
                    $choice.append($('<button>', {
                        type: 'button',
                        class: 'docent-element-question-choice-check',
                        html: '<i class="docent-fa fa-square-o">'
                    }));
                }
                $answer.before($choice).text('');
            }
            if (isOwner && $question.is(':visible') && !dontPost) {
                docent.questions.postChoices($question);
            }
            return $choice;
        },
        deleteChoice: function($choice) {
            var $question = $choice.parent();
            $choice.remove();
            docent.questions.postChoices($question);
        },
        postChoices: function($question) {
            var rightChoice;
            var choices = [];
            $question.children('.docent-element-question-choice').each(function() {
                var $this = $(this);
                var choice = $this.text();
                if ($this.hasClass('docent-right')) {
                    rightChoice = choice;
                }
                choices.push(choice);
            });
            var msg = {
                type: 'postChoices',
                ref: $question.attr('data-ref'),
                created: $question.attr('data-created'),
                modified: Date.now(),
                forPath: window.location.pathname,
                choices: choices,
                rightChoice: rightChoice
            };
            docent.iframeBridge.postMessage(msg);
            $question.attr('data-modified', msg.modified);
        },
        updateScore: function($question) {
            var $score = $question.children('.docent-element-question-score');
            var m = Math.max($question.children('.docent-element-question-choice').length - 1, 1);
            var a = $question.children('.docent-wrong').length;
            var score = $score.attr('data-max') * (m - a) / m;
            if (score % 1 != 0) {
                score = score.toFixed(1);
            }
            $score.text(score);
        },
        postAnswer: function($answer, isMultipleChoice) {
            if ($('.docent-logged-in').length != 0) {
                var msg = {
                    type: 'postAnswer',
                    answer: isMultipleChoice ? $answer.text() : $answer.html(),
                    ref: $answer.parent().attr('data-ref'),
                    created: $answer.parent().attr('data-created'),
                    forPath: window.location.pathname,
                    isMultipleChoice: isMultipleChoice
                };
                var answer_index = $answer.parent().attr('data-index');
                if (answer_index !== false) {
                    msg.index = answer_index;
                }
                docent.iframeBridge.postMessage(msg);
            }
        },
        populateQuestionStems: function($question) {
            var $stem = $question.children('.docent-element-question-stem');
            $stem.html('<i>Click here to select a stem</i>').on('click', function(event) {
                var msg = {
                    type: 'showQuestionStems',
                    top: $stem.offset().top - $(window).scrollTop() + 44,
                    left: $stem.offset().left,
                    width: $stem.outerWidth(),
                    elementID: $question.attr('data-element-id'),
                    text: $stem.text()
                };
                docent.iframeBridge.postMessage(msg);
                docent.util.disableScrolling();

                $('.docent-element-question').not($question.addClass('docent-active')).removeClass('docent-active');
            });
        },
        setQuestionStem: function(data) {
            var $question = $('.docent-element-question.docent-active');
            var $stem = $question.find('.docent-element-question-stem');
            $stem.text(data.text);
            var element = $question.find('.docent-element-question-content').focus()[0];
            docent.util.moveCaretToEnd(element);
            if (element.textContent) {
                data.text = '<br>' + data.text;
            }
            document.execCommand('insertHTML', null, data.text);
        },
        deleteOne: function($question) {
            docent.elements.deleteOne('question', $question);
        },
        saveOne: function($question) {
            docent.elements.saveOne('question', $question);
        },
        save: function() {
            docent.elements.save('question');
        },
        load: function(questions, isOwner) {
            docent.elements.load('question', questions, isOwner);
        }
    },
    discussions: {
        accentParagraph: function(event) {
            docent.elements.accentParagraph('discussion', event);
        },
        constructDiscussion: function(discussion) {
            // Backwards compatibility for old placeholder method
            if (discussion.text == 'What is the discussion topic?') {
                discussion.text = '';
            }
            var $discussion = docent.elements.constructElement('discussion', discussion);
                $discussion.prepend('<docent-element class="docent-element-discussion-title" />');
                $discussion.append('<docent-element class="docent-element-discussion-send" />');
                $discussion.append('<docent-element class="docent-element-discussion-filter" />');
                $discussion.append('<docent-element class="docent-element-discussion-subcontainer" />');
                $discussion.append('<docent-element class="docent-element-discussion-response needsclick" contenteditable="true"></docent-element>');
                $discussion.append('<docent-element class="docent-element-discussion-delete" />');
                $discussion.append('<docent-element class="docent-element-discussion-create" />');
                $discussion.append('<docent-element class="docent-element-discussion-edit" />');

            if (discussion.responses) {
                var $subcontainer = $discussion.children('.docent-element-discussion-subcontainer');

                for (var i=0, l=discussion.responses.length; i<l; ++i) {
                    var $response = docent.discussions.constructResponse(discussion.responses[i], i);
                    $subcontainer.append($response);
                }
            }

            docent.discussions.populateFilter($discussion);

            return $discussion;
        },
        constructResponse: function(response, index) {
            var datetime = docent.util.getDateString(response.created);

            var $response = $('<docent-element>', {
                'class': 'docent-element-discussion-response',
                'data-time': datetime,
                'html': response.text,
                'data-user-id': response.userID.$id,
                'data-index': response.index || index
            });
            if (response.groups) {
                var groups = '';
                if (typeof response.groups == 'string') {
                    groups = response.groups;
                }
                else for (var i in response.groups) {
                    if (i > 0) groups += ',';
                    groups += response.groups[i].$id;
                }
                $response.attr('data-groups', groups);
            }
            if ($response[0].attachShadow) {
                var root = $response[0].attachShadow({mode: 'closed' });
                root.innerHTML = `
                    <style>
                        :host(.docent-banned) > span {
                            color: rgba(0, 0, 0, 0.2);
                        }
                        span {
                            position: absolute;
                            top: 5px;
                            left: 20px;
                            color: #000;
                            font-size: 0.75em;
                            font-weight: 400;
                            text-decoration: underline;
                            -moz-osx-font-smoothing: auto;
                            -webkit-font-smoothing: subpixel-antialiased;
                        }
                        slot {
                            text-decoration: inherit;
                        }
                    </style>
                    <span>` + response.userName + `</span>
                    <slot></slot>
                    <content></content>
                `;
            }
            else {
                $response.attr('data-name', response.userName);
            }
            
            $response.append($('<button>', {
                type: 'button',
                class: 'docent-element-discussion-response-ban docent-fa'
            }));
            
            if (response.banned) {
                $response.addClass('docent-banned');
            }
            
            return $response;
        },
        addDiscussion: function(event) {
            docent.elements.addElement('discussion', event, '');
        },
        triggerGoogleAnalyticsEvent: function(label, isKeypress) {
            var msg = {
                type: 'ga',
                category: 'Discussion Buttons',
                action: 'click',
                label: label
            };
            if (isKeypress) {
                msg.action = 'keypress';
            }
            docent.iframeBridge.postMessage(msg);
        },
        bindEventsToDiscussion: function($discussion) {
            docent.elements.setFocusCallback('.docent-element-discussion-content', $discussion, function($this) {
                $this.blur();
                $this.nextAll('.docent-element-discussion-response').focus();
            });

            $discussion.on('click', '.docent-element-discussion-delete', function(event) {
                $discussion.remove();
                docent.discussions.deleteOne($discussion);
                docent.discussions.triggerGoogleAnalyticsEvent('Delete');
            })
            .on('click', '.docent-element-discussion-create', function(event) {
                $discussion.attr('data-modified', Date.now());
                docent.discussions.saveOne($discussion);
                docent.discussions.triggerGoogleAnalyticsEvent($discussion.hasClass('docent-edit') ? 'Save' : 'Create');
                $discussion.addClass('docent-can-reply').removeClass('docent-edit');
            })
            .on('click', '.docent-element-discussion-edit', function(event) {
                $discussion.removeClass('docent-can-reply').addClass('docent-edit');
                var $discussionContent = $discussion.find('.docent-element-discussion-content').focus();
                docent.util.moveCaretToEnd($discussionContent[0]);
                docent.discussions.triggerGoogleAnalyticsEvent('Edit');
            })
            .on('click', '.docent-element-discussion-send', function(event) {
                var $response = $discussion.children('.docent-element-discussion-response');
                docent.discussions.postResponse($response);
                docent.discussions.triggerGoogleAnalyticsEvent('Send Response');
            })
            .on('keydown', '.docent-element-discussion-response', function(event) {
                var $this = $(this);
                if (event.which == 13 && !event.shiftKey) {
                    docent.discussions.postResponse($this, true);
                    event.preventDefault();
                    docent.discussions.triggerGoogleAnalyticsEvent('Send Response', true);
                }
                if (event.ctrlKey && event.metaKey && event.which == 32 && docent.emoji) {
                    docent.emoji.makeTooltip($discussion.children('.docent-element-discussion-response'));
                    event.preventDefault();
                }
                if (event.which == 27) {
                    $('.docent-emoji-tooltip').remove();
                }
            })
            .on('click', '.docent-element-discussion-response-ban', function(event) {
                var $response = $(this).parent();
                $response.toggleClass('docent-banned');
                var msg = {
                    type: 'banResponse',
                    elementID: $discussion.attr('data-element-id'),
                    index: $response.attr('data-index'),
                    banned: $response.hasClass('docent-banned')
                };
                docent.iframeBridge.postMessage(msg);
                docent.discussions.triggerGoogleAnalyticsEvent('Ban Response');
            })
            .on('click', function(event) {
                if (docent.isPDF && event.target == event.currentTarget) {
                    $discussion.toggleClass('docent-collapsed');
                }
            });
        },
        postResponse: function($response, notBlur) {
            var responseText = $response.html();
            if (responseText == 'Response...' || responseText == '') {
                return false;
            }
            if ($('.docent-logged-in').length != 0) {
                var $discussion = $response.parent();
                var msg = {
                    type: 'postResponse',
                    response: responseText,
                    ref: $discussion.attr('data-ref'),
                    created: $discussion.attr('data-created'),
                    groups: $discussion.children('.docent-element-discussion-filter').attr('data-value'),
                    migrated: true,
                    forPath: window.location.pathname
                };
                if (msg.groups && msg.groups != '') {
                    var usersGroups = $discussion.find('.docent-element-discussion-response[data-user-id="' + msg.groups + '"]').last().attr('data-groups');
                    if (usersGroups) {
                        msg.groups += ',' + usersGroups;
                    }
                }
                docent.iframeBridge.postMessage(msg);
                $response.html('');
                var $subcontainer = $discussion.children('.docent-element-discussion-subcontainer');
                if ($subcontainer.text() != '') {
                    $subcontainer.scrollTop($subcontainer.scrollTop() + $subcontainer.children().last().offset().top - $subcontainer.offset().top);
                }
            }
        },
        newResponse: function(discussion, response, checkForDuplicates) {
            var $discussion = $('.docent-element-discussion[data-ref="' + discussion.ref + '"][data-created="' + discussion.created + '"]');
            var $subcontainer = $discussion.children('.docent-element-discussion-subcontainer');

            var scrollTop = $subcontainer.scrollTop();
            var scrollHeight = $subcontainer[0].scrollHeight;
            var outerHeight = $subcontainer.outerHeight();

            var $response = docent.discussions.constructResponse(response);
            $subcontainer.append($response);
            
            if (checkForDuplicates) {
                $subcontainer.children('[data-user-id="' + $response.attr('data-user-id') + '"]').not('[data-index]').filter(function() {
                    return this.textContent == $response.text();
                })
                .remove();
            }

            if (scrollHeight - scrollTop == outerHeight) {
                $subcontainer.scrollTop(scrollHeight);
            }

            var $filter = $discussion.children('.docent-element-discussion-filter');
            var filterValue = $filter.attr('data-value');
            if (filterValue && filterValue != '') {
                $response.filter(function() {
                    var $this = $(this);
                    return $this.attr('data-user-id') != filterValue && ($this.attr('data-groups') || '').split(',').indexOf(filterValue) == -1;
                }).hide();
            }
        },
        populateFilter: function($discussion) {
            var $filter = $discussion.children('.docent-element-discussion-filter');
            $filter.html('All classes').on('click', function(event) {
                var $filter = $(this);
                var msg = {
                    type: 'showDiscussionFilter',
                    top: $filter.offset().top - $(window).scrollTop() + 44,
                    left: $filter.offset().left,
                    width: $filter.outerWidth(),
                    elementID: $discussion.attr('data-element-id'),
                    value: $filter.attr('data-value')
                };
                if (msg.value == '' && $filter.text() == 'Everyone') {
                    msg.eq = 1;
                }
                docent.iframeBridge.postMessage(msg);
                docent.util.disableScrolling();

                $('.docent-element-discussion').not($discussion.addClass('docent-active')).removeClass('docent-active');
            });
        },
        setFilter: function(data) {
            var $discussion = $('.docent-element-discussion.docent-active');
            var $responses = $discussion.find('.docent-element-discussion-subcontainer > .docent-element-discussion-response').css('display','');
            if (data.value != '') {
                $responses.filter(function() {
                    var $this = $(this);
                    return $this.attr('data-user-id') != data.value && ($this.attr('data-groups') || '').split(',').indexOf(data.value) == -1;
                }).hide();
            }
            var $filter = $discussion.children('.docent-element-discussion-filter').attr('data-value', data.value);
            if ($filter[0].attachShadow) {
                var $clone = $filter.clone(true).text(data.text == 'Everyone' ? 'Everyone' : 'All classes');
                var root = $clone[0].attachShadow({mode: 'closed' });
                root.textContent = data.text;
                $filter.replaceWith($clone);
            }
            else {
                $filter.text(data.text);
            }
        },
        deleteOne: function($discussion) {
            docent.elements.deleteOne('discussion', $discussion);
        },
        saveOne: function($discussion) {
            docent.elements.saveOne('discussion', $discussion);
        },
        save: function() {
            docent.elements.save('discussion');
        },
        load: function(discussions, isOwner) {
            docent.elements.load('discussion', discussions, isOwner);
        }
    },
    topbar: {
        build: function(userName, accessCode) {
            if ($('.docent-topbar').length > 0) {
                docent.topbar.bindEvents();
                return false;
            }
            var $topbar = $('<div>', {
                class: 'docent-topbar',
                text: ' shared this lesson. ',
                css: {
                    'z-index': docent.maxZ()
                }
            });
            var $a = $('<a>', {
                href: docent.baseURL.domain + docent.baseURL.version + '/share-history/' + accessCode,
                text: userName,
                target: '_blank'
            });
            var $copyButton = $('<button>', {
                type: 'button',
                class: 'docent-copy',
                text: 'Copy lesson'
            });
            $topbar.prepend($a).append($copyButton);
            docent.container.prepend($topbar);
            docent.topbar.bindEvents();
        },
        bindEvents: function() {
            var selectors = [
                '.docent-logo',
                '.docent-highlight',
                '.docent-sticky',
                '.docent-question',
                '.docent-discussion',
                '.docent-element-sticky-content',
                '.docent-element-sticky-delete',
                '.docent-element-question-answer',
                '.docent-element-question-edit',
                '.docent-element-question-content',
                '.docent-element-discussion-edit',
                '.docent-element-discussion-response',
                '.docent-element-discussion-send'
            ];
            $(selectors.join(',')).off('mousedown', docent.topbar.requireDocentOwnership).on('mousedown', docent.topbar.requireDocentOwnership);

            $('.docent-copy').off('click', docent.topbar.copyDocent).on('click', docent.topbar.copyDocent);
        },
        requireDocentOwnership: function(event) {
            if ($('.docent-topbar').length > 0) {
                event.stopImmediatePropagation();
                event.preventDefault();
                alert('You need to copy this lesson first.');
                return false;
            }
        },
        copyDocent: function(event) {
            var msg = {
                type: 'copyDocent'
            };
            docent.iframeBridge.postMessage(msg);
        },
        docentCopied: function() {
            $('.docent-topbar').fadeOut(function() {
                $(this).remove();
                $('*').off('mousedown', docent.topbar.requireDocentOwnership);
            });
            docent.util.showNews('Lesson copied');
        },
        teacherViewingAsStudent: function() {
            var $topbar = $('<div>', {
                class: 'docent-topbar redesigned',
                text: "You're viewing this lesson as a student. ",
                css: {
                    'z-index': docent.maxZ()
                }
            });
            var $button = $('<button>', {
                type: 'button',
                class: 'docent-resume-teacher-view',
                text: 'Resume teacher view'
            })
            .on('click', function(event) {
                var msg = {
                    type: 'resumeTeacherView'
                };
                docent.iframeBridge.postMessage(msg);

                $topbar.fadeOut(function() {
                    $(this).remove();
                });
            });
            $topbar.append($button);
            docent.container.prepend($topbar);
        }
    },
    util: {
        apply_ref_check: function(data, isNote) {
            if (isNote && !data.length) {
                return false;
            }
            var ref = data.ref;
            var ref_check = data.ref_check;
            if (ref) {
                ref = ref.split(':');
                if (isNote) {
                    var lastChunk = ref.pop();
                }
            }
            if (ref_check) {
                ref_check = ref_check.split(':');
                if (isNote) {
                    ref_check.pop();
                }
            }
            function nextNode(node, index) {
                if (!ref || !ref_check) {
                    return false;
                }
                if (node && node.childNodes && index < ref.length) {
                    var diff = 0;
                    var iterator = 1;
                    if (ref_check && ref_check[index]) {
                        diff = node.childNodes.length - ref_check[index];
                        if (diff < 0) iterator = -1;
                    }
                    var matches = [];
                    for (var adj = 0; Math.abs(adj) <= Math.abs(diff); adj += iterator) {
                        var eq = ref[index]*1 + adj;
                        if (eq < node.childNodes.length && eq >= 0) {
                            var childNode = node.childNodes[eq];
                            var _node = nextNode(childNode, index + 1);
                            if (_node && _node.nodeType == 1) {
                                break;
                            }
                        }
                        else {
                            var _node = false;
                        }
                    }
                    node = _node;
                }
                else if (index < ref.length - 1) {
                    node = false;
                }
                else if (node && data.md5) {
                    var $node = $(node);
                    var md5 = docent.util.MD5($node, !!data.md5_v2);
                    if ((data.md5_v2 || data.md5) != md5) {
                        var dataMatch = '[data-ref="' + data.ref + '"][data-ref-check="' + data.ref_check + '"]';
                        if ($node.children('[class*="docent-element"]' + dataMatch).length == 0) node = false;
                    }
                }
                // unsure about this... prevents a little mismatching, but could it result in false positives?
                else if (!$(node).is('p,li,.docent-compatible') && (!isNote || $(node).is('div'))) {
                    node = false;
                }
                return node;
            }
            var node = nextNode(document.body, 0);
            if (!node && data.md5) {
                // Search for any paragraph that matches the md5 check.
                // This is needed for mobile.
                var $node = $('p,li,.docent-compatible').filter(function() {
                    var md5 = docent.util.MD5($(this), !!data.md5_v2);
                    return ((data.md5_v2 || data.md5) == md5);
                });
                if ($node.length > 0) {
                    node = $node[0];
                    // What about multiple matches?
                }
                else {
                    delete data.md5;
                    // Try again without md5 check.
                    // For case when something in the paragraph was changed (ie: fixed typo).
                    return docent.util.apply_ref_check(data, isNote);
                }
            }
            // return the node that an element with matching data was appended to
            else if (!node) {
                var dataMatch = '[data-ref="' + data.ref + '"][data-ref-check="' + data.ref_check + '"]';
                var $node = $('[class*="docent-element"]' + dataMatch).parent();
                if ($node.length) {
                    return $node[0];
                }
            }
            // uses our own implementation of deserializing highlights rather than using the TextHighlighter library
            // our implementation allows for some "fitting" when is there have been some edits to the paragraph containing the highlight
            if (isNote) {
                if (!node.childNodes) return false;
                var textNode;
                if (lastChunk == 0) {
                    textNode = node.childNodes[0];
                }
                else while (!textNode && --lastChunk > -1) {
                    textNode = node.childNodes[lastChunk];
                }
                if (!textNode) {
                    return false;
                }
                else if (textNode.nodeType != Node.TEXT_NODE) {
                    textNode = textNode.nextSibling;
                    if (!textNode) return false;
                }
                var fulltext = textNode.textContent;
                var start = data.start;
                if (fulltext.substr(start, data.length) != data.text) {
                    var diff = Infinity;
                    var lastIndex = -1;
                    do {
                        lastIndex = fulltext.indexOf(data.text, lastIndex+1);
                        if (lastIndex != -1) {
                            var _diff = Math.abs(lastIndex - data.start);
                            if (_diff < diff) {
                                diff = _diff;
                                start = lastIndex;
                            }
                        }
                    } while (lastIndex != -1);
                }
                try {
                    var _textNode = textNode.splitText(start);
                    _textNode.splitText(data.length);
                    return _textNode;
                }
                catch(e) {
                    console.log(e, textNode, data, node);
                    return false;
                }
            }
            else {
                return node;
            }
        },
        loading: {
            show: function() {
                if ($('.docent-loading').index() != -1) return;
                $('<p>', {
                    class: 'docent-loading',
                    html: '<i class="docent-fa fa-refresh fa-spin"></i>Loading',
                    css: {
                        display: 'none',
                        'z-index': docent.maxZ() + 100
                    }
                }).appendTo(docent.container).fadeIn();
            },
            done: function() {
                $('.docent-loading').css('background-color', '#36AE4F').html('<i class="docent-fa fa-check"></i>Loaded').delay(800).fadeOut(function() {
                    $(this).remove();
                });
            }
        },
        getDateString: function(timestamp) {
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var d = new Date(Number(timestamp));
            var h = d.getHours();
            var hourString = h % 12;
            if (hourString == 0) {
                hourString = 12;
            }
            var minuteString = d.getMinutes();
            if (minuteString < 10) {
                minuteString = '0' + minuteString;
            }
            return months[d.getMonth()] + ' ' + d.getDate() + ' at ' + hourString + ':' + minuteString + (h < 12 ? 'am' : 'pm');
        },
        markCertainDivsAsCompatible: function() {
            var testElement = function(number, element) {
                var $element = $(element);
                // Ignore subscripts and superscripts on Khan Academy
                if (location.origin == 'https://www.khanacademy.org' && $element.filter('span').css('white-space') == 'nowrap') {
                    return false;
                }
                return !/inline/g.test($element.css('display')) || $element.children().filter(testElement).length > 0;
            };
            $('div,h1,h2,h3,h4,h5,h6,blockquote').filter(function() {
                var $this = $(this);
                if (location.origin == 'https://docs.google.com') {
                    if ($this.closest('#header,#footer').length) return false;
                }
                return $this.children().filter(testElement).length == 0 && $this.text().replace(/\s+/g,'') != '';
            }).addClass('docent-compatible');
            
            if (location.origin == 'https://sites.google.com') {
                $('span').filter(function() {
                    var $this = $(this);
                    return $this.closest('p,.docent-compatible,li').length == 0 && $this.children().filter(testElement).length == 0 && $this.text().replace(/\s+/g,'') != '';
                }).addClass('docent-compatible');
            }
            if (location.origin == 'https://drive.google.com') {
                var $document = $('[role="document"]');
                $document.children().filter(function() {
                    return $(this).width() == $document.width();
                })
                .addClass('drive-viewer-paginated-page');
                $('.drive-viewer-paginated-page').addClass('docent-compatible');
            }
        },
        // Experimental
        getArticleContainer: function() {
        // Finds the element that has the most <p> and treats that as the article container
            var $p = $('p');
            var parents = [];
            var counts = [];
            for (var i=0, l=$p.length; i<l; ++i) {
                var $parent = $p.eq(i).parent()[0];
                var index = parents.indexOf($parent);
                if (index == -1) {
                    parents.push($parent);
                    counts.push(0);
                }
                else {
                    counts[index] += 1;
                }
            }
            var max = Math.max(...counts);
            var maxIndex = counts.indexOf(max);
            return parents[maxIndex];
        },
        reformatWithParagraphs: function() {
            var $doubleBR = $('br + br');
            if ($('p').length / 4 >= $doubleBR.length && location.host != 'kids.nationalgeographic.com') {
                return false;
            }
            console.log('Using InsertLearning\'s compatibility engine');
            $doubleBR.parent().each(function() {
                var $parent = $(this);
                var $clone = $parent.clone().empty();
                var $p = $('<p class="docent-compatible">');
                var childNodes = this.childNodes;
                for (var i=0, l=childNodes.length; i<l; ++i) {
                    var node = childNodes[i];
                    if (!node) continue;
                    var $node = $(node);
                    if (node.nodeType == 1 && $node.css('display') == 'block') {
                        if ($p.text().replace(/\s+/g,'') != '') {
                            $clone.append($p);
                        }
                        $p = $('<p class="docent-compatible">');
                        $clone.append($node.clone());
                    }
                    else if ($node.is('br + br')) {
                        if ($p.text().replace(/\s+/g,'') != '') {
                            $clone.append($p);
                        }
                        $p = $('<p class="docent-compatible">');
                    }
                    else if (node.nodeType == 1 && !$(node.nextSibling).is('br + br')) {
                        $p.append($node.clone());
                    }
                    else if (node.nodeType <= 3) {
                        $p.append(node.textContent);
                    }
                }
                if ($p.text().replace(/\s+/g,'') != '') {
                    $clone.append($p);
                }
                $parent.replaceWith($clone);

                $('p.docent-compatible').filter(function() {
                    return $(this).css('margin-bottom') == '0px';
                }).css('margin-bottom', '16px');
            });
        },
        // watch if docent.container has been removed and if so reattach it
        watch: function() {
            if (!window.MutationObserver || docent.util.watch.observer) return false;
            var isComplete = false;
            var rerenderCurrentDocent = function() {
                isComplete = true;
                var msg = {
                    type: 'rerenderCurrentDocent'
                };
                docent.iframeBridge.postMessage(msg);
                console.log('Rerendering');
            };
            var observer = new MutationObserver(function(mutations) {
                if (docent.container.index() == -1) {
                    docent.init();
                    console.log('Reattaching InsertLearning');
                }
                if (!isComplete && location.origin == 'https://cnx.org' && $('.media-body #content').length) {
                    rerenderCurrentDocent();
                }
                if (!isComplete && location.origin == 'https://www.ck12.org' && $('.ck12-content-container').length) {
                    rerenderCurrentDocent();
                }
            });
            var options = {
                childList: true
            };
            if (location.origin == 'https://cnx.org') {
                options.subtree = true;
            }
            observer.observe(document.body, options);
            docent.util.watch.observer = observer;
        },
        youtube: {
            construct: function(videoId, parameters, protocol) {
                if (protocol != 'https:' && protocol != 'http:') {
                    protocol = 'https:';
                }
                var src = protocol + '//www.youtube.com/embed/' + videoId;
                if (parameters) for (var i=0, l=parameters.length; i<l; ++i) {
                    var parameter = parameters[i].split('=');
                    var key = parameter[0];
                    var value = parameter[1];
                    if (key == 'v') {
                        src = src.replace(videoID, value);
                        continue;
                    }
                    if (key == 't') {
                        key = 'start';
                        var time = value.split(/[a-z]/);
                        time.pop();
                        var units = [1,60,3600];
                        var j = 0;
                        var v = 0;
                        while (time.length > 0) {
                            v += time.pop() * units[j++];
                        }
                        value = v;
                    }
                    src += (i==0 ? '?' : '&') + key + '=' + value;
                }
                if (docent.experimental) {
                    src += (src.indexOf('?') == -1 ? '?' : '&') + 'enablejsapi=1';
                }
                var $iframe = $('<iframe />', {
                    width: 480,
                    height: 270,
                    src: src,
                    frameborder: 0,
                    allowfullscreen: true
                });
                if (docent.experimental) {
                    $iframe.on('load', function() {
                        var player = docent.util.youtube.api($iframe[0]);
                    });
                }
                return $iframe;
            },
            // experimental
            api: function(iframe) {
                iframe = iframe || document.getElementById('player');
                var w = iframe.contentWindow;
                var id = docent.util.ObjectID();
                var postMessage = function(msg) {
                    msg.id = id;
                    w.postMessage(JSON.stringify(msg), '*');
                };
                postMessage({
                    event: 'listening'
                });
                var player = {};
                player.playVideo = function() {
                    postMessage({
                        event: 'command',
                        func: 'playVideo',
                        args: []
                    });
                };
                player.pauseVideo = function() {
                    postMessage({
                        event: 'command',
                        func: 'pauseVideo',
                        args: []
                    });
                };
                player.seekTo = function(seconds) {
                    postMessage({
                        event: 'command',
                        func: 'seekTo',
                        args: [seconds]
                    });
                };
                var stops = [];
                var $elements = [];
                player.newStop = function(seconds, $el) {
                    stops.push(seconds);
                    $elements.push($el);
                };
                $(window).on('message', function(event) {
                    event = event.originalEvent;
                    if (event.origin === 'https://www.youtube.com') {
                        // Quit if event.data isn't JSON
                        if (!/^{.*}$/.test(event.data)) return;

                        var msg = JSON.parse(event.data);
                        if (msg.event == 'infoDelivery' && msg.id == id) {
                            if (msg.info.playerState === 1) {
                                var $sticky = $(iframe).closest('.docent-element-sticky');
                                stops = [];
                                $elements = [];
                                $sticky.nextAll('.docent-element-question').each(function() {
                                    var $question = $(this);
                                    docent.util.youtube.videoQuestions.attachHandler($question, $sticky, player);
                                });
                            }
                            for (var i=0, l=stops.length; i<l; ++i) {
                                if (player.currentTime < stops[i] && stops[i] <= msg.info.currentTime) {
                                    player.pauseVideo();
                                    var $element = $elements[i];
                                    if ($element && $element instanceof jQuery) {
                                        $('html,body').animate({
                                            scrollTop: $element.offset().top + ($element.outerHeight() - window.innerHeight) / 2
                                        }, function() {
                                            $element.children('.docent-element-question-answer').focus();
                                        });
                                    }
                                }
                            }
                            player.currentTime = msg.info.currentTime;
                        }
                    }
                });
                return player;
            },
            // experimental
            videoQuestions: {
                init: function() {
                    $('.docent-element-sticky').each(function() {
                        var $sticky = $(this);
                        var $youtube = $sticky.find('iframe').filter(function() {
                            return this.src.indexOf('https://www.youtube.com') == 0;
                        });
                        if ($youtube.length == 0) {
                            return;
                        }
                        $youtube.on('load', function() {
                            var player = docent.util.youtube.api($youtube[0]);
                        });
                        var src = $youtube.attr('src');
                        if (src.indexOf('enablejsapi=1') == -1) {
                            var param = '?'
                            if ($youtube.attr('src').indexOf('?') != -1) {
                                param = '=';
                            }
                            param += 'enablejsapi=1';
                            src += param;
                            $youtube.eq(0).attr('src', src);
                        }
                    });
                },
                attachHandler: function($question, $sticky, player) {
                    if (!$sticky) {
                        $sticky = $question.prevAll('.docent-element-sticky:first');
                    }
                    var questionText = $question.children('.docent-element-question-content').text();
                    // Gets time from beginning of question in the form of [hour:min:sec]
                    var timeText = questionText.match(/^\[[0-9:]*\]/g);
                    if (timeText.length) {
                        var time = timeText[0].replace(/\[|\]/g, '').split(':').reverse();
                        var seconds = (time[0] || 0) * 1 + (time[1] || 0) * 60 + (time[2] || 0) * 3600;
                        player.newStop(seconds, $question);
                        $question.off('click', '.docent-element-question-content').on('click', '.docent-element-question-content', function(event) {
                            if (!$question.is('.docent-can-reply')) {
                                return;
                            }
                            $('html,body').animate({
                                scrollTop: $sticky.offset().top + ($sticky.outerHeight() - window.innerHeight) / 2
                            });
                            player.currentTime = seconds;
                            player.seekTo(seconds);
                            player.playVideo();
                        });
                    }
                }
            },
            extractData: function(url) {
                var $a = $('<a>', {
                    href: url
                });
                var urlData = url.split('/').pop().split('?');
                var data = {
                    parameters: urlData[1] && urlData[1].split('&'),
                    protocol: $a[0].protocol
                };
                var regexTest = docent.util.youtube.test(url);
                if (regexTest == 1) {
                    data.videoId = urlData[0];
                }
                else if (regexTest == 2) {
                    data.videoId = data.parameters.shift().split('=')[1];
                }
                return data;
            },
            test: function(url) {
                if (docent.util.youtube.longRegex.test(url)) {
                    return 2;
                }
                else if (docent.util.youtube.shortRegex.test(url)) {
                    return 1;
                }
                else {
                    return 0;
                }
            },
            shortRegex: /\/youtu\.be\//,
            longRegex: /\/((www|m)\.)?youtube\.com\/(\?#\/)?watch/
        },
        url: {
            regex: /\bhttps?:\/\/\S*\b/g,
            replacement: '<a href="$&">$&</a>'
        },
        publishGoogleDoc: function() {
            var triggerMouseEvent = function(node, eventType) {
                var clickEvent = document.createEvent('MouseEvents');
                clickEvent.initEvent(eventType, true, true);
                if (node) node.dispatchEvent(clickEvent);
            };
            if (document.getElementsByClassName('docs-title-untitled').length) {
                document.getElementsByClassName('docs-title-input')[0].focus();
            }
            var fileMenu = document.querySelector('#docs-file-menu');
            triggerMouseEvent(fileMenu, 'mousedown');
            triggerMouseEvent(fileMenu, 'mouseup');
            var shareMenuItem = document.querySelector('.goog-menuitem-label[aria-label^="Share"]');
            triggerMouseEvent(shareMenuItem, 'mousedown');
            triggerMouseEvent(shareMenuItem, 'mouseup');
            
            setTimeout(function() {
                var publishMenuItem = document.querySelector('[aria-label^="Publish to the web"],[aria-label^="Publish to web"]');
                triggerMouseEvent(publishMenuItem, 'mousedown');
                triggerMouseEvent(publishMenuItem, 'mouseup');
                setTimeout(function() {
                    var publishButton = document.getElementById('pub-dialog-publish-link-button');
                    triggerMouseEvent(publishButton, 'mousedown');
                    triggerMouseEvent(publishButton, 'mouseup');
                    setTimeout(function() {
                        var url = window.location.href.replace(/edit(\?.*)?(\#.*)?$/, 'pub#insertlearning');
                        window.open(url, url);
                    }, 400);
                }, 400);
            }, 400);
        },
        wrapImages: function() {
            var $img = $('img').not('#logo').filter(function() {
                // prevent double wrapping and weird behavior with absolute positioned images
                return $(this).closest('p').length == 0 && $(this).css('position') != 'absolute';
            })
            .wrap(function() {
                var $this = $(this);
                var $p = $('<p>', {
                    class: 'docent-image-wrapper',
                    css: {
                        margin: 0,
                        display: $this.css('display') || 'inline-block',
                        width: 'auto',
                        height: 'auto',
                        float: $this.css('float')
                    }
                });
                return $p;
            });
            /**
            // Let's the user draw on images
            // Commenting this out to make it easier to find the iframe bridge when debugging
            if (docent.experimental) {
                $img.each(function() {
                    var $iframe = $('<iframe>', {
                        src: 'https://www.okeebo.com/docent-dev/canvas/#' + docent.util.MD5($(this).parent(), true),
                        height: this.height,
                        width: this.width,
                        css: {
                            border: 0,
                            position: 'absolute'
                        }
                    });
                    $(this).before($iframe);
                });
                var resizeCanvasIframes = function() {
                    $img.each(function() {
                        $(this).prev('iframe').height(this.height).width(this.width);
                    });
                };
                var timer;
                $(window).on('resize', function(event) {
                    if (timer) clearTimeout(timer);
                    resizeCanvasIframes();
                    timer = setTimeout(resizeCanvasIframes, 100);
                });
            }
            /**/
        },
        resizeImages: function() {
            $('img').each(function() {
                var $img = $(this);
                var $span = $img.parent();
                var ratio = resize($span);
                resize($img, ratio);
                // account for how google docs crops images
                if (window.location.host == 'docs.google.com') {
                    var data = {
                        'margin-top': $img.attr('data-margin-top') || parseFloat($img.css('margin-top')),
                        'margin-left': $img.attr('data-margin-left') || parseFloat($img.css('margin-left'))
                    };
                    $img.attr({
                        'data-margin-top': data['margin-top'],
                        'data-margin-left': data['margin-left']
                    })
                    if (ratio < 1) {
                        data['margin-top'] *= ratio;
                        data['margin-left'] *= ratio;
                    }
                    $img.css({
                        'margin-top': data['margin-top'] + 'px',
                        'margin-left': data['margin-left'] + 'px'
                    });
                }
            });
            function resize($element, ratio) {
                var data = {
                    height: $element.attr('data-height') || $element.height(),
                    width: $element.attr('data-width') || $element.width()
                };
                $element.attr({
                    'data-height': data.height,
                    'data-width': data.width
                });
                var availableWidth = $('#contents').width();
                if (ratio || availableWidth < data.width) {
                    data.ratio = ratio || availableWidth / data.width;
                    data.width *= data.ratio;
                    data.height *= data.ratio;
                }
                $element.height(data.height);
                $element.width(data.width);
                return data.ratio || 1;
            }
        },
        setHeightToAuto: function(index, element) {
            // detects if element is overflowed
            if (element.offsetHeight < element.scrollHeight) {
                var $element = $(element);
                
                // prevent children with "position: fixed" and "min-height: inherit" from accidentally covering other elements
                $element.children().filter(function() {
                    var $this = $(this);
                    if ($this.css('position') == 'fixed') {
                        /*
                        var inline = this.style.minHeight;
                        var calculated = $this.css('min-height');
                        $this.css('min-height', 'inherited');
                        var inherited = $this.css('min-height');
                        $this.css('min-height', inline);
                        return calculated == inherited;
                        */
                        return true;
                    }
                }).css({
                    'min-height': 0 //$element.css('min-height')
                });
                
                $element.css({
                    'min-height': $element.css('height'),
                    'height': 'auto'
                });
            }
        },
        moveCaretToEnd: function(element) {
            var range = document.createRange();
            range.selectNodeContents(element);
            range.collapse(false);
            var selection = window.getSelection();
            selection.removeAllRanges();
            selection.addRange(range);
        },
        disableScrolling: function() {
            $(window).one('showIframe', function() {
                $(window).one('scroll resize', docent.util.disableScrollingListener);
            });
            var $html = $('html');
            var paddingRight = parseInt($html.css('padding-right'), 10);
            var previousWidth = $(document).width();
            $html.addClass('disable-scrolling').css('--docent-padding-right', $(document).width() - previousWidth + paddingRight);
            // disabling scrolling didn't work so we no longer have to compensate for the "missing" scrollbar
            // html { overflow-y: scroll; } is most likely set
            // for some reason typing to programmatically style <html> causes errors, so this is the next best solution
            if ($(document).width() != window.innerWidth) {
                $html.css('--docent-padding-right', '');
            }
        },
        disableScrollingListener: function(event) {
            docent.iframeBridge.hideIframe(0);
        },
        ObjectID: function() {
            var pad = function(num, size) {
                return ('00000000' + num.toString(16)).slice(-size);
            }
            if (!docent.util.ObjectID.increment) {
                docent.util.ObjectID.increment = Math.floor(Math.random() * (16777216));
            }
            else {
                docent.util.ObjectID.increment++;
            }
            var timestamp = parseInt(Date.now() / 1000, 10);
            var pid = Math.floor(Math.random() * (65536));
            var machine = Math.floor(Math.random() * (16777216));
            return pad(timestamp, 8) + pad(machine, 6) + pad(pid, 4) + pad(docent.util.ObjectID.increment, 6);
        },
        MD5: function($element, v2) {
            if (v2) {
                $element = $element.clone();
                $element.children('.docent-element-sticky,.docent-element-question,.docent-element-discussion').remove();
            }
            var text = $element.text() || $element.find('img').attr('src');
            return CryptoJS.MD5(text).toString();
        },
        shuffle: function(array) {
            var currentIndex = array.length;
            var temporaryValue;
            var randomIndex;

            while (currentIndex !== 0) {

                randomIndex = Math.floor(Math.random() * currentIndex--);

                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        },
        showNews: function(news, duration) {
            var $old = $('.docent-news');
            duration = duration || 3000;
            var $news = $('<p />', {
                class: 'docent-news',
                text: news
            });
            docent.container.append($news.css('z-index', docent.maxZ() + 10));
            $news.fadeIn(function() {
                $old.remove();
            });
            if (duration > 0) {
                setTimeout(function() {
                    $news.fadeOut(function() {
                        $news.remove();
                    });
                }, duration);
            }
            return $news;
        }
    },
    metadata: function() {
        docent.isQueryStringNeeded();
        var data = {};
        data.title = $('meta[property="og:title"]').attr('content') || $('title').html();
        data.image = $('meta[property="og:image"]').attr('content');
        data.distilled = document.body.dataset.domDistilled == 'true' ? 1 : 0;
        data.isTutorial = $('.docent-tutorial-modal').length > 0 ? 1 : 0;
        return data;
    },
    isQueryStringNeeded: function() {
        $.get(window.location.origin + window.location.pathname, function(response) {
            var $html = $('<html>', {
                html: response
            });
            var md5 = docent.util.MD5($('[class*="docent-element"],.docent-highlighted').closest('p,li,.docent-compatible'), true);
            var $test = $html.find('p,li,.docent-compatible').filter(function() {
                return docent.util.MD5($(this), true) == md5;
            });
            if ($test.length == 0) {
                docent.setQueryString();
            }
        }).fail(docent.setQueryString);
    },
    setQueryString: function() {
        var msg = {
            type: 'setQueryString',
            queryString: window.location.search
        };
        docent.iframeBridge.postMessage(msg);
    },
    renderDocent: function(data, docentID) {
        // Make sure <div> are marked compatible on Khan Academy
        if (location.origin == 'https://www.khanacademy.org') {
            docent.util.markCertainDivsAsCompatible();
        }
        if (data) {
            console.log('Rendering docent ' + docentID);
            var elementTypes = ['sticky', 'question', 'discussion'];
            var elements = [];
            for (var i in elementTypes) {
                if (!data[elementTypes[i] + 's']) continue;
                
                data[elementTypes[i] + 's'].forEach(function(obj) {
                    obj.elementType = elementTypes[i];
                });
                elements = elements.concat(data[elementTypes[i] + 's']);
            }
            elements.sort(function(a,b) {
                return a.created - b.created;
            });
            docent.elements.load(null, elements, data.isOwner);
            $('.docent-element-sticky,.docent-element-question,.docent-element-discussion').parents().each(docent.util.setHeightToAuto);
            
            if (data.notes) {
                docent.notes.load(data.notes, data.isOwner);
            }
            
            if (docent.experimental) {
                docent.util.youtube.videoQuestions.init();
                /*if ($('#docent-experimental-css').length == 0) {
                    $('<link />', {
                        id: 'docent-experimental-css',
                        rel: 'stylesheet',
                        href: docent.path() + 'docent.experimental.css?t=' + Date.now()
                    })
                    .appendTo(docent.container);
                }*/
            }
            
            if (data.accessCode) {
                docent.topbar.build(data.userName, data.accessCode);
            }
            if (data.teacherViewingAsStudent) {
                docent.topbar.teacherViewingAsStudent();
            }
            $('.docent-iframe-bridge').attr('data-url', data.url);
            
            if (docent.t0) {
                docent.iframeBridge.postMessage({
                    type: 'loadTime',
                    time: Date.now() - docent.t0
                });
                delete docent.t0;
            }
            if (data.scrollTo) {
                console.log('Scroll to:', data.scrollTo);
                var $element = $('[data-element-id="' + data.scrollTo + '"]').filter(':visible');
                
                $(window).scrollTop($element.offset().top + ($element.outerHeight() - window.innerHeight) / 2);
            }
        }
    },
    hideDocents: function() {
        docent.notes.remove($('.docent-highlighted'));
        $('.docent-element-question,.docent-element-sticky,.docent-element-discussion').remove();
    },
    // Experimental
    insertLessonTemplate: function(elements) {
        var container = docent.util.getArticleContainer();
        var event = $.Event('click');
        var $p = $(container).children('p');
        for (let element of elements) {
            if (typeof element.index == 'number') {
                event.target = $p.eq(element.index);
            }
            else {
                event.target = $(container).find('p,li,.docent-compatible').add('h1').eq(0);
                $(event.target).filter('h1').addClass('docent-compatible');
            }
            let $element = docent.elements.addElement(element.type, event, element.text, true);
            if (element.html) {
                $element.children('.docent-element-' + element.type + '-content').html(element.html);
                function saveElement() {
                    if ($element.attr('data-element-id')) {
                        docent.elements.saveOne(element.type, $element);
                        clearInterval(timer);
                    }
                }
                let timer = setInterval(saveElement, 100);
                saveElement();
            }
        }
        $('.docent-element-question,.docent-element-discussion').not('.docent-edit').addClass('docent-can-reply');
    },
    iframeBridge: function() {
        // Get any existing iframeBridge
        var $iframe = $('.docent-iframe-bridge');

        // Create iframeBridge if there aren't any
        if ($iframe.length == 0) {
            $iframe = $('<iframe />', {
                class: 'docent-iframe-bridge',
                src: docent.baseURL.toolbar + 'bridge.php',
                css: {
                    'z-index': docent.maxZ() + 100
                }
            });
        }
        // Reload docents and halt if iframeBridge is already attached
        if ($iframe.index() != -1) {
            docent.util.loading.show();
            var msg = {
                type: 'getDocents',
                migrated: true,
                forPath: window.location.pathname
            };
            if (document.contentType == 'application/pdf') {
                msg.isPDF = true;
            }
            if (location.origin == 'https://drive.google.com') {
                var contentType = $('[aria-label="General Info"] *').filter(function() { return this.textContent == 'Type'; }).next().text();
                // Google Drive can open multiple types of files in its viewer dialog
                if (contentType == 'PDF') {
                    msg.isPDF = true;
                }
            }
            docent.iframeBridge.postMessage(msg);
            return false;
        }
        // Otherwise attach iframeBridge to docent container
        $iframe.appendTo(docent.container);
        
        var iframeOrigin = 'https://insertlearning.com';
        docent.iframeBridge.postMessage = function(msg) {
            if (msg.isPDF && location.origin == 'https://drive.google.com' && location.pathname.indexOf('/file/') === 0) {
                docent.isPDF = true;
                delete msg.isPDF;
            }
            if (docent.iframeBridge.key) {
                msg.key = docent.iframeBridge.key;
            }
            (docent.iframeBridge.window || $iframe[0].contentWindow).postMessage(JSON.stringify(msg), iframeOrigin);
        };
        docent.iframeBridge.showIframe = function(speed) {
            $iframe.stop().animate({opacity: 1}, speed).css('z-index', docent.maxZ() + 100);
            $(window).trigger('showIframe');
        };
        docent.iframeBridge.hideIframe = function(speed, callback) {
            $iframe.animate({opacity: 0}, speed, function() {
                $iframe.css('z-index', -1);
                var msg = {
                    type: 'hideDiscussionFilter'
                };
                docent.iframeBridge.postMessage(msg);
                if (typeof callback === 'function') {
                    callback();
                }
                $('.docent-feedback').css('display', '');
                $(window).off('scroll resize', docent.util.disableScrollingListener);
            });
            $('html').removeClass('disable-scrolling').css('--docent-padding-right', '');
        };
        var changeWindow = false;
        docent.iframeBridge.contentSecurityPolicyFix = function() {
            $iframe.attr('src', chrome.runtime.getURL('/lib/iframe/iframe.html'));
            changeWindow = true;
        };
        // Handle issues with other extensions blocking third-party iframes
        docent.iframeBridge.useChromeExtension = function() {
            var link = document.createElement('a');
            link.href = chrome.runtime.getURL('/lib/iframe/bridge.html');
            iframeOrigin = link.origin;
            $iframe.attr('src', link.href).css('display', '');
        };

        // Bind message events that will be received from the login iframe
        $(window).on('message', handleMessage);
        function handleMessage(event) {
            event = event.originalEvent;

            if (event.origin === iframeOrigin) {
                // Quit if event.data isn't JSON
                if (!/^{.*}$/.test(event.data)) return;

                var msg = JSON.parse(event.data);
                switch (msg.type) {
                    case 'login':
                        if (changeWindow) {
                            docent.iframeBridge.window = event.source;
                            changeWindow = false;
                        }
                        $('.docent-logo').addClass('docent-logged-in');
                        docent.iframeBridge.hideIframe();
                        //docent.util.loading.show();
                        var msg = {
                            type: 'getDocents',
                            migrated: true,
                            forPath: window.location.pathname
                        };
                        if (document.contentType == 'application/pdf') {
                            msg.isPDF = true;
                        }
                        if (location.origin == 'https://drive.google.com') {
                            var contentType = $('[aria-label="General Info"] *').filter(function(){ return this.textContent == 'Type'; }).next().text();
                            // Google Drive can open multiple types of files in its viewer dialog
                            if (contentType == 'PDF') {
                                msg.isPDF = true;
                            }
                        }
                        docent.iframeBridge.postMessage(msg);
                        break;
                    case 'userType':
                        docent.setUserType(msg.userType);
                        if (msg.disableVideoRecording) {
                            docent.container.append('<style>.docent-element-sticky-video { display: none; }</style>')
                        }
                        if (msg.relay) {
                            chrome.runtime.sendMessage({
                                type: 'userType',
                                userType: msg.userType
                            });
                        }
                        break;
                    case 'logout':
                        docent.hideDocents();
                        $('.docent-logo').removeClass('docent-logged-in');
                        docent.annotationSwitcher.hide();
                        docent.iframeBridge.showIframe();
                        break;
                    case 'unload':
                        if (msg.google) {
                            docent.util.publishGoogleDoc();
                        }
                        docent.hideDocents();
                        if (docent.util.watch.observer) {
                            docent.util.watch.observer.disconnect();
                        }
                        docent.container.remove();
                        $(window).off('message', handleMessage);
                        break;
                    case 'renderDocent':
                        if (!msg.overlap) docent.hideDocents();
                        docent.renderDocent(msg.data, msg.docentID);
                        break;
                    case 'lessonTemplate':
                        docent.insertLessonTemplate(msg.elements);
                        break;
                    case 'docentCopied':
                        docent.topbar.docentCopied();
                        break;
                    case 'doneLoading':
                        docent.util.loading.done();
                        break;
                    case 'wrapString':
                        var $el = $('.docent-element-comment');
                        var originalHTML = $el.html();
                        var html = originalHTML;
                        var words = html.split(' ');
                        for (var i=0, l=words.length; i<l; ++i) {
                            if (words[i] == msg.string) words[i] = '<a href="' + msg.withURL + '">' + msg.string + '</a>';
                        }
                        html = words.join(' ');
                        $el.filter(function() { return this.innerHTML == originalHTML; }).html(html);
                        break;
                    case 'elementSaved':
                        var $element = $('.docent-element-' + msg.elementType + '[data-nonce="' + msg.nonce + '"]');
                        $element.attr('data-element-id', msg.elementID).removeAttr('data-nonce');
                        break;
                    case 'answerSaved':
                        var $question = $('.docent-element-question[data-ref="' + msg.ref + '"][data-created="' + msg.created + '"]');
                        if (typeof msg.index === 'number') {
                            $question.attr('data-index', msg.index);
                        }
                        var $selected = $question.children('.docent-selected').filter(function() {
                            return msg.text == $(this).text();
                        }).removeClass('docent-selected');
                        
                        if (msg.status == 'wrong') {
                            $selected.addClass('docent-wrong');
                            docent.questions.updateScore($question);
                        }
                        else if (msg.status == 'right') {
                            $selected.addClass('docent-right');
                            $question.children('.docent-element-question-score').addClass('docent-fraction');
                        }
                        else {
                            $selected.addClass('docent-selected docent-element-question-saved');
                        }
                        $question.children('.docent-element-question-saving')
                            .addClass('docent-element-question-saved')
                            .removeClass('docent-element-question-saving');
                        break;
                    case 'answerScore':
                        var $question = $('.docent-element-question[data-element-id="' + msg.questionID + '"]');
                        $question.children('.docent-element-question-score').text(msg.score).addClass('docent-fraction');
                        break;
                    case 'answerFeedback':
                        var $question = $('.docent-element-question[data-element-id="' + msg.questionID + '"]');
                        $question.children('.docent-element-question-feedback').remove();
                        var $questionFeedback = $('<docent-element>', {
                            class: 'docent-element-question-feedback',
                            text: msg.feedback.text,
                            'data-name': msg.feedback.userName,
                            'data-time': docent.util.getDateString(msg.feedback.modified || msg.feedback.created),
                        });
                        $question.children('.docent-element-question-answer').after($questionFeedback);
                        break;
                    case 'newResponse':
                        docent.discussions.newResponse(msg.discussion, msg.response);
                        break;
                    case 'updateResponse':
                        docent.discussions.newResponse(msg.discussion, msg.response, true);
                    case 'banResponse':
                        var $discussion = $('.docent-element-discussion[data-element-id="' + msg.discussionID + '"]');
                        var $response = $discussion.find('.docent-element-discussion-response[data-index="' + msg.index + '"]');
                        var method = (msg.banned ? 'add' : 'remove') + 'Class';
                        $response[method]('docent-banned');
                        break;
                    /* Collaborative editing */
                    case 'postNotes':
                        var isTeacher = !!$('.docent-teacher').length;
                        var ranges = {
                            theirs: docent.notes.getRange($('.docent-highlighted.docent-not-owner')),
                            mine: docent.notes.getRange($('.docent-highlighted'))
                        };
                        if (msg.isOwner && !isTeacher) {
                            docent.notes.makeFromRange(ranges.theirs);
                        }
                        if (!msg.isOwner && isTeacher) {
                            docent.notes.makeFromRange(ranges.mine);
                        }
                        docent.notes.load(msg.notes, msg.isOwner);
                        if (msg.isOwner && isTeacher) {
                            docent.notes.makeFromRange(ranges.theirs);
                        }
                        if (!msg.isOwner && !isTeacher) {
                            docent.notes.makeFromRange(ranges.mine);
                            docent.notes.save();
                        }
                        break;
                    case 'newElement':
                        docent.elements.load(msg.element.elementType, [msg.element], msg.isOwner);
                        break;
                    case 'editElement':
                        var prefix = '.docent-element-' + msg.element.elementType;
                        var $element = $(prefix + '[data-element-id="' + msg.element._id.$id + '"]');
                        if ($element.attr('data-modified') < msg.element.modified) {
                            var $content = $element.children(prefix + '-content').html(msg.element.text);
                            $element.attr('data-modified', msg.element.modified);
                            if (msg.element.score) {
                                var $score = $element.children(prefix + '-score');
                                $score.attr('data-max', msg.element.score).not('.docent-fraction').text(msg.element.score);
                            }
                        }
                        if (msg.save) {
                            docent[msg.element.elementType + 's'].saveOne($element);
                        }
                        break;
                    case 'deleteElement':
                        $('.docent-element-' + msg.element.elementType + '[data-element-id="' + msg.element._id.$id + '"]').remove();
                        break;
                    case 'postChoices':
                        var $question = $('.docent-element-question[data-element-id="' + msg.questionID + '"]');
                        if ($question.attr('data-modified') >= msg.modified) {
                            return false;
                        }
                        $question.attr('data-modified', msg.modified);
                        var $choices = $question.children('.docent-element-question-choice');
                        if (!msg.choices) {
                            $choices.remove();
                            break;
                        }
                        var deleted = (msg.currentChoices && msg.choices.length < msg.currentChoices.length);
                        
                        $choices.each(function() {
                            var $this = $(this);
                            var $choiceText = $this.children('.docent-element-question-choice-text');
                            var currentText = $choiceText.text();
                            var newIndex = msg.choices.indexOf(currentText);
                             
                            if (deleted && newIndex == -1) {
                                $this.remove();
                                return false;
                            }
                            var currentIndex = msg.currentChoices.indexOf(currentText);
                            
                            if (!deleted && msg.choices[currentIndex] != currentText) {
                                $choiceText.text(msg.choices[currentIndex]);
                                return false;
                            }
                            msg.currentChoices[currentIndex] = '';
                            msg.choices[newIndex] = '';
                        });
                        var newChoices = msg.choices.slice($choices.length);
                        for (var i in newChoices) {
                            $question.children('.docent-element-question-answer').text(newChoices[i]);
                            var $choice = docent.questions.newChoice($question, msg.isOwner, false, true);
                        }
                        if (msg.isOwner) $question.children('.docent-element-question-choice').each(function() {
                            var $this = $(this);
                            if ($this.children('.docent-element-question-choice-text').text() == msg.rightChoice) {
                                $this.addClass('docent-right').find('button .docent-fa').removeClass('fa-square-o').addClass('fa-check-square-o');
                            }
                            else {
                                $this.removeClass('docent-right').find('button .docent-fa').addClass('fa-square-o').removeClass('fa-check-square-o');
                            }
                        });
                        break;
                    /**/
                    case 'metadata':
                        var msg = {
                            type: 'metadata',
                            data: docent.metadata(),
                            path: window.location.pathname
                        };
                        docent.iframeBridge.postMessage(msg);
                        break;
                    case 'showAnnotationSwitcher':
                        docent.annotationSwitcher.show();
                        break;
                    case 'hideAnnotationSwitcher':
                        docent.annotationSwitcher.hide();
                        break;
                    case 'showIframe':
                        docent.iframeBridge.showIframe(msg.speed);
                        break;
                    case 'hideIframe':
                        docent.iframeBridge.hideIframe(msg.speed);
                        break;
                    case 'resizeThisIframe':
                        $('iframe').filter(function() {
                            return this.contentWindow == event.source;
                        })
                        .css({
                            width: msg.width,
                            height: msg.height
                        });
                        break;
                    case 'setDiscussionFilter':
                        docent.discussions.setFilter(msg);
                        break;
                    case 'setAnnotationSwitcher':
                        docent.annotationSwitcher.setValue(msg);
                        break;
                    case 'setQuestionStem':
                        docent.questions.setQuestionStem(msg);
                        break;
                    case 'badgeFeedbackButton':
                        if (msg.amount == 0) {
                            $('.docent-feedback').removeAttr('data-badged');
                        }
                        else {
                            $('.docent-feedback').attr('data-badged', msg.amount);
                        }
                        break;
                    case 'print':
                        docent.iframeBridge.hideIframe(0, window.print);
                        break;
                    case 'news':
                        docent.util.showNews(msg.news, msg.duration);
                        break;
                    case 'setMessagingKey':
                        docent.iframeBridge.key = msg.key;
                        break;
                }
            }
        }
        chrome.runtime.onMessage.addListener(function(message, sender) {
            if (message.type == 'relayFromIframeBridge') {
                var event = {
                    data: JSON.stringify(message.msg),
                    origin: iframeOrigin
                };
                handleMessage({originalEvent: event });
            }
        });
    },
    annotationSwitcher: {
        show: function() {
            var $switcher = $('.docent-annotation-switcher');
            if (!$switcher.length) {
                $switcher = $('<div>', {
                    class: 'docent-annotation-switcher',
                    'data-title': 'View Student Annotations'
                })
                .on('mouseenter', function(event) {
                    if (!$switcher.hasClass('docent-expanded')) {
                        docent.tooltip.show($switcher[0]);
                    }
                })
                .on('mouseleave click', function(event) {
                    docent.tooltip.hide($switcher[0]);
                });
                var $button = $('<button>', {
                    type: 'button',
                    class: 'docent-fa fa-users'
                })
                .on('click', function(event) {
                    $('.docent-annotation-switcher').toggleClass('docent-expanded');
                    docent.sidebar.triggerGoogleAnalyticsEvent('View Student Annotations', !$('.docent-annotation-switcher').hasClass('docent-expanded'));
                });
                var $select = $('<span>', {
                    text: 'Choose student:'
                })
                .on('click', function(event) {
                    var msg = {
                        type: 'showAnnotationSwitcher'
                    };
                    docent.iframeBridge.postMessage(msg);
                    docent.util.disableScrolling();
                });
            }
            $switcher.append($button).append($select).prependTo(docent.container).css('z-index', docent.maxZ() + 1).show();
        },
        hide: function() {
            $('.docent-annotation-switcher').hide().removeClass('docent-expanded');
        },
        setValue: function(data) {
            var $switcher = $('.docent-annotation-switcher');
            var $select = $switcher.children('span').attr('data-value', data.value);
            if ($select[0].attachShadow) {
                var $clone = $select.clone(true);
                var root = $clone[0].attachShadow({mode: 'closed' });
                root.textContent = data.text;
                $select.replaceWith($clone);
            }
            else {
                $select.text(data.text);
            }
        },
    },
    setUserType: function(userType) {
        if (['social','student','teacher'].indexOf(userType) != -1) {
            $('.docent-sidebar')
                .removeClass('docent-student docent-social docent-teacher')
                .addClass('docent-' + userType);
            $('.docent-logo').attr('data-title', userType == 'teacher' ? 'Assign' : 'Settings');
        }
    },
    maxZ: function() {
        var maxZ = 0;
        $('*').each(function() {
            var thisZ = Number($(this).css('z-index'));
            if (thisZ > maxZ) maxZ = thisZ;
        });
        return maxZ;
    },
    path: function() {
        return docent.baseURL.toolbar;
    },
    baseURL: {
        domain: 'https://insertlearning.com/',
        version: 'v1'
    }
};
docent.baseURL.toolbar = docent.baseURL.domain + docent.baseURL.version + '/toolbar/';
docent.baseURL.dashboard = docent.baseURL.domain + docent.baseURL.version + '/dashboard/';

$(document).ready(function() {
    if (location.origin == 'https://www.readworks.org' && location.pathname.indexOf('article') == 1) {
        chrome.runtime.sendMessage({type: 'getReadworksArticle', uuid: location.pathname.split('/')[3] }, function(response) {
            $('article').html(response.content);
            $('audio').replaceWith(function() { return this.outerHTML; });
        });
    }
    if (!Element.prototype.attachShadow && Element.prototype.createShadowRoot) {
        Element.prototype.attachShadow = Element.prototype.createShadowRoot;
    }
    docent.init();
    $('.docent-tutorial-modal').addClass('hidden').find('.tutorial-start-hint').remove();
});
