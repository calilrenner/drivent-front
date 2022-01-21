import { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import styled, { css } from "styled-components/macro";
import { cardForm } from "../../../hooks/cardForm";
import useApi from "../../../hooks/useApi";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { PageSubtitle, Type } from "../../DefaultTabStyle";
import Button from "../../Form/Button";
import TicketCard from "./TicketCard";
import { AiFillCheckCircle } from "react-icons/ai";

export default function PaymentInfo({ modalityInfo }) {
  const { handleFocus, handleChange, handleSubmit, values, errors } =
    cardForm();
  const api = useApi();
  const { modality, acommodation } = modalityInfo;
  const userId = useLocalStorage("userData");
  const [update, setUpdate] = useState(false);
  const [errorMsg, setErrorMsg] = useState(errors.message?.default);
  const [hideCreditCard, setHideCreditCard] = useState(false);

  useEffect(() => {
    setErrorMsg(errors.message?.default);
  }, [update, errors]);

  const ticket = {
    userId: userId[0].user.id,
    modality: modality === "presential" ? "Presencial" : "Online",
    acommodation: acommodation === "yes" ? "Com hotel" : "Sem hotel",
  };

  function handleSubmitResponse(e) {
    handleSubmit(e);
    setUpdate(!update);

    if (errorMsg === "Sucesso!") {
      setUpdate(!update);
      setHideCreditCard(true);
      api.payment.confirmPayment(ticket);
    }
  }

  return (
    <>
      <PageSubtitle visible={true}>Ingresso escolhido</PageSubtitle>
      <TicketCard modalityInfo={modalityInfo}/>
      <PageSubtitle visible={true}>Pagamento</PageSubtitle>
      <CardContainer hideCreditCard={hideCreditCard}>
        <Cards
          cvc={values.cvc}
          expiry={values.expirationDate}
          focused={values.focus}
          name={values.name}
          number={values.number}
        />
        <Form>
          <Input
            name="number"
            type="number"
            placeholder="Card Number"
            value={values.number}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <span>E.g.: 49...51...36...27...</span>
          <Input
            name="name"
            type="text"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
            onFocus={handleFocus}
          />
          <div>
            <input
              name="expirationDate"
              type="text"
              value={values.expirationDate}
              onChange={handleChange}
              onFocus={handleFocus}
            />
            <input
              name="cvc"
              type="number"
              value={values.cvc}
              onChange={handleChange}
              onFocus={handleFocus}
            />
          </div>
        </Form>
        <ErrorFlag show={errors.show}>
          <ul>
            {errors.message && Object.keys(errors.message).map((msg, idx) => {
              if(idx > 0) {
                return <li key={idx}>- {errors.message[msg]}</li>;
              } else {
                return "";
              }
            })}
          </ul>
        </ErrorFlag>
        <Button
          children={errorMsg === "Sucesso!" ? <span>FINALIZAR PAGAMENTO</span> : <span>VALIDAR</span>}
          position="absolute"
          top="10rem"
          right="38rem"
          onClick={(e) => handleSubmitResponse(e)}
        />
      </CardContainer>
      <PaymentCheckContainer hideCreditCard={hideCreditCard}>
        <Check />
        <div>
          <span>Pagamento confirmado!</span>
          <Type>Prossiga para escolha de hospedagem e atividades</Type>
        </div>
      </PaymentCheckContainer>
    </>
  );
}

const Check = styled(AiFillCheckCircle)`
  color: #36B853;
  font-size: 3rem;
`;

const PaymentCheckContainer = styled.div`
  display: ${({ hideCreditCard }) => hideCreditCard ? "flex" : "none"};

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 0.5rem;

    span:first-child {
      margin-bottom: 0.2rem;
    }
  }
`;

const CardContainer = styled.div`
  display: ${({ hideCreditCard }) => hideCreditCard ? "none" : "flex"};
  align-items: center;
  position: absolute;
`;

const InputStyle = css`
  height: 3rem;
  border-radius: 4px;
  outline: none;
  padding-left: 1rem;
  font-size: 18px;
  border: 1px solid #E0E0E0;

  &::placeholder {
    font-size: 18px;
  }

  &:hover {
    border: 1px solid #8e8e8e;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;

  div {
    input {
      ${InputStyle}
      width: 11rem;
      margin-top: 0.7rem;
    }

    input:last-child {
      width: 6rem;
      margin-left: 1rem;
    }
  }

  span {
    font-size: 12px;
    color: #8e8e8e;
    margin: 0.2rem 0 0.7rem 0;
  }
`;

const Input = styled.input`
  ${InputStyle}
  width: 18rem;
`;

const ErrorFlag = styled.div`
  width: 15rem;
  height: 100%;
  background-color: #ffeed2;
  margin-left: 1rem;
  border-radius: 10px;
  padding: 1rem 0 0;
  display: ${({ show }) => show ? "flex" : "none"};
  justify-content: center;

  li {
    margin-bottom: 1rem;
    color: red;
  }
`;
