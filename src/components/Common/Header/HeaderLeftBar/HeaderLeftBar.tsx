import HeaderCounter from "../HeaderCounter/HeaderCounter";
import { useAppSelector } from "@store/hook";
import styles from "./styles.module.css";
import Wishlist from "@assets/svg/wishlist.svg?react";
import Logo from "@assets/svg/cart.svg?react";
import { getCartTotalQuantitySelector } from "@store/cart/selectors";

const { headerLeftBar } = styles;
export default function HeaderLeftBar() {
  const totalQuantitywishlist = useAppSelector(
    (state) => state.wishlist.itemsId.length
  );
  const totalQuantitycart = useAppSelector(getCartTotalQuantitySelector);

  return (
    <div className={headerLeftBar}>
      <HeaderCounter
        to={"/wishlist"}
        totalQuantity={totalQuantitywishlist}
        svgIcon={<Wishlist className="mb-1" title="basket icon" />}
        name="Wishlist"
        
      />
      <HeaderCounter
        to={"/cart"}
        totalQuantity={totalQuantitycart}
        svgIcon={<Logo title="list icon" />}
        name="Cart"

      />
    </div>
  );
}
