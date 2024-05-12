import {
    Image,
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton.tsx";
import {useMemo, useState} from "react";
import {IBet} from "../types/types.ts";

import chip5 from '../assets/images/5US.png';
import chip10 from '../assets/images/10US.png';
import chip20 from '../assets/images/20US.png';
import chip100 from '../assets/images/100US.png';

const Game = () => {
    const [bet, setBet] = useState<IBet[]>([])
    const betNum = useMemo(() => bet.reduce((acc,betItem) => acc + (betItem.bet * betItem.count) , 0), [bet])

    const doBet = (betNum: number, image: any) => {
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
        <SafeAreaView style={styles.screen}>
            <ImageBackground
                source={require('../assets/images/gameBackround.jpg')}
                style={styles.screen}
            >
                <View>
                    <Image style={styles.ShufflImage} source={require('../assets/images/shuffleking.png')}/>
                </View>
                <View>
                    <Text>Field</Text>
                </View>
                <ImageBackground source={require('../assets/images/gameBackroundTree.jpg')} style={styles.userBlock}>
                    <View style={styles.betBlock}>
                        <Text style={styles.betText}>Ставка {betNum}$</Text>
                            {bet.length > 0 &&
                                <View style={styles.betBlock__images}>
                                    {   bet.map(betItem =>
                                        <TouchableOpacity key = {betItem.bet} onPress={() => deleteBet(betItem.bet)}>
                                            <Image style={styles.chip} source={betItem.image}/>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            }
                    </View>
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
                    <CustomButton title={'Раздать карты'} onPress={() => {}} addStyle={styles.button}/>
                </ImageBackground>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default Game;

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "space-between"
    },

    ShufflImage: {
        width: 150,
        height: 150
    },

    userBlock: {
        // height: 210,
        display: "flex",
        flexDirection: 'column',
        alignItems: 'center',
        padding: 10,
        gap: 5,
    },

    betBlock: {
        display: "flex",
        flexDirection: 'column',
        // marginBottom: 30,
    },

    betBlock__images: {
        display: "flex",
        flexDirection: 'row',
        marginBottom: 10
    },

    betText:{
        color: "#ddd",
        textAlign: 'center'
    },

    chipBlock: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 'auto'
    },

    chip: {
        borderRadius: 100,
        width: 50,
        height: 50
    },

    button: {
        backgroundColor: 'grey',
        paddingVertical: 10,
    }
})
