import React from 'react';
import { StyleProp, Text, TextStyle } from "react-native";
import {useTextColor} from "@/hooks/useTextColor";

export const ThemedText = (
    props: {
        style?: StyleProp<TextStyle>;
        children: React.ReactNode;
        inverseColor?: boolean,
        onPress?: () => void;
    }
) => {
    const color = useTextColor({invert: props.inverseColor});

    return (
        <Text
            onPress={props.onPress}
            style={[
                {color},
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
};
