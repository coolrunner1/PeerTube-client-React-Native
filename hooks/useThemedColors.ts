import { Colors } from '@/constants/Colors';
import {useTheme} from "@react-navigation/core";

export const useThemedColors = (
  props: { invert?: boolean } = {}
) => {
  const theme = useTheme();

  return {
    backgroundColor: props.invert
        ? theme.dark
            ? Colors.light.backgroundColor
            : Colors.dark.backgroundColor
        : theme.dark
            ? Colors.dark.backgroundColor
            : Colors.light.backgroundColor,
    color: props.invert
        ? theme.dark
            ? Colors.light.color
            : Colors.dark.color
        : theme.dark
            ? Colors.dark.color
            : Colors.light.color,
  };
}
