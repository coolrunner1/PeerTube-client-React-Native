import {useBackgroundColor} from "@/hooks/useBackgroundColor";
import {StyleProp, View, ViewStyle} from "react-native";
import React from "react";

export type ThemedViewProps = {
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    invert?: boolean;
};

export const ThemedView = (props: ThemedViewProps) => {
    const backgroundColor = useBackgroundColor({invert: props.invert});

    return (
        <View style={[{backgroundColor}, props.style]}>
            {props.children}
        </View>
    );
};