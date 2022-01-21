import styled from "styled-components";
import PaymentInfo from "../../../components/Dashboard/Payment/creditCard";

export default function PaymentSelection({ modalityInfo, paymentVisibility }) {
  return (
    <PaymentContainer visible={paymentVisibility}>
      <PaymentInfo
        modalityInfo={modalityInfo}
        paymentVisibility={paymentVisibility}
      />
    </PaymentContainer>
  );
}

const PaymentContainer = styled.section`
  display: ${(props) => (props.visible ? "" : "none")};
`;
