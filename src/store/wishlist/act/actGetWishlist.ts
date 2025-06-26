import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@types";
import { axiosErrorHandler } from "@utils/index";
import type { RootState } from "@store/index";

type TDataType = "productsFullInfo" | "productsIds";
type TResponse = TProduct[];

const actGetWishlist = createAsyncThunk(
  "wishlist/actGetWishlist",
  async (dataType: TDataType, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;
    const { auth } = getState() as RootState;

    try {
      // Get wishlist items for user
      const userWishlist = await axios.get<{ productId: number }[]>(
        `https://snapdragon-delicate-shoulder.glitch.me/api/wishlist?userId=${auth.user?.id}`,
        { signal }
      );

      // Deduplicate IDs
      const productIds = [...new Set(userWishlist.data.map((i) => Number(i.productId)))];

      if (productIds.length === 0) return { data: [], dataType: "productsIds" };

      if (dataType === "productsIds") return { data: productIds, dataType: "productsIds" };

      // Build query string with ids
      const concatenatedItemsId = productIds.map((id) => `id=${id}`).join("&");

      // Fetch products matching IDs
      const productsResponse = await axios.get<TResponse>(`https://snapdragon-delicate-shoulder.glitch.me/api/products?${concatenatedItemsId}`, { signal });

      // Return full product info
      return { data: productsResponse.data, dataType: "productsFullInfo" };
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);

export default actGetWishlist;
