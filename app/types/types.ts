export interface LoginUser {
    email: string,
    password: string,
}

export interface IBet {
    count: number,
    bet: number,
    image: string,
}

export interface Card {
    id: number,
    name: '6' | '7' | '8' | '9' | '10' | 'J' | 'D' | 'K' | 'T',
    value: 1 | 6 | 7 | 8 | 9 | 10 | 11,
    suit: '♠' | '♥' | '♣' | '♦',
}

export interface Context {
    allCards: Card[],
    playerCards: Card[],
    dealerCards: Card[],
    playerScore: number,
    dealerScore: number,
}

export type FSMState = 'BET_STAGE' | 'USER_PLAY_STAGE' | 'BOT_PLAY_STATE' | 'GAME_OVER'
export enum FSMStates {
    BET,
    USER_PLAY,
    BOT_PLAY,
    USER_WON,
    USER_LOST,
    DRAW,
    END_GAME

}