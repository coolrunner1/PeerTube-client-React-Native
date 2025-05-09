import { Colors } from '@/constants/Colors';
import {useTheme} from "@react-navigation/core";

export const useTextColor = (
  props: { invert?: boolean } = {}
) => {
  const theme = useTheme();

  return props.invert
      ? theme.dark
          ? Colors.light.color
          : Colors.dark.color
      : theme.dark
          ? Colors.dark.color
          : Colors.light.color;
}
