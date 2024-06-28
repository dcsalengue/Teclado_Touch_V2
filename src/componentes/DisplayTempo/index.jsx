import { useState, useEffect } from "react"
import styled from "styled-components"
import DisplayNumerico from "../DisplayNumerico";

const DisplayTempo = ({
    style,
    selecionado,
    editando,
    parametroProgramacao,
    valorExibido,
    setValorExibido,
    teclaPressionada,
    valorNumerico,
    setValorNumerico,
}) => {

    const [cursor, setCursor] = useState("false");

    const todosParametrosTempo = ['Hora', 'Minuto', 'Segundo']

    const [valorExibidoHora, setValorExibidoHora] = useState('');  // 2
    const [valorNumericoHora, setValorNumericoHora] = useState(0);  // 3
    const [valorExibidoMinuto, setValorExibidoMinuto] = useState('');  // 2
    const [valorNumericoMinuto, setValorNumericoMinuto] = useState(0);  // 3
    const [valorExibidoSegundo, setValorExibidoSegundo] = useState('');  // 2
    const [valorNumericoSegundo, setValorNumericoSegundo] = useState(0);  // 3


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

        // Display para mostrar tempo em horas minutos e segundos a partir de um valor númérico passado em horas                    
        const { horas, minutos, segundos } = dividirSegundos(valorNumerico)
        console.log(valorNumerico)
        if ((horas + minutos + segundos) > 0)
            var valor = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
        else
            var valor = ``

            setValorExibidoHora(`${String(horas).padStart(2, '0')}`);
            setValorExibidoMinuto(`${String(minutos).padStart(2, '0')}`)
            setValorExibidoSegundo(`${String(segundos).padStart(2, '0')}`)

        console.log(`${valor}`)
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
        <ContainerDisplayTempo>
            <DisplayNumerico
                //style={styleDisplayNumerico}
                selecionado="false"//{selecionados?.includes(parametroProgramacao) ? "true" : "false"}
                editando={editando?.includes('Hora') ? "true" : "false"}
                parametroProgramacao={'Hora'}
                valorNumerico={valorNumericoHora}
                valorExibido={valorExibidoHora}
                setValorExibido={setValorExibidoHora}
                setValorNumerico={setValorNumericoHora}
                teclaPressionada={editando.includes('Hora') ? teclaPressionada : null}
                maxDigitosInteiros={3}
                maxDigitosDecimais={0}
            /> <LabelTempo>h</LabelTempo>
            <DisplayNumerico
                //style={styleDisplayNumerico}
                selecionado="false"//{selecionados?.includes(parametroProgramacao) ? "true" : "false"}
                editando={editando?.includes('Minuto') ? "true" : "false"}
                parametroProgramacao={'Minuto'}
                valorNumerico={valorNumericoMinuto}
                valorExibido={valorExibidoMinuto}
                setValorExibido={setValorExibidoMinuto}
                setValorNumerico={setValorNumericoMinuto}
                teclaPressionada={editando.includes('Minuto') ? teclaPressionada : null}
                maxDigitosInteiros={2}
                maxDigitosDecimais={0}
            /> <LabelTempo> m </LabelTempo>
            <DisplayNumerico
                //style={styleDisplayNumerico}
                selecionado="false"//{selecionados?.includes(parametroProgramacao) ? "true" : "false"}
                editando={editando?.includes('Segundo') ? "true" : "false"}
                parametroProgramacao={'Segundo'}
                valorNumerico={valorNumericoSegundo}
                valorExibido={valorExibidoSegundo}
                setValorExibido={setValorExibidoSegundo}
                setValorNumerico={setValorNumericoSegundo}
                teclaPressionada={editando.includes('Segundo') ? teclaPressionada : null}
                maxDigitosInteiros={2}
                maxDigitosDecimais={0}
            /> <LabelTempo>s</LabelTempo>
        </ContainerDisplayTempo>
    )
}

export default DisplayTempo;

const LabelTempo = styled.span`
position: relative;
bottom: -5px;
font-size: 12px;
color: white;
`
const ContainerDisplayTempo = styled.span`
    position: relative;
    left:  72px;
    display: flex;
    align-items: center;
    justify-content: center;
    //user-select: none;
`
