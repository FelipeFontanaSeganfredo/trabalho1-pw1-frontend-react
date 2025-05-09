import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Badge, Alert, Spinner, Container } from 'react-bootstrap';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { buscarEntradaPorId } from '../../../servicos/EntradaServico';
import { buscarMapaDeEmocoes } from '../../../servicos/EmocaoServico';

function EntradaDetalhes() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [entrada, setEntrada] = useState(null);
    const [mapaEmocoes, setMapaEmocoes] = useState({});
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    const formatDate = (dateString) => {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: ptBR });
    };

    useEffect(() => {
        const carregarDados = async () => {
            try {
                setCarregando(true);
                const [entradaData, emocoesData] = await Promise.all([
                    buscarEntradaPorId(id),
                    buscarMapaDeEmocoes()
                ]);
                setEntrada(entradaData);
                setMapaEmocoes(emocoesData);
            } catch (error) {
                setErro(error.message || 'Erro ao carregar entrada');
            } finally {
                setCarregando(false);
            }
        };

        carregarDados();
    }, [id]);

    if (carregando) {
        return (
            <Container className="d-flex justify-content-center mt-5">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Carregando...</span>
                </Spinner>
            </Container>
        );
    }

    if (erro) {
        return (
            <Container className="mt-5">
                <Alert variant="danger">{erro}</Alert>
                <Button variant="primary" onClick={() => navigate(-1)}>
                    Voltar
                </Button>
            </Container>
        );
    }

    if (!entrada) {
        return (
            <Container className="mt-5">
                <Alert variant="warning">Entrada não encontrada</Alert>
                <Button variant="primary" onClick={() => navigate(-1)}>
                    Voltar
                </Button>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Button variant="outline-secondary" onClick={() => navigate(-1)} className="mb-3">
                Voltar
            </Button>

            <Card>
                <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>{entrada.titulo}</h2>
                        <small className="text-muted">
                            {formatDate(entrada.timestamp)}
                        </small>
                    </div>
                </Card.Header>
                <Card.Body>
                    <div className="mb-4">
                        {entrada.texto.split('\n').map((paragraph, i) => (
                            <p key={i}>{paragraph}</p>
                        ))}
                    </div>

                    <div className="mb-3">
                        <h5>Emoções:</h5>
                        <div>
                            {entrada.emocoes.map(emoId => (
                                <Badge key={emoId} bg="info" className="me-2 fs-6">
                                    {mapaEmocoes[emoId] || `Emoção ID: ${emoId}`}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default EntradaDetalhes;