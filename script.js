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
    })
    .catch(error => console.error('Error:', error));
});