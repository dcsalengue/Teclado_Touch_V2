
import { styled } from "styled-components"
import Teclado from "./componentes/Teclado"
import { useState } from "react";

const ContainerDisplay = styled.div`
  position: relative;
  width: 482px;
  height: 274px;
  border: 2px solid blue;
  background-color:white;
`
const tecladoStyle = {
  position: 'absolute',
  right: '0px',
  top: '72px'
};

const FundoGradiente = styled.div`
  display:flex;
  align-items: center;
  justify-content:center;
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
  width: 100%;
  min-height: 100vh;
  `
const DivTeste = styled.div`
  width: auto;
  height: 20px;
  background-color: #2292b1;
  display:flex;
  align-items: center;
  justify-content:center;
 `
const BarraDeStatus = styled.header`
position: absolute;
top: 0px;
height: 63px;
width: 100%;
background-color: #FF00FF;

`
const CaminhoDePao = styled.footer`
  position: absolute;
  bottom: 0px;
  height: 20px;
  width: 100%;
  background-color: #FF00FF;
`
const Main = styled.main`
  display: flex;
  position: absolute;
  align-items: center;
  justify-content:center;
  top: 63px;
  left: 0px;
  height: 197px;
  width: 293px;
  background-color: #00bbff;
  color: white;
  font-size: 20px;
`

function App() {
  const [teclaPressionada, setTeclaPressionada] = useState(null);
  return (
    <FundoGradiente>
      <ContainerDisplay>
        <BarraDeStatus />
        <Main>{teclaPressionada}</Main> 
        <Teclado style={tecladoStyle} onTeclaPressionada={setTeclaPressionada} />
        <CaminhoDePao />
      </ContainerDisplay>

      
    </FundoGradiente>
  )
}

export default App 
//<DivTeste> {teclaPressionada} </DivTeste>