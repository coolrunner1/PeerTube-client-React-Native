import {Button, StyleSheet, View} from "react-native";
import {ThemedInput} from "@/components/Global/ThemedInput";
import {ThemedText} from "@/components/Global/ThemedText";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {Colors} from "@/constants/Colors";
import {useNavigation, useTheme} from "@react-navigation/core";
import {useState} from "react";

export default function Login({navigation}: {navigation: any}) {
    const theme = useTheme();
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <View style={
            [styles.loginFormContainer, theme.dark
                ? {backgroundColor: Colors.dark.backgroundColor}
                : {backgroundColor: Colors.light.backgroundColor}]
        }>
            <ThemedText style={{fontSize: 30, fontWeight: "bold"}}>Login to your account</ThemedText>
            <ThemedText
                style={{fontSize: 15, fontWeight: "bold", marginBottom: 10}}
            >Don't have an account yet? <ThemedText
                style={{textDecorationLine: 'underline'}}
                onPress={() => navigation.navigate("registration")}
            >Sign Up now</ThemedText></ThemedText>
            <ThemedInput
                placeholder={"Username/Email"}
                placeholderTextColor={"#f9526c"}
                onChangeText={setUsername}
                value={username}
            />
            <ThemedInput
                placeholder={"Password"}
                placeholderTextColor={"#f9526c"}
                onChangeText={setPassword}
                value={password}
                secureTextEntry={true}
            />
            <ThemedButton
                title={"Sign in"}
                onPress={() => navigation.navigate("(main)")}
                style={{backgroundColor: "#f9526c", marginTop: 40}}
            />
            <ThemedButton title={"Back"} onPress={() => navigation.navigate("index")} />
        </View>
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
})
