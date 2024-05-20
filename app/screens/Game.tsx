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

const fsm = new FSM();
const Game = () => {
    const [fsmData, setFsmData] = useState<{context: Context, state: FSMStates}>({
        context: fsm.context,
        state: fsm.state
    });

    const [bet, setBet] = useState<IBet[]>([])
    const betNum = useMemo(() => bet.reduce((acc,betItem) => acc + (betItem.bet * betItem.count) , 0), [bet])

    const navigation = useNavigation();

    const resetFsm = () => {
        const newFsm = new FSM();
        setFsmData({ context: newFsm.context, state: newFsm.state });
        setBet([]);
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
                {
                    (fsmData.state === FSMStates.USER_LOST || fsmData.state === FSMStates.USER_WON || fsmData.state === FSMStates.DRAW)
                    && <EndGameModal fsmData={fsmData} navigation={navigation} resetFsm={resetFsm}/>
                }
                <View style={styles.table}>
                    {fsmData.state !== FSMStates.BET
                        ? <View style={styles.gameBlock}>
                            <Text style={styles.userScores}>Dealer score: { fsmData.state === FSMStates.BOT_PLAY ? fsmData.context.dealerScore : fsmData.context.dealerCards[0].value }</Text>
                            {
                                (
                                    fsmData.state === FSMStates.BOT_PLAY ||
                                    fsmData.state === FSMStates.DRAW ||
                                    fsmData.state === FSMStates.USER_WON ||
                                    fsmData.state === FSMStates.USER_LOST

                                )
                                ?  <View style={styles.cardBlock}>
                                        {

                                            fsmData.context.dealerCards.length &&
                                            fsmData.context.dealerCards.map(card =>
                                                <GameCard card={card} key = {card.id}/>
                                            )
                                        }
                                    </View>
                                : <View style={styles.dialerInvertedCardBlock}>
                                        <GameCard card={fsmData.context.dealerCards[0]}/>
                                        <Image style={{position: 'absolute', right: -50, width: 85, height: 120, borderRadius: 5}} source={require('../assets/images/invertedCard.jpg')}/>
                                    </View>
                            }
                            <Text style={styles.betText}>Bet {betNum}$</Text>
                            {bet.length > 0 &&
                                <View style={styles.betBlock__images}>
                                    {bet.map(betItem =>
                                        <TouchableOpacity key = {betItem.bet} onPress={() => deleteBet(betItem.bet)}>
                                            <Image style={styles.chip} source={betItem.image}/>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            }
                            <View style={styles.userField}>
                                <Text style={styles.userScores}>Score: {fsmData.context.playerScore}</Text>
                                <View style={styles.cardBlock}>
                                    {

                                        fsmData.context.playerCards.length &&
                                        fsmData.context.playerCards.map(card =>
                                           <GameCard card={card} key = {card.id}/>
                                        )
                                    }
                                </View>
                            </View>
                        </View>
                        : <Text>Field</Text>
                    }
                </View>
                <BetBlock
                    bet={bet}
                    setBet={setBet}
                    fsmData={fsmData}
                    setFsmData={setFsmData}
                    fsm={fsm}
                    betNum = {betNum}
                />
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Game;

const styles = StyleSheet.create({
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
        justifyContent:'center',
        alignItems: 'center',
    },

    dialerInvertedCardBlock: {
        display: 'flex',
        flexDirection: 'row',
        position: "relative",
    },

    betBlock__images: {
        display: "flex",
        flexDirection: 'row',
        marginBottom: 10
    },

    betText:{
        fontSize: 16,
        color: "#ddd",
        textAlign: 'center'
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