import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./products/productSlice";

const store = configureStore({ reducer: { product: productSlice } });
export default store;
