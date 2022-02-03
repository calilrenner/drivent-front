import { useEffect, useState } from "react";
import styled from "styled-components";
import useApi from "../../../hooks/useApi";

export default function Certification() {
  const { enrollment } = useApi();
  const [ userName, setUserName ] = useState("Usuário");

  useEffect(() => {
    enrollment.getPersonalInformations().then(response => {
      if (response.status !== 200) {
        return;
      }
      const { name } = response.data;
      setUserName(name);
    });
  }, []);

  return (
    <CertificateContainerStyle>
      <img src="https://yt3.ggpht.com/oZCGpPQc5qat2YIzVs_h1LTvrtpV6G--Q2CopkOoAa7d1WvHDohPzWO-vSEnQ4GljcQOO_6QkQ=s900-c-k-c0x00ffffff-no-rj" alt="d-background"/>
      <CertificateStyle>
        <LogoStyle>Driven.t</LogoStyle>
        <TitleStyle>CERTIFICADO DE PARTICIPAÇÃO</TitleStyle>
        <TextContainerStyle>
          <p>Certificamos que</p>
          <NameStyle>{ userName }</NameStyle>
          <p>participou do evento <strong>Imersão em Literatura Fantástica</strong>, com carga horária de 30h.</p>
          <SigningAreaStyle>
            <img src="https://cdn131.picsart.com/324796905087211.png?type=webp&to=min&r=640" alt="Dumbledore-signature"/>
            <SignatureStyle>Minerva McGonagall</SignatureStyle>
          </SigningAreaStyle>
        </TextContainerStyle>
      </CertificateStyle>
    </CertificateContainerStyle>
  );
}

const CertificateContainerStyle = styled.section`
  width: 100%;
  max-width: 790px;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  img {
    width: 400px;
    opacity: 0.3;
  }
`;

const CertificateStyle = styled.div`
  width: 100%;
  height: 100%;
  border: 1px double #F75B97;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;

  p {
    margin-top: 8px;
    text-align: center;
    line-height: 20px;
  }
`;

const LogoStyle = styled.div`
  padding: 10px 15px 0 0;
  width: 100%;
  text-align: end;
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-style: italic;
  color: #F75B97;
`;

const TitleStyle = styled.h2`
  margin: 15px 0;
  text-align: center;
  font-size: 20px;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  color: #343434;
`;

const TextContainerStyle = styled.div`
  width: 90%;
  max-width: 350px;
`;

const NameStyle = styled.p`
  font-weight: 700;
  font-style: italic;
  border-bottom: 1px solid black;
`;

const SigningAreaStyle = styled.div`
  display: flex;
  justify-content: right;
  align-items: flex-end;
  position: relative;
  margin-top: 40px;
  height: 65px;

  img{
    width: 170px;
    opacity: 1;
    position: absolute;
    top: 0;
  }
`;

const SignatureStyle = styled.div`
  width: 60%;
  text-align: end;
  padding: 5px 10px;
  border-top: 1px solid black;
`;
