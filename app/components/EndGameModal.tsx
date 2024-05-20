import { FC } from "react";
import {Button, StyleSheet, Text, View} from "react-native";
import {Context, FSMStates} from "../types/types.ts";
import CustomButton from "./CustomButton.tsx";

interface EndGameModalProps {
    fsmData: {context: Context, state: FSMStates},
    resetFsm: () => void,
    navigation: any
}

const EndGameModal: FC<EndGameModalProps> = ({fsmData, navigation, resetFsm}) => {

    const newGame = () => {
        resetFsm();
    }
    const exit = () => {
        resetFsm();
        navigation.navigate("Home")
    }
    return(
        <View style={styles.endGameBlock}>
            <Text style={styles.endGameText}>{checkResultText(fsmData.state)}</Text>
            <CustomButton title={'New game'} onPress={resetFsm} addStyle={styles.button}/>
            <CustomButton title={'Exit'} onPress={exit} addStyle={styles.button}/>
        </View>
    )
}

export default EndGameModal;

const checkResultText = (state: FSMStates) => {
    switch (state) {
        case FSMStates.DRAW: {
            return "Draw on the game"
        }
        case FSMStates.USER_LOST: {
            return "You lost the game"
        }
        case FSMStates.USER_WON: {
            return "You won the game"
        }
        default: {
            return "Error"
        }
    }
}


const styles = StyleSheet.create({
    endGameBlock: {
        position: "absolute",
        zIndex: 1000,
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10
    },

    endGameText: {
        color: "#fff",
        fontSize: 20,
    },

    button: {
        backgroundColor: 'grey',
        width: 150,
    },

})

