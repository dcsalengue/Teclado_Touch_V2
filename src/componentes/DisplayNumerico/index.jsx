import { useState, useEffect } from "react"
import styled from "styled-components"

const DisplayNumerico = ({ style, selecionado, editando, parametroProgramacao, valorExibido, setValorExibido, teclaPressionada, valorNumerico, setValorNumerico, maxDigitosInteiros, maxDigitosDecimais }) => {

    const [cursor, setCursor] = useState("false");

    // Ao rceber valor númerico e dígito null converte valor exibido para o número de dígitos especificado

    useEffect(() => {
        maxDigitosInteiros = maxDigitosInteiros ? maxDigitosInteiros : 5
        maxDigitosDecimais = maxDigitosDecimais ? maxDigitosDecimais : 3

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
        else if (!selecionado) { // Se não estiver selecionado e editando
            var [parteInteira, parteDecimal] = valorNumerico.toString().split(".");
            var lengthInteiro = parteInteira ? parteInteira.length : 0;
            var lengthDecimal = parteDecimal ? parteDecimal.length : 0;
            // Válida valor com base no número de digitos inteiros máximo
            if (valorNumerico === 0)
                setValorExibido('')
            else if (lengthInteiro > maxDigitosInteiros)
                setValorExibido("ERRO!");
            else {
                //setValorExibido(`${parseFloat(valorNumerico).toFixed(maxDigitosDecimais)}`);
                const valor = parseFloat(valorNumerico).toFixed(maxDigitosDecimais).replace(/\.?0*$/, '');
                setValorExibido(valor);
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



    return (
        <SpanDisplayNumerico
            $selecionado={selecionado}
            $editando={editando}
            
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
    background-color: ${({$editando}) => ($editando === "true" ? 'white' : 'transparent')};
    color: ${({$editando}) => ($editando === "true" ? 'black' : 'white')};
    border-right: ${({cursor, $editando, $selecionado}) => (cursor === "true" ? `2px solid black` : (($editando === "true")&&( $selecionado === "true"))||( $selecionado === "true") ? `2px solid #81B0DE` : `2px solid #186ABC`)};
    box-sizing: border-box;
`;

