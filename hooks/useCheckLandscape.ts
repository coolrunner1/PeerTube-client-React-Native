import {useWindowDimensions} from "react-native";

export const useCheckLandscape = () => {
  const {height, width} = useWindowDimensions();
  return width > height;
}
