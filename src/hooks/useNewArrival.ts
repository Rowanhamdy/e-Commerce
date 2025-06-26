import "@styles/global.css";
import {  useAppSelector , useAppDispatch } from "@store/hook";
import { actGetNewArrivals } from "@store/newArrivals/newArrivalsSlice";
import { useEffect, useMemo, useState } from "react";
import { actGetWishlist } from "@store/wishlist/wishlistSlice";


const useNewArrival = ()=>{
      const dispatch = useAppDispatch();

    const { loading, error, records } = useAppSelector(
    (state) => state.newArrivals
  );
  const cartItems = useAppSelector((state) => state.cart.items);
  const wishListItemId = useAppSelector((state) => state.wishlist.itemsId);
  const userAccessToken = useAppSelector((state) => state.auth.accessToken);
  const [showModal, setShowModal] = useState(false);
 const skeletonCount =
    records.length > 0 ? records.length : 4;
  useEffect(() => {
    dispatch(actGetNewArrivals());
    dispatch(actGetWishlist("productsIds"));
  }, [dispatch]);

  const newArrivalsProduct = useMemo(() => {
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
  return {loading , error ,showModal , setShowModal ,skeletonCount ,newArrivalsProduct,userAccessToken}
}

export default useNewArrival