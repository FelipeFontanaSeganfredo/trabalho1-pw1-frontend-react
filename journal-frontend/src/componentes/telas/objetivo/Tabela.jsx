import { useContext } from 'react';
import ObjetivoContext from './ObjetivoContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button, ButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

function Tabela() {
  const { listaObjetos, alerta, remover, novoObjeto, editarObjeto, alternarConcluido  } = useContext(ObjetivoContext);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Objetivos</h1>
      <Alerta alerta={alerta} />

      <Button variant="primary" onClick={() => novoObjeto()}>
        Novo <i className="bi bi-file-earmark-plus"></i>
      </Button>

      {listaObjetos.length === 0 && <h1>Nenhum objetivo encontrado</h1>}

      {listaObjetos.length > 0 && (
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th className="text-center">Ações</th>
              <th>Descrição</th>
              <th className="text-center">Concluído</th>
            </tr>
          </thead>
          <tbody>
            {listaObjetos.map((objeto) => (
              <tr key={objeto.id}>
                <td className="text-center">
                  <ButtonGroup>
                    <Button
                      variant="info"
                      onClick={() => {
                          editarObjeto(objeto.id);
                      }}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                          remover(objeto.id);
                      }}
                    >
                      <i className="bi bi-trash"></i>
                    </Button>
                  </ButtonGroup>
                </td>
                <td>{objeto.descricao}</td>
                <td className="text-center">
                <Form.Check
                    type="checkbox"
                    checked={objeto.concluido}
                    onChange={() => alternarConcluido(objeto.id, objeto.descricao, objeto.concluido)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default Tabela;
