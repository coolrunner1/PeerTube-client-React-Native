import { Colors } from '@/constants/Colors';
import {useTheme} from "@react-navigation/core";

export const useBackgroundColor = (
  props: { invert?: boolean } = {}
) => {
  const theme = useTheme();

  return props.invert
      ? theme.dark
          ? Colors.light.backgroundColor
          : Colors.dark.backgroundColor
      : theme.dark
          ? Colors.dark.backgroundColor
          : Colors.light.backgroundColor;
}
