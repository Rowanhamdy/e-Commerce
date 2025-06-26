import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";


const CategorySkeleton = () => {
  const renderSkeletons = Array(4)
    .fill(0)
    .map((_, idx) => (
      <Col key={idx} xs={3} className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader
          speed={1}
          width={180}
          height={209}
          viewBox="0 0 180 209"
          backgroundColor="#e6e6e6"
          foregroundColor="#ffffff"
          
        >
          <circle cx="84" cy="95" r="79" />
          <rect x="39" y="187" rx="0" ry="0" width="86" height="0" />
          <rect x="31" y="188" rx="4" ry="4" width="100" height="6" />
        </ContentLoader>
      </Col>
    ));
  return <Row>{renderSkeletons}</Row>;
};
export default CategorySkeleton;
