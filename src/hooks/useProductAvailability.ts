import { useEffect, useState } from "react";
import { useAppDispatch } from "@store/hook";
import { actGetWishlist, actLikeToggle } from "@store/wishlist/wishlistSlice";
import { addToCart } from "@store/cart/cartSlice";

type ProductAvailabilityInput = {
  id: number;
  max: number;
  isAuthenticated?: boolean;
  quantity?: number;
};
export function useProductAvailability({
  id,
  max,
  isAuthenticated,
  quantity,
}: ProductAvailabilityInput) {
  const dispatch = useAppDispatch();

  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  
  const currentRemainingQuantity = max - (quantity ?? 0);
  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false;

  useEffect(() => {
    if (!isBtnDisabled) {
      return;
    }
    const debounce = setTimeout(() => {
      setIsBtnDisabled(false);
    }, 300);
    return () => clearTimeout(debounce);
  }, [isBtnDisabled]);

  const addToCartHandler = () => {
    dispatch(addToCart(id));
    setIsBtnDisabled(true);
  };

 const likeToggleHandler = () => {
  if (isAuthenticated) {
    if (!isLoading) {
      setIsLoading(true);
      dispatch(actLikeToggle(id))
        .unwrap()
        .then(() => {
          dispatch(actGetWishlist("productsFullInfo")); // <- ADD THIS LINE
        })
        .catch((e) => {
          console.error("Failed to toggle like:", e);
        })
        .finally(() => setIsLoading(false));
    }
  } else {
    setShowModal(true);
  }
};


  return {
    isBtnDisabled,
    isLoading,
    quantityReachedToMax,
    currentRemainingQuantity,
    addToCartHandler,
    likeToggleHandler,
    showModal,
    setShowModal,
  };
}
