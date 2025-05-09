import React from 'react';
import { StyleProp, Text, TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import {useTheme} from "@react-navigation/core";
import {useTextColor} from "@/hooks/useTextColor";


export const ThemedText = (
    props: {
        style?: StyleProp<TextStyle>;
        children: React.ReactNode;
        inverseColor?: boolean,
        onPress?: () => void;
    }
) => {

    return (
        <Text
            onPress={props.onPress}
            style={[
                {
                    color: useTextColor({invert: props.inverseColor})
                },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
};
