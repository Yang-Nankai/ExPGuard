$(document).ready(function() {
    var statusMessage = window.statusMessage || function(msg, delay) {
        delay = delay || 3000;
        var msg = {
            type: 'news',
            news: msg,
            duration: delay
        };
        window.parent.postMessage(JSON.stringify(msg),'*');
    };
    $('.referral-dialog').on('click', '.referral-select-all', function(event) {
        $('.referral-option').not('.selected').click();
    })
    .on('click', '.referral-deselect-all', function(event) {
        $('.referral-option.selected').click();
    })
    .on('change', '.referral-option-checkbox', function(event) {
        $(this).parent().toggleClass('selected');
        var $rows = $('.referral-option');
        if ($rows.not('.selected').length > 0) {
            $('.referral-deselect-all').attr('class', 'referral-select-all');
        }
        else {
            $('.referral-select-all').attr('class', 'referral-deselect-all');
        }
        $('.referral-confirm').prop('disabled', $rows.filter('.selected').length == 0);
    })
    .on('keypress', '.referral-custom-input', function(event) {
        if (event.which == 13) {
            $('.referral-custom-add').click();
            event.preventDefault();
        }
    })
    .on('click', '.referral-custom-add', function(event) {
        var $customInput = $('.referral-custom-input');
        var email = $customInput.val();
        if (!email) {
            return;
        }
        var $row = referral.GooglePeople.createRowForContact({
            emailAddresses: [{
                value: email
            }]
        });
        $('.referral-select').append($row);
        $row.children('input').click();
        $customInput.val('');
        $('.referral-import').hide();
    })
    .on('click', '.referral-import', function(event) {
        referral.GooglePeople.listConnections();
    })
    .on('click', '.referral-confirm', function(event) {
        var $this = $(this);
        // Inviting contacts is one of our viral hooks
        // can probably come up with a better name for this api endpoint
        var url = baseURL.api + 'virality';
        var data = $(this).next('.referral-select').serialize();
        $.post(url, data, function(response) {
            $this.prop('disabled', false).parent().css('cursor', '');
            if (typeof window.hideIframe === 'function') {
                hideIframe();
            }
            else {
                $('.referral-modal').fadeOut(100);
            }
            statusMessage('Successfully sent invites.');
        })
        .fail(function() {
            $this.prop('disabled', false).css('cursor', '');
            statusMessage('Failed to send invites. Please try again.');
        });
        $this.prop('disabled', true).parent().css('cursor', 'wait');
    })
    // Modified code from Share Modal. Look into combining this and that into one function.
    .on('click', '.referral-social .fa', function(event) {
        var $this = $(this);
        var url;
        if ($this.hasClass('fa-twitter-square')) {
            var data = {
                text: 'Join @InsertLearning with this link and the two of us will get a FREE month:',
                url: $('.referral-social input').val(),
                related: 'InsertLearning'
            };
            url = 'https://twitter.com/intent/tweet?' + $.param(data);
        }
        else if ($this.hasClass('fa-facebook-square')) {
            var data = {
                u: $('.referral-social input').val()
            };
            url = 'https://www.facebook.com/sharer/sharer.php?' + $.param(data);
        }
        var top = 0;
        var left = 0;
        if (screen.height > 414) {
            top = Math.round((screen.height - 414) / 3);
        }
        if (screen.width > 568) {
            left = Math.round((screen.width - 568) / 2);
        }
        var ref = window.open(url, '_blank', 'location=no,width=568,height=414,top=' + top + ',left=' + left + ',closebuttoncaption=Cancel');
        ref.addEventListener('loadstart', function(event) {
            if (event.url.split('?')[0] == 'https://twitter.com/intent/tweet/complete') {
                ref.close();
            }
        }, false);
    })
    .on('click', '.referral-social input', function(event) {
        $(this).select();
    });
});

var referral = {
    GooglePeople: {
        listConnections: function(prompt) {
            var config = {
                url: 'https://people.googleapis.com/v1/people/me/connections',
                data: {
                    pageSize: 500,
                    'requestMask.includeField': 'person.names,person.email_addresses',
                    sortOrder: 'LAST_NAME_ASCENDING'
                },
                scopes: 'https://www.googleapis.com/auth/contacts.readonly',
                done: referral.GooglePeople.listConnectionsDone,
                fail: referral.GooglePeople.listConnectionsFail,
                prompt: prompt
            };
            config.denied = config.fail;
            try {
                useOtherGoogleAPI(config);
            }
            catch(e) {
                console.log(e.message);
                referral.GooglePeople.listConnectionsDone({connections: [] });
            }
        },
        listConnectionsDone: function(response) {
            $('.referral-import').hide();
            var $dialog = $('.referral-dialog');
            $dialog.find('.referral-option').remove();
            $dialog.children('.referral-confirm').prop('disabled', true);
            var $rows = $();
            if (!response.connections) {
                response.connections = [];
            }
            for (var i in response.connections) {
                var contact = response.connections[i];
                if (!contact.emailAddresses) {
                    continue;
                }
                var $row = referral.GooglePeople.createRowForContact(contact);
                $rows = $rows.add($row);
            }
            $dialog.children('.referral-select').append($rows);
            $dialog.show().parent().fadeIn(100);
            // should probably be a different function
            $('.referral-social input').val(baseURL.domain + baseURL.version + '/invite/' + _userInfo.viralityCode);
            if (window.innerHeight < 640) {
                var widthDiff = window.innerWidth - $('body').width();
                $('body').css('overflow-y', 'hidden');
                $('#header,#body').css('width', 'calc(100% - ' + widthDiff + 'px)');
            }
        },
        listConnectionsFail: function(xhr) {
            console.log('Error getting contacts', xhr);
            referral.GooglePeople.listConnectionsDone({connections: [] });
            $('.referral-import').show();
        },
        createRowForContact: function(contact) {
            var name, email, sort;
            email = contact.emailAddresses[0].value;
            if (contact.names) {
                name = contact.names[0].displayName;
                sort = contact.names[0].familyName;
            }
            else {
                sort = name = email.split('@')[0];
            }
            var $row = $('<label>', {
                class: 'referral-option'
            });
            var $checkbox = $('<input>', {
                type: 'checkbox',
                name: 'emails[]',
                class: 'referral-option-checkbox',
                value: email
            });
            var $name = $('<span>', {
                class: 'referral-option-name',
                text: name
            });
            var $email = $('<span>', {
                class: 'referral-option-email',
                text: email
            });
            $row.append($checkbox, $name, $email);
            return $row;
        }
    }
};
