import {StyleSheet} from "react-native";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/Global/ThemedText";
import {ThemedInput} from "@/components/Global/ThemedInput";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedView} from "@/components/Global/ThemedView";

const Registration = ({navigation}: {navigation: any}) => {
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [invalidForm, setInvalidForm] = useState<boolean>(false);

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validateRegistration = () => {
        if (!username || !validateEmail(email) || !password || password !== confirmPassword) {
            setInvalidForm(true);
            if (!validateEmail(email)) {
                setEmail("");
            }
            if (!password || password !== confirmPassword) {
                setPassword("");
                setConfirmPassword("");
            }
        } else {
            setInvalidForm(false);
            AsyncStorage.setItem("login",
                JSON.stringify({username: username, email: email, password: password, loggedIn: true}))
                    .then(() => navigation.reset({
                            index: 0,
                            routes: [{name: "(main)"}],
                        })
                    );
        }
    };

    return (
        <ThemedView style={styles.registrationFormContainer}>
            <ThemedText style={{fontSize: 30, fontWeight: "bold"}}>Create an account</ThemedText>
            <ThemedText
                style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}
            >
                Already have an account?&nbsp;
                <ThemedText
                    style={{textDecorationLine: 'underline'}}
                    onPress={() => navigation.navigate("login")}
                >
                    Sign In now
                </ThemedText>
            </ThemedText>
            <ThemedInput
                placeholder={invalidForm && !username ? "Username is empty!" : "Username"}
                placeholderTextColor={Colors.emphasised.backgroundColor}
                value={username}
                onChangeText={setUsername}
            />
            <ThemedInput
                placeholder={invalidForm && !validateEmail(email) ? "Invalid email!" : "Email"}
                placeholderTextColor={Colors.emphasised.backgroundColor}
                value={email}
                onChangeText={setEmail}
            />
            <ThemedInput
                placeholder={invalidForm && !password ? "Password is empty!" : "Password"}
                placeholderTextColor={Colors.emphasised.backgroundColor}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <ThemedInput
                placeholder={invalidForm && password !== confirmPassword ? "Passwords don't match!" : "Confirm password"}
                placeholderTextColor={Colors.emphasised.backgroundColor}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
            <ThemedButton
                title={"Sign up"}
                onPress={validateRegistration}
                style={{backgroundColor: Colors.emphasised.backgroundColor, marginTop: 40}}
            />
            <ThemedButton title={"Back"} onPress={() => navigation.navigate("index")} />
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    registrationFormContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 15,
        padding: 10,
        paddingTop: 50,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    errorMessage: {
        color: "red"
    }
});

export default Registration;