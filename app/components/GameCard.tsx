import {StyleSheet, Text, View} from "react-native";
import {Card} from "../types/types.ts";
import {FC} from "react";


interface GameCardProps {
    card: Card,
}
const GameCard: FC<GameCardProps> = ({card}) => {

    return(
        <View style={styles.card}>
            <Text style={styles.topText}>{card.name}{card.suit}</Text>
            <Text style={styles.bottomText}>{card.name}{card.suit}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        position: 'relative',
        width: 85,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 10,
        zIndex: 10,
    },
    topText: {
        position: "absolute",
        top: 0,
        color: 'black',
        fontSize: 18,
        left: 0,
        padding: 2,
    },
    bottomText: {
        position: "absolute",
        bottom: 0,
        right: 0,
        padding: 2,
        color: 'black',
        fontSize: 18,
        transform: [{rotate: '180deg'}],
    }
})

export default GameCard;