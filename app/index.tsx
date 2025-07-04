import {StyleSheet, View, ImageBackground} from "react-native";
import {Colors} from "@/constants/Colors";
import {ThemedText} from "@/components/Global/ThemedText";
import {ThemedButton} from "@/components/Global/ThemedButton";
import {useEffect} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ThemedView} from "@/components/Global/ThemedView";

export default function Index({navigation}: {navigation: any}) {
    useEffect(() => {
        AsyncStorage.getItem("login")
            .then((data) => data && JSON.parse(data).loggedIn &&
                    navigation.reset({
                    index: 0,
                    routes: [{name: "(main)"}],
                })
            );
    }, [])

    return (
        <ImageBackground
            source={require("@/assets/images/main-page-bg.jpg")}
            resizeMode="cover"
            style={{
                flex: 1,
            }}
        >
            <ThemedView style={styles.mainContainer}>
                <ThemedText style={{fontSize: 40, fontWeight: "bold"}}>Welcome back!</ThemedText>
                <View style={{flex: 1, gap: 10, alignItems: "center", justifyContent: "center"}}>
                    <ThemedButton
                        title={"Login"}
                        onPress={() => navigation.navigate('login', {})}
                        style={{backgroundColor: Colors.emphasised.backgroundColor}}
                    />
                    <ThemedButton
                        title={"Register"}
                        onPress={() => navigation.navigate('registration', {})}
                    />
                </View>
            </ThemedView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    testText: {
        fontSize: 90,
        fontWeight: "bold",
        color: "red"
    },
    mainContainer: {
        flex: 1,
        flexDirection: "column",
        gap: 5,
        padding: 10,
        paddingTop: 50,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        maxWidth: 700,
        width: "100%",
        marginTop: "auto",
        marginLeft: "auto",
        marginRight: "auto",
        maxHeight: "70%",
        alignItems: "center",
        justifyContent: "space-between"
    }
})
