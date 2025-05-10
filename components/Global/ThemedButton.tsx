import {Pressable, StyleProp, StyleSheet, TextStyle, ViewStyle} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {useBackgroundColor} from "@/hooks/useBackgroundColor";

export const ThemedButton = (
    props: {
        title: string;
        onPress: () => void;
        style?: StyleProp<ViewStyle>;
        textStyle?: StyleProp<TextStyle>;
    }
) => {
    const backgroundColor = useBackgroundColor({invert: true});

    return (
        <Pressable
            style={[
                styles.button,
                {backgroundColor},
                props.style,
            ]}
            onPress={props.onPress}>
            <ThemedText style={[styles.buttonText, props.textStyle]} inverseColor={true}>{props.title}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
        width: 300
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",
    },
})
