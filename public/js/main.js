/**
 * Created by qol776 on 9/12/16.
 */
var closeModal = function() {
    $('#create-new-note').css('display', 'none');
};

var getNotes = function() {
    $.ajax({
        url: '/v1/notes',
        type: 'GET',
        success: function(data, textStatus, jqXHR) {
            populateNotes($.parseJSON(jqXHR.responseText));
            console.log(textStatus);
        },
        error: function(jqXHR, textStatus, data) {
            console.log(textStatus);
        }
    })
};

var populateNotes = function(notes) {
    var notesTable = $('#displayed-notes');

    console.log(notes);

    /*notes.forEach(function(note) {
        notesTable.append("<tr><td></td>" + )
    })*/
};

$(document).ready(function() {

    $('#new-note').click(function() {
        $('#create-new-note').css('display', 'block');
    });

    $('.close-modal').click(function() {
        closeModal();
    });

    $('#save-note').click(function() {
        console.log('save note clicked');
        $.ajax({
            url: '/v1/notes',
            type: 'POST',
            data: {
                'noteTitle': $('#note-title').val(),
                'noteBody': $('#note-body').val()
            },
            success: function(data, textStatus, jqXHR) {
                closeModal();
                console.log(textStatus);
            },
            error: function(jqXHR, textStatus, err) {
                closeModal();
                console.log(textStatus);
            }
        });
    });
});