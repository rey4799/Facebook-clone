import { FlatList, View } from "react-native";
import StoryItem from "./StoryItem";

const DATA_STORY = [
  {
    id: 1,
    uri: "https://api.duniagames.co.id/api/content/upload/file/19825092321671378189.jpg",
    name: "Zeta",
  },
  {
    id: 2,
    uri: "https://static.wikia.nocookie.net/virtualyoutuber/images/f/ff/Anya_Melfissa_Portrait.jpg/revision/latest?cb=20201201054912",
    name: "Anya",
  },
  {
    id: 3,
    uri: "https://static.myfigurecollection.net/upload/entries/1/189188-9fedd.jpg",
    name: "Fubuki",
  },
  {
    id: 4,
    uri: "https://yt3.googleusercontent.com/OMBfC_xrNx4dz2yYTiS0snZcGdHWb6IZd23cd1Wd1Cww0heoC1RkLy3Xas9yCB7GoLHZjdpE=s900-c-k-c0x00ffffff-no-rj",
    name: "Mythia",
  },
  {
    id: 5,
    uri: "https://static.wikia.nocookie.net/virtualyoutuber/images/8/8b/Hoshimachi_Suisei_2019_Portrait.png/revision/latest/scale-to-width-down/1200?cb=20191205132210",
    name: "Suisei",
  },
  {
    id: 6,
    uri: "https://static.wikia.nocookie.net/virtualyoutuber/images/c/c0/Silvia_Valleria_Portrait.jpg/revision/latest?cb=20231021020108&path-prefix=id",
    name: "Silvia",
  },
];

export default function Story() {
  return (
    <FlatList
      data={DATA_STORY}
      renderItem={({ item }) => {
        return <StoryItem item={item} />;
      }}
      horizontal={true}
      keyExtractor={(item) => item.id}
      showsHorizontalScrollIndicator={false}
    />
  );
}
