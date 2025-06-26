// actLoadCartFromAPI.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from "@store";

const actLoadCartFromAPI = createAsyncThunk(
  "cart/actLoadCartFromAPI",
  async (_, thunkAPI) => {
    const { getState, fulfillWithValue, rejectWithValue, signal } = thunkAPI;
    const state = getState() as RootState;
    const userId = state.auth.user?.id;

    if (!userId) return fulfillWithValue({});

    try {
      const res = await axios.get(`https://snapdragon-delicate-shoulder.glitch.me/api/carts?userId=${userId}`, { signal });
      const cart = res.data[0];

      if (!cart) return fulfillWithValue({});
      
      const items: Record<string, number> = {};
      cart.items.forEach((i: { productId: string, quantity: number }) => {
        items[i.productId] = i.quantity;
      });

      return fulfillWithValue(items);
    } catch (error) {
      return rejectWithValue("Failed to load cart from API");
    }
  }
);

export default actLoadCartFromAPI;
