import { createAsyncThunk } from "@reduxjs/toolkit";
import type{ RootState } from "@store/index";
import axios from "axios";
import type { TProduct } from "@types";
import {axiosErrorHandler} from "@utils/index";

type TResponse = TProduct[];

const actGetProductsByItems = createAsyncThunk(
  "cart/actGetProductsByItems",
  async (_, thunkAPI) => {
    const { rejectWithValue, fulfillWithValue, getState  ,signal} = thunkAPI;
    const { cart } = getState() as RootState;
    const itemsId = Object.keys(cart.items);

    if (!itemsId.length) {
      return fulfillWithValue([]);
    }

    try {
      const concatenatedItemsId = itemsId.map((el) => `id=${el}`).join("&");
      
      // Fetch products by IDs (only one endpoint needed)
      const response = await axios.get<TResponse>(`https://snapdragon-delicate-shoulder.glitch.me/api/products?${concatenatedItemsId}`, { signal });

      // Response has all matching products
      const products = response.data;
      return products
    } catch (error) {
     return rejectWithValue(axiosErrorHandler(error))
    }
  }
);

export default actGetProductsByItems;

