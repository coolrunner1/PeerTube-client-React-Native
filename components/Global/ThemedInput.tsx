import {
    StyleProp,
    StyleSheet,
    TextInput,
    TextStyle,
    useColorScheme
} from "react-native";
import {Colors} from "@/constants/Colors";

export type ThemedInputProps = {
    placeholder: string;
    onChangeText: (value: string) => void;
    onSubmitEditing?: () => void;
    placeholderTextColor?: string;
    secureTextEntry?: boolean;
    style?: StyleProp<TextStyle>;
    value: string;
};

export const ThemedInput = (props: ThemedInputProps) => {
    const theme = useColorScheme();

    return (
        <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={props.placeholderTextColor
                ? props.placeholderTextColor
                : theme === "dark" ? Colors.dark.color : Colors.light.color}
            onChangeText={props.onChangeText}
            onSubmitEditing={props.onSubmitEditing}
            value={props.value}
            secureTextEntry={props.secureTextEntry}
            style={[styles.input, theme === "dark" ? styles.dark : styles.light, props.style]}
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
    }
})