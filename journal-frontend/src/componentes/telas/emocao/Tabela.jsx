import { useContext } from 'react'
import EmocaoContext from './EmocaoContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';

function Tabela() {
    const { alerta, listaObjetos, remover } = useContext(EmocaoContext);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Emoções</h1>
            <Alerta alerta={alerta} />
            {listaObjetos.length === 0 && <h1>Nenhuma emoção encontrada</h1>}
            {listaObjetos.length > 0 && (
                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr>
                                <td>{objeto.descricao}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;
