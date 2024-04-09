import styled from "styled-components";
import DisplayNumerico from "../DisplayNumerico";



const ItemProgramacao = ({
    visivel,
    selecionados,         // Itens  selecionados
    setSelecionados,      // Função para alterar o estado selecionado
    editando,             // Item com o foco do teclado para edição      
    setEditando,          // Função para alterar o estado editando
    parametroProgramacao, // Dose; Peso; Volume; Fluxo ; Tempo
    tipoInfusao,          // Manutenção; Carregamento ; Bolus
    valorNumerico,        // Valor em ponto flutuante que irá alterar o valor exibido
    setValorNumerico,
    valorExibido,         // Alterar o valor exibido diretamente 
    setValorExibido,      // Função para alterar o estado do valor exibido
    teclaPressionada,     // Valor da tecla pressionada
    maxDigitosInteiros,   // Número máximo de dígitos inteiros do valor exibido
    maxDigitosDecimais,   // Número máximo de dígitos decimais do valor exibido
    unidade,              // Unidade a que se refere o valor exibido
}) => {
    return (
        <AbaProgramar
            visivel={visivel}
            selecionados={selecionados}
            parametroProgramacao={parametroProgramacao}
            onClick={() => {
                
                if (!selecionados.includes(parametroProgramacao)) {
                    // Validações aqui 
                    // SetEditavel 
                    // Verifica qual parâmetro deve ser retirado da seleção e qual manter
                    setSelecionados([parametroProgramacao]);              
                }
                if (!editando.includes(parametroProgramacao)) {
                    setEditando([parametroProgramacao])    
                }
                

            }}
        >
            <LabelParametroProgramacao>
                <SpanParametroProgramacao>
                    {parametroProgramacao}
                </SpanParametroProgramacao>
                <SpanTipoInfusao>
                    {tipoInfusao}
                </SpanTipoInfusao>
            </LabelParametroProgramacao>
            <DisplayNumerico
                //style={styleDisplayNumerico}
                selecionado={selecionados?.includes(parametroProgramacao) ? "true" : "false"}
                editando={editando}
                parametroProgramacao={parametroProgramacao}
                valorNumerico={valorNumerico}
                valorExibido={valorExibido}
                setValorExibido={setValorExibido}
                setValorNumerico={setValorNumerico}
                teclaPressionada={selecionados.includes(parametroProgramacao) ? teclaPressionada : null}
                maxDigitosInteiros={maxDigitosInteiros}
                maxDigitosDecimais={maxDigitosDecimais}
            />

            <ContainerUnidade>
                {unidade !== null && (
                    <BotaoUnidade>
                        {unidade}
                    </BotaoUnidade>
                )}
            </ContainerUnidade>


        </AbaProgramar>
    );
};

export default ItemProgramacao;

const larguraBotaoUnidade = 84;

const AbaProgramar = styled.div`
    display: ${(props) => (props.visivel?.includes(props.parametroProgramacao) ? 'flex' : 'none')};  
    position: relative; /* Adicione posição relativa para permitir o posicionamento absoluto do filho */  
    border: 1px solid white;
    flex-grow: 1; /* Faz com que a AbaProgramar ocupe todo o espaço disponível */
    width: 100%; /* Ocupa todo o espaço disponível horizontalmente */
    height: 100%; /* Ocupa todo o espaço disponível verticalmente */
    align-items: center;
    justify-content: right;
    color: black;
    box-sizing: border-box;
    background-color: ${(props) => (props.selecionados?.includes(props.parametroProgramacao) ? '#81B0DE' : 'transparent')};
    &:hover {
        cursor: pointer;
    }
`;

const SpanParametroProgramacao = styled.span`
    font-weight: bold;
    font-size: 16px;
    color: white;
    margin-left: 2px;
`
const SpanTipoInfusao = styled.span`
    font-weight: normal;
    font-size: 10px;
    color: white;    
    margin-left: 2px;
`

const LabelParametroProgramacao = styled.span`
    display: flex;    
    position: absolute;
    user-select: none;
    flex-direction: column;
    align-items: left;
    justify-content: Center;
    width: 70px;
    height: 100%;
    left: 0px;
    border-right: 1px solid white;       
    font-family: "Ubuntu", sans-serif;
    &:hover {
        cursor: pointer;
    }
`;

const styleDisplayNumerico = {
    color: "black",
    backgroundColor: "white",
    marginLeft: "2px",
    marginRight: "2px",
    textAlign: "right",
    paddingRight: "2px",
    fontSize: "30px",
};

const ContainerUnidade = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
   // position: relative; /* Defina o posicionamento relativo no pai */
    height: 100%; /* Ajuste a altura conforme necessário */
    width: 90px;
    right: 0px;    
    margin-right: 1px;
    &:hover {
        cursor: pointer;
    }
`
const BotaoUnidade = styled.div`
    //position: absolute;
    bottom: 2px;
    right:0px;
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    margin-bottom: 0px;
    padding-bottom:2px;
    height: 25px;
    width: 90px;
    margin-right: 0px;
    font-size: 12px;
    text-align: center;
    font-family: "Ubuntu", sans-serif;
    color: black;
    background-image: url('./imagens/unidades/IMAGEM_DERS_Unidade_droga_C1_Grande_SOLTO[310-108].png');
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
    z-index: 0;

    &:hover {
        cursor: pointer;
    }
`;
