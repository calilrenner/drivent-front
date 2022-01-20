import styled from "styled-components";

export default function PaymentSelection({ modalityInfo, paymentVisibility }) {
  return (
    <PaymentContainer visible={paymentVisibility}>
      Este espaço é destinado para a lógica de pagamento! :)
    </PaymentContainer>
  );
}

const PaymentContainer = styled.section`
  display: ${props => props.visible ? "" : "none"};
`;
