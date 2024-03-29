import { useState, useEffect } from "react"
import styled from "styled-components"

const DisplayNumerico = ({ style, digito, valorExibido, setValorExibido, teclaPressionada, valorNumerico, maxDigitosInteiros, maxDigitosDecimais }) => {


    // Ao rceber valor númerico e dígito null converte valor exibido para o número de dígitos especificado

    useEffect(() => {
        if (teclaPressionada.digito !== null) {
            maxDigitosInteiros = maxDigitosInteiros ? maxDigitosInteiros : 5
            maxDigitosDecimais = maxDigitosDecimais ? maxDigitosDecimais : 3
            let novoValor = valorExibido
            if (teclaPressionada.digito !== 'BACK') {

                const [parteInteira, parteDecimal] = valorExibido.split(".");
                const lengthInteiro = parteInteira ? parteInteira.length : 0;
                const lengthDecimal = parteDecimal ? parteDecimal.length : 0;

                console.log(`${lengthInteiro} ${lengthDecimal}`)

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
            }
            setValorExibido(novoValor); // Aqui altera o estado para renderizar a tela
        }

    }, [teclaPressionada, valorNumerico]); // Agora a dependência é o objeto `teclaPressionada`



    return (
        <div>
            {valorExibido}
        </div>
    )
}

export default DisplayNumerico