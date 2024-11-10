import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setData(state, action) {
      return action.payload;
    },
    addProduct(state, action) {
      console.log(action.payload);
      state.push(action.payload);
    },
    deleteProduct(state, action) {
      return state.filter((product) => product.id !== action.payload);
    },
    updateProduct(state, action) {
      const index = state.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export default productsSlice.reducer;
export const { setData, addProduct, deleteProduct, updateProduct } =
  productsSlice.actions;
