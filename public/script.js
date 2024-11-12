const socket = io();

socket.on('update-likes', (data) => {
    const { cardId, totalLikes } = data;
    const cardElement = document.getElementById(`card-${cardId}`);
    const likesElement = cardElement.querySelector('.likes-count');
    likesElement.innerText = totalLikes;
    
    // Reordenar cards automáticamente
    reorderCards();
});

socket.on('update-deslikes', (data) => {
    const { cardId, totalDeslikes } = data;
    const cardElement = document.getElementById(`card-${cardId}`);
    const deslikesElement = cardElement.querySelector('.deslikes-count');
    deslikesElement.innerText = totalDeslikes;
});

function reorderCards() {
    const cardsContainer = document.getElementById('cards');
    const cards = Array.from(cardsContainer.children);
    
    // Ordenar por likes de mayor a menor
    cards.sort((a, b) => {
        const likesA = parseInt(a.querySelector('.likes-count').innerText);
        const likesB = parseInt(b.querySelector('.likes-count').innerText);
        return likesB - likesA;
    });

    // Reemplazar el orden de los elementos
    cards.forEach(card => cardsContainer.appendChild(card));
}

function likeCard(cardId) {
    socket.emit('like', cardId);
}

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