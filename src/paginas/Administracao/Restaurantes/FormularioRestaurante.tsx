import { Box, Button, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";

const FormularioRestaurante = () => {

    const [nomeRestaurante, setNomeRestaurante] = useState('')

    const parametros = useParams()

    useEffect(() => {
        if (parametros.id) {
            http.get<IRestaurante>(`restaurantes/${parametros.id}/`)
                //.then(reposta => console.log(reposta))
                .then(resposta => setNomeRestaurante(resposta.data.nome))
        }
    }, [parametros])

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

        if (parametros.id) {
            http.put(`restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante atualizado')
                })
        } else {
            http.post('restaurantes/', { nome: nomeRestaurante })
                .then(() => {
                    alert('Restaurante cadastrado')
                })
        }
    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <Typography component="h1" variant="h6" >Fornulário de Restaurante</Typography>
                <TextField value={nomeRestaurante}
                    id="standard-basic"
                    label="Nome do restaurante"
                    variant="standard"
                    onChange={e => setNomeRestaurante(e.target.value)}
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioRestaurante