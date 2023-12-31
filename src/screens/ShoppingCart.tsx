import { Text, FlatList, View, StyleSheet, Pressable } from "react-native";
import CartListItem from "../components/CartListItem";
import { useAppSelector } from "../redux/hooks";
import {
  selectSubtotal,
  selectDeliveryFee,
  selectTotal,
} from "../redux/features/cartSlice";

const ShoppingCartTotals = () => {
  const subtotal = useAppSelector(selectSubtotal);
  const deliveryFee = useAppSelector(selectDeliveryFee);
  const total = useAppSelector(selectTotal);

  return (
    <View style={styles.totalsContainer}>
      <View style={styles.row}>
        <Text style={styles.text}>Subtotal</Text>
        <Text style={styles.text}>{`$${subtotal.toFixed(2)}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>Delivery</Text>
        <Text style={styles.text}>{`$${deliveryFee.toFixed(2)}`}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textBold}>Total</Text>
        <Text style={styles.textBold}>{`$${total.toFixed(2)}`}</Text>
      </View>
    </View>
  );
};

const ShoppingCart = () => {
  const cart = useAppSelector((state) => state.cart.items);

  return (
    <>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        ListFooterComponent={ShoppingCartTotals}
      />
      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Checkout</Text>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  totalsContainer: {
    margin: 20,
    paddingTop: 10,
    borderColor: "gainsboro",
    borderTopWidth: 1,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 2,
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textBold: {
    fontWeight: "500",
  },
  button: {
    backgroundColor: "black",
    position: "absolute",
    bottom: 30,
    width: "90%",
    alignSelf: "center",
    padding: 20,
    borderRadius: 100,
    alignItems: "center",
  },
  buttonText: { color: "white", fontWeight: "500", fontSize: 16 },
});

export default ShoppingCart;
