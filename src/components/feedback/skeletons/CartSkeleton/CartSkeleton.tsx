import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";

type CartSkeletonProps = {
  max: number;
};

const CartSkeleton = ({ max }: CartSkeletonProps) => {
  const renderSkeletons = Array(max)
    .fill(0)
    .map((_, idx) => (
      <Row key={idx} className="mb-4">
        <Col className="d-flex ">
          <ContentLoader
            speed={2}
            width={300}
            height={150}
            viewBox="0 0 300 150"
            backgroundColor="#e6e6e6"
            foregroundColor="#ffffff"
          >
          <rect x="8" y="10" rx="4" ry="4" width="280" height="120" />
          </ContentLoader>
        </Col>
      </Row>
    ));

  return <>{renderSkeletons}</>;
};

export default CartSkeleton;
