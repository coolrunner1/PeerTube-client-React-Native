import {Pressable, StyleProp, StyleSheet, Text, ViewStyle} from "react-native";
import {ThemedText} from "@/components/ThemedText";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";

export const ThemedButton = (
    props: {
        title: string;
        onPress: () => void;
        customStyle?: StyleProp<ViewStyle>;
    }
) => {
    const theme = useTheme();

    return (
        <Pressable
            style={[
                styles.button,
                theme.dark
                    ? {backgroundColor: Colors.light.backgroundColor}
                    : {backgroundColor: Colors.dark.backgroundColor},
                props.customStyle,
            ]}
            onPressOut={props.onPress}>
            <ThemedText style={styles.buttonText} inverseColor={true}>{props.title}</ThemedText>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        padding: 10,
        borderRadius: 10,
    },
    buttonText: {
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center",
    },
})
