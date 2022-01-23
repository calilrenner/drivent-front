import { useState, useEffect } from "react";
import useApi from "../../../hooks/useApi";
import Loading from "../../../components/Loading";
import { PageTitle, Center, BlockedText } from "../../../components/DefaultTabStyle";
import ModalitySelection from "./ModalitySelection";
import PaymentSelection from "./PaymentSelection";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function Payment() {
  const [hasSubscription, setHasSubscription] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalityInfo, setModalityInfo] = useLocalStorage("modalityInfo", {});
  const [paymentVisibility, setPaymentVisibility] = useState(false);

  const { enrollment } = useApi();

  useEffect(() => { 
    setLoading(true);
    enrollment.getPersonalInformations()
      .then((response) => {
        if (response.status === 200) {
          setHasSubscription(true);
          setLoading(false);
        } else {
          setHasSubscription(false);
          setLoading(false);
        }
      });
  }, [hasSubscription]);

  return (
    <>
      <PageTitle>Ingresso e pagamento</PageTitle>
      {hasSubscription ?
        <>
          <ModalitySelection
            setModalityInfo={setModalityInfo}
            setPaymentVisibility={setPaymentVisibility}
          />
          <PaymentSelection
            modalityInfo={modalityInfo}
            paymentVisibility={paymentVisibility}
          />
        </>
        :
        <Center>
          {loading ? <Loading /> : <BlockedText>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</BlockedText>}
        </Center>}
    </>
  );
}
