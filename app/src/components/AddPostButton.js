import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddPostButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.buttonContainer}
      onPress={() => navigation.navigate("AddPost")}
    >
      <Text style={styles.buttonText}>What's on your mind?</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
    margin: 10,
  },
  buttonText: {
    fontSize: 16,
    color: "#555",
  },
});

export default AddPostButton;
