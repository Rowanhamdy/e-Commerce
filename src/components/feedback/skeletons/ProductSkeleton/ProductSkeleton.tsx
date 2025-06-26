import ContentLoader from "react-content-loader";
import { Row, Col } from "react-bootstrap";



type ProductSkeletonProps = {
  max: number;
};

export default function ProductSkeleton({max} : ProductSkeletonProps) {
   const renderSkeletons = Array(max)
    .fill(0)
    .map((_, idx) => (
      <Col key={idx} xs={3} className="d-flex justify-content-center mb-5 mt-2">
        <ContentLoader 
    speed={2}
    width={150}
    height={400}
    viewBox="0 0 150 400"
    backgroundColor="#f5f0f0"
    foregroundColor="#ecebeb"
  >
    <rect x="23" y="193" rx="0" ry="0" width="123" height="0" /> 
    <rect x="8" y="37" rx="0" ry="0" width="131" height="119" /> 
    <rect x="18" y="195" rx="0" ry="0" width="111" height="4" /> 
    <rect x="19" y="181" rx="0" ry="0" width="97" height="3" />
  </ContentLoader>
      </Col>

    ))
  return (
    <Row>{renderSkeletons}</Row>
  )
}
