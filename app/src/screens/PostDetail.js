import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useQuery, useMutation, gql } from "@apollo/client";
import { AntDesign } from "@expo/vector-icons";

const GET_POST_BY_ID = gql`
  query GetPostById($postById: ID!) {
    postById(id: $postById) {
      _id
      content
      tags
      imgUrl
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
      author {
        _id
        name
        username
        email
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

const COMMENT_POST = gql`
  mutation CommentPost($newComment: NewComment!) {
    commentPost(newComment: $newComment) {
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

const PostDetail = ({ route, navigation }) => {
  const { postId } = route.params;
  const { loading, error, data, refetch } = useQuery(GET_POST_BY_ID, {
    variables: { postById: postId },
  });

  const [likePost] = useMutation(LIKE_POST);
  const [commentPost] = useMutation(COMMENT_POST);
  const [comment, setComment] = useState("");

  const handleLike = async () => {
    try {
      await likePost({ variables: { newLike: { postId: postId } } });
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleComment = async () => {
    try {
      await commentPost({
        variables: {
          newComment: { postId: postId, content: comment },
        },
      });
      setComment("");
      refetch();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const { postById } = data;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.postCard}>
        <View style={styles.postHeader}>
          <TouchableOpacity onPress={() => navigation.navigate("UserDetail", { userId: postById.author._id })}>
            <Image
              style={styles.avatar}
              source={{
                uri: postById.author.avaUrl || "https://via.placeholder.com/40",
              }}
            />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <TouchableOpacity onPress={() => navigation.navigate("UserDetail", { userId: postById.author._id })}>
              <Text style={styles.author}>{postById.author.username}</Text>
            </TouchableOpacity>
            <Text style={styles.postDate}>
              {new Date(parseInt(postById.createdAt)).toLocaleDateString(
                "id-ID",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }
              )}
            </Text>
          </View>
        </View>
        <Text style={styles.content}>{postById.content}</Text>
        {postById.imgUrl && (
          <Image style={styles.postImage} source={{ uri: postById.imgUrl }} />
        )}
        <View style={styles.tagsContainer}>
          {postById.tags.map((tag, index) => (
            <Text key={index} style={styles.tag}>
              #{tag}
            </Text>
          ))}
        </View>
        <View style={styles.footer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <Text style={styles.footerText}>{postById.likes.length} Likes</Text>
            <TouchableOpacity
              onPress={handleLike}
              style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
            >
              <AntDesign name="like2" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.footerText}>
            {postById.comments.length} Comments
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Add a comment..."
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.commentButton} onPress={handleComment}>
          <Text style={styles.commentButtonText}>Comment</Text>
        </TouchableOpacity>
        <Text style={styles.commentsTitle}>Comments:</Text>
        {postById.comments.map((comment, index) => (
          <View key={index} style={styles.comment}>
            <Text style={styles.commentAuthor}>{comment.username}</Text>
            <Text>{comment.content}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  postCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerInfo: {
    justifyContent: "center",
  },
  author: {
    fontWeight: "bold",
    fontSize: 18,
  },
  postDate: {
    color: "#777",
    fontSize: 14,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 15,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 15,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginVertical: 10,
  },
  tag: {
    backgroundColor: "#e1e1e1",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginBottom: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  footerText: {
    color: "#888",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 20,
    marginVertical: 10,
  },
  commentButton: {
    backgroundColor: "#4267B2",
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    marginVertical: 10,
  },
  commentButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  commentsTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginVertical: 10,
  },
  comment: {
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    padding: 15,
    marginVertical: 5,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default PostDetail;
