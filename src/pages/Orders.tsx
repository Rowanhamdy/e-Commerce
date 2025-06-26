import { Heading } from "@components/Common";
import { Table, Modal, Container } from "react-bootstrap";
import { ProductInfo } from "@components/Ecommerce";
import { useOrders } from "@hooks/useOrders";
import TableSkeleton from "@components/feedback/skeletons/TableSkeleton/TableSkeleton";
import Loading from "@components/feedback";
export default function Orders() {
  const {
    closeModalHandler,
    viewDetailsHandler,
    showModal,
    selectedProduct,
    orderList,
    loading,
    error,
  } = useOrders();
  return (
    <>
      <Container className="mt-5">
        <Heading title="My Order" />
        <Loading
          status={loading}
          error={error}
          pendingComponent={<TableSkeleton />}
        >
          <Modal show={showModal} onHide={closeModalHandler} className="mt-5">
            <Modal.Header closeButton>
              <Modal.Title>Products Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {selectedProduct.map((el) => (
                <ProductInfo
                  key={el.id}
                  title={el.title}
                  img={el.img}
                  price={el.price}
                  direction="column"
                  quantity={el.quantity}
                  id={el.id}
                  cat_prefix={el.cat_prefix}
                />
              ))}
            </Modal.Body>
          </Modal>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Items</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {orderList.map((el) => (
                <tr key={el.id}>
                  <td>#{el.id}</td>
                  <td>
                    {el.items.length} item(s) {"/"}{" "}
                    <span
                      onClick={() => viewDetailsHandler(el.id)}
                      style={{ textDecoration: "underline", cursor: "pointer" }}
                    >
                      Product Details
                    </span>{" "}
                  </td>
                  <td>{el.subtotal.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Loading>
      </Container>
    </>
  );
}
