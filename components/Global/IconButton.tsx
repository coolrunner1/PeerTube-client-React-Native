import {Pressable, StyleProp, StyleSheet, ViewStyle} from "react-native";
import {ThemedText} from "@/components/Global/ThemedText";
import {useTheme} from "@react-navigation/core";
import {Colors} from "@/constants/Colors";
import {FontAwesome6} from "@expo/vector-icons";

export const IconButton = (
    props: {
        name: string;
        onPress: () => void;
        customIconColor?: string;
        customIconSize?: number;
        style?: StyleProp<ViewStyle>;
    }
) => {
    const theme = useTheme();
    const iconColor = theme.dark ? Colors.light.color : Colors.dark.color;

    return (
        <Pressable
            style={[
                styles.button,
                theme.dark
                    ? {backgroundColor: Colors.light.backgroundColor}
                    : {backgroundColor: Colors.dark.backgroundColor},
                props.style,
            ]}
            onPress={props.onPress}>
            <FontAwesome6
                name={props.name}
                size={props.customIconSize ? props.customIconSize : 20}
                color={props.customIconColor ? props.customIconColor : iconColor}
            />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 10,
        padding: 10,
        marginHorizontal: 5,
        width: "auto",
    },
})
