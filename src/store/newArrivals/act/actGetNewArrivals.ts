import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { TProduct } from "@types";
import axiosErrorHandler from "@utils/axiosErrorHandler";

type TResponse = TProduct[];

const actGetNewArrivals = createAsyncThunk(
    "newArrivals/actGetNewArrivals",
    async (_, thunkAPI) =>{
    const { rejectWithValue , signal } = thunkAPI;

        try{
            const response = await axios.get<TResponse>(
                "https://snapdragon-delicate-shoulder.glitch.me/api/products?tags=newArrival",
                {signal}
            );
            
            return response.data;
        }catch(error){
            return rejectWithValue(axiosErrorHandler(error))
        }
    }
);

export default actGetNewArrivals
