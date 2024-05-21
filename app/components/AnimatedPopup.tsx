import React, {FC, ReactNode} from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';

interface CustomModalProps {
    isVisible: boolean,
    onClose: () => void,
    children: ReactNode,
}
const CustomModal: FC<CustomModalProps> = ({ isVisible, onClose, children }) => {
    return (
        <Modal
            isVisible={isVisible}
            onBackdropPress={onClose}
            avoidKeyboard
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                {children}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
});

export default CustomModal;
