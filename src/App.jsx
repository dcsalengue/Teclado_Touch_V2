
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
  const [itensEditando, setItensEditando] = useState(''); // 14 // Ao selecionar um item 

  const [modoInfusaoSelecionado, setModoInfusaoSelecionado] = useState('dose'); // 15
  const [tipoInfusaoSelecionado, setTipoInfusaoSelecionado] = useState('manutencao'); // 16
  const [unidadeSelecionada, setUnidadeSelecionada] = useState('mg_kg_hora'); // 17


  // Para calcular os parâmetros dependendo dos itens selecionados
  useEffect(() => {
    let itemsCalculo = [...itensSelecionados];
    console.log(`${valorNumericoVolume} / ${valorNumericoFluxo} = ${valorNumericoVolume / valorNumericoFluxo}`)

    if (itemsCalculo.indexOf('Volume') > -1) {
      if ((itemsCalculo.indexOf('Fluxo') > -1) && (valorNumericoFluxo > 0)) {
        // Volume e fluxo -> calcula tempo
        setValorNumericoTempo(3600 * (valorNumericoVolume / valorNumericoFluxo))
      }
    }
  }, [itensSelecionados
    , valorExibidoDose
    , valorExibidoPeso
    , valorExibidoVolume
    , valorExibidoFluxo
    , valorExibidoTempo


  ])

  const handleTeclaPressionada = (novoDigito) => {
    setTeclaPressionada(prevState => ({
      digito: novoDigito,
      contador: prevState.contador + 1
    }));
  };

  // useEffect(() => {
  //   console.log(`
  //     Dose: ${valorExibidoDose}\t${valorNumericoDose}   
  //     Peso: ${valorExibidoPeso}\t${valorNumericoPeso}
  //     Volume: ${valorExibidoVolume}\t${valorNumericoVolume}
  //     Fluxo: ${valorExibidoFluxo}\t${valorNumericoFluxo}
  //     Tempo: ${valorExibidoTempo}\t${valorNumericoTempo}
  //     itensVisiveis: ${itensVisiveis}
  //    `);

  // });

  const todosParametros = ['Dose', 'Peso', 'Volume', 'Fluxo', 'Tempo']
  function ZeraValoresNumericosCalculados() {
    const parametrosAusentes = todosParametros.filter(parametro => !itensSelecionados.includes(parametro));
    parametrosAusentes.map(item => {
      if (item === 'Dose')
        setValorNumericoDose(0);
      if (item === 'Volume')
        setValorNumericoVolume(0)
      if (item === 'Fluxo')
        setValorNumericoFluxo(0)
      if (item === 'Tempo')
        setValorNumericoTempo(0)
    })
  }

  // Para alterar as abas visíveis dependendo das caixas de seleção tipoInfusao, modoInfusao e unidade
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
  }, [modoInfusaoSelecionado, tipoInfusaoSelecionado, unidadeSelecionada]);

  //Caso o item selecionado tenha sido alterado se o selecionado prévio era zero retira da seleção
  useEffect(() => {
    let indexToDelete = -1;
    let novoItensSelecionados
    // Se houver valor exibido no parâmetro editado, marca como selecionado 
    switch (itensEditando) {
      case 'Dose':
        if (valorExibidoDose === '') {
          // Remove a seleção se o valor exibido for 0 ou vazio
          setItensSelecionados(prevSelecionados => prevSelecionados.filter(curr => curr !== itensEditando));
        } else if (!itensSelecionados.includes(itensEditando)) {
          // Verifica se o item editando já está selecionado
          // Se não estiver, remove a seleção de "Fluxo" se o tipo de infusão for "manutencao", senão remove a seleção de "Volume"
          novoItensSelecionados = [...itensSelecionados];
          if (tipoInfusaoSelecionado === 'manutencao') {
            novoItensSelecionados = novoItensSelecionados.filter(curr => curr !== 'Fluxo');
          } else {
            novoItensSelecionados = novoItensSelecionados.filter(curr => curr !== 'Volume');
          }
          // Exclui o primeiro item diferente de 'Peso' se houver mais de um item selecionado e o item editando não for 'Peso'
          if (novoItensSelecionados.length > 1 && itensEditando !== 'Peso') {
            const primeiroItemDiferenteDePeso = novoItensSelecionados.find(item => item !== 'Peso');
            if (primeiroItemDiferenteDePeso) {
              const indexToDelete = novoItensSelecionados.indexOf(primeiroItemDiferenteDePeso);
              if ((indexToDelete !== -1) && (novoItensSelecionados.filter(curr => (curr !== 'Peso')).length > 1)) {
                novoItensSelecionados.splice(indexToDelete, 1);
              }
            }
          }
          // Inclui o item editando como selecionado
          setItensSelecionados([...novoItensSelecionados, itensEditando]);
        }
        break;

      case 'Peso':
        if (valorExibidoPeso === '') {
          setItensSelecionados(prevSelecionados => prevSelecionados.filter(curr => (curr !== itensEditando)));
          ZeraValoresNumericosCalculados()
        }
        else if (itensSelecionados.indexOf(itensEditando) === -1) {
          setItensSelecionados([...itensSelecionados, itensEditando])
        }
        break;
      case 'Volume':
        if (valorExibidoVolume === '') {
          // Remove a seleção se o valor exibido for vazio
          setItensSelecionados(prevSelecionados => prevSelecionados.filter(curr => curr !== itensEditando));
          // Zera Valores Numéricos não selecionados
          ZeraValoresNumericosCalculados()
        } else if (!itensSelecionados.includes(itensEditando)) {
          // Verifica se o item editando já está selecionado
          // Se não estiver, remove a seleção de "Fluxo" se o tipo de infusão for "manutencao", senão remove a seleção de "Volume"
          novoItensSelecionados = [...itensSelecionados];
          if (tipoInfusaoSelecionado !== 'manutencao') {
            novoItensSelecionados = novoItensSelecionados.filter(curr => curr !== 'Dose');
          }
          // Exclui o primeiro item diferente de 'Peso' se houver mais de um item selecionado e o item editando não for 'Peso'
          if (novoItensSelecionados.length > 1 && itensEditando !== 'Peso') {
            const primeiroItemDiferenteDePeso = novoItensSelecionados.find(item => item !== 'Peso');
            if (primeiroItemDiferenteDePeso) {
              const indexToDelete = novoItensSelecionados.indexOf(primeiroItemDiferenteDePeso);
              if ((indexToDelete !== -1) && (novoItensSelecionados.filter(curr => (curr !== 'Peso')).length > 1)) {
                novoItensSelecionados.splice(indexToDelete, 1);
              }
            }
          }
          // Inclui o item editando como selecionado
          setTimeout(() => setItensSelecionados([...novoItensSelecionados, itensEditando]), 0);
          console.log(itensSelecionados)
        }
        break;

      case 'Fluxo':
        if (valorExibidoFluxo === '') {
          // Remove a seleção se o valor exibido for vazio
          setItensSelecionados(prevSelecionados => prevSelecionados.filter(curr => curr !== itensEditando));
          ZeraValoresNumericosCalculados()
        } else if (!itensSelecionados.includes(itensEditando)) {
          // Verifica se o item editando já está selecionado
          // Se não estiver, remove a seleção de "Fluxo" se o tipo de infusão for "manutencao", senão remove a seleção de "Volume"
          novoItensSelecionados = [...itensSelecionados];
          if (tipoInfusaoSelecionado === 'manutencao') {
            novoItensSelecionados = novoItensSelecionados.filter(curr => curr !== 'Dose');
          }
          // Exclui o primeiro item diferente de 'Peso' se houver mais de um item selecionado e o item editando não for 'Peso'
          if (novoItensSelecionados.length > 1 && itensEditando !== 'Peso') {
            const primeiroItemDiferenteDePeso = novoItensSelecionados.find(item => item !== 'Peso');
            if (primeiroItemDiferenteDePeso) {
              const indexToDelete = novoItensSelecionados.indexOf(primeiroItemDiferenteDePeso);
              if ((indexToDelete !== -1) && (novoItensSelecionados.filter(curr => (curr !== 'Peso')).length > 1)) {
                novoItensSelecionados.splice(indexToDelete, 1);
              }
            }
          }
          // Inclui o item editando como selecionado
          setItensSelecionados([...novoItensSelecionados, itensEditando]);
        }
        break;


      case 'Tempo':
        if (valorExibidoTempo === '') {
          setItensSelecionados(prevSelecionados => prevSelecionados.filter(curr => (curr !== itensEditando)));
          ZeraValoresNumericosCalculados()
        }
        else if (itensSelecionados.indexOf(itensEditando) === -1) {
          // Encontra e remove o primeiro item diferente de 'Peso' se houver mais de um item selecionado e o item editando não for 'Peso'
          if (itensSelecionados.length > 1 && itensEditando !== 'Peso') {
            const primeiroItemDiferenteDePeso = itensSelecionados.find(item => item !== 'Peso');
            if (primeiroItemDiferenteDePeso) {
              const indexToDelete = itensSelecionados.indexOf(primeiroItemDiferenteDePeso);
              if ((indexToDelete !== -1) && (itensSelecionados.filter(curr => (curr !== 'Peso')).length > 1)) {
                itensSelecionados.splice(indexToDelete, 1);
              }
            }
          }
          // Inclui o item editando como selecionado
          setItensSelecionados([...itensSelecionados, itensEditando]);
        }
        break;
    }



    console.log(`useEffect(valores): selecionados => [${itensSelecionados}] itensEditando => ${itensEditando}`)



  }, [
    valorExibidoDose
    , valorExibidoPeso
    , valorExibidoVolume
    , valorExibidoFluxo
    , valorExibidoTempo
  ]);


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
                // maxDigitosInteiros={5}
                // maxDigitosDecimais={3}
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
                maxDigitosInteiros={7}
                maxDigitosDecimais={0}
                unidade={null}

              />
            </Main>
            <Teclado style={tecladoStyle} onTeclaPressionada={handleTeclaPressionada} />
            <CaminhoDePao />
          </ContainerDisplay>
          <button onClick={() => { setValorExibidoVolume(getRandomIntInclusive(10000, 99999)); }}>Valor Exibido</button>
          <button onClick={() => { setValorNumericoTempo(Math.random() * 25358); }}>Valor Númerico</button>

        </EspacoCentro>
        <EspacoDireita>

        </EspacoDireita>


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
