import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import categories from "./categories/categoriesSlice";
import products from "./products/productsSlice";
import cart from "./cart/cartSlice";
import wishlist from "./wishlist/wishlistSlice";
import auth from "./auth/authSlice";
import orders from "./orders/ordersSlice";
import newArrivals from './newArrivals/newArrivalsSlice'
import bestSeller from './bestSellers/bestSellersSlice'
// const rootPersistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart", "auth"],
// };


const cartPersistConfig = {
  key: "cart",
  storage,
  whitelist: ["items"],
};
// const wishlistPersistConfig = {
//   key: "wishlist",
//   storage,
//   whitelist: ["itemsId"],
// };
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "accessToken"],
};


const rootReducer = combineReducers({
  categories,
  products,
  orders,
  newArrivals,
  bestSeller,
  auth: persistReducer(authPersistConfig, auth),
  cart: persistReducer(cartPersistConfig, cart),
  wishlist,
});


// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);



const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

export { store, persistor };
