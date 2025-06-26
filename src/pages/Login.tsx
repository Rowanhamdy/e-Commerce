import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row, Alert, Spinner, Container } from "react-bootstrap";
import { Heading } from "@components/Common";
import { Input } from "@components/Forms";
import { Navigate } from "react-router-dom";
import { useLogin } from "@hooks/useLogin";
export default function Login() {
  const {
    error,
    loading,
    accessToken,
    register,
    handleSubmit,
    formErrors,
    onSubmit,
    searchParams,
  } = useLogin();
  
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
    <Container>
      <div className="d-flex justify-content-center m-1">
        <Heading title="User Login" />
      </div>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          {searchParams.get("message") === "login_required" && (
            <Alert variant="success">
              You need to login to view this content
            </Alert>
          )}
          {searchParams.get("message") === "account_created" && (
            <Alert variant="success">
              Your account successfully created , please login
            </Alert>
          )}
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Email"
              name="email"
              register={register}
              error={formErrors.email?.message}
            />
            <Input
              type="password"
              label="Password"
              name="password"
              register={register}
              error={formErrors.password?.message}
            />
            <Button
              className="mb-3"
              variant="info"
              type="submit"
              style={{ color: "white" }}
            >
              {loading === "pending" ? (
                <>
                  <Spinner animation="border" size="sm"></Spinner>
                  Loading ...{" "}
                </>
              ) : (
                "Submit"
              )}
            </Button>
            {error && (
              <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
      
    </>
  );
}
