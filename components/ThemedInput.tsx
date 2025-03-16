import {StyleSheet, TextInput} from "react-native";
import {useTheme} from "@react-navigation/core";

export const ThemedInput = (
    props: {
        placeholder: string;
        onChangeText: (value: string) => void;
    }
) => {
    const theme = useTheme();

    return (
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={theme.dark ? "#f5511e" : "#f5511e"}
            onChangeText={props.onChangeText}
            style={[styles.input, theme.dark ? styles.dark : styles.light]}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        width: 200,
        fontWeight: "bold",
    },
    dark: {
        backgroundColor: "#5a4a45af",
        borderColor: "#f5511e",
        color: "white",
    },
    light: {
        backgroundColor: "#fbf0edaf",
        borderColor: "#f5511e",
    }
})