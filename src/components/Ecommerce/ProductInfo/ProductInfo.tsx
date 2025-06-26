import { Card, Container } from "react-bootstrap";
import styles from "./styles.module.css";
import { Link } from "react-router-dom";
import "@styles/global.css";

const { cardBody ,viewDetails, myCard } = styles;


type ProductInfoProps = {
  title: string;
  img: string;
  price: number;
  direction?: "row" | "column";
  children?: React.ReactNode;
  quantity?: number;
  id?: number;
  cat_prefix?: string;
};

export default function ProductInfo({
  title,
  img,
  price,
  children,
  quantity,
  id,
  cat_prefix,
}: ProductInfoProps) {
  return (
    <div className="bg-all">
      <Container className="pt-3 ">
        <Card style={{ width: "100%" }} className={` ${myCard}`}>
          <Card.Img
            variant="top"
            src={img}
            alt={title}
            className={`border-bottom w-100`}
           
            style={{ height: "220px", objectFit: "cover" ,width:"300px" }}
          />
          <Card.Body
            className={`d-flex flex-column justify-content-between  ${cardBody}`}
          >
            <div>
              <Card.Title className="fs-6 text-truncate " title={title}>
                {title}
              </Card.Title>
              <Card.Text className="fw-bold text-primary ">
                {price.toFixed(2)} EGP
              </Card.Text>

              {quantity !== undefined && (
                <>
                  <p className="mb-1 small ">Quantity: {quantity}</p>
                  <p className="mb-2 small">
                    Total: {(quantity * price).toFixed(2)} EGP
                  </p>
                </>
              )}
            </div>

            {children && <div className="mt-2">{children}</div>}
          </Card.Body>
          <div className={`${viewDetails}`}>
            <p className="text-center">
              <Link
                to={
                  cat_prefix ? `/details/${cat_prefix}/${id}` : `/details/${id}`
                }
                className="text-decoration-none text-light"
              >
                View Details
              </Link>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
}
