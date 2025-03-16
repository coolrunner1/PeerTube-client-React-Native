import {useEffect, useState} from "react";
import {Text, StyleSheet, View, TextInput, Animated, ImageBackground, Switch, Button} from "react-native";
import ScrollView = Animated.ScrollView;
import {ThemedInput} from "@/components/ThemedInput";
import {BlurView} from "expo-blur";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/ThemedText";
import {useTheme} from "@react-navigation/core";
import {ThemedButton} from "@/components/ThemedButton";

export default function Index({navigation}: {navigation: any}) {
    const [visible, setVisible] = useState<boolean>(false);

    const theme = useTheme();

    const clickTest = () => {
        setVisible(!visible);
    }

    useEffect(() => {
        console.log(theme);
    }, [theme]);

    return (
        <ImageBackground
            source={require("@/assets/images/main-page-bg-dark.jpg")}
            resizeMode="cover"
            style={{
                flex: 1,
            }}
        >
            <View style={
                [styles.loginFormContainer, theme.dark
                    ? {backgroundColor: Colors.dark.backgroundColor}
                    : {backgroundColor: Colors.light.backgroundColor}]
            }>
                <ThemedText style={{fontSize: 50, fontWeight: "bold"}}>Welcome back!</ThemedText>

                <ThemedButton title={"Login"} onPress={clickTest} customStyle={{width: 300, backgroundColor: "#f9526c"}} />
                <ThemedButton title={"Register"} onPress={clickTest} customStyle={{width: 300}}/>
                {visible && <Text style={styles.testText}>Test</Text>}
                <ScrollView style={{maxHeight: 50}}>
                    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
                        .map((item, index) => (<ThemedText key={index}>Placeholder {item}</ThemedText>))}
                </ScrollView>
            </View>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    testText: {
        fontSize: 90,
        fontWeight: "bold",
        color: "red"
    },
    loginFormContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
        padding: 10,
        paddingTop: 50,
        backgroundColor: "white",
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        maxWidth: 700,
        width: "100%",
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        maxHeight: "70%",
        alignItems: "center",
    }
})
