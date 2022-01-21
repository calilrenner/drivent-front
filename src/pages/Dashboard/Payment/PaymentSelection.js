import { useContext } from "react";
import styled from "styled-components";
import PaymentInfo from "../../../components/Dashboard/Payment/PaymentInfo";
import UserContext from "../../../contexts/UserContext";

export default function PaymentSelection({ modalityInfo, paymentVisibility }) {
  const { userTicket } = useContext(UserContext);

  return (
    <PaymentContainer visible={paymentVisibility} userTicket={userTicket}>
      <PaymentInfo modalityInfo={modalityInfo} />
    </PaymentContainer>
  );
}

const PaymentContainer = styled.section`
  display: ${(props) =>
    props.visible || props.userTicket.length > 0 ? "" : "none"};
`;
