import {ThemedText} from "@/components/Global/ThemedText";
import {Alert, Button, View, StyleSheet} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedInput} from "@/components/Global/ThemedInput";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentInstance} from "@/slices/instancesSlice";
import {RootState} from "@/state/store";
import {useState} from "react";
import {Colors} from "@/constants/Colors";
import {useTheme} from "@react-navigation/core";
import {ThemedButton} from "@/components/Global/ThemedButton";

const Options = ({navigation}: {navigation: any}) => {

    const dispatch = useDispatch();
    const currentInstance = useSelector((state: RootState) => state.instances.currentInstance);
    const [instance, setInstance] = useState<string>(currentInstance);
    const theme = useTheme();

    const logOut = async () => {
        const login = await AsyncStorage.getItem("login");
        if (login) {
            const loginJSON = JSON.parse(login);
            loginJSON.loggedIn = false;
            AsyncStorage.setItem("login", JSON.stringify(loginJSON))
                .then(() => {navigation.navigate("index")});
        }
    }

    const setGlobalInstance = async() => {
        let newInstance;
        if (instance.split("://")[0] === "https") {
            newInstance = instance;
        } else {
            newInstance = "https://"+instance;
        }

        let validInstance = false;

        await fetch(`${newInstance}/api/v1/config`)
            .then(res => res.status === 200 ? validInstance = true : validInstance = false)
            .catch(() => {})

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

    const backgroundColor = theme.dark ?  Colors.dark.backgroundColor : Colors.light.backgroundColor;

    return (
        <View style={[styles.container, {backgroundColor: backgroundColor}]}>
            {/**
             <ThemedText style={{marginTop: 50}}>Not implemented!</ThemedText>
             <Button title="Log in" onPress={() => {}} />
             <ThemedText>Theme (dark. light)</ThemedText>
             <ThemedText>Player (builtin, webview)</ThemedText>
             */}
            <ThemedText style={styles.optionsText}>Options</ThemedText>
            <View style={styles.sectionContainer}>
                <ThemedText style={styles.text}>Instance</ThemedText>
                <ThemedInput
                    placeholder={"Instance"}
                    onChangeText={setInstance}
                    value={instance}
                />
                <ThemedButton title="Set instance" onPress={setGlobalInstance} style={{backgroundColor: Colors.emphasised.backgroundColor}}/>
            </View>
            <View style={styles.sectionContainer}>
                <ThemedText style={styles.text}>Account</ThemedText>
                <ThemedButton title="Log out" onPress={logOut} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20
    },
    sectionContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
        maxHeight: 100,
    },
    text: {
        fontSize: 20,
        fontWeight: "bold"
    },
    optionsText: {
        fontSize: 30,
        fontWeight: "bold",
        marginBottom: 20
    }
})

export default Options;