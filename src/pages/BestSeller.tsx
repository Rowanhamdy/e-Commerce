import { Container, Row, Col, Modal } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";
import { addToCart } from "@store/cart/cartSlice";
import "@styles/global.css";
import Loading from "@components/feedback";
import { actGetProductsByItems } from "@store/cart/cartSlice";
import Wishlist from "@assets/svg/wishlist.svg?react";
import Logo from "@assets/svg/cart.svg?react";
import {  actLikeToggle } from "@store/wishlist/wishlistSlice";
import { Link } from "react-router-dom";
import ProductSkeleton from "@components/feedback/skeletons/ProductSkeleton/ProductSkeleton";
import useBestSeller from "@hooks/useBestSeller";
import { useAppDispatch } from "@store/hook";
export default function BestSeller() {
  const { loading,
    error,
    skeletonCount,
    showModal,
    setShowModal,
    bestSellersProduct ,userAccessToken} = useBestSeller()
    const dispatch = useAppDispatch()
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
      <Container>
        <div className=" d-flex justify-content-center align-items-center mt-5">
          <div className="text-center">
            <h2 className="mainHead">Best Sellers</h2>
            <p className="mainInfo ">
              Nunc id ante quis tellus faucibus dictum in eget metus. Duis
              suscipit elit sem, sed mattis tellus accumsan eget. Quisque
              consequat venenatis rutrum. Quisque posuere enim augue, in rhoncus
              diam dictum non. Etiam mollis pulvinar nisl.
            </p>
          </div>
        </div>

        <div className="mt-2 position-relative pb-5">
          <Loading status={loading} error={error} pendingComponent={<ProductSkeleton max={skeletonCount} />}>
            <Row>
              {bestSellersProduct.map((product) => (
                <Col key={product.id} lg={3} md={6} className="mt-4 ">
                  <Card style={{ width: "100%" }} className="my-card">
                    <Card.Img
                      variant="top"
                      src={product.img}
                      className="border-bottom"
                    />
                    <Card.Body className="card-body">
                      <Card.Title>{product.title}</Card.Title>
                      <div className="d-flex justify-content-between align-items-center">
                        <Card.Text>{product.price} EGP</Card.Text>

                        <div className="d-flex gap-2">
                          <Button
                            className="bg-transparent text-black border-0 p-0"
                            onClick={() => {
                              dispatch(addToCart(product.id));
                              dispatch(actGetProductsByItems());
                            }}
                          >
                            <Logo />
                          </Button>

                          <Button
                            className="bg-transparent text-black border-0 p-0"
                            onClick={() => {
                              if (!userAccessToken) {
                                setShowModal(true);
                                return;
                              }
                              if (
                                typeof product.id === "number" &&
                                !Number.isNaN(product.id)
                              ) {
                                dispatch(actLikeToggle(product.id))
                                  .catch((e) => {
                                    console.error("Failed to toggle like:", e);
                                  })
                                  
                              } else {
                                console.warn("Invalid product ID:", product.id);
                              }
                            }}
                          >
                            <Wishlist
                              style={{
                                fill: product.isLiked ? "red" : "none",
                                stroke: "var(--text-color)",
                                strokeWidth: 2,
                              }}
                            />
                          </Button>
                        </div>
                      </div>
                    </Card.Body>

                    <div className=" details">
                      <p className="text-center">
                        <Link
                          to={`/details/${product.id}`}
                          className="text-decoration-none text-light"
                        >
                          View Details
                        </Link>
                      </p>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Loading>
        </div>
      </Container>
    </>
  );
}
