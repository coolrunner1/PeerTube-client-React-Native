import {StyleSheet, TextInput, useColorScheme} from "react-native";
import {Colors} from "@/constants/Colors";

export const ThemedInput = (
    props: {
        placeholder: string;
        onChangeText: (value: string) => void;
        placeholderTextColor?: string;
    }
) => {
    const theme = useColorScheme();

    return (
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor
                ? props.placeholderTextColor
                : theme === "dark" ? Colors.dark.color : Colors.light.color}
            onChangeText={props.onChangeText}
            style={[styles.input, theme === "dark" ? styles.dark : styles.light]}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 12,
        borderRadius: 10,
        width: 300,
        fontWeight: "bold",
        fontSize: 16,
    },
    dark: {
        backgroundColor: "#373637",

        color: "white",
    },
    light: {
        backgroundColor: "#fbf0edaf",
        borderColor: "#f5511e",
    }
})