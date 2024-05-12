import React, {FC} from 'react';
import {TouchableOpacity, Text, StyleSheet, ViewStyle} from 'react-native';

interface CustomButtonProps {
    title: string,
    onPress: (e: any) => void,
    addStyle?: ViewStyle,
}

const CustomButton: FC<CustomButtonProps> = ({ title, onPress, addStyle}) => {
    return (
        <TouchableOpacity style={[styles.button, addStyle]} onPress={onPress}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#FF5733',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        textAlign: 'center',
    },
});

export default CustomButton;
