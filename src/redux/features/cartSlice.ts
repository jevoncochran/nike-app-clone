import { createSlice, createSelector } from "@reduxjs/toolkit";
import { Product } from "../../types";
import { RootState } from "../store";

type CartItem = {
  product: Product;
  quantity: number;
};

interface CartState {
  items: CartItem[];
  deliveryFee: number;
  freeDeliveryFrom: number;
}

const initialState: CartState = {
  items: [],
  deliveryFee: 15,
  freeDeliveryFrom: 200,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const newProductInCart = state.items.find(
        (product) => product.product.id === newProduct.id
      );

      if (newProductInCart) {
        newProductInCart.quantity += 1;
      } else {
        state.items.push({ product: newProduct, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const productId = action.payload;
      const cartItem = state.items.find(
        (item) => item.product.id === productId
      );
      if (cartItem) {
        if (cartItem.quantity < 10) {
          cartItem.quantity += 1;
        }
      }
    },
    decrementQuantity: (state, action) => {
      const productId = action.payload;
      const cartItem = state.items.find(
        (item) => item.product.id === productId
      );
      if (cartItem) {
        if (cartItem.quantity > 0) {
          cartItem.quantity -= 1;
        }
      }
    },
  },
});

export const selectNumberOfItems = (state: RootState) =>
  state.cart.items.length;

export const selectSubtotal = (state: RootState) =>
  state.cart.items.reduce(
    (sum, cartItem) => sum + cartItem.product.price * cartItem.quantity,
    0
  );

export const selectCart = (state: RootState) => state.cart;

export const selectDeliveryFee = createSelector(
  selectSubtotal,
  selectCart,
  (subtotal, cart) => {
    if (subtotal >= cart.freeDeliveryFrom) {
      return 0;
    } else {
      return cart.deliveryFee;
    }
  }
);

export const selectTotal = createSelector(
  selectSubtotal,
  selectDeliveryFee,
  (subtotal, deliveryFee) => subtotal + deliveryFee
);

export const { addToCart, incrementQuantity, decrementQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
