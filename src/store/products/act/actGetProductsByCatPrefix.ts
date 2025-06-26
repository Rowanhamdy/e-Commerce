import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@types";
import { axiosErrorHandler } from "@utils/index";

type TResponse = TProduct[];

const actGetProductsByCatPrefix = createAsyncThunk(
  "products/actGetProductsByCatPrefix",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue , signal } = thunkAPI;
    try {
      const response = await axios.get<TResponse>(
        `https://snapdragon-delicate-shoulder.glitch.me/api/products?cat_prefix=${prefix}`,
        {signal}
      );
      return response.data;
    } catch (error) {
     return rejectWithValue(axiosErrorHandler(error))
    }
  }
);

export default actGetProductsByCatPrefix;