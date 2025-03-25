import {ThemedText} from "@/components/Global/ThemedText";
import {Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Options = ({navigation}: {navigation: any}) => {

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
            <Button title="Log in" onPress={() => {}} />
            <Button title="Log out" onPress={logOut} />
            <ThemedText>Theme (dark. light)</ThemedText>
            <ThemedText>Player (builtin, webview)</ThemedText>
            <ThemedText>Instances</ThemedText>
        </>
    );
};

export default Options;