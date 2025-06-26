import {
  saveCartToLocalStorage,
  loadCartFromLocalStorage,
} from "./../../utils/cartStorage";
import { createSlice } from "@reduxjs/toolkit";
import actGetProductsByItems from "./act/actGetProductsByItems";
import {
  getCartTotalQuantitySelector,
  // itemQuantityAvailabilityCheckingSelector,
} from "./selectors";
import type { TProduct } from "@types";
import type { TLoading } from "@types";
import { isString } from "@types";
import { authLogout } from "@store/auth/authSlice";
// import { authLogout } from "@store/auth/authSlice";
import actLoadCartFromAPI from "./act/actLoadCartFromAPI";

interface ICartState {
  items: { [key: string]: number };
  productsFullInfo: TProduct[];
  loading: TLoading;
  error: null | string;
}

const initialState: ICartState = {
  items: {},
  productsFullInfo: [],
  loading: "idle",
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const id = action.payload;
      if (state.items[id]) {
        state.items[id]++;
      } else {
        state.items[id] = 1;
      }
      saveCartToLocalStorage(state.items);
    },
    cartItemChangeQuantity: (state, action) => {
      if (action.payload.quantity < 1) return;
      state.items[action.payload.id] = action.payload.quantity;
      saveCartToLocalStorage(state.items);
    },
    cartItemRemove: (state, action) => {
      delete state.items[action.payload];
      state.productsFullInfo = state.productsFullInfo.filter(
        (el) => el.id !== action.payload
      );
      saveCartToLocalStorage(state.items);
    },
    cleanCardFullInfo: (state) => {
      state.productsFullInfo = [];
    },
    clearCartAfterPlaceOrder: (state) => {
      state.items = {};
      state.productsFullInfo = [];
      saveCartToLocalStorage(state.items);
    },
    setCartFromLocalStorage: (state) => {
      state.items = loadCartFromLocalStorage();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actGetProductsByItems.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actGetProductsByItems.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.productsFullInfo = action.payload;
    });
    builder.addCase(actGetProductsByItems.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    builder.addCase(actLoadCartFromAPI.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(actLoadCartFromAPI.fulfilled, (state, action) => {
      state.loading = "succeeded";
      state.items = action.payload;
    });
    builder.addCase(actLoadCartFromAPI.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) {
        state.error = action.payload;
      }
    });

    // when logout reset
    builder.addCase(authLogout, (state) => {
      state.items = {};
      state.productsFullInfo = [];
    });
  },
});

export {
  getCartTotalQuantitySelector,
  // itemQuantityAvailabilityCheckingSelector,
  actGetProductsByItems,
};
export const {
  addToCart,
  cartItemChangeQuantity,
  cartItemRemove,
  cleanCardFullInfo,
  clearCartAfterPlaceOrder,
  setCartFromLocalStorage,
} = cartSlice.actions;
export default cartSlice.reducer;
