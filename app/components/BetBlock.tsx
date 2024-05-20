import { FC } from "react";
import CustomButton from "./CustomButton.tsx";
import {Context, FSMStates, IBet} from "../types/types.ts";
import {View, ImageBackground, Text, TouchableOpacity, Image, StyleSheet} from "react-native";
import FSM from "../services/FSM.ts";
import chip5 from '../assets/images/5US.png';
import chip10 from '../assets/images/10US.png';
import chip20 from '../assets/images/20US.png';
import chip100 from '../assets/images/100US.png';
import {TWENTY_ONE} from "../constants/constants.ts";

interface BetBlockProps {
    fsm: FSM,
    fsmData: {context: Context, state: FSMStates},
    setFsmData: (fsmData: {context: Context, state: FSMStates}) =>void,
    bet: IBet[],
    setBet: (bet: IBet[]) => void,
    betNum: number
}

const BetBlock: FC<BetBlockProps> = ({fsmData, bet, setBet, setFsmData, fsm, betNum}) => {

    const startGame = () => {
        fsm.handleEvent("start");
        setFsmData({...fsm})
        if(fsmData.context.playerScore === TWENTY_ONE) fsm.handleEvent('skip');
    }

    const addCard = () => {
        fsm.handleEvent('hit');
        setFsmData({...fsm})
        // if(fsm.context.playerScore === TWENTY_ONE) fsm.handleEvent('skip');
    }

    const skip = () => {
        fsm.handleEvent('skip')
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
                                <Image style={styles.chip} source={betItem.image}/>
                            </TouchableOpacity>
                        )}
                    </View>
                }
            </View>
            {
                fsmData.state !== FSMStates.BET
                    ?
                        // fsmData.state === FSMStates.USER_PLAY &&
                        <View style={styles.chipBlock}>
                            <CustomButton addStyle={styles.gameButton} title={'Add card'} onPress={addCard}/>
                            <CustomButton addStyle={styles.gameButton} title={'X2'} onPress={addCard}/>
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
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
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
        backgroundColor: 'grey',
        width: 115,
    },

    chip: {
        borderRadius: 100,
        width: 50,
        height: 50
    },
    button: {
        backgroundColor: 'grey',
        paddingVertical: 10,
    },
});
export default BetBlock;