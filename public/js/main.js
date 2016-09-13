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

var sortNotes = function(notes) {
    notes.sort(function(a,b) {
        return a.date - b.date;
    });

    return notes;
};

var populateNotes = function(notes) {
    var notesTable = $('#displayed-notes');
    var sortedNotes = sortNotes(notes);


    sortedNotes.forEach(function(note) {
        notesTable.append("<tr><td>" + note.date + "</td>" +
            "<td>" + note.title + "</td>" +
            "<td>" + note.body + "</td></tr>");
    });
};

$(document).ready(function() {
    getNotes();

    $('#new-note').click(function() {
        $('#create-new-note').css('display', 'block');
    });

    $('.close-modal').click(function() {
        closeModal();
    });

    $('#save-note').click(function() {
        console.log('save note clicked');
        console.log($('#note-title').val());
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
