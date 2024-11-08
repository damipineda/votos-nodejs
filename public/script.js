const socket = io();

socket.on('update-likes', (cardId) => {
    const cardElement = document.getElementById(`card-${cardId}`);
    const likesElement = cardElement.querySelector('.likes-count');
    const currentLikes = parseInt(likesElement.innerText);
    likesElement.innerText = currentLikes + 1; // Incrementar el conteo de likes
});

// Función para emitir el evento de 'like'
function likeCard(cardId) {
    socket.emit('like', cardId);
}

document.querySelectorAll('.like-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe
        const cardId = this.getAttribute('data-card-id');
        likeCard(cardId); // Llama a la función likeCard
    });
});