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

    handleEvent(event: 'start' | 'hit' | 'skip') {
        switch (event) {
            case "start": {
                this.startGame();
                this.countScore()
                this.state = FSMStates.USER_PLAY
                break;
            }
            case "hit": {
                this.context.playerCards.push(this.drawCard())
                this.countScore();

                if(this.context.playerScore >= 21) this.checkResult();

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
        } else if (playerScore > TWENTY_ONE || playerScore < TWENTY_ONE && playerScore < dealerScore && dealerScore < TWENTY_ONE ) {
            this.state = FSMStates.USER_LOST;
        } else if (playerScore > dealerScore && playerScore <= TWENTY_ONE) {
            this.state = FSMStates.USER_WON;
        } else if (dealerScore > TWENTY_ONE && playerScore <= TWENTY_ONE) {
            console.log('aaaaaaa')
            this.state = FSMStates.USER_WON;
        }

    }

    drawCard(): Card {
        console.log(this.context.allCards)
        const randomIndex = Math.floor(Math.random() * this.context.allCards.length);
        return this.context.allCards.splice(randomIndex, 1)[0];
    }
    // drawCard(): Card {
    //     const randomIndex = Math.floor(Math.random() * this.context.allCards.length);
    //     return this.context.allCards[randomIndex];
    // }
    dealerPlay() {
        while (this.context.dealerScore < this.context.playerScore && this.context.dealerScore < 20) {
            this.context.dealerCards.push(this.drawCard());
            this.countScore();
        }
        this.checkResult();
    }
    countScore() {
        this.context.dealerScore = this.context.dealerCards.reduce((acc, card) =>
            (card.name === 'T' && acc + 11 > 21) ?  acc + 1 : acc + card.value, 0);

        this.context.playerScore = this.context.playerCards.reduce((acc, card) =>
            (card.name === 'T' && acc + 11 > 21) ?  acc + 1 : acc + card.value, 0);
    }

    startGame() {
        this.context.playerCards = [this.drawCard(), this.drawCard()];
        this.context.dealerCards = [this.drawCard(), this.drawCard()];
    }
}

export default FSM;