import { NavigationContainer } from "@react-navigation/native";
import ProductsScreen from "../screens/ProductsScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";
import ShoppingCart from "../screens/ShoppingCart";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppSelector } from "../redux/hooks";
import { selectNumberOfItems } from "../redux/features/cartSlice";

export type RootStackParamList = {
  Products: undefined;
  "Product Details": undefined;
  Cart: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Navigation = () => {
  const numberOfItems = useAppSelector(selectNumberOfItems);

  return (
    <NavigationContainer>
      <RootStack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: "white" } }}
      >
        <RootStack.Screen
          name="Products"
          component={ProductsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigation.navigate("Cart")}
              >
                <FontAwesome5 name="shopping-cart" size={18} />
                <Text
                  style={{ marginLeft: 5, fontWeight: "500" }}
                >{`(${numberOfItems})`}</Text>
              </Pressable>
            ),
          })}
        />
        <RootStack.Screen
          name="Product Details"
          component={ProductDetailsScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <Pressable
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigation.navigate("Cart")}
              >
                <FontAwesome5 name="shopping-cart" size={18} />
                <Text
                  style={{ marginLeft: 5, fontWeight: "500" }}
                >{`(${numberOfItems})`}</Text>
              </Pressable>
            ),
          })}
        />
        <RootStack.Screen name="Cart" component={ShoppingCart} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
