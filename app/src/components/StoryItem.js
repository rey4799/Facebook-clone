import { Image, Text, View } from "react-native";

export default function StoryItem({ item }) {
  return (
    <View style={{ marginRight: 8 }}>
      <Image
        source={{ uri: item.uri }}
        style={{ width: 80, height: 80, borderRadius: 40 }}
      />
      <Text style={{ fontSize: 15, fontWeight: "bold", textAlign: "center" }}>
        {item.name}
      </Text>
    </View>
  );
}
