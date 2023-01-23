
import { Button, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import IRestaurante from "../../../interfaces/IRestaurante";

const AdministracaoRestaurantes = () => {

    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

    useEffect(() => {
        axios.get<IRestaurante[]>('http://localhost:8000/api/v2/restaurantes/')
            .then(resposta => {
                setRestaurantes(resposta.data)
            })
    }, [])

    const excluir = (restauranteHaSerExcluido: IRestaurante): void => {
        axios.delete(`http://localhost:8000/api/v2/restaurantes/${restauranteHaSerExcluido.id}/`)
            .then(() => {
                const listaRestauranteAtualizada = restaurantes.filter(restaurante => restaurante.id !== restauranteHaSerExcluido.id)
                setRestaurantes([...listaRestauranteAtualizada])
            })
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>nome</TableCell>
                        <TableCell>editar</TableCell>
                        <TableCell>excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {restaurantes.map(restaurante => (
                        <TableRow key={restaurante.id}>
                            <TableCell>{restaurante.nome}</TableCell>
                            <TableCell>[ <Link to={`/admin/restaurantes/${restaurante.id}/`} >editar</Link> ]</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                                    excluir
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AdministracaoRestaurantes;