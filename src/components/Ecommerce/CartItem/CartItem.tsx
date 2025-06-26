import { memo } from "react";
import { Form, Button } from "react-bootstrap";
import type { TProduct } from "@types";
import styles from "./styles.module.css";
import ProductInfo from "../ProductInfo/ProductInfo";

const { cartItem } = styles;

type CartItemProps = TProduct & {
  changeQuantityHandler: (id: number, quantity: number) => void;
  removeItemHandler: (id: number) => void;
};

const CartItem = memo(
  ({
    id,
    title,
    img,
    price,
    max,
    quantity,
    cat_prefix,
    changeQuantityHandler,
    removeItemHandler,
  }: CartItemProps) => {
    // render option list
    const renderOptions = Array(max)
      .fill(0)
      .map((_, idx) => {
        const quantity = ++idx;
        return (
          <option value={quantity} key={quantity}>
            {quantity}
          </option>
        );
      });

    const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const quantity = +event.target.value;
      changeQuantityHandler(id, quantity);
    };

    return (
     
        <div className={`${cartItem} `} style={{ maxWidth: "100%" }}>
        <div >
          <ProductInfo
            title={title}
            price={price}
            img={img}
            direction="column"
            id={id}
            quantity={quantity}
            cat_prefix={cat_prefix}
          >
            <Button
              variant="secondary"
              className="mt-auto w-100"
              onClick={() => removeItemHandler(id)}
            >
              Remove
            </Button>
          </ProductInfo>
        </div>

        <div>
          <span className="mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOptions}
          </Form.Select>
        </div>
      </div>
     
      
    );
  }
);

export default CartItem;
