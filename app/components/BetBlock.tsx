import React, {FC, useEffect, useState} from "react";
import CustomButton from "./CustomButton.tsx";
import {Context, FSMStates, IBet} from "../types/types.ts";
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import FSM from "../services/FSM.ts";
import chip5 from '../assets/images/5US.png';
import chip10 from '../assets/images/10US.png';
import chip20 from '../assets/images/20US.png';
import chip100 from '../assets/images/100US.png';
import {TWENTY_ONE} from "../constants/constants.ts";
import {chipImages} from "../data/CardDeck.ts";
import CustomModal from "./AnimatedPopup.tsx";
import {useAppDispatch} from "../hooks/useReducer.ts";
import {decreaseCash, increaseCash} from "../store/user.slice.ts";

interface BetBlockProps {
    fsm: FSM,
    fsmData: {context: Context, state: FSMStates},
    setFsmData: (fsmData: {context: Context, state: FSMStates}) =>void,
    bet: IBet[],
    setBet: (bet: IBet[]) => void,
    betNum: number
    setIsDouble: (isDouble: boolean) => void,
}

const BetBlock: FC<BetBlockProps> = ({fsmData, bet, setIsDouble, setBet, setFsmData, fsm, betNum}) => {
    const dispatch = useAppDispatch();
    const [isModalVisible, setModalVisible] = useState(false);
    const [isBetNull, setIsBetNull] = useState(false);
    const [isSplit, setIsSplit] = useState(false);

    useEffect(() => {
        if(fsmData.state === FSMStates.USER_WON) dispatch(increaseCash(betNum * 2));
        if(fsmData.state === FSMStates.DRAW) dispatch(increaseCash(betNum));
    }, [fsmData.state]);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const startGame = () => {
        setIsBetNull(false);
        setIsSplit(false);
        if(betNum === 0) {
            setIsBetNull(true);
            setModalVisible(true);
            return;
        }
        dispatch(decreaseCash(betNum));
        fsm.handleEvent("start");
        setFsmData({context: fsm.context, state: fsm.state});


        if(fsm.context.playerCards[0].name === fsm.context.playerCards[1].name) {
            setIsSplit(true);
            setModalVisible(true);
            return;
        }

        if(fsmData.context.playerScore === TWENTY_ONE) fsm.handleEvent('skip');
        console.log(fsmData.context.playerCards)
    }

    const addCard = () => {
        fsm.handleEvent('hit');
        setFsmData({context: fsm.context, state: fsm.state});
    }

    const skip = () => {
        fsm.handleEvent('skip')
        setFsmData({context: fsm.context, state: fsm.state});
    }

    const double = () => {
        dispatch(decreaseCash(betNum));
        fsm.handleEvent('x2');
        setIsDouble(true);
        setFsmData({context: fsm.context, state: fsm.state});
    }

    const doBet = (betNum: number, image: any) => {
        if(fsmData.state !== FSMStates.BET) return;

        const existingBet  = bet.find(betItem => betItem.bet === betNum);
        if(existingBet) {
            const updatedBet = bet.map(betItem =>
                betItem.bet === betNum ? {...betItem, count: betItem.count + 1} : betItem
            );
            setBet(updatedBet);
        } else {
            setBet([...bet, {bet: betNum, image, count: 1}])
        }
    }

    const deleteBet = (betNum: number) => {
        if(fsmData.state !== FSMStates.BET) return;
        const existingBet  = bet.find(betItem => betItem.bet === betNum);

        if(existingBet && existingBet.count > 1) {
            const updatedBet = bet.map(betItem =>
                betItem.bet === betNum ? {...betItem, count: betItem.count - 1} : betItem
            )
            setBet(updatedBet);
        } else {
            setBet([...bet.filter(betItem => betItem.bet !== betNum)])
        }
    }

    return(
        <ImageBackground source={require('../assets/images/gameBackroundTree.jpg')} style={styles.userBlock}>
            <View style={styles.betBlock}>
                { fsmData.state === FSMStates.BET &&  <Text style={styles.betText}>Bet {betNum}$</Text>}
                {( fsmData.state === FSMStates.BET && bet.length > 0) &&
                    <View style={styles.betBlock__images}>
                        {bet.map(betItem =>
                            <TouchableOpacity key = {betItem.bet} onPress={() => deleteBet(betItem.bet)}>
                                <Image style={styles.chip} source={chipImages[betItem.bet]} />
                            </TouchableOpacity>
                        )}
                    </View>
                }
            </View>
            {
                fsmData.state !== FSMStates.BET
                    ?

                        <View style={styles.chipBlock}>
                            <CustomButton addStyle={styles.gameButton} title={'Add card'} onPress={addCard}/>
                            <CustomButton addStyle={styles.gameButton} title={'X2'} onPress={double}/>
                            <CustomButton addStyle={styles.gameButton} title={'Skip'} onPress={skip}/>
                        </View>
                    : <>
                        <View style={styles.chipBlock}>
                            <TouchableOpacity onPress={() => doBet(5, chip5) }>
                                <Image style={styles.chip} source={chip5}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => doBet(10, chip10)}>
                                <Image style={styles.chip} source={chip10}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => doBet(20, chip20)}>
                                <Image style={styles.chip} source={chip20}/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => doBet(100, chip100)}>
                                <Image style={styles.chip} source={chip100}/>
                            </TouchableOpacity>
                        </View>
                        <CustomButton title={'Deal Cards'} onPress={startGame} addStyle={styles.button}/>
                    </>
            }
            {
                isBetNull &&
                <CustomModal isVisible={isModalVisible} onClose={toggleModal}>
                    <Text style={styles.modalText}>Do a bet</Text>
                    <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>OK</Text>
                    </TouchableOpacity>
                </CustomModal>
            }
            {
                isSplit &&
                <CustomModal isVisible={isModalVisible} onClose={toggleModal}>
                    <Text style={styles.modalText}>Make a split</Text>
                    <View style={styles.splitContainer}>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Yes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={toggleModal} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>No</Text>
                        </TouchableOpacity>
                    </View>
                </CustomModal>
            }
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    userBlock: {
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        gap: 5,
    },
    betBlock: {
        display: "flex",
        flexDirection: 'column',
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

    chipBlock: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 'auto',
        gap: 10
    },

    gameButton: {
        backgroundColor: '#2196F3',
        width: 115,
        paddingVertical: 7,
    },

    chip: {
        borderRadius: 100,
        width: 50,
        height: 50
    },
    button: {
        backgroundColor: '#2196F3',
        paddingVertical: 10,
    },

    splitContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
    },

    closeButton: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        marginTop: 10,
        padding: 10,
        minWidth: 70,
        backgroundColor: '#2196F3',
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
    },
});
export default BetBlock;