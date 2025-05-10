import {useBackgroundColor} from "@/hooks/useBackgroundColor";
import {StyleProp, View, ViewStyle} from "react-native";
import React from "react";

export const ThemedView = (
    props: {
        style?: StyleProp<ViewStyle>;
        children: React.ReactNode;
        invert?: boolean;
    }
) => {
    const backgroundColor = useBackgroundColor({invert: props.invert});
    return (
        <View style={[{backgroundColor}, props.style]}>
            {props.children}
        </View>
    );
};