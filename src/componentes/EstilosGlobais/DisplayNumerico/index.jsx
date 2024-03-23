import { useState, useEffect } from "react"
import styled from "styled-components"

const DisplayNumerico = ({ style, digito, valorExibido, setValorExibido, teclaPressionada, valorNumerico, maxDigitosInteiros, maxDigitosDecimais }) => {
    // Verificar back, excluir final do valorExibido
    // Verificar se já extrapolou o limite de dígitos inteiros
    // Verificar se já extrapolou o limite de dígitos decimais
    // Ao rceber valor númerico e dígito null converte valor exibido para o número de dígitos especificado

    useEffect(() => {
        if (teclaPressionada.digito !== null) {
            let novoValor = valorExibido + teclaPressionada.digito.toString();
            setValorExibido(novoValor);
        }
    }, [teclaPressionada]); // Agora a dependência é o objeto `teclaPressionada`



    return (
        <div>
            {valorExibido}
        </div>
    )
}

export default DisplayNumerico