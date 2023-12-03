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

    document.getElementById('player-hand').innerHTML = formatHand(data.playerHand);
    document.getElementById('dealer-hand').innerHTML = formatHand(data.dealerHand);
    document.getElementById('result').innerHTML = data.result;
}

function formatHand(hand) {
    return hand.map(card => `${card.rank} of ${card.suit}`).join('<br>');

}