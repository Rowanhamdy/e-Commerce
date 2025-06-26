import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actGetNewArrivals } from "@store/newArrivals/newArrivalsSlice";
import { actGetBestSellers } from "@store/bestSellers/bestSellersSlice";
import { actGetProductsByCatPrefix } from "@store/products/productsSlice";
import { Heading } from "@components/Common";
import useCart from "@hooks/useCart";
import useWishlist from "@hooks/useWishlist";
import { useProductAvailability } from "@hooks/useProductAvailability";
import Like from "@assets/svg/like.svg?react";
import LikeFill from "@assets/svg/like-fill.svg?react";
import { Button, Modal, Spinner } from "react-bootstrap";
import "@styles/global.css";
import { useOrders } from "@hooks/useOrders";
import type { TProduct } from "@types";
import styles from "@components/Ecommerce/Product/styles.module.css";

const { maximumNotice, wishlistBtn } = styles;

export default function Details() {
  const { id, prefix } = useParams<{ id: string; prefix?: string }>();
  const dispatch = useAppDispatch();

  const { products: cartProducts } = useCart();
  const { records: wishlistProducts } = useWishlist();
  const { orderList: ordersProducts } = useOrders();

  const newArrivals = useAppSelector((state) => state.newArrivals.records);
  const bestSellers = useAppSelector((state) => state.bestSeller.records);
  const products = useAppSelector((state) => state.products.records);

  // Combine all sources
  const allProducts: (TProduct & { source?: string })[] = [
    ...newArrivals.map((p) => ({ ...p, source: "newArrivals" })),
    ...bestSellers.map((p) => ({ ...p, source: "bestSellers" })),
    ...products.map((p) => ({ ...p, source: "products" })),
    ...cartProducts.map((p) => ({ ...p, source: "cart" })),
    ...ordersProducts.flatMap((order) =>
      order.items.map((item) => ({ ...item, source: "orders" }))
    ),
    ...wishlistProducts.map((p) => ({ ...p, source: "wishlist" })),
  ];

  const product = allProducts.find((el) => String(el.id) === id);

  // ✅ Calculate quantity already in cart
  const cartItem = cartProducts.find((item) => item.id === product?.id);
  const cartQuantity = cartItem?.quantity ?? 0;

  // ✅ Always call the hook
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
    id: product?.id ?? 0,
    max: product?.max ?? 0,
    isAuthenticated: product?.isAuthenticated ?? false,
    quantity: cartQuantity, // pass current cart quantity
  });

  useEffect(() => {
    if (!newArrivals.length) dispatch(actGetNewArrivals());
    if (!bestSellers.length) dispatch(actGetBestSellers());
    if (!products.length && prefix) dispatch(actGetProductsByCatPrefix(prefix));
  }, [
    dispatch,
    newArrivals.length,
    bestSellers.length,
    products.length,
    prefix,
  ]);

  // Handle not found after hook is called
  if (!product) {
    return (
      <div className="container text-center mt-5">
        <h2>Product not found</h2>
        <Link className="btn btn-primary mt-3" to="/">
          Go Back
        </Link>
      </div>
    );
  }

  const headingTitle =
    prefix && typeof prefix === "string"
      ? `${prefix.charAt(0).toUpperCase()}${prefix.slice(1)} Products`
      : product?.source === "newArrivals"
      ? "New Arrivals"
      : product?.source === "bestSellers"
      ? "Best Sellers"
      : product?.source === "cart"
      ? "Cart Product"
      : product?.source === "wishlist"
      ? "Wishlist Product"
      : product?.source === "orders"
      ? "Orders Product"
      : "Product Details";

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

      <div className="container d-flex justify-content-between align-items-center mt-5 flex-wrap gap-2">
        <Heading title={headingTitle} />
        <p className="mt-4">
          <Link className="text-decoration-none my-font" to="/">
            Home
          </Link>{" "}
          / {headingTitle}
        </p>
      </div>

      <div className="bg-all min-vh-100">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <img
                src={product.img}
                alt={product.title || "Product Image"}
                className="img-fluid w-75 border rounded"
              />
            </div>

            <div className="col-md-6">
              <h2 className="fw-bold mb-3">{product.title}</h2>
              <p className="mb-2">
                Price: <strong>{product.price}</strong>
              </p>
              <p className="mb-4">Category: {product.cat_prefix}</p>

              <div className={wishlistBtn} onClick={likeToggleHandler}>
                {isLoading ? (
                  <Spinner animation="border" size="sm" variant="primary" />
                ) : product.isLiked ? (
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
