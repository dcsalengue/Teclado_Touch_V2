
import { styled } from "styled-components"
import Teclado from "./componentes/Teclado"
import { useState } from "react";


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

function App() {
  const [teclaPressionada, setTeclaPressionada] = useState(null);
  return (
    <FundoGradiente>
        <DivTeste> {teclaPressionada} </DivTeste>
        <Teclado  onTeclaPressionada={setTeclaPressionada}/>
        
        
    </FundoGradiente>
  )
}

export default App 
