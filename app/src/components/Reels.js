import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

const Reels = () => {
  return (
    <ScrollView
      style={styles.reelsContainer}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <View style={styles.reel}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt9uLfQz908FWODP4_l4MP5LjhjZi0aSF4vQ&s",
          }}
          style={styles.reelImage}
        />
        <Text style={styles.reelText}>Dlwlrma</Text>
      </View>
      <View style={styles.reel}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_V44_eN4w5I8nkhV4fq96zAOb3KULIbpOIQ&s",
          }}
          style={styles.reelImage}
        />
        <Text style={styles.reelText}>Jisoo</Text>
      </View>
      <View style={styles.reel}>
        <Image
          source={{
            uri: "https://i.redd.it/230114-im-lesserafim-twitter-update-kim-chaewon-v0-rerf1jwaayba1.jpg?width=1536&format=pjpg&auto=webp&s=4616178e2816f2df26a305b74fcf4429c5cbf02f",
          }}
          style={styles.reelImage}
        />
        <Text style={styles.reelText}>Chaewon</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  reelsContainer: {
    backgroundColor: "#fff",
    marginTop: 50,
    height: 350,
  },
  reel: {
    marginRight: 20,
    marginLeft: 20,
    alignItems: "center",
  },
  reelImage: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  reelText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Reels;
