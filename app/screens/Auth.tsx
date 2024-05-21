import {ActivityIndicator, Button, SafeAreaView, StyleSheet, Text, TextInput, View, Alert} from 'react-native';
import { LoginUser } from '../types/types';
import {FC, useEffect, useState} from 'react';
import {authFirebase} from "../../firebase.js";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';


const Auth: FC = ({navigation}: any) => {
    const [isRegistration, setIsRegistration] = useState<boolean>(false);
    const [user, setUser] = useState<LoginUser>({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const auth = authFirebase;

    useEffect(() => {
        const checkUserToken = async () => {
            try {
                const token = await AsyncStorage.getItem('userToken');
                if (token) {
                    navigation.navigate('Home');
                }
            } catch (error) {
                console.error('Ошибка проверки токена:', error);
            }
        };
        checkUserToken();
    }, []);

    const saveToken = async (token: string) => {
        try {
            await AsyncStorage.setItem('userToken', token);
        } catch (error) {
            console.error('Ошибка при сохранении токена:', error);
        }
    };

    const authHandler = async() => {
        setIsLoading(true);
        try {
            if(isRegistration) {
                const response = await createUserWithEmailAndPassword(auth, user.email, user.password);
                const token = await response.user.getIdToken();
                await saveToken(token);

                setUser({email: response.user.email || '', password: ''});
            } else {
                const response = await signInWithEmailAndPassword(auth, user.email, user.password);
                const token = await response.user.getIdToken();
                await saveToken(token);

                setUser({email: response.user.email || '', password: ''});
            }
            navigation.navigate('Home');
        } catch (e: any) {
            console.log(e);
            Alert.alert('Error: ', e.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style = {style.conainer}>
            <View style = {style.form}>
                <Text style = {style.title}>{isRegistration ? 'Sign up' : 'Log in'}</Text>
                <TextInput 
                    value={user.email} 
                    onChangeText={(text) => {
                        setUser({...user, email: text})
                    }} 
                    style = {style.input}
                    placeholder='Email'
                    maxLength={50}
                    keyboardType='email-address'
                />
                <TextInput 
                    value={user.password} 
                    onChangeText={(text) => {
                        setUser({...user, password: text})
                    }} 
                    style = {style.input}
                    placeholder='Password'
                    maxLength={30}
                    textContentType='password'
                    secureTextEntry = {true}
                />
                {
                    isLoading
                    ? <ActivityIndicator color = '#0000ff' size={'large'}/>
                    : <Button title= {isRegistration ? 'Create an account' : "Let's go"} onPress={authHandler}/>
                }
                <View>
                    <Text style = {style.changeMethod} onPress={() => setIsRegistration(!isRegistration)}>
                        {isRegistration
                            ? 'Already have an account?'
                            : "Don't have an account yet?"
                        }
                    </Text>
                </View>
            </View>
        </SafeAreaView>
    )
};

export default Auth;


const style = StyleSheet.create({
    conainer: {
        width: '100%',
        height: '100%',
        backgroundColor: '#363B52',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    form: {
        borderBlockColor: 'black',
        borderColor: '#fff',
        width: '80%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
    },

    title: {
        color: "#fff",
        fontSize: 22,
    }, 

    input: {
        height: 40,
        width: '100%',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },

    changeMethod: {
        color: "#fff",
        textDecorationLine: 'underline'
    }
})