import {Image, SafeAreaView, StyleSheet, View, Text} from "react-native";

const Game = () => {

    return(
        <SafeAreaView style={styles.screen}>
            <View>
                <Image style={styles.ShufflImage} source={require('../assets/images/shuffleking.png')}/>
            </View>
            <View>
                <Text>Field</Text>

            </View>
            <View>
                <View>
                    <Image style={styles.fishka} source={require('../assets/images/5US.png')}/>
                    <Image style={styles.fishka} source={require('../assets/images/10US.png')}/>
                    <Image style={styles.fishka} source={require('../assets/images/20US.png')}/>
                    <Image style={styles.fishka} source={require('../assets/images/100US.png')}/>
                </View>
                <Text>You</Text>
            </View>
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

    fishka: {
        borderRadius: 100,
        width: 150,
        height: 150
    }
})