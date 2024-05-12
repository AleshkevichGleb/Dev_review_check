import { FC } from 'react';
import {Button, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import CustomButton from "../components/CustomButton.tsx";


const Home: FC = ({navigation}:any) => {

    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.title}>Rules</Text>
            <Text style={styles.rules}>Players may split any time they begin a hand with a pair. This allows them to play two separate hands, each of which will be dealt a new second card. Players may split to up to four separate hands if they continue to receive pairs. However, there are some restrictions; for instance, players are typically not allowed to play their hands after splitting with aces (much like when doubling down, they are forced to stand), and if they do receive a ten to go with an ace, it will not count as a blackjack.</Text>
            <Button title={'Go to game'} onPress={() => navigation.navigate('Game')}/>
            <CustomButton title={'Log out'} onPress={() => {}} addStyle={styles.logOut}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    screen: {
        width: '100%',
        height: '100%',
        backgroundColor: '#363B52',
        display: 'flex',
        color: 'white',
        flexDirection: 'column',
        gap: 20,
    },

    title: {
        color: 'white',
        textAlign: 'center',
        fontSize: 20,
        padding: 10,
        backgroundColor: "#202843"
    },

    rules: {
        color: 'white',
        paddingHorizontal:10
    },

    logOut: {
        backgroundColor: 'red',
        marginTop: 'auto'
    }

})



export default Home;