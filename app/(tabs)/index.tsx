import {useEffect, useState} from "react";
import {Text, StyleSheet, View, TextInput, Animated, useColorScheme} from "react-native";
import ScrollView = Animated.ScrollView;
import {StandardInput} from "@/components/StandardInput";

export default function Index() {
    const [visible, setVisible] = useState<boolean>(false);

    const theme = useColorScheme();

    const clickTest = () => {
        setVisible(!visible);
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: "blue",
                /*Image is temporary*/
                /*backgroundImage: theme === "dark"
                    ? "url(https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg)"
                    : "url(https://plus.unsplash.com/premium_photo-1710965560034-778eedc929ff?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwd29ybGR8ZW58MHx8MHx8fDA%3D)",
                */
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
            }}
        >
            <View style={styles.loginFormContainer}>
                <Text>Temp.</Text>
                <StandardInput placeholder={"Test"} onChangeText={function (value: string): void {

                }}            />
                <View style={styles.button} onTouchStart={clickTest} onPointerDown={clickTest}>
                    <Text style={styles.buttonText}>Button</Text>
                </View>
                {visible && <Text style={styles.testText}>Test</Text>}
                <ScrollView style={{maxHeight: 50}}>
                    {[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
                        .map((item, index) => (<Text key={index}>Placeholder {item}</Text>))}
                </ScrollView>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 10,
        backgroundColor: "purple",
        borderRadius: 10
    },
    buttonText: {
        color: 'white',
        fontWeight: "bold"
    },
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
        borderRadius: 20,
        marginTop: "auto",
        maxHeight: 500,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        backdropFilter: "blur(200px)",
    }
})
