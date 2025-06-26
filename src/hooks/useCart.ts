import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import {
  actGetProductsByItems,
  cartItemChangeQuantity,
  cartItemRemove,
  clearCartAfterPlaceOrder,
} from "@store/cart/cartSlice";
import { resetOrderStatus } from "@store/orders/ordersSlice";
import type { TProduct } from "@types";
const useCart = () => {
  const dispatch = useAppDispatch();

  const { items, productsFullInfo, loading, error } = useAppSelector(
    (state) => state.cart
  );

  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  const placeOrderStatus = useAppSelector((state) => state.orders?.loading  );

  const changeQuantityHandler = useCallback(
    (id: number, quantity: number) => {
      dispatch(cartItemChangeQuantity({ id, quantity }));
    },
    [dispatch]
  );

  const removeItemHandler = useCallback(
    (id: number) => {
      dispatch(cartItemRemove(id));
    },
    [dispatch]
  );

  const products = productsFullInfo
    .filter((el :TProduct) => items[el.id] !== undefined)
    .map((el : TProduct) => ({
      ...el,
      quantity: items[el.id],
    }));


  useEffect(() => {
    const promise = dispatch(actGetProductsByItems());
    return () => {
      promise.abort();
      // dispatch(clearCartAfterPlaceOrder());
      // dispatch(resetOrderStatus());
    };
  }, [dispatch]);


  // Clear cart after successful order
  useEffect(() => {
  if (placeOrderStatus === "succeeded") {
    const timer = setTimeout(() => {
      dispatch(clearCartAfterPlaceOrder());
      dispatch(resetOrderStatus());
    }, 3000); // Wait 3 seconds before clearing cart and resetting status

    return () => clearTimeout(timer);
  }
}, [placeOrderStatus, dispatch]);

  return {
    loading,
    error,
    products,
    userAccessToken,
    placeOrderStatus,
    changeQuantityHandler,
    removeItemHandler,
  };
};

export default useCart;
