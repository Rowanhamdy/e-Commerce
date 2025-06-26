import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hook";
import {
  actGetProductsByCatPrefix,
  cleanUpProductsRecords,
} from "@store/products/productsSlice";

const useProducts = () => {
  const params = useParams();
  const productPrefix = params.prefix;
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector((state) => state.products);
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);

  useEffect(() => {
    const promise = dispatch(
      actGetProductsByCatPrefix(params.prefix as string)
    );

    return () => {
      promise.abort();
            dispatch(cleanUpProductsRecords());

    };
  }, [dispatch, params]);

  const productsFullInfo = records.map((el) => ({
    ...el,
    id:Number(el.id),
    quantity: cartItems[el.id] || 0,
    isLiked: wishListItemId.includes(Number(el.id)),
    isAuthenticated: userAccessToken ? true : false,
  }));

  return { loading, productsFullInfo, productPrefix, error };
};
export default useProducts;
