
import styled from "styled-components"
import { useState, useEffect } from "react";

import modoInfusao from "./componentes/modoInfusao.json"
import tipoInfusao from "./componentes/tipoInfusao.json"
import unidades from "./componentes/unidades.json"

import Teclado from "./componentes/Teclado"
import DisplayNumerico from "./componentes/DisplayNumerico";
import ListaSelecionar from "./componentes/ListaSelecionar"


const ContainerDisplay = styled.div`
  position: relative;
  margin: 20px;
  min-width: 482px;
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
  flex-direction: row ;
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
padding-left: 2px;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content:center;
  flex-direction: column ;
  top: 63px;
  left: 0px;
  height: 191px;
  width: 293px;
  background-color: #2F7CC8;
  font-size: 28px;
  box-sizing: border-box;
`

const AbaProgramar = styled.div`
display: flex;
  border: 1px solid white;
  flex-grow: 1; /* Faz com que a AbaProgramar ocupe todo o espaço disponível */
  width: 100%; /* Ocupa todo o espaço disponível horizontalmente */
  height: 100%; /* Ocupa todo o espaço disponível verticalmente */
  display: flex;
  align-items: center;
  justify-content: left;
  
  color: black;
  box-sizing: border-box;
`

const EspacoEsquerda = styled.section`
  padding: 2px;
  flex-grow: 1;
  display:flex;
  flex-direction: column ;
  align-items: left;
  justify-content:center;
  min-height: 100%;
  background-color: white;
`

const EspacoCentro = styled.section`
  min-width: 490px;
`

const EspacoDireita = styled.section`
  flex-grow: 1;
  display:flex;
  align-items: center;
  justify-content:center;
  background-color: white;
  
`

const LabelParametroProgramacao = styled.div`
  display: flex;
  flex-direction: column;
  padding: 3px 1px 1px 3px;
  align-items: left;
  justify-content: left;
  width: 72px;
  height: 100%;
  border-right: 1px solid white;
  font-family: "Ubuntu", sans-serif;
  font-weight: bold;
  font-size: 16px;
  color: white;
  box-sizing: border-box;
  /* Estilo para o span */
  & > span {
    margin-top: auto;
    margin-bottom: 2px;
    font-family: "Ubuntu", sans-serif;
    font-weight: normal;
    font-size: 10px;
    color: #dddddd;
  }
`;


const styleDisplayNumerico = {
  color: "black",
  backgroundColor: "white",
  marginLeft: "2px",
  marginRight: "80px",

}

const divUnidade = {
  display: "flex",
  position: "fixed",
  alignItems: "center",
  justifyContent: "center",
  width: "80px",
  height: "25px",
  margin_right:"0px",
  right: "272px",
  backcground: "red",
  backcgroundColor:"red",
  border: '1px solid black',
  fontSize: "12px",
  
  fontFamily: "Ubunto, sans-serif"
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //O máximo é inclusivo e o mínimo é inclusivo
}

function App() {
  //const [teclaPressionada, setTeclaPressionada] = useState(null);
  const [teclaPressionada, setTeclaPressionada] = useState({ digito: null, contador: 0 });

  const [valorExibido, setValorExibido] = useState('');
  const [valorNumerico, setValorNumerico] = useState(0);

  const handleTeclaPressionada = (novoDigito) => {
    setTeclaPressionada(prevState => ({
      digito: novoDigito,
      contador: prevState.contador + 1
    }));
  };

  // useEffect(() => {
  //   console.log("E aí, isso aqui roda sempre que o componente renderizar!");
  // });
  const [modoInfusaoSelecionado, setModoInfusaoSelecionado] = useState('dose');
  const [tipoInfusaoSelecionado, setTipoInfusaoSelecionado] = useState('manutencao');
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('mg_kg_hora');

  // useEffect(() => {
  //   //if(modoInfusaoSelecionado)
  //   console.log(`${modoInfusaoSelecionado}`);
  // }, [modoInfusaoSelecionado]);

  return (
    <FundoGradiente>
      <EspacoEsquerda>
        <ListaSelecionar nome={"modoInfusao"} value={modoInfusaoSelecionado} itens={modoInfusao} setSelecionado={setModoInfusaoSelecionado} />
        <ListaSelecionar nome={"tipoInfusao"} value={tipoInfusaoSelecionado} itens={tipoInfusao} setSelecionado={setTipoInfusaoSelecionado} naoExibe={modoInfusaoSelecionado === "volumetrico"} />
        <ListaSelecionar nome={"unidades"} value={unidadeSelecionada} itens={unidades} setSelecionado={setUnidadeSelecionada} naoExibe={modoInfusaoSelecionado === "volumetrico"} />
      </EspacoEsquerda>

      <EspacoCentro>
        <ContainerDisplay>
          <BarraDeStatus />
          <Main>
            <AbaProgramar>
              <LabelParametroProgramacao tipoInfusao={tipoInfusaoSelecionado} parametroProgramacao={"Dose"}>
                Dose
                <span>
                  Carregamento
                </span>
              </LabelParametroProgramacao>
              <div style={{display: "flex", flexDirection: "row", }}>
              <DisplayNumerico
                style={styleDisplayNumerico}
                valorNumerico={valorNumerico}
                valorExibido={valorExibido}
                setValorExibido={setValorExibido}
                teclaPressionada={teclaPressionada}
                maxDigitosInteiros={5}
                maxDigitosDecimais={3}
              />
              <div style={divUnidade}>
                mmol/Kg/min
              </div>
              </div>
            </AbaProgramar>
            <AbaProgramar>
              <LabelParametroProgramacao>
              Peso
              <span>
                Carregamento
              </span>
            </LabelParametroProgramacao>
            </AbaProgramar>
            <AbaProgramar>
              <LabelParametroProgramacao>
              Volume
              <span>
                Carregamento
              </span>
            </LabelParametroProgramacao>
            </AbaProgramar>
            <AbaProgramar>
              <LabelParametroProgramacao>
              Fluxo
              <span>
                Carregamento
              </span>
            </LabelParametroProgramacao>
            </AbaProgramar>

            <AbaProgramar>
              <LabelParametroProgramacao>
              Tempo
              <span>
                Carregamento
              </span>
            </LabelParametroProgramacao>
            </AbaProgramar>
          </Main>
          <Teclado style={tecladoStyle} onTeclaPressionada={handleTeclaPressionada} />
          <CaminhoDePao />
        </ContainerDisplay>
        <button onClick={() => { setValorExibido(getRandomIntInclusive(10000, 99999)) }}>Valor Exibido</button>
        <button onClick={() => { setValorNumerico(Math.random() * 25358) }}>Valor Númerico</button>

      </EspacoCentro>
      <EspacoDireita></EspacoDireita>


    </FundoGradiente>
  )
}

export default App
//<DivTeste> {teclaPressionada} </DivTeste>