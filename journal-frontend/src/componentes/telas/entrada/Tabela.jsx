import React, { useContext } from 'react';
import { Card, Button, Badge, Alert, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EntradaContext from './EntradaContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

function Tabela() {
    const { 
        alerta, 
        listaObjetos, 
        remover, 
        novoObjeto, 
        editarObjeto,
        mapaEmocoes 
    } = useContext(EntradaContext);
    
    const navigate = useNavigate();

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ptBR });
    };

    return (
        <div>
            {alerta.message && (
                <Alert variant={alerta.status}>{alerta.message}</Alert>
            )}

            <div className="d-flex justify-content-between mb-3">
                <h2>Minhas Entradas</h2>
                <Button variant="primary" onClick={() => novoObjeto()}>
                    Novo <i className="bi bi-file-earmark-plus"></i>
                </Button>
            </div>

            {listaObjetos.length === 0 ? (
                <Card>
                    <Card.Body className="text-center">
                        Nenhuma entrada encontrada. Clique em "Nova Entrada" para começar.
                    </Card.Body>
                </Card>
            ) : (
                <ListGroup>
                    {listaObjetos.map(entrada => (
                        <ListGroup.Item 
                            key={entrada.id} 
                            className="mb-2"
                            action
                            onClick={() => navigate(`/entradas/${entrada.id}`)}
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="d-flex justify-content-between align-items-start">
                                <div>
                                    <h5>{entrada.titulo}</h5>
                                    <small className="text-muted">
                                        {formatDate(entrada.timestamp)}
                                    </small>
                                    <div className="mt-2">
                                        {entrada.emocoes.map(emoId => (
                                            <Badge key={emoId} bg="info" className="me-1">
                                                {mapaEmocoes[emoId] || `Emoção ID: ${emoId}`}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        className="me-2"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            editarObjeto(entrada.id);
                                        }}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            remover(entrada.id);
                                        }}
                                    >
                                        Excluir
                                    </Button>
                                </div>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </div>
    );
}

export default Tabela;