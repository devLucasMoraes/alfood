import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            axios.get<IRestaurante>(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                //.then(reposta => console.log(reposta))
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante atualizado')
                })
        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante cadastrado')
                })
        }
    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField value={nomeRestaurante}
                id="standard-basic"
                label="Nome do restaurante"
                variant="standard"
                onChange={e => setNomeRestaurante(e.target.value)}
            />
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormularioRestaurante