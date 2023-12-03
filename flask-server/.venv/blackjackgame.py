import random

class BlackjackGame:
    def __init__(self):
        self.deck = self.createDeck()
        self.playerHand = []
        self.dealerHand = []
        self.result = None
        self.reset()

    # Creation of deck dictionary, randomization of deck
    def createDeck(self):
        suits = ['Hearts', 'Clubs', 'Spades', 'Diamonds']
        ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']

        deck = [{'rank': rank, 'suit': suit} for rank in ranks for suit in suits]
        random.shuffle(deck)

        return deck
    
# Dealing Cards

    # Card dealing
    def dealCard(self, hand):
        card = self.deck.pop()
        hand.append(card)

    # Creation of initial hands
    def dealInitialCards(self):
        for i in range(2):
            self.dealCard(self.playerHand)
            self.dealCard(self.dealerHand)

# Game Scores
    # Define card values
    def cardValue(self, rank):
        if rank in ['J', 'Q', 'K']:
            return 10
        elif rank == 'A':
            return 11 
        # Swapping this to a 1 in a case where you would go over is handled in calculateScore below
        else:
            return int(rank)
        
    # Calculate Score
    def calculateScore(self, hand):
        score = sum(self.cardValue(card['rank']) for card in hand)
        if score > 21 and 'A' in [card['rank'] for card in hand]: #Handles aces putting you over
            score -= 10
        return score
    
# Gameplay Logic
    def hit(self):
        if not self.result and self.calculateScore(self.playerHand) < 21:
            self.dealCard(self.playerHand)
        if self.calculateScore(self.playerHand) >= 21:
            self.stand()

    def stand(self):
        if not self.result:
            while self.calculateScore(self.dealerHand) < 17:
                self.dealCard(self.dealerHand)
            self.gameResult
    
    def reset(self):
        self.deck = self.createDeck()
        self.playerHand = []
        self.dealerHand = []
        self.dealInitialCards()
        self.result = None
    
    def gameResult(self):
        playerScore = self.calculateScore(self.playerHand)
        dealerScore = self.calculateScore(self.dealerHand)

        if playerScore > 21:
            self.result = "You went over, nice loss chump."
        elif dealerScore > 21:
            self.result = "Easy dub, dealer is throwing the game."
        elif playerScore == dealerScore:
            self.result = "Y'all tied, that's wild broski."
        elif playerScore == 21:
            self.result = "Blackjack! You won out big brotherman!"
        elif dealerScore == 21:
            self.result = "Dealer pulled a Blackjack, unlucky."
        elif playerScore > dealerScore:
            self.result = "You won! Ez clap."
        else:
            self.result = "You lost, tough luck dawg"