import "@styles/global.css";
import { useAppDispatch, useAppSelector } from "@store/hook";

import { useEffect, useMemo, useState } from "react";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";
import { actGetBestSellers } from "@store/bestSellers/bestSellersSlice";
const useBestSeller = () => {
  const dispatch = useAppDispatch();
  const { loading, error, records } = useAppSelector(
    (state) => state.bestSeller
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const skeletonCount = records.length > 0 ? records.length : 4;
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(actGetBestSellers());
    dispatch(actGetWishlist("productsIds"));
  }, [dispatch]);

  const bestSellersProduct = useMemo(() => {
    if (!Array.isArray(records)) return [];
    return records
      .filter((el) => {
        const numericId = Number(el.id);
        return !Number.isNaN(numericId);
      })
      .map((el) => {
        const numericId = Number(el.id);
        return {
          ...el,
          id: numericId,
          quantity: cartItems?.[numericId] || 0,
          isLiked:
            Array.isArray(wishListItemId) && wishListItemId.includes(numericId),
          isAuthenticated: !!userAccessToken,
        };
      });
  }, [records, cartItems, wishListItemId, userAccessToken]);
  return {
    loading,
    error,
    skeletonCount,
    showModal,
    setShowModal,
    bestSellersProduct,
    userAccessToken
  };
};
export default useBestSeller;
