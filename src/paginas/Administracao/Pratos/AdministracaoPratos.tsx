import { Button, TableContainer } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import http from "../../../http";
import IPratos from "../../../interfaces/IPrato";

const AdministracaoPratos = () => {

    const [pratos, setPratos] = useState<IPratos[]>([])

    useEffect(() => {
        http.get<IPratos[]>('pratos/')
            .then(resposta => {
                setPratos(resposta.data)
            })
    }, [])

    const excluir = (pratoHaSerExcluido: IPratos): void => {
        http.delete(`pratos/${pratoHaSerExcluido.id}/`)
            .then(() => {
                const listaPratoAtualizada = pratos.filter(prato => prato.id !== pratoHaSerExcluido.id)
                setPratos([...listaPratoAtualizada])
            })
    }

    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>nome</TableCell>
                        <TableCell>imagem</TableCell>
                        <TableCell>tag</TableCell>
                        <TableCell>editar</TableCell>
                        <TableCell>excluir</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pratos.map(prato => (
                        <TableRow key={prato.id}>
                            <TableCell>{prato.nome}</TableCell>
                            <TableCell>
                                [<a href={prato.imagem} target="_blank" rel="noreferrer">ver imagem</a>]
                            </TableCell>
                            <TableCell>{prato.tag}</TableCell>
                            <TableCell>[ <Link to={`/admin/pratos/${prato.id}/`} >editar</Link> ]</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="error" onClick={() => excluir(prato)}>
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

export default AdministracaoPratos;