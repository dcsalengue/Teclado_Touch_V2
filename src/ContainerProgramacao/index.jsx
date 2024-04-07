const ContainerProgramacao = ({ value, nome, itens, setSelecionado, naoExibe=false}) => {
    return (
        <select
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
        </select>
    )
}

export default ContainerProgramacao;