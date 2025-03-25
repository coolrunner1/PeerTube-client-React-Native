import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

export const HomeFiltersMenu = (
    props: {
        showFilters: boolean;
        onCloseButtonPress: () => void;
    }
) => {
    return (
        <Modal
            animationType={"fade"}
            transparent={true}
            visible={props.showFilters}
        >
            <View style={{
                flex: 1,
                backgroundColor: "#000000af",
            }}>
                <View style={styles.modalView}>
                    <Text>Hello World!</Text>
                    <Pressable
                        onPress={props.onCloseButtonPress}>
                        <Text>Hide Modal</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        height: "100%",
        width: "70%",
        backgroundColor: 'white',
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

});