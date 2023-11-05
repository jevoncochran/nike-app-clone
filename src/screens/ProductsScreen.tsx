import { Image, StyleSheet, FlatList, Pressable } from "react-native";
import products from "../data/products";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../components/Navigation";
import { useNavigation } from "@react-navigation/native";

type Props = NativeStackScreenProps<RootStackParamList, "Products">;

const ProductsScreen = () => {
  // This might not be correct
  // My thinking is typing this way will not work using useNavigation
  // in a component that is not part of navigation stack
  const navigation = useNavigation<Props["navigation"]>();

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => navigation.navigate("Product Details")}
        >
          <Image
            source={{
              uri: item.image,
            }}
            style={styles.image}
          />
        </Pressable>
      )}
      numColumns={2}
    />
  );
};

const styles = StyleSheet.create({
  image: { width: "100%", aspectRatio: 1 },
  itemContainer: { width: "50%", padding: 1 },
});

export default ProductsScreen;
