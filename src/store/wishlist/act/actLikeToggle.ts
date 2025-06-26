import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosErrorHandler } from "@utils/index";
import axios from "axios";
import type { RootState } from "@store/index";
const actLikeToggle = createAsyncThunk(
  "wishlist/actLikeToggle",
  async (productId: string | number, thunkAPI) => {
    const { rejectWithValue, signal, getState } = thunkAPI;

    try {
      const id = Number(productId);
      // Check if id is a valid number (allow 0 if needed)
      if (Number.isNaN(id) || id <= 0) {
        return rejectWithValue("Invalid product ID");
      }

      const { auth } = getState() as RootState;
      const userId = auth.user?.id;

      if (!userId) {
        return rejectWithValue("User not authenticated");
      }

      // Use normalized id for API call
      const isRecordExist = await axios.get(
        `https://snapdragon-delicate-shoulder.glitch.me/api/wishlist?userId=${userId}&productId=${id}`,
        { signal }
      );

      if (signal.aborted) return;

      if (isRecordExist.data.length > 0) {
        // Delete wishlist item by its wishlist record ID, not productId
        await axios.delete(`https://snapdragon-delicate-shoulder.glitch.me/api/wishlist/${isRecordExist.data[0].id}`);
        return { type: "remove", id }; // use normalized id here
      } else {
        await axios.post("https://snapdragon-delicate-shoulder.glitch.me/api/wishlist", { userId, productId: id });
        return { type: "add", id }; // use normalized id here
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  }
);


export default actLikeToggle;
