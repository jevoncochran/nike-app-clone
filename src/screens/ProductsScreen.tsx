import { Image, StyleSheet, FlatList, Pressable } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../components/Navigation";
import { useNavigation } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setSelectedProduct } from "../redux/features/productSlice";

type Props = NativeStackScreenProps<RootStackParamList, "Products">;

const ProductsScreen = () => {
  // This might not be correct
  // My thinking is typing this way will not work using useNavigation
  // in a component that is not part of navigation stack
  const navigation = useNavigation<Props["navigation"]>();

  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);

  return (
    <FlatList
      data={products}
      renderItem={({ item }) => (
        <Pressable
          style={styles.itemContainer}
          onPress={() => {
            dispatch(setSelectedProduct(item.id));
            navigation.navigate("Product Details");
          }}
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
