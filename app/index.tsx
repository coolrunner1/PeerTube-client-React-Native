import { Text, StyleSheet, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ff76gab"
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <View style={styles.button}>
        <Text style={styles.buttonText}>Button</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: "purple",
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: "bold"
  }
})
