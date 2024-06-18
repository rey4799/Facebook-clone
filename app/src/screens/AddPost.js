import { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import { useMutation, gql } from "@apollo/client";

const ADD_POST = gql`
  mutation AddPost($newPost: NewPost!) {
    addPost(newPost: $newPost) {
      _id
      content
      tags
      imgUrl
      authorId
    }
  }
`;

const GET_POSTS = gql`
  query GetPosts {
    posts {
      _id
      content
      tags
      imgUrl
      comments {
        content
        username
      }
      likes {
        username
      }
      createdAt
      updatedAt
      author {
        username
        avaUrl
      }
    }
  }
`;

const AddPost = ({ navigation }) => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [addPost] = useMutation(ADD_POST, {
    refetchQueries: [{ query: GET_POSTS }],
    awaitRefetchQueries: true,
  });

  const handleAddPost = async () => {
    try {
      await addPost({
        variables: {
          newPost: {
            content,
            tags: tags.split(",").map((tag) => tag.trim()),
            imgUrl,
          },
        },
      });
      setContent("");
      setTags("");
      setImgUrl("");
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What's on your mind?"
        placeholderTextColor="#555"
        value={content}
        onChangeText={setContent}
      />
      <TextInput
        style={styles.input}
        placeholder="Tags"
        placeholderTextColor="#555"
        value={tags}
        onChangeText={setTags}
      />
      <TextInput
        style={styles.input}
        placeholder="Image URL"
        placeholderTextColor="#555"
        value={imgUrl}
        onChangeText={setImgUrl}
      />
      <Button title="Post" onPress={handleAddPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f2f5",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default AddPost;
