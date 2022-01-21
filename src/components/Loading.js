import styled from "styled-components";
import Loader from "react-loader-spinner";

export default function Loading() {
  return (
    <LoadingComponent>
      <Loader type="BallTriangle" color="#FF4791" height={80} width={80} />
      <Status>Carregando...</Status>
    </LoadingComponent>
  );
}

const LoadingComponent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Status = styled.span`
    font-size: 18px;
    color: #FF4791;
    margin-top: 10px;
`;
