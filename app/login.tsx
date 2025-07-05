import {StyleSheet} from "react-native";
import {ThemedInput} from "@/components/Global/ThemedInput";
import {ThemedText} from "@/components/Global/ThemedText";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {Colors} from "@/constants/Colors";
import {useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedView} from "@/components/Global/ThemedView";

const Login = ({navigation}: {navigation: any}) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [loginInfo, setLoginInfo] = useState<string>("");
    const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

    const signIn = () => {
        if (loginInfo) {
            let loginJSON = JSON.parse(loginInfo);
            if ((loginJSON.username === username || loginJSON.email === username) && loginJSON.password === password) {
                loginJSON.loggedIn = true;
                AsyncStorage.setItem("login", JSON.stringify(loginJSON));
                navigation.reset({
                    index: 0,
                    routes: [{name: "(main)"}],
                });
                return;
            }
        }
        setInvalidCredentials(true);
    }

    useEffect(() => {
        AsyncStorage.getItem("login").then((data) => data && setLoginInfo(data));
    }, [])

    return (
        <ThemedView style={styles.loginFormContainer}>
            <ThemedText style={{fontSize: 30, fontWeight: "bold"}}>Login to your account</ThemedText>
            <ThemedText
                style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}
            >
                Don't have an account yet?&nbsp;
                <ThemedText
                    style={{textDecorationLine: 'underline'}}
                    onPress={() => navigation.navigate("registration")}
                >
                    Sign Up now
                </ThemedText>
            </ThemedText>
            <ThemedInput
                placeholder={"Username/Email"}
                placeholderTextColor={Colors.emphasised.backgroundColor}
                onChangeText={setUsername}
                value={username}
            />
            <ThemedInput
                placeholder={"Password"}
                placeholderTextColor={Colors.emphasised.backgroundColor}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            {invalidCredentials && <ThemedText style={{color: "red"}}>Invalid credentials!</ThemedText>}
            <ThemedButton
                title={"Sign in"}
                onPress={signIn}
                style={{backgroundColor: Colors.emphasised.backgroundColor, marginTop: 40}}
            />
            <ThemedButton title={"Back"} onPress={() => navigation.navigate("index")} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    loginFormContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 15,
        padding: 10,
        paddingTop: 50,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default Login;