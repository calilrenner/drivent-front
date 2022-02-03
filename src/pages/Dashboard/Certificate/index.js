import { createRef, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { BlockedText, Center, PageTitle } from "../../../components/DefaultTabStyle";
import Loading from "../../../components/Loading";
import UserContext from "../../../contexts/UserContext";
import useApi from "../../../hooks/useApi";
import Certification from "./Certification";
import Pdf from "react-to-pdf";
import Button from "../../../components/Form/Button";

export default function Certificate() {
  const { payment } = useApi();
  const { userData } = useContext(UserContext);
  const userId = userData.user.id;

  const [hasPayment, setHasPayment] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modality, setModality] = useState("");

  function checkPayment(userId) {
    setLoading(true);
    payment.findPayment(userId)
      .then((response) => {
        if (response.status === 200) {
          setHasPayment(true);
          setModality(response.data[0].modality.type);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }

  useEffect(() => {
    checkPayment(userId);
  }, []);

  const ref = createRef();
  const options = {
    orientation: "portrait",
  };

  return (
    <>
      <PageTitle>Certificado</PageTitle>
      {
        hasPayment
          ?
          <>
            <CertificateContainerStyle ref={ref}>
              <Certification modality={modality}/>
            </CertificateContainerStyle>
            <Pdf targetRef={ref} filename="Certificate.pdf" options={options}>
              {({ toPdf }) =>
                <ButtonStyle onClick={toPdf}>
                    Baixar PDF
                </ButtonStyle>
              }
            </Pdf>
          </>
          :
          <Center>
            {loading ? <Loading /> : <BlockedText>Você precisa participar do evento para obter um certificado</BlockedText>}
          </Center>
      }
    </>
  );
}

const CertificateContainerStyle = styled.section`
  margin-bottom: 10px;
`;

const ButtonStyle = styled(Button)`
  margin-left: 100px;
`;
