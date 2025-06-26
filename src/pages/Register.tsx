import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Col, Row, Spinner } from "react-bootstrap";
import { Heading } from "@components/Common";
import { Input } from "@components/Forms";
import { Navigate } from "react-router-dom";
import { useRegister } from "@hooks/useRegister";

export default function Register() {
  const {
    loading,
    error,
    accessToken,
    onSubmit,
    errors,
    register,
    handleSubmit,
    emailOnBlurHandler,
    emailAvailabilityStatus,
  } = useRegister();
  if (accessToken) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="d-flex justify-content-center m-1">
        <Heading title="User Registration" />
      </div>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Fisrt Name"
              name="firstName"
              register={register}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              name="lastName"
              register={register}
              error={errors.lastName?.message}
            />
            <Input
              label="Email"
              name="email"
              register={register}
              error={
                errors.email?.message
                  ? errors.email?.message
                  : emailAvailabilityStatus === "notAvailable"
                  ? "this email is already in use"
                  : ""
              }
              onBlur={emailOnBlurHandler}
              formText={
                emailAvailabilityStatus === "checking"
                  ? "We're currently checking the availability of this email address. Please wait a moment."
                  : emailAvailabilityStatus === "failed"
                  ? "Error form the server"
                  : ""
              }
              success={
                emailAvailabilityStatus === "available"
                  ? "This email is available for use."
                  : ""
              }
              disabled={emailAvailabilityStatus === "checking" ? true : false}
            />

            <Input
              type="password"
              label="Password"
              name="password"
              register={register}
              error={errors.password?.message}
            />
            <Input
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword?.message}
            />

            <Button
              className="mb-3"
              variant="info"
              type="submit"
              style={{ color: "white" }}
              disabled={
                emailAvailabilityStatus === "checking"
                  ? true
                  : false || loading === "pending"
              }
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
    </>
  );
}
