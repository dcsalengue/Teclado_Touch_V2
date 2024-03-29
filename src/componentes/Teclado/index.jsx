import styled from "styled-components"
import teclas from "./teclado.json"
import { useEffect, useState } from "react";
const Container = styled.div`
    position: fixed;
    right: '2px';
    top: '72px';
`
const TecladoContainer = styled.div`
    display: flex;
    background: "#E8E8E8";
    width: 188px;
    height: 129px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`
const TeclaDiv = styled.div`
    width: 47px;
    height: 43px;
    margin: 0;
    &:hover {
        cursor: pointer;
    }
`
const Tecla = ({ tecla, onClique, isHoveredExternally }) => {
    const [isHovered, setIsHovered] = useState(false);

    const hoverState = isHovered || isHoveredExternally; // Combine hover interno e externo

    
    return (
        <TeclaDiv
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClique}
        >
            <img src={hoverState ? tecla.imagem_press : tecla.imagem_solto} alt={tecla.alt} />
        </TeclaDiv>
    );
};

const Teclado = ({ style, onTeclaPressionada }) => {
    const [hoveredKeyId, setHoveredKeyId] = useState(null);

    const handleSimulatedHover = (id) => {
        setHoveredKeyId(id);
        // Para remover o hover após um curto período
        setTimeout(() => {
            setHoveredKeyId(null);
        }, 200); // Ajuste esse tempo conforme necessário
    };

    useEffect(() => {
        var id
        const handleKeyPress = (event) => {
            switch (event.key) {
                case '1':
                    id = 0;
                    break;
                case '2':
                    id = 1;
                    break;
                case '3':
                    id = 2;
                    break;
                case ',':
                    id = 3;
                    break;

                case '.':
                    id = 3;
                    break;

                case '4':
                    id = 4;
                    break;
                case '5':
                    id = 5;
                    break;
                case '6':
                    id = 6;
                    break;
                case 'Backspace':
                    id = 7;
                    console.log('Backspace')
                    break;
                case '7':
                    id = 8;
                    break;
                case '8':
                    id = 9;
                    break;
                case '9':
                    id = 10;
                    break;
                case '0':
                    id = 11;
                    break;
                default:
                    id = -1;
            }
            handleSimulatedHover(id);
            clique(id)

        };

        window.addEventListener('keydown', handleKeyPress);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    return (
        <Container style={style}>
            <TecladoContainer>
                {teclas.map(tecla => (
                    <Tecla
                        key={tecla.id}
                        tecla={tecla}
                        onClique={() => clique(tecla.id)}
                        isHoveredExternally={hoveredKeyId === tecla.id}
                    />
                ))}
            </TecladoContainer>
        </Container>
    );
    function clique(id) {
        var tecla = teclas.find(tecla => tecla.id === id);
        onTeclaPressionada(tecla && (id >= 0) ? tecla.alt : null)
    }

};


export default Teclado