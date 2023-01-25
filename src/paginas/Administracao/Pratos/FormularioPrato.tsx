import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import http from "../../../http";
import IRestaurante from "../../../interfaces/IRestaurante";
import Itag from "../../../interfaces/Itags";

const FormularioPrato = () => {

    const [nomePrato, setNomePrato] = useState('')
    const [descricao, setDescricao] = useState('')
    const [tags, setTags] = useState<Itag[]>([])
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
    const [restaurante, setRestaurante] = useState('')
    const [tag, setTag] = useState('')
    const [imagem, setImagem] = useState<File | null>(null)

    useEffect(() => {
        http.get<{ tags: Itag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags))
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data))
    }, [])

    const selecionarArquivo = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) {
            setImagem(e.target.files[0])
        } else {
            setImagem(null)
        }
    }

    const aoSubmeterForm = (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault()

    }

    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", flexGrow: 1 }}>
            <Box component='form' sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <Typography component="h1" variant="h6" >Fornulário de Pratos</Typography>
                <TextField value={nomePrato}
                    id="standard-basic"
                    label="Nome do prato"
                    variant="standard"
                    onChange={e => setNomePrato(e.target.value)}
                    fullWidth
                    required
                    margin="dense"
                />
                <TextField value={descricao}
                    id="standard-basic"
                    label="Nome do prato"
                    variant="standard"
                    onChange={e => setDescricao(e.target.value)}
                    fullWidth
                    required
                    margin="dense"
                />

                <FormControl margin="dense" fullWidth>
                    <InputLabel id='select-tag'>Tag</InputLabel>
                    <Select labelId="select-tag" value={tag} onChange={e => setTag(e.target.value)}>
                        {tags.map(tag => (
                            <MenuItem key={tag.id} value={tag.id}>
                                {tag.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl margin="dense" fullWidth>
                    <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                    <Select labelId="select-restaurante" value={restaurante} onChange={e => setRestaurante(e.target.value)}>
                        {restaurantes.map(restaurante => (
                            <MenuItem key={restaurante.id} value={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <input type="file" onChange={selecionarArquivo} />
                <Button sx={{ marginTop: 1 }} fullWidth type="submit" variant="outlined">Salvar</Button>
            </Box>
        </Box>
    )
}

export default FormularioPrato