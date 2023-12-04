function hit() {
    fetch('/hit', { method: 'GET' })
        .then(response => response.json())
        .then(data => updateUI(data));
}

function stand() {
    fetch('/stand', { method: 'GET' })
        .then(response => response.json())
        .then(data => updateUI(data));
}

function newGame() {
    fetch('/newGame', { method: 'GET' })
        .then(response => response.json())
        .then(data => updateUI(data));
}

function updateUI(data) {
    console.log('Received data:', data);

    updateHand('player-hand', data.playerHand);
    updateHand('dealer-hand', data.dealerHand);

    document.getElementById('result').innerHTML = data.result || '';
}

function updateHand(handId, hand) {
    const handContainer = document.getElementById(handId);
    const formattedHand = formatHand(hand);

    handContainer.innerHTML = formattedHand;

    // Use setTimeout to trigger the sliding animation
    setTimeout(() => {
        const cards = handContainer.querySelectorAll('.card');
        cards.forEach(card => card.classList.add('slide-in'));
    }, 10);
}

function formatHand(hand) {
    return hand.map((card, index) => {
        const cardImage = getCardImageSrc(card);
        const isNewCard = card.newlyDrawn ? 'new-card' : '';

        return `<img class="card ${isNewCard}" src="${cardImage}" alt="${card.rank} of ${card.suit}" title="${card.rank} of ${card.suit}">`;
    }).join('');
}

function getCardImageSrc(card) {
    const rank = card.rank === '10' ? '10' : card.rank[0]; // Special case for 10
    const suit = card.suit.toLowerCase();
    return `/images/${rank}_of_${suit}.png`;
}