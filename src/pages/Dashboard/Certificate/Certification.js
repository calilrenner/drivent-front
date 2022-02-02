import styled from "styled-components";

export default function Certification() {
  return (
    <CertificateContainerStyle>
      <img src="https://yt3.ggpht.com/oZCGpPQc5qat2YIzVs_h1LTvrtpV6G--Q2CopkOoAa7d1WvHDohPzWO-vSEnQ4GljcQOO_6QkQ=s900-c-k-c0x00ffffff-no-rj" alt="d-background"/>
      <CertificateStyle>
        <LogoStyle>Driven.t</LogoStyle>
        <TitleStyle>CERTIFICADO DE PARTICIPAÇÃO</TitleStyle>
        <p>Certificamos que</p>
        <NameStyle>PARTICIPANTE PARTICIPANDO</NameStyle>
      </CertificateStyle>
    </CertificateContainerStyle>
  );
}

const CertificateContainerStyle = styled.section`
  width: 100%;
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
    margin-top: 15px;
    text-align: center;
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

const NameStyle = styled.p`
  font-weight: 700;
  font-style: italic;
  border-bottom: 1px solid black;
`;
