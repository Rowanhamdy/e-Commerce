import { Row, Col, ListGroup, Container } from "react-bootstrap";
import { Outlet, NavLink } from "react-router-dom";
const ProfileLayout = () => {
  return (
    <>
      <Container className="mt-5">
        <Row>
          <Col md={3}>
            <ListGroup>
              <ListGroup.Item as={NavLink} to="" end>
                Account Info
              </ListGroup.Item>
              <ListGroup.Item as={NavLink} to="orders">
                Orders
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col>
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default ProfileLayout;
