function closeModal() {
    renderUi();
}

function addNote() {

    document.querySelector('#note-title').value = null;
    document.querySelector('#note-content').value = null;
    document.querySelector('#error').style.display = 'none';
    document.querySelector('.note-modal').style.display = 'block';

}


function formatDate(date) {
    date = new Date(date);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
}

function addNoteAction() {
    var title = document.querySelector('#note-title').value;
    var content = document.querySelector('#note-content').value;

    if (content && title) {
        var note = {
            title: title,
            content: content,
            date: new Date()
        };

        var notes = localStorage.getItem('notes');
        if (!notes) {
            notes = [];
        } else {
            notes = JSON.parse(notes);
        }

        notes.push(note);
        localStorage.setItem('notes', JSON.stringify(notes));

        renderUi();

    } else {
        document.querySelector('#error').style.display = 'block';
    }
}


function deleteNote(index) {
    var notes = localStorage.getItem('notes');

    if (notes) {
        notes = JSON.parse(notes);
    }

    if (notes) {
        notes.splice(index, 1);
    }
    localStorage.setItem('notes', JSON.stringify(notes));

    renderUi();
}

function renderUi() {
    document.querySelector('.new-note-empty').style.display = 'block';
    document.querySelector('.new-note-standard').style.display = 'block';

    var notes = localStorage.getItem('notes');

    if (notes) {
        notes = JSON.parse(notes);
    }

    document.querySelector('.notes').innerHTML = null;
    if (!notes || notes.length === 0) {
        document.querySelector('.new-note-standard').style.display = 'none';
    } else {
        document.querySelector('.new-note-empty').style.display = 'none';

        notes.forEach(function(n, index) {
            var div = document.createElement('div');
            div.className = 'note';

            var divNc = document.createElement('div');
            divNc.className = 'note-content';

            var title = document.createElement('div');
            title.className = 'title';
            title.innerText = n.title;

            var content = document.createElement('div');
            content.className = 'content';
            content.innerText = n.content;

            var date = document.createElement('div');
            date.className = 'date';
            date.innerText = formatDate(n.date);

            var del = document.createElement('img');
            del.className = 'delete';
            del.src = 'delete.svg';
            del.addEventListener('click', function () {
                deleteNote(index);
            });

            divNc.appendChild(title);
            divNc.appendChild(date);
            divNc.appendChild(content);

            div.appendChild(divNc);
            div.appendChild(del);

            document.querySelector('.notes').appendChild(div);

        });
    }

    document.querySelector('.note-modal').style.display = 'none';

}

(function () {
    renderUi();
})()