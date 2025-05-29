import HeaderFavoriteContacts from "@components/contacts/HeaderFavoriteContacts";
import { FlatList, View } from "react-native";
import { Text } from "react-native-paper";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d744",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d7777",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d788",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d7",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d7aaa",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d7fff",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www1",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www2",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www3",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www4",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www5",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www6",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www7",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72ww8w",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www9",
    title: "Third Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72www99",
    title: "Third Item",
  },
];

const FavoriteContacts = () => {
  return (
    <>
      <HeaderFavoriteContacts />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <View style={{ padding: 20 }}>
            <Text variant="titleLarge">{item.title}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        scrollEventThrottle={16}
      />
    </>
  );
};

export default FavoriteContacts;
