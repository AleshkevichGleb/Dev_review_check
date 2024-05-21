import {Image, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View,} from "react-native";
import CustomButton from "../components/CustomButton.tsx";
import {useCallback, useEffect, useMemo, useState} from "react";
import {Context, FSMStates, IBet} from "../types/types.ts";
import GameCard from "../components/GameCard.tsx";
import FSM from "../services/FSM.ts";
import {TWENTY_ONE} from "../constants/constants.ts";
import EndGameModal from "../components/EndGameModal.tsx";
import {useNavigation, useFocusEffect } from "@react-navigation/native";
import BetBlock from "../components/BetBlock.tsx";
import {chipImages} from "../data/CardDeck.ts";
import {useAppSelector} from "../hooks/useReducer.ts";

const fsm = new FSM();
const Game = () => {
    const {cash} = useAppSelector(state => state.user);
    const [isDouble, setIsDouble] = useState(false)
    const [fsmData, setFsmData] = useState<{context: Context, state: FSMStates}>({
        context: fsm.context,
        state: fsm.state
    });

    const [bet, setBet] = useState<IBet[]>([])
    const betNum = useMemo(() =>
        bet.reduce((acc, betItem) => isDouble ? ( acc + (betItem.bet * betItem.count)) *2 : acc + (betItem.bet * betItem.count) , 0), [bet, isDouble])

    const navigation = useNavigation();

    const resetFsm = () => {
        const newFsm = new FSM();
        setFsmData({ context: newFsm.context, state: newFsm.state });
        setBet([]);
        setIsDouble(false);
    };

    useFocusEffect(
        useCallback(() => {
            resetFsm();
        }, [])
    );

    return(
        <SafeAreaView style={styles.screen}>
            <ImageBackground
                source={require('../assets/images/gameBackround.jpg')}
                style={styles.screen}
            >
                <Text style={styles.cash}>${cash}</Text>
                {
                    (fsmData.state === FSMStates.USER_LOST || fsmData.state === FSMStates.USER_WON || fsmData.state === FSMStates.DRAW)
                    && <EndGameModal fsmData={fsmData} navigation={navigation} resetFsm={resetFsm}/>
                }
                <View style={styles.table}>
                    {fsmData.state !== FSMStates.BET
                        ?
                        <View style={styles.gameBlock}>
                            {
                                (
                                    fsmData.state === FSMStates.BOT_PLAY ||
                                    fsmData.state === FSMStates.DRAW ||
                                    fsmData.state === FSMStates.USER_WON ||
                                    fsmData.state === FSMStates.USER_LOST

                                )
                                ?
                                    <>
                                        <Text style={styles.userScores}>Dealer score: {fsmData.context.dealerScore}</Text>
                                        <View style={styles.cardBlock}>
                                            {
                                                fsmData.context.dealerCards.length &&
                                                fsmData.context.dealerCards.map(card =>
                                                    <GameCard card={card} key = {card.id}/>
                                                )
                                            }
                                        </View>
                                    </>
                                :
                                    <View>
                                        <Text style={styles.userScores}>Dealer score: {fsmData.context.dealerCards[0].value}</Text>
                                        <View style={styles.dealerInvertedCardBlock}>
                                            <GameCard card={fsmData.context.dealerCards[0]}/>
                                            <Image style={{position: 'absolute', right: -10, width: 70, height: 105, borderRadius: 5}} source={require('../assets/images/invertedCard.jpg')}/>
                                        </View>
                                    </View>
                            }
                            <View style={{display: 'flex', alignItems: 'center'}}>
                                <Text style={styles.betText}>Bet {betNum}$</Text>
                                <View style={styles.betBlock__images}>
                                    {bet.map(betItem =>
                                        <TouchableOpacity key = {betItem.bet}>
                                            <Image style={styles.chip}  source={chipImages[betItem.bet]}/>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </View>
                            <View style={styles.userField}>
                                <Text style={styles.userScores}>Score: {fsmData.context.playerScore}</Text>
                                <View style={styles.cardBlock}>
                                    {
                                        fsmData.context.playerCards.map(card =>
                                           <GameCard card={card} key = {card.id}/>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                        :
                            <View style={styles.betContainer}>
                                <Text style={styles.betText}>BlackJack</Text>
                            </View>
                    }
                </View>
                <BetBlock
                    bet={bet}
                    setBet={setBet}
                    fsmData={fsmData}
                    setFsmData={setFsmData}
                    fsm={fsm}
                    betNum = {betNum}
                    setIsDouble = {setIsDouble}
                />
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Game;

const styles = StyleSheet.create({
    cash: {
        color: "#fff",
        textAlign: 'right',
        padding: 5,
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#3f3636',
        borderRadius: 10,
        margin: 5,
        fontWeight: '700',
    },
    screen: {
        flex: 1,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between"
    },

    table: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },

    ShufflImage: {
        width: 150,
        height: 150
    },


    imageCard: {
        width: 100,
        height: 100,
    },

    gameBlock: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'space-between',
        height: '100%',
        alignItems: 'center',
        paddingVertical: 30,
    },

    dealerInvertedCardBlock: {
        display: 'flex',
        flexDirection: 'row',
        position: "relative",
    },

    betBlock__images: {
        display: "flex",
        flexDirection: 'row',
        marginBottom: 10
    },

    betContainer: {
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },

    betText:{
        backgroundColor: "#353232",
        padding: 5,
        borderRadius: 10,
        width: 100,
        fontSize: 16,
        fontWeight: '600',
        color: "#ddd",
        textAlign: 'center',
        marginVertical: 20,
    },

    chip: {
        borderRadius: 100,
        width: 50,
        height: 50
    },

    userField: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    userScores: {
        color: "#fff",
        fontSize: 16,
    },

    cardBlock: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10
    },
    card: {
        position: 'relative',
    },

    cartText: {
        position: 'absolute',
        top: 0,
        fontSize: 22,
        zIndex: 100,
    }
})