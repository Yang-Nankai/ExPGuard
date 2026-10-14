$(window).ready(function() {
    var $modal = $('<div>', {
        class: 'docent-tutorial-modal'
    });
    var $dialog = $('<div>', {
        class: 'docent-tutorial-dialog'
    })
    .append([
        $('<p>', {
            text: 'Create a lesson with at least one question.'
        }),
        $('<p>', {
            text: 'Click on the InsertLearning extension to get started.',
            class: 'tutorial-start-hint'
        })
    ]);
    $modal.append($dialog).css('z-index', maxZ()).appendTo('body');
    
    function maxZ() {
        var maxZ = 0;
        $('*').each(function() {
            var thisZ = Number($(this).css('z-index'));
            if (thisZ > maxZ) maxZ = thisZ;
        });
        return maxZ;
    }
    
    $('body').on('click', '.docent-element-question-create', function(event) {
        $dialog.html([
            $('<p>', {
                text: 'Good job!'
            }),
            $('<p>', {
                html: [
                    'Click on the toolbar\'s ellipsis button (',
                    '<img src="https://insertlearning.com/v1/toolbar/ellipsis.svg" />',
                    ') to go to the dashboard or to assign this lesson to students.'
                ]
            })
        ]);
    });
});
