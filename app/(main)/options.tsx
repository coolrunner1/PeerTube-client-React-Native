import {ThemedText} from "@/components/Global/ThemedText";
import {Alert, View, StyleSheet, ScrollView} from "react-native";
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedInput} from "@/components/Global/ThemedInput";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentInstance} from "@/slices/instancesSlice";
import {RootState} from "@/state/store";
import {useState} from "react";
import {Colors} from "@/constants/Colors";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {setPreferredPlayer} from "@/slices/userPreferencesSlice";
import {checkInstanceValidity} from "@/api/checkInstanceValidity";
import {useBackgroundColor} from "@/hooks/useBackgroundColor";

const Options = ({navigation}: {navigation: any}) => {

    const dispatch = useDispatch();
    const backgroundColor = useBackgroundColor();
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);
    const preferredPlayer = useSelector((state: RootState) => state.userPreferences.preferredPlayer);
    const [instance, setInstance] = useState<string>(currentInstance);

    const playerOptions = ["Native", "Web"];

    const logOut = async () => {
        Alert.alert('Not available', 'Will be featured in future updates.', [
            {text: 'OK'},
        ]);
        /*
        const login = await AsyncStorage.getItem("login");
        if (login) {
            const loginJSON = JSON.parse(login);
            loginJSON.loggedIn = false;
            AsyncStorage.setItem("login", JSON.stringify(loginJSON))
                .then(() => {navigation.navigate("index")});
        }
        */
    }

    const setGlobalInstance = async() => {
        let newInstance;
        if (instance.split("://")[0] === "https") {
            newInstance = instance;
        } else {
            newInstance = "https://"+instance;
        }

        const validInstance = await checkInstanceValidity(newInstance);

        if (!validInstance) {
            Alert.alert('Error', 'Provided URL is either not a PeerTube instance or this instance is not available currently.', [
                {text: 'OK'},
            ]);
        } else {
            Alert.alert('Success', `Instance has been switched to ${newInstance.split("://")[1]}.`, [
                {text: 'OK'},
            ]);
            dispatch(setCurrentInstance(newInstance));
        }
    }

    return (
        <ScrollView style={[styles.container, {backgroundColor}]}>
            {/**
             <ThemedText style={{marginTop: 50}}>Not implemented!</ThemedText>
             <Button title="Log in" onPress={() => {}} />
             <ThemedText>Theme (dark. light)</ThemedText>
             <ThemedText>Player (builtin, webview)</ThemedText>
             */}
            <ThemedText style={styles.optionsText}>Options</ThemedText>
            <View style={styles.sectionContainer}>
                <ThemedText style={styles.text}>Account</ThemedText>
                <ThemedButton title="Log out" onPress={logOut} />
            </View>
            <View style={styles.sectionContainer}>
                <ThemedText style={styles.text}>Instance</ThemedText>
                <ThemedInput
                    placeholder={"Instance"}
                    onChangeText={setInstance}
                    value={instance}
                />
                <ThemedButton title="Set instance" onPress={setGlobalInstance} style={{backgroundColor: Colors.emphasised.backgroundColor}}/>
            </View>
            <View style={[styles.sectionContainer]}>
                <ThemedText style={styles.text}>Preferred video player</ThemedText>
                <SelectDropdown
                    data={playerOptions}
                    onSelect={(player) => dispatch(setPreferredPlayer(player))}
                    defaultValue={preferredPlayer}
                    renderButton={(selectedItem, isOpened) => {
                        return (
                            <View
                                style={[
                                    styles.button,
                                    {backgroundColor: Colors.emphasised.backgroundColor,}
                                ]}
                            >
                                <ThemedText style={[styles.buttonText]} inverseColor={true}>{(selectedItem && selectedItem) || 'Select preferred player'}</ThemedText>
                            </View>
                        );
                    }}
                    renderItem={(item, index, isSelected) => {
                        return (
                            <View style={[styles.button, {borderRadius: 0, ...(isSelected && {backgroundColor: Colors.emphasised.backgroundColor})}]}>
                                <ThemedText style={[styles.buttonText, {color: Colors.light.color}]}>{item}</ThemedText>
                            </View>
                        );
                    }}

                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 20,
    },
    sectionContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        maxHeight: 150,
        marginVertical: 5,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold"
    },
    optionsText: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 40,
        marginBottom: 20,
        alignSelf: "center",
    },
    button: {
        padding: 10,
        borderRadius: 10,
        width: 300
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
})

export default Options;