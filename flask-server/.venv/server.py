from flask import Flask, render_template, jsonify, send_from_directory
from blackjackgame import BlackjackGame
import os

app = Flask(__name__, static_url_path='/static')
game = BlackjackGame()

@app.route("/")
def index(name=None):
    return render_template('index.html', name=name)

@app.route('/newGame')
def newGame():
    game.reset()
    return jsonify({
        'playerHand': game.playerHand.copy(),
        'dealerHand': game.dealerHand.copy(),
        'result': game.result
    })

@app.route('/hit')
def hit():
    game.hit()
    return jsonify({
        'playerHand': game.playerHand.copy(),
        'dealerHand': game.dealerHand.copy(),
        'result': game.result
    })

@app.route('/stand')
def stand():
    game.stand()
    return jsonify({
        'playerHand': game.playerHand.copy(),
        'dealerHand': game.dealerHand.copy(),
        'result': game.result
    })

@app.route('/gameState', methods=['GET'])
def getGameState():
    return jsonify({
        'playerHand': [card.copy() for card in game.playerHand],
        'dealerHand': [card.copy() for card in game.dealerHand],
        'result': game.result
    })

# Defining routing for images so the frontend can display them
@app.route('/images/<path:filename>')
def serve_image(filename):
    root_dir = os.path.dirname(os.path.abspath(__file__))
    return send_from_directory(os.path.join(root_dir, 'images'), filename)

if __name__ == '__main__':
    app.run(debug=True)