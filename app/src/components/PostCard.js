import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const PostCard = ({ post, onPress, onLike, onCommentPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.authorContainer}>
        {post.author.avaUrl && (
          <Image source={{ uri: post.author.avaUrl }} style={styles.avatar} />
        )}
        <Text style={styles.author}>{post.author.username}</Text>
        <Text style={styles.postDate}>
          {new Date(parseInt(post.createdAt)).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Text>
      </View>
      <Text style={styles.content}>{post.content}</Text>
      {post.imgUrl && (
        <Image source={{ uri: post.imgUrl }} style={styles.image} />
      )}
      <View style={styles.footer}>
        <Text style={styles.footerText}>{post.likes.length} Likes</Text>
        <Text style={styles.footerText}>{post.comments.length} Comments</Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 10,
        }}
      >
        <TouchableOpacity
          onPress={onLike}
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <AntDesign name="like2" size={24} color="black" />
          <Text style={{ marginStart: 0 }}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onCommentPress}
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <AntDesign name="message1" size={24} color="black" />
          <Text>Comment</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <FontAwesome name="whatsapp" size={24} color="black" />
          <Text>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
        >
          <AntDesign name="sharealt" size={24} color="black" />
          <Text>Share</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  postDate: {
    color: "#888",
    marginLeft: "auto",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  author: {
    fontWeight: "bold",
  },
  content: {
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: 10,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  footerText: {
    color: "#888",
  },
});

export default PostCard;
