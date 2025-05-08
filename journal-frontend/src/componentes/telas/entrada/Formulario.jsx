import React, { useContext, useState, useEffect } from 'react';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import EntradaContext from './EntradaContext';

function Formulario() {
    const { 
        alerta, 
        objeto, 
        setObjeto, 
        acaoCadastrar, 
        exibirForm, 
        setExibirForm, 
        editar,
        emocoes
    } = useContext(EntradaContext);
    
    const [selectedEmotions, setSelectedEmotions] = useState(objeto.emocoes || []);

    useEffect(() => {
        setSelectedEmotions(objeto.emocoes || []);
    }, [objeto]);

    const handleEmotionChange = (emotionId) => {
        const newEmotions = selectedEmotions.includes(emotionId)
            ? selectedEmotions.filter(id => id !== emotionId)
            : [...selectedEmotions, emotionId];
        setSelectedEmotions(newEmotions);
        setObjeto({ ...objeto, emocoes: newEmotions });
    };

    if (!exibirForm) return null;

    return (
        <Card className="mb-4">
            <Card.Body>
                <Card.Title>{editar ? 'Editar Entrada' : 'Nova Entrada'}</Card.Title>
                
                {alerta.message && (
                    <Alert variant={alerta.status}>{alerta.message}</Alert>
                )}

                <Form onSubmit={acaoCadastrar}>
                    <Form.Group className="mb-3">
                        <Form.Label>Título</Form.Label>
                        <Form.Control
                            type="text"
                            value={objeto.titulo}
                            onChange={(e) => setObjeto({ ...objeto, titulo: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Texto</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={objeto.texto}
                            onChange={(e) => setObjeto({ ...objeto, texto: e.target.value })}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Emoções</Form.Label>
                        <Row>
                            {emocoes.map(emotion => (
                                <Col key={emotion.id} xs={6} md={4} lg={3}>
                                    <Form.Check
                                        type="checkbox"
                                        id={`emotion-${emotion.id}`}
                                        label={emotion.descricao}
                                        checked={selectedEmotions.includes(emotion.id)}
                                        onChange={() => handleEmotionChange(emotion.id)}
                                    />
                                </Col>
                            ))}
                        </Row>
                    </Form.Group>

                    <div className="d-flex justify-content-end gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setExibirForm(false)}
                        >
                            Cancelar
                        </Button>
                        <Button variant="primary" type="submit">
                            {editar ? 'Atualizar' : 'Salvar'}
                        </Button>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default Formulario;