import React from 'react';
import { StyleProp, Text, TextStyle } from "react-native";
import { Colors } from "@/constants/Colors";
import {useTheme} from "@react-navigation/core";

interface ThemedTextProps {
    style?: StyleProp<TextStyle>;
    children: React.ReactNode;
    inverseColor?: boolean,
    onPress?: () => void;
}

export const ThemedText: React.FC<ThemedTextProps> = ({ style, children, inverseColor, onPress }) => {
    const theme = useTheme();

    return (
        <Text
            onPress={onPress}
            style={[
                style,
                {
                    color: inverseColor
                        ? theme.dark
                            ? Colors.light.color
                            : Colors.dark.color
                        : theme.dark
                            ? Colors.dark.color
                            : Colors.light.color,
                },
            ]}
        >
            {children}
        </Text>
    );
};
