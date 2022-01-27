import { useContext, useEffect } from "react";
import {
  PageSubtitle,
  Options,
  Option,
  Type,
  Price,
  PageContainer,
} from "../../../components/DefaultTabStyle";
import UserContext from "../../../contexts/UserContext";
import useApi from "../../../hooks/useApi";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function TicketSelection({ ticket, setTicket, setHasHotel }) {
  const api = useApi();
  const userId = useLocalStorage("userData")[0].user.id;
  const { userTicket, setUserTicket } = useContext(UserContext);

  useEffect(() => {
    api.payment.findPayment(userId).then((res) => setUserTicket(res.data));
  }, []);

  return (
    <PageContainer visible={userTicket.length > 0 ? true : false}>
      <PageSubtitle visible={true}>
        Primeiro, escolha sua modalidade de ingresso
      </PageSubtitle>
      <Options visible={true}>
        <Option
          selected={ticket === "presential" ? true : false}
          onClick={() => {
            ticket === "presential" ? setTicket(null) : setTicket("presential");
            setHasHotel(null);
          }}
        >
          <Type>Presencial</Type>
          <Price>R$ 250</Price>
        </Option>
        <Option
          selected={ticket === "online" ? true : false}
          onClick={() => {
            ticket === "online" ? setTicket(null) : setTicket("online");
            setHasHotel("no");
          }}
        >
          <Type>Online</Type>
          <Price>R$ 100</Price>
        </Option>
      </Options>
    </PageContainer>
  );
}
