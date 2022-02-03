import { useContext, useEffect, useState } from "react";
import { BlockedText, Center, PageTitle } from "../../../components/DefaultTabStyle";
import Loading from "../../../components/Loading";
import UserContext from "../../../contexts/UserContext";
import useApi from "../../../hooks/useApi";
import Certification from "./Certification";

export default function Certificate() {
  const { payment } = useApi();
  const { userData } = useContext(UserContext);
  const userId = userData.user.id;

  const [hasPayment, setHasPayment] = useState(false);
  const [loading, setLoading] = useState(false);

  function checkPayment(userId) {
    setLoading(true);
    payment.findPayment(userId)
      .then((response) => {
        if (response.status === 200) {
          setHasPayment(true);
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

  return (
    <>
      <PageTitle>Certificado</PageTitle>
      {
        hasPayment
          ?
          <Certification/>
          :
          <Center>
            {loading ? <Loading /> : <BlockedText>Você precisa participar do evento para obter um certificado</BlockedText>}
          </Center>
      }
    </>
  );
}
