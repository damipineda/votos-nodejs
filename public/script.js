const socket = io();

socket.on('update-likes', (cardId) => {
    const cardElement = document.getElementById(`card-${cardId}`);
    const likesElement = cardElement.querySelector('.likes-count');
    const currentLikes = parseInt(likesElement.innerText);
    likesElement.innerText = currentLikes + 1; // Incrementar el conteo de likes
});
socket.on('update-deslikes', (cardId) => {
    const cardElement = document.getElementById(`card-${cardId}`);
    const deslikesElement = cardElement.querySelector('.deslikes-count');
    const currentDeslikes = parseInt(deslikesElement.innerText);
    deslikesElement.innerText = currentDeslikes + 1; // Incrementar el conteo de deslikes
});

// Función para emitir el evento de 'like'
function likeCard(cardId) {
    socket.emit('like', cardId);
}

// Función para emitir el evento de 'dislike'
function dislikeCard(cardId) {
    socket.emit('dislike', cardId);
}

// Manejar el envío de formularios de like y dislike
document.querySelectorAll('.like-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que el formulario se envíe
        const cardId = this.getAttribute('data-card-id');
        likeCard(cardId); // Llama a la función likeCard
    });
});

// Manejar el envío de formularios de dislike
document.querySelectorAll('.dislike-form').forEach(form => {
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const cardId = this.getAttribute('data-card-id');
        dislikeCard(cardId);
    });
});