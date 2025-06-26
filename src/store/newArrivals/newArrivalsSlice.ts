import { createSlice } from "@reduxjs/toolkit";
import type { TLoading } from "@types";
import type { TProduct } from "@types";
import actGetNewArrivals from "./act/actGetNewArrivals";
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

const newArrivalsSlice = createSlice({
  name:"newArrivals",
  initialState,
  reducers:{},
  extraReducers:(builder) => {
      builder.addCase(actGetNewArrivals.pending ,(state) => {
        state.loading ="pending";
        state.error = null;
      });
      builder.addCase(actGetNewArrivals.fulfilled , (state,action) =>{
        state.loading = "succeeded";
        state.records = action.payload;
      });
      builder.addCase(actGetNewArrivals.rejected, (state, action) => {
            state.loading = "failed";
            if (isString(action.payload)) {
              state.error = action.payload;
            }
          });
  },
})
export{actGetNewArrivals};
export default newArrivalsSlice.reducer;