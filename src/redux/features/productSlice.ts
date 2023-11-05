import { createSlice } from "@reduxjs/toolkit";
import products from "../../data/products";
import { Product } from "../../types";

interface ProductState {
  products: Product[];
  selectedProduct: Product | null | undefined;
}

const initialState: ProductState = {
  products,
  selectedProduct: null,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSelectedProduct: (state, action) => {
      const productId = action.payload;
      state.selectedProduct = state.products.find(
        (product) => product.id === productId
      );
    },
  },
});

export const { setSelectedProduct } = productSlice.actions;

export default productSlice.reducer;
