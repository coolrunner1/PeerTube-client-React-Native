import { useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";

export default function Index() {
  const [visible, setVisible] = useState<boolean>(false)

  const clickTest = () => {
    setVisible(!visible);
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff76gab"
      }}
    >
      <Text>Edit app/index.tsx to edit this dfdfscresdfden.</Text>
      <View style={styles.button} onTouchStart={clickTest} onPointerDown={clickTest}>
        <Text style={styles.buttonText}>Button</Text>
      </View>
      {visible && <Text style={styles.testText}>Test</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "purple",
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontWeight: "bold"
  },
  testText: {
    fontSize: 90,
    fontWeight: "bold",
    color: "pink"
  }
})
