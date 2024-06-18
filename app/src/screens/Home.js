import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
  Image,
  Pressable,
} from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import { FontAwesome } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

import PostCard from "../components/PostCard";
import AddPostButton from "../components/AddPostButton";
import Story from "../components/Story";

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

const LIKE_POST = gql`
  mutation LikePost($newLike: NewLike!) {
    likePost(newLike: $newLike) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;

const Home = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(GET_POSTS);
  const [likePost] = useMutation(LIKE_POST);

  const handleLike = async (postId) => {
    try {
      await likePost({
        variables: {
          newLike: {
            postId: postId,
          },
        },
      });
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data.posts}
        keyExtractor={(item) => item._id}
        ListHeaderComponent={
          <>
            <View style={styles.author}>
              <Pressable
                onPress={async () => {
                  const userLogin = await SecureStore.getItemAsync("_id");
                  navigation.navigate("UserDetail", { userId: userLogin });
                }}
              >
                <FontAwesome name="user-circle-o" size={24} color="black" />
              </Pressable>
              <AddPostButton refetchPosts={refetch} />
              <FontAwesome name="image" size={24} color="black" />
            </View>
            <View style={styles.story}>
              <Story />
            </View>
          </>
        }
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={() => handleLike(item._id)}
            onCommentPress={() =>
              navigation.navigate("PostDetail", { postId: item._id })
            }
            onPress={() =>
              navigation.navigate("PostDetail", { postId: item._id })
            }
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  author: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 5,
    marginHorizontal: 25,
  },
  story: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 0.5,
    borderTopColor: "#ccc",
    borderTopWidth: 0.5,
  },
});

export default Home;
