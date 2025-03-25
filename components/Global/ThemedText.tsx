import React from 'react';
import { StyleProp, Text, TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import {useTheme} from "@react-navigation/core";


export const ThemedText = (
    props: {
        style?: StyleProp<TextStyle>;
        children: React.ReactNode;
        inverseColor?: boolean,
        onPress?: () => void;
    }
) => {
    const theme = useTheme();

    return (
        <Text
            onPress={props.onPress}
            style={[
                {
                    color: props.inverseColor
                        ? theme.dark
                            ? Colors.light.color
                            : Colors.dark.color
                        : theme.dark
                            ? Colors.dark.color
                            : Colors.light.color,
                },
                props.style,
            ]}
        >
            {props.children}
        </Text>
    );
};
