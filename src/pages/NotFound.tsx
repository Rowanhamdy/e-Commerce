import { Container } from "react-bootstrap";
import { Link} from "react-router-dom";
import { LottieHandler } from "@components/feedback";
export default function NotFound() {

  return (
    <Container className="d-flex  justify-content-center align-items-center">
      <div className="not-found">
        <LottieHandler type="notFound" to="/"/> 
        <Link to="/" replace={true} className="decoration">
          Go To Home{" "}
        </Link>
      </div>
    </Container>
  );
}
