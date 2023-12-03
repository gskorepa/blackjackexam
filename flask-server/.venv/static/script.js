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

    if (data.playerHand && Array.isArray(data.playerHand)) {
        document.getElementById('player-hand').innerHTML = formatHand(data.playerHand);
    } else {
        console.error('Invalid player hand:', data.playerHand);
        document.getElementById('player-hand').innerHTML = 'Invalid player hand';
    }

    if (data.dealerHand && Array.isArray(data.dealerHand)) {
        document.getElementById('dealer-hand').innerHTML = formatHand(data.dealerHand);
    } else {
        console.error('Invalid dealer hand:', data.dealerHand);
        document.getElementById('dealer-hand').innerHTML = 'Invalid dealer hand';
    }

    document.getElementById('result').innerHTML = data.result || '';
}

function formatHand(hand) {
    if (Array.isArray(hand)) {
        return hand.map(card => {
            const cardImage = getCardImageSrc(card);
            return `<img class="card" src="${cardImage}" alt="${card.rank} of ${card.suit}" title="${card.rank} of ${card.suit}">`;
        }).join('');
    } else {
        console.error('Invalid hand:', hand);
        return 'Invalid hand';
    }
}

function getCardImageSrc(card) {
    const rank = card.rank === '10' ? '10' : card.rank[0]; // Special case for 10
    const suit = card.suit.toLowerCase();
    return '/images/' + rank + '_of_' + suit + '.png';
}