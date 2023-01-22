import { Button, TextField } from "@mui/material"
import axios from "axios";
import { useState } from "react";

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()
        axios.post('http://localhost:8000/api/v2/restaurantes/',{ nome: nomeRestaurante})
            .then(() => {
                alert('Restaurante cadastrado')
            })

        console.log('enviar dados para api')
        console.log(nomeRestaurante)
    }

    return (
        <form onSubmit={aoSubmeterForm}>
            <TextField
                id="standard-basic"
                label="Nome do restaurante"
                variant="standard"
                onChange={ e => setNomeRestaurante(e.target.value) }
            />
            <Button type="submit" variant="outlined">Salvar</Button>
        </form>
    )
}

export default FormularioRestaurante