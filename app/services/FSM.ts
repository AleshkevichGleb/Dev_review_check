import {Card, Context, FSMStates} from "../types/types.ts";
import {cardDeck} from "../data/CardDeck.ts";
import {TWENTY_ONE} from "../constants/constants.ts";


class FSM {
    context: Context = {
        allCards: [...cardDeck],
        playerCards: [],
        dealerCards: [],
        dealerScore: 0,
        playerScore: 0
    };
    state: FSMStates = FSMStates.BET;

    handleEvent(event: 'start' | 'hit' | 'skip' | 'x2') {
        switch (event) {
            case "start": {
                this.state = FSMStates.USER_PLAY
                this.startGame();
                this.countScore()

                if(this.context.playerScore === TWENTY_ONE)
                    this.checkResult();

                break;
            }
            case "hit": {
                this.context.playerCards.push(this.drawCard())
                this.countScore();

                if(this.context.playerScore >= TWENTY_ONE)
                    this.checkResult();

                break;
            }

            case "x2": {
                this.context.playerCards.push(this.drawCard())
                this.countScore();
                this.checkResult();

                break;
            }

            case "skip": {
                this.state = FSMStates.BOT_PLAY;
                this.dealerPlay();
                break;
            }
            default: break;
        }
    }
    checkResult () {
        const playerScore = this.context.playerScore;
        const dealerScore = this.context.dealerScore;

        if(playerScore === dealerScore) {
            this.state = FSMStates.DRAW;
        } else if (playerScore > TWENTY_ONE || playerScore < TWENTY_ONE && playerScore < dealerScore && dealerScore <= TWENTY_ONE ) {
            this.state = FSMStates.USER_LOST;
        } else if (playerScore > dealerScore && playerScore <= TWENTY_ONE) {
            this.state = FSMStates.USER_WON;
        } else if (dealerScore > TWENTY_ONE && playerScore <= TWENTY_ONE) {
            this.state = FSMStates.USER_WON;
        }

    }

    drawCard(): Card {
        const randomIndex = Math.floor(Math.random() * this.context.allCards.length);
        const drawCard = this.context.allCards[randomIndex];
        this.context.allCards = this.context.allCards.filter(card => card.id !== drawCard.id);
        return drawCard
    }
    dealerPlay() {
        while (this.context.dealerScore < this.context.playerScore && this.context.dealerScore < 20) {
            this.context.dealerCards.push(this.drawCard())
            this.countScore();
        }
        this.checkResult();
    }
    countScore() {
        const calculateScore = (cards: Card[]) => {
            let totalScore = 0;
            let acesCount = 0;

            for (const card of cards) {
                if (card.name === 'T') {
                    acesCount += 1;
                    totalScore += 11;
                } else {
                    totalScore += card.value;
                }
            }

            while (totalScore > 21 && acesCount > 0) {
                totalScore -= 10;
                acesCount -= 1;
            }

            return totalScore;
        }

        this.context.dealerScore = calculateScore(this.context.dealerCards);
        this.context.playerScore = calculateScore(this.context.playerCards);
    }

    startGame() {
        this.context.playerCards = [];
        this.context.dealerCards = [];
        this.context.allCards = [...cardDeck];

        this.context.playerCards = [this.drawCard(), this.drawCard()];
        this.context.dealerCards = [this.drawCard(), this.drawCard()];
    }
}

export default FSM;