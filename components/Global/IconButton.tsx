import {Pressable, StyleProp, StyleSheet, ViewStyle} from "react-native";
import {FontAwesome6} from "@expo/vector-icons";
import {useThemedColors} from "@/hooks/useThemedColors";

export const IconButton = (
    props: {
        name: string;
        onPress: () => void;
        customIconColor?: string;
        customIconSize?: number;
        style?: StyleProp<ViewStyle>;
    }
) => {
    const {color, backgroundColor} = useThemedColors({invert: true});

    return (
        <Pressable
            style={[
                styles.button,
                {backgroundColor},
                props.style,
            ]}
            onPress={props.onPress}>
            <FontAwesome6
                name={props.name}
                size={props.customIconSize ? props.customIconSize : 20}
                color={props.customIconColor ? props.customIconColor : color}
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
