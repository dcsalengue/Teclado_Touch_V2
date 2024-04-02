import styled from "styled-components"
import DisplayNumerico from "../DisplayNumerico";

const ItemProgramacao = ({
    selecionado          // Item está selecionado
    , cursor               // é permitido digitar (é o item que selecionado atual)
    , parametroProgramacao // Dose; Peso; Volume; Fluxo ; Tempo
    , tipoInfusao          // Manutenção; Carregamento ; Bolus
    , valorNumerico        // Valor em ponto flutuante que irá alterar o valor exibido
    , valorExibido         // Alterar o valor exibido diretamente 
    , setValorExibido      // Função para alterar o estado do valor exibido
    , teclaPressionada     // Valor da tecla pressionada
    , maxDigitosInteiros   // Número máximo de dígitos inteiros do valor exibido
    , maxDigitosDecimais   // Número máximo de dígitos decimais do valor exibido
    , unidade              // Unidade a que se refere o valor exibido

}) => {
    return (

        <AbaProgramar>
            <LabelParametroProgramacao>
                {parametroProgramacao}
                <span>
                    {tipoInfusao}
                </span>
            </LabelParametroProgramacao>

            <DisplayNumerico
                style={styleDisplayNumerico}
                valorNumerico={valorNumerico}
                valorExibido={valorExibido}
                setValorExibido={setValorExibido}
                teclaPressionada={selecionado ? teclaPressionada : null}
                maxDigitosInteiros={maxDigitosInteiros}
                maxDigitosDecimais={maxDigitosDecimais}
            />
            <div style={ styleDivPaiUnidade}>
            {unidade !== null && (
                <BotaoUnidade>
                    {unidade}
                </BotaoUnidade>)}
                </div>
        </AbaProgramar>
    )
}


export default ItemProgramacao;

const larguraBotaoUnidade = 84

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
    marginRight: "92px",
    textAlign: "right",
    paddingRight:"2px",
    flexGrow: 1,
    fontSize: "28px",
}
const styleDivPaiUnidade = {
    position: "relative", /* Defina o posicionamento relativo no pai */
    height: '100%', /* Ajuste a altura conforme necessário */
    width: "auto",
    marginRight: "1px",
    backgroundColor:"red",
}
const BotaoUnidade = styled.div`
    position: absolute;
    bottom: 2px;
    right:0px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin-bottom: 0px;
    padding-bottom:2px;
    height: 25px;
    //background-color: green;
    width: 90px;
    margin-right: 0px;
    font-size: 12px;
    text-align: center;
    font-family: "Ubuntu", sans-serif;
    color: black;
    background-image: url('public/imagens/unidades/IMAGEM_DERS_Unidade_droga_C1_Grande_SOLTO[310-108].png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;

    &:hover {
        cursor: pointer;
    }
`;