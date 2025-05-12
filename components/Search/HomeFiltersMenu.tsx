import {Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import {ThemedView} from "@/components/Global/ThemedView";

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
                <ThemedView style={styles.modalView}>
                    <Text>Is live</Text>
                    <Text>Allow nsfw</Text>
                    <Text>Sort</Text>
                    <Text>Hello World!</Text>
                    <Pressable
                        onPress={props.onCloseButtonPress}>
                        <Text style={{color: 'red', fontSize: 20}}>Hide Modal</Text>
                    </Pressable>
                </ThemedView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        height: "100%",
        width: "70%",
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

});