import { Heading } from "@components/Common";
import Loading from "@components/feedback";
import { LottieHandler } from "@components/feedback";
import { CartItemList, CartSubTotalPrice } from "@components/Ecommerce";
import useCart from "@hooks/useCart";
import CartSkeleton from "@components/feedback/skeletons/CartSkeleton/CartSkeleton";
import { Container, Row, Col } from "react-bootstrap";

const Cart = () => {
  const {
    loading,
    error,
    userAccessToken,
    placeOrderStatus,
    removeItemHandler,
    changeQuantityHandler,
    products,
  } = useCart();

  const skeletonCount = products.length > 0 ? products.length : 4;

  return (
    <div className="bg-all min-vh-100">
      <Container className="mt-5 pb-5">
      <Heading title="Your Cart" />
        <Loading
          status={loading}
          error={error}
          pendingComponent={<CartSkeleton max={skeletonCount} />}
        >
          {placeOrderStatus === "succeeded" ? (
            <Row className="">
              <Col >
                <LottieHandler
                  type="success"
                  message="Your order has been placed successfully"
                />
              </Col>
            </Row>
          ) : products.length ? (
            <>
            <Row className="gy-4">
              <Col >
                <CartItemList
                  products={products}
                  changeQuantityHandler={changeQuantityHandler}
                  removeItemHandler={removeItemHandler}
                />
              </Col>
              </Row>
              <Row>
               <Col>
                <CartSubTotalPrice
                  products={products}
                  userAccessToken={userAccessToken}
                />
              </Col>
            </Row>
            </>
          ) : (
            <Row className="w-100">
              <Col >
                <LottieHandler type="empty" message="Your cart is empty" />
              </Col>
            </Row>
          )}
         
        </Loading>
      </Container>
    </div>
  );
};

export default Cart;
