import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@types";
import type { TProduct } from "@types";
import actGetBestSellers from "./act/actGetBestSellers";
import { isString } from "@types";

interface INewArrivalsState {
    records: TProduct[];
  loading: TLoading;
  error: string | null;
}

const initialState : INewArrivalsState ={
     records: [],
  loading: "idle",
  error: null,
}

const bestSellersSlice = createSlice({
  name:"bestSellers",
  initialState,
  reducers:{},
  extraReducers:(builder) => {
      builder.addCase(actGetBestSellers.pending ,(state) => {
        state.loading ="pending";
        state.error = null;
      });
      builder.addCase(actGetBestSellers.fulfilled , (state,action) =>{
        state.loading = "succeeded";
        state.records = action.payload;
      });
      builder.addCase(actGetBestSellers.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
              state.error = action.payload;
            }
          });
  },
})
export{actGetBestSellers};
export default bestSellersSlice.reducer;