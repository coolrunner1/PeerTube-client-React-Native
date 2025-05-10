import { Colors } from '@/constants/Colors';
import {useTheme} from "@react-navigation/core";

export const useTransparentBackgroundColor = (
  props: { invert?: boolean } = {}
) => {
  const theme = useTheme();

  return props.invert
      ? theme.dark
          ? Colors.lightTransparent.backgroundColor
          : Colors.darkTransparent.backgroundColor
      : theme.dark
          ? Colors.darkTransparent.backgroundColor
          : Colors.lightTransparent.backgroundColor;
}
