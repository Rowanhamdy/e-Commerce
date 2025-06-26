import { useAppSelector } from "@store/hook";
import { Heading } from "@components/Common";
import { Container } from "react-bootstrap";
export default function Account() {
  const accountInfo = useAppSelector((state) => state.auth.user);
  return (
    <>
    <Container className="mt-5">
      <Heading title="Account Info" />
      <ul>
        <li>First Name :{accountInfo?.firstName}</li>
        <li>Last Name :{accountInfo?.lastName}</li>
        <li>Email : {accountInfo?.email}</li>
      </ul>
    </Container>
      
    </>
  );
}
