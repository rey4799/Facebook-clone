import { useState } from "react";
import { View, Text, Image, TextInput, Button, StyleSheet } from "react-native";
import { useMutation, gql } from "@apollo/client";

const REGISTER_MUTATION = gql`
  mutation Register($newUser: NewUser) {
    register(newUser: $newUser) {
      _id
      name
      username
      email
      avaUrl
    }
  }
`;

const Register = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avaUrl, setAvaUrl] = useState("");
  const [register] = useMutation(REGISTER_MUTATION);

  const handleRegister = async () => {
    try {
      await register({
        variables: {
          newUser: {
            name,
            username,
            email,
            password,
            avaUrl,
          },
        },
      });
      navigation.navigate("Login");
    } catch (error) {
      console.error(error.graphQLErrors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Image
          style={styles.image}
          source={require("../../assets/FacebookName.png")}
        />
      </View>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="avaUrl"
        value={avaUrl}
        onChangeText={setAvaUrl}
      />
      <Button title="Register" onPress={handleRegister} />
      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <Button title="Login" onPress={() => navigation.navigate("Login")} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: 325,
    height: 100,
    justifyContent: "center",
    textAlign: "center",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});

export default Register;
