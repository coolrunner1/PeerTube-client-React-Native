import {Button, StyleSheet, View} from "react-native";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {ThemedInput} from "@/components/ThemedInput";
import {ThemedButton} from "@/components/ThemedButton";
import {useTheme} from "@react-navigation/core";
import {useState} from "react";

export default function Registration({navigation}: {navigation: any}) {
    const theme = useTheme();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    return (
        <View style={
            [styles.registrationFormContainer, theme.dark
                ? {backgroundColor: Colors.dark.backgroundColor}
                : {backgroundColor: Colors.light.backgroundColor}]
        }>
            <ThemedText style={{fontSize: 30, fontWeight: "bold"}}>Create an account</ThemedText>
            <ThemedText
                style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}
            >Already have an account? <ThemedText
                style={{textDecorationLine: 'underline'}}
                onPress={() => navigation.navigate("login")}
            >Sign In now</ThemedText></ThemedText>
            <ThemedInput
                placeholder={"Username"}
                placeholderTextColor={"#f9526c"}
                value={username}
                onChangeText={setUsername}
            />
            <ThemedInput
                placeholder={"Email"}
                placeholderTextColor={"#f9526c"}
                value={email}
                onChangeText={setEmail}
            />
            <ThemedInput
                placeholder={"Password"}
                placeholderTextColor={"#f9526c"}
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
            />
            <ThemedInput
                placeholder={"Confirm password"}
                placeholderTextColor={"#f9526c"}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={true}
            />
            <ThemedButton
                title={"Sign up"}
                onPress={() => {}}
                style={{backgroundColor: "#f9526c", marginTop: 40}}
            />
            <ThemedButton title={"Back"} onPress={() => navigation.navigate("index")} />
        </View>
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
    }
})