import {ThemedText} from "@/components/Global/ThemedText";
import {Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useNavigation} from "@react-navigation/core";

export const Options = () => {
    const navigation = useNavigation();

    const logOut = async () => {
        const login = await AsyncStorage.getItem("login");
        if (login) {
            const loginJSON = JSON.parse(login);
            loginJSON.loggedIn = false;
            AsyncStorage.setItem("login", JSON.stringify(loginJSON))
                .then(() => {navigation.navigate("index")});
        }
    }

    return (
        <>
            <ThemedText style={{marginTop: 50}}>Not implemented!</ThemedText>
            <ThemedText>Account</ThemedText>
            <Button title="Log out" onPress={logOut} />
            <ThemedText>Theme (dark. light)</ThemedText>
            <ThemedText>Player (builtin, webview)</ThemedText>
            <ThemedText>Instances</ThemedText>
        </>
    );
};