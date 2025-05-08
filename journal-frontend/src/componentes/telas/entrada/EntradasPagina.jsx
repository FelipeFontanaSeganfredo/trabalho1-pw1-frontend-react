import React, { useEffect, useState } from 'react';
import { Container, Card, Button, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { buscarEntradas } from '../../../servicos/EntradaServico';
import { buscarMapaDeEmocoes } from '../../../servicos/EmocaoServico';
import { Link } from 'react-router-dom';

function formatarData(timestamp) {
  const data = new Date(timestamp);
  return data.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function EntradasPagina() {
  const [entradas, setEntradas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregarEntradas() {
      try {
        const [dadosEntradas, mapaDeEmocoes] = await Promise.all([
          buscarEntradas(),
          buscarMapaDeEmocoes()
        ]);

        console.log('Entradas:', dadosEntradas);
        console.log('Mapa de Emoções:', mapaDeEmocoes);

        const entradasComNomes = dadosEntradas.map((entrada) => {
          console.log('entrada.emocoes:', entrada.emocoes);
          const nomesEmocoes = entrada.emocoes?.map((emocao) => {
            const id = typeof emocao === 'object' ? emocao.id : emocao;
            const nome = mapaDeEmocoes[id?.toString()];
            console.log(`→ ${id} → ${nome}`);
            return nome;
          }) || [];

          return { ...entrada, emocoesFormatadas: nomesEmocoes.join(', ') };
        });

        setEntradas(entradasComNomes);
      } catch (err) {
        setErro(err.toString());
      } finally {
        setCarregando(false);
      }
    }

    carregarEntradas();
  }, []);

  if (carregando) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Carregando entradas...</p>
      </Container>
    );
  }

  if (erro) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">Erro: {erro}</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Minhas Entradas</h2>
      {entradas.length === 0 ? (
        <Alert variant="info">Você ainda não registrou nenhuma entrada.</Alert>
      ) : (
        <Row>
          {entradas.map((entrada) => (
            <Col md={6} lg={4} className="mb-4" key={entrada.id}>
              <Card>
                <Card.Body>
                  <Card.Title>{entrada.titulo}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {formatarData(entrada.timestamp)}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Emoções:</strong>{' '}
                    {entrada.emocoesFormatadas || 'Nenhuma'}
                  </Card.Text>
                  <Link to={`/entradas/${entrada.id}`}>
                    <Button variant="primary">Ver detalhes</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default EntradasPagina;
