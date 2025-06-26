import {  memo } from "react";
import { Button, Spinner } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ProductInfo from "../ProductInfo/ProductInfo";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import type { TProduct } from "@types";
import styles from "./styles.module.css";
import { useProductAvailability } from "@hooks/useProductAvailability";

const { maximumNotice, wishlistBtn } = styles;


const Product = memo((props: TProduct) => {

  const {
    id,
    title,
    price,
    img,
    max,
    isLiked,
    quantity,
    isAuthenticated,
    cat_prefix,
  } = props;

const {
  isBtnDisabled,
  isLoading,
  quantityReachedToMax,
  currentRemainingQuantity,
  addToCartHandler,
  likeToggleHandler,
  showModal,
  setShowModal,
} = useProductAvailability({
  id,
  max,
  isAuthenticated,
  quantity,
});

  

  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You need to login first to add this item to your wishlist.</p>
        </Modal.Body>
      </Modal>

      <ProductInfo
        title={title}
        price={price}
        img={img}
        id={id}
        cat_prefix={cat_prefix}
      >
        <div className={wishlistBtn} onClick={likeToggleHandler}>
          {isLoading ? (
            <Spinner animation="border" size="sm" variant="primary" />
          ) : isLiked ? (
            <LikeFill />
          ) : (
            <Like />
          )}
        </div>

        <p className={maximumNotice}>
          {quantityReachedToMax
            ? "You've reached the maximum limit"
            : `You can add ${currentRemainingQuantity} item(s)`}
        </p>

        <Button
          variant="info"
          style={{ color: "white", width: "100%" }}
          onClick={addToCartHandler}
          disabled={isBtnDisabled || quantityReachedToMax}
        >
          {isBtnDisabled ? (
            <>
              <Spinner animation="border" size="sm" /> Loading...
            </>
          ) : (
            "Add to cart"
          )}
        </Button>
      </ProductInfo>
    </>
  );
});

export default Product;
