import { Link, useLocation, useRouteMatch, useHistory } from "react-router-dom";
import useApi from "../../../hooks/useApi";
import UserContext from "../../../contexts/UserContext";
import { useContext } from "react";

import styled from "styled-components";

import {
  FaFileContract,
  FaMoneyBill,
  FaBed,
  FaCalendarWeek,
  FaCertificate,
  FaSignOutAlt,
} from "react-icons/fa";

import NavigationButton from "./NavigationButton";

export default function NavigationBar() {
  const location = useLocation();
  const match = useRouteMatch();
  const api = useApi();
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  function isActive(buttonPath) {
    return location.pathname === buttonPath;
  }

  function signOut() {
    api.user.signOut(userData.user.id)
      .then(() => {
        setUserData({ ...userData, token: "" });
        localStorage.clear();
        history.push("/sign-in");
      });
  }

  return (
    <Container>
      <Link to={`${match.path}/subscription`}>
        <NavigationButton active={isActive(`${match.path}/subscription`)}>
          <FaFileContract />
          <span>Inscrição</span>
        </NavigationButton>
      </Link>

      <Link to={`${match.path}/payment`}>
        <NavigationButton active={isActive(`${match.path}/payment`)}>
          <FaMoneyBill />
          <span>Pagamento</span>
        </NavigationButton>
      </Link>

      <Link to={`${match.path}/hotel`}>
        <NavigationButton active={isActive(`${match.path}/hotel`)}>
          <FaBed />
          <span>Hotel</span>
        </NavigationButton>
      </Link>

      <Link to={`${match.path}/activities`}>
        <NavigationButton active={isActive(`${match.path}/activities`)}>
          <FaCalendarWeek />
          <span>Atividades</span>
        </NavigationButton>
      </Link>

      <Link to={`${match.path}/certificate`}>
        <NavigationButton active={isActive(`${match.path}/certificate`)}>
          <FaCertificate />
          <span>Certificado</span>
        </NavigationButton>
      </Link>

      <NavigationButton>
        <FaSignOutAlt onClick={signOut} />
        <span onClick={signOut}>Sair</span>
      </NavigationButton>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ddd;
  box-shadow: 2px 0 10px 0 rgba(0, 0, 0, 0.1);
  width: 100px;
  flex-shrink: 0;
  justify-content: flex-start;

  > a {
    text-decoration: none;
  }

  @media (max-width: 600px) {
    width: 100%;
    height: 80px;
    flex-direction: row;
  }
`;
