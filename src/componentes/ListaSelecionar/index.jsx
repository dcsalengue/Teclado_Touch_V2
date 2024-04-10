import styled from "styled-components";

const ListaSelecionar = ({ value, nome, itens, setSelecionado, naoExibe=false}) => {
    return (
        <StyledSelect
            name={nome}
            value={value}
            id={nome}
            onChange={event => { setSelecionado(event.target.value) }}
            hidden={naoExibe}
        >
            {itens.map(option => (
                <option
                    key={option.id}
                    value={option.value}
                >
                    {option.nome}
                </option>
            ))}
        </StyledSelect>
    )
}

export default ListaSelecionar;

const StyledSelect = styled.select`
    margin: 3px;
    
`