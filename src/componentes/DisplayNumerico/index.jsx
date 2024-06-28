import { useState, useEffect } from "react"
import styled from "styled-components"

const DisplayNumerico = ({
    style,
    selecionado,
    editando,
    parametroProgramacao,
    valorExibido,
    setValorExibido,
    teclaPressionada,
    valorNumerico,
    setValorNumerico,
    maxDigitosInteiros,
    maxDigitosDecimais }) => {

    const [cursor, setCursor] = useState("false");

    // Ao rceber valor númerico e dígito null converte valor exibido para o número de dígitos especificado
    function dividirSegundos(totalSegundos) {
        // Calcular as horas
        var horas = Math.floor(totalSegundos / 3600);

        // Calcular os minutos restantes
        var minutosRestantes = totalSegundos % 3600;

        // Calcular os minutos
        var minutos = Math.floor(minutosRestantes / 60);

        // Calcular os segundos restantes
        var segundos = Math.round(minutosRestantes % 60)

        return { horas, minutos, segundos };
    }
    useEffect(() => {

        maxDigitosInteiros = isNaN(maxDigitosInteiros) ? 5 : maxDigitosInteiros
        maxDigitosDecimais = isNaN(maxDigitosDecimais) ? 3 : maxDigitosDecimais

        if (teclaPressionada && teclaPressionada.digito !== null) {
            var [parteInteira, parteDecimal] = valorExibido.toString().split(".");
            var lengthInteiro = parteInteira ? parteInteira.length : 0;
            var lengthDecimal = parteDecimal ? parteDecimal.length : 0;
            if (isNaN(valorExibido)) {
                valorExibido = ''
                lengthInteiro = 0
                lengthDecimal = 0
            }
            let novoValor = valorExibido
            if (teclaPressionada.digito !== 'BACK') {
                // Verificar se já chegou no limite de dígitos inteiros
                // Verificar se já chegou no limite de dígitos decimais
                if (
                    ((lengthInteiro < maxDigitosInteiros) && (lengthDecimal < maxDigitosDecimais))
                    || ((valorExibido.toString().includes(".")) && (lengthDecimal < maxDigitosDecimais))
                    || (teclaPressionada.digito.toString() === ".")
                )
                    // Verifica se o ponto decimal já foi digitado
                    novoValor = ((teclaPressionada.digito.toString() === ".") && (valorExibido.toString().includes(".")))
                        ? valorExibido
                        : valorExibido + teclaPressionada.digito.toString()

            }
            else { // Verificar back, excluir final do valorExibido
                novoValor = valorExibido.toString().slice(0, -1)
                if (novoValor === '')
                    novoValor = 0;
            }
            setValorExibido(novoValor === 0 ? '' : novoValor); // Aqui altera o estado para renderizar a tela
            setValorNumerico(novoValor);
            teclaPressionada.digito = null
        }
        // Se recebeu um valor numérico

        else {
            if (selecionado === 'false') { // Se não estiver selecionado e editando
                console.log(maxDigitosDecimais)
                var [parteInteira, parteDecimal] = valorNumerico.toString().split(".");
                var lengthInteiro = parteInteira ? parteInteira.length : 0;
                var lengthDecimal = parteDecimal ? parteDecimal.length : 0;
                // Válida valor com base no número de digitos inteiros máximo
                if (valorNumerico === 0)
                    setValorExibido('')
                else if (lengthInteiro > maxDigitosInteiros)
                    setValorExibido("ERRO!");
                else {
                    // Display para mostrar tempo em horas minutos e segundos a partir de um valor númérico passado em horas
                    if (parametroProgramacao === 'Tempo') {
                        const { horas, minutos, segundos } = dividirSegundos(valorNumerico)
                        console.log(valorNumerico)
                        if ((horas + minutos + segundos) > 0)
                            var valor = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
                        else
                            var valor = ``
                    }
                    // Formata valor exibido a partir de valor numérico em ponto flutuante passado
                    else {
                        if (maxDigitosDecimais == 0)
                            var valor = parseInt(parteInteira)
                        else
                            var valor = parseFloat(valorNumerico).toFixed(maxDigitosDecimais).replace(/\.?0*$/, '');
                    }
                    setValorExibido(valor);
                }
                console.log(`${valorNumerico} ${selecionado} `)
            }
        }

    }, [teclaPressionada, valorNumerico]); // Agora a dependência é o objeto `teclaPressionada`

    // Para piscar o cursor 
    useEffect(() => {
        const intervalID = setInterval(() => {
            if (editando === "true") {
                setCursor(prevState => (prevState === "false" ? "true" : "false"));
            }
            else
                setCursor("false")
        }, 500);
        if (editando === "false")
            setCursor("false")
        return () => {
            clearInterval(intervalID);
        };
    }, [editando]); // Dependência é o parametroProgramacao


    // Aqui se for tempo Separar em 3 spans
    return (

        <SpanDisplayNumerico
            $selecionado={selecionado}
            $editando={editando}
            $parametroProgramacao={parametroProgramacao}
            cursor={cursor}
        >
            {valorExibido}


        </SpanDisplayNumerico>


    )
}

export default DisplayNumerico

const SpanDisplayNumerico = styled.span`
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    color: black;
    background-color: white;
    height: 100%;
    margin-left: 2px;
    margin-right: 2px;
    font-size: 28px;
    background-color: ${({ $editando }) => ($editando === "true" ? 'white' : 'transparent')};
    color: ${({ $editando }) => ($editando === "true" ? 'black' : 'white')};
    border-right: ${({ cursor, $editando, $selecionado }) => (cursor === "true" ? `2px solid black` : (($editando === "true") && ($selecionado === "true")) || ($selecionado === "true") ? `2px solid #81B0DE` : `2px solid #186ABC`)};
    box-sizing: border-box;
`;

//      {valorExibido}