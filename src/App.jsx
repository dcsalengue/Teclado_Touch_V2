
import styled from 'styled-components';
import { useState, useEffect } from 'react';

import modoInfusao from './data/modoInfusao.json';
import tipoInfusao from './data/tipoInfusao.json';
import unidades from './data/unidades.json';

import Teclado from './componentes/Teclado';

import DisplayNumerico from './componentes/DisplayNumerico';
import ListaSelecionar from './componentes/ListaSelecionar';
import ItemProgramacao from './componentes/ItemProgramacao';


import EstilosGlobais from "./componentes/EstilosGlobais"

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //O máximo é inclusivo e o mínimo é inclusivo
}

function App() {
  //const [teclaPressionada, setTeclaPressionada] = useState(null);
  const [teclaPressionada, setTeclaPressionada] = useState({ digito: null, contador: 0 }); // 1

  const [valorExibidoDose, setValorExibidoDose] = useState('');  // 2
  const [valorNumericoDose, setValorNumericoDose] = useState(0);  // 3

  const [valorExibidoPeso, setValorExibidoPeso] = useState('');  // 4 
  const [valorNumericoPeso, setValorNumericoPeso] = useState(0); // 5

  const [valorExibidoVolume, setValorExibidoVolume] = useState(''); // 6
  const [valorNumericoVolume, setValorNumericoVolume] = useState(0); // 7

  const [valorExibidoFluxo, setValorExibidoFluxo] = useState(''); // 8
  const [valorNumericoFluxo, setValorNumericoFluxo] = useState(0); // 9

  const [valorExibidoTempo, setValorExibidoTempo] = useState(''); // 10
  const [valorNumericoTempo, setValorNumericoTempo] = useState(0); // 11

  const [itensSelecionados, setItensSelecionados] = useState([]); // 12 // Ao selecionar um item 
  const [itensVisiveis, setItensVisiveis] = useState([]); // 13 // Ao selecionar um item 
  const [itensEditando, setItensEditando] = useState([]); // 14 // Ao selecionar um item 

  const [modoInfusaoSelecionado, setModoInfusaoSelecionado] = useState('dose'); // 15
  const [tipoInfusaoSelecionado, setTipoInfusaoSelecionado] = useState('manutencao'); // 16
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('mg_kg_hora'); // 17

  const handleTeclaPressionada = (novoDigito) => {
    setTeclaPressionada(prevState => ({
      digito: novoDigito,
      contador: prevState.contador + 1
    }));
  };

  // useEffect(() => {
  //   console.log(`
  //     Dose: ${valorExibidoDose}    
  //     Peso: ${valorExibidoPeso}
  //     Volume: ${valorExibidoVolume}
  //     Fluxo: ${valorExibidoFluxo}
  //     Tempo: ${valorExibidoTempo}
  //     itensVisiveis: ${itensVisiveis}
  //    `);

  // });



  useEffect(() => {
    if (modoInfusaoSelecionado === 'volumetrico') {
      setItensVisiveis(['Volume', 'Fluxo', 'Tempo'])
      console.log(`modoInfusaoSelecionado`)
    }
    else {
      if (unidadeSelecionada.toLowerCase().includes('kg')) {
        setItensVisiveis(['Dose', 'Peso', 'Volume', 'Fluxo', 'Tempo'])
      }
      else {
        setItensVisiveis(['Dose', 'Volume', 'Fluxo', 'Tempo'])
      }
    }


    // console.log(`
    //   	${modoInfusaoSelecionado}
    //     ${tipoInfusaoSelecionado}
    //     ${unidadeSelecionada}
    //     `);
  }, [modoInfusaoSelecionado, tipoInfusaoSelecionado, unidadeSelecionada]);

  return (
    <MainContainer>
      <Header />
      <FundoGradiente>
        <EspacoEsquerda>
          <ListaSelecionar nome={'modoInfusao'} value={modoInfusaoSelecionado} itens={modoInfusao} setSelecionado={setModoInfusaoSelecionado} />
          <ListaSelecionar nome={'tipoInfusao'} value={tipoInfusaoSelecionado} itens={tipoInfusao} setSelecionado={setTipoInfusaoSelecionado} naoExibe={modoInfusaoSelecionado === 'volumetrico'} />
          <ListaSelecionar nome={'unidades'} value={unidadeSelecionada} itens={unidades} setSelecionado={setUnidadeSelecionada} naoExibe={modoInfusaoSelecionado === 'volumetrico'} />
        </EspacoEsquerda>

        <EspacoCentro>
          <ContainerDisplay>
            <BarraDeStatus />
            <Main>
              <ItemProgramacao
                visivel={itensVisiveis}
                selecionados={itensSelecionados}
                setSelecionados={setItensSelecionados}
                editando={itensEditando}
                setEditando={setItensEditando}
                parametroProgramacao={'Dose'}
                tipoInfusao={tipoInfusao.filter(tipoInfusao => tipoInfusao.value === tipoInfusaoSelecionado).map(tipoInfusao => tipoInfusao.nome)}
                valorNumerico={valorNumericoDose}  // dose
                valorExibido={valorExibidoDose}    // dose
                setValorExibido={setValorExibidoDose}
                setValorNumerico={setValorNumericoDose}
                teclaPressionada={teclaPressionada}
                maxDigitosInteiros={5}
                maxDigitosDecimais={3}
                unidade={unidades.filter(unidade => unidade.value === unidadeSelecionada).map(unidade => unidade.nome)}
              />
              <ItemProgramacao
                visivel={itensVisiveis}
                selecionados={itensSelecionados}
                setSelecionados={setItensSelecionados}
                editando={itensEditando}
                setEditando={setItensEditando}
                parametroProgramacao={'Peso'}
                tipoInfusao={tipoInfusao.filter(tipoInfusao => tipoInfusao.value === tipoInfusaoSelecionado).map(tipoInfusao => tipoInfusao.nome)}
                valorNumerico={valorNumericoPeso}
                valorExibido={valorExibidoPeso}
                setValorExibido={setValorExibidoPeso}
                setValorNumerico={setValorNumericoPeso}
                teclaPressionada={teclaPressionada}
                maxDigitosInteiros={3}
                maxDigitosDecimais={1}
                unidade={'Kg'}
              />
              <ItemProgramacao
                visivel={itensVisiveis}
                selecionados={itensSelecionados}
                setSelecionados={setItensSelecionados}
                editando={itensEditando}
                setEditando={setItensEditando}
                parametroProgramacao={'Volume'}
                tipoInfusao={tipoInfusao.filter(tipoInfusao => tipoInfusao.value === tipoInfusaoSelecionado).map(tipoInfusao => tipoInfusao.nome)}
                valorNumerico={valorNumericoVolume}
                valorExibido={valorExibidoVolume}
                setValorExibido={setValorExibidoVolume}
                setValorNumerico={setValorNumericoVolume}
                teclaPressionada={teclaPressionada}
                maxDigitosInteiros={4}
                maxDigitosDecimais={2}
                unidade={'ml'}
              />
              <ItemProgramacao
                visivel={itensVisiveis}
                selecionados={itensSelecionados}
                setSelecionados={setItensSelecionados}
                editando={itensEditando}
                setEditando={setItensEditando}
                parametroProgramacao={'Fluxo'}
                tipoInfusao={tipoInfusao.filter(tipoInfusao => tipoInfusao.value === tipoInfusaoSelecionado).map(tipoInfusao => tipoInfusao.nome)}
                valorNumerico={valorNumericoFluxo}
                valorExibido={valorExibidoFluxo}
                setValorExibido={setValorExibidoFluxo}
                setValorNumerico={setValorNumericoFluxo}
                teclaPressionada={teclaPressionada}
                maxDigitosInteiros={4}
                maxDigitosDecimais={2}
                unidade={'ml/h'}
              />
              <ItemProgramacao
                visivel={itensVisiveis}
                selecionados={itensSelecionados}
                setSelecionados={setItensSelecionados}
                editando={itensEditando}
                setEditando={setItensEditando}
                parametroProgramacao={'Tempo'}
                tipoInfusao={tipoInfusao.filter(tipoInfusao => tipoInfusao.value === tipoInfusaoSelecionado).map(tipoInfusao => tipoInfusao.nome)}
                valorNumerico={valorNumericoTempo}
                valorExibido={valorExibidoTempo}
                setValorExibido={setValorExibidoTempo}
                setValorNumerico={setValorNumericoTempo}
                teclaPressionada={teclaPressionada}
                maxDigitosInteiros={3}
                maxDigitosDecimais={0}
                unidade={null}

              />
            </Main>
            <Teclado style={tecladoStyle} onTeclaPressionada={handleTeclaPressionada} />
            <CaminhoDePao />
          </ContainerDisplay>
          <button onClick={() => { setValorExibidoVolume(getRandomIntInclusive(10000, 99999)); }}>Valor Exibido</button>
          <button onClick={() => { setValorNumericoPeso(Math.random() * 25358); }}>Valor Númerico</button>

        </EspacoCentro>
        <EspacoDireita></EspacoDireita>


      </FundoGradiente>
      <Footer />
      <EstilosGlobais />  
    </MainContainer>

  );
}

export default App;
//<DivTeste> {teclaPressionada} </DivTeste>
const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh; /* Ocupa toda a altura da tela */
`;

const Header = styled.header`
  background: linear-gradient( #154580, #041833) ;
  height: 50px;
`;

const FundoGradiente = styled.div`
  flex-grow: 1; /* Ocupa todo o espaço restante */
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(174.61deg, #041833 4.16%, #04244F 48%, #154580 96.76%);
`;

const Footer = styled.footer`
  background: linear-gradient( #154580, #041833);
  height: 50px;
`;

const ContainerDisplay = styled.div`
  position: relative;
  margin: 20px;
  min-width: 482px;
  height: 274px;
  border: 2px solid blue;
  background-color:white;
`;
const tecladoStyle = {
  position: 'absolute',
  right: '0px',
  top: '72px'
};



const DivTeste = styled.div`
  width: auto;
  height: 20px;
  background-color: #2292b1;
  display:flex;
  align-items: center;
  justify-content:center;
 `;
const BarraDeStatus = styled.header`
position: absolute;
top: 0px;
height: 63px;
width: 100%;
background-color: #FF00FF;

`;
const CaminhoDePao = styled.footer`
  position: absolute;
  bottom: 0px;
  height: 20px;
  width: 100%;
  background-color: #FF00FF;
`;
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
  background-color: #186ABC;
  font-size: 28px;
  box-sizing: border-box;
`;
const EspacoEsquerda = styled.section`
  padding: 2px;
  flex-grow: 1;
  display:flex;
  flex-direction: column ;
  justify-content:center;
  align-items: flex-end;
  min-height: 100%;
`;

const EspacoCentro = styled.section`
  min-width: 490px;
`;

const EspacoDireita = styled.section`
  flex-grow: 1;
  display:flex;
  align-items: center;
  justify-content:center;
  background-color: white;
  
`;

const AbaProgramar = styled.div`
  display: flex;
  border: 1px solid white;
  flex-grow: 1; /* Faz com que a AbaProgramar ocupe todo o espaço disponível */
  width: 100%; /* Ocupa todo o espaço disponível horizontalmente */
  height: 100%; /* Ocupa todo o espaço disponível verticalmente */
  align-items: center;
  justify-content: left;
  
  color: black;
  box-sizing: border-box;
`;

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
  color: 'black',
  backgroundColor: 'white',
  marginLeft: '2px',
  marginRight: '80px',

};

const divUnidade = {
  display: 'flex',
  position: 'fixed',
  alignItems: 'center',
  justifyContent: 'center',
  width: '80px',
  height: '25px',
  margin_right: '0px',
  right: '272px',
  backcground: 'red',
  backcgroundColor: 'red',
  border: '1px solid black',
  fontSize: '12px',

  fontFamily: 'Ubunto, sans-serif'
};