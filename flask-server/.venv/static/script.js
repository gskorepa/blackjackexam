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
        let formattedHand = '';
        for (let i = 0; i < hand.length; i++) {
            formattedHand += `${hand[i].rank} of ${hand[i].suit}<br>`;
        }
        return formattedHand;
    } else {
        console.error('Invalid hand:', hand);
        return 'Invalid hand';
    }
}