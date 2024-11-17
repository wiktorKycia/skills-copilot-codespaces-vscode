document.getElementById('addCommentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const message = document.getElementById('message').value;

    fetch('/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('addCommentForm').reset(); // Resetuj formularz
        loadComments(); // Załaduj komentarze po dodaniu nowego
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('editCommentForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('commentId').value;
    const message = document.getElementById('newMessage').value;

    fetch(`/comments/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    })
    .then(response => response.text())
    .then(data => {
        alert(data);
        document.getElementById('editCommentForm').reset(); // Resetuj formularz
        loadComments(); // Załaduj komentarze po edycji
    })
    .catch(error => console.error('Error:', error));
});

function loadComments() {
    fetch('/comments')
    .then(response => response.json())
    .then(comments => {
        const commentsTableBody = document.getElementById('commentsTable').getElementsByTagName('tbody')[0];
        commentsTableBody.innerHTML = ''; // Wyczyść tabelę
        comments.forEach(comment => {
            const row = commentsTableBody.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = comment.message;
            cell.title = `ID: ${comment.id}`; // Pokaż ID komentarza po najechaniu myszką

            const actionsCell = row.insertCell(1);
            const copyButton = document.createElement('button');
            copyButton.textContent = 'Copy ID';
            copyButton.addEventListener('click', function () {
                navigator.clipboard.writeText(comment.id).then(() => {
                    alert('ID copied to clipboard');
                }).catch(err => {
                    console.error('Could not copy text: ', err);
                });
            });
            actionsCell.appendChild(copyButton);
        });
    })
    .catch(error => console.error('Error:', error));
}

// Załaduj komentarze po załadowaniu strony
document.addEventListener('DOMContentLoaded', loadComments);