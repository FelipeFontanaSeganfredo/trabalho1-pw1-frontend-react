import { useContext } from 'react';
import ObjetivoContext from './ObjetivoContext';
import Alerta from '../../comuns/Alerta';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm } = useContext(ObjetivoContext);

    return (
        <Modal show={exibirForm} onHide={() => setExibirForm(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Objetivo</Modal.Title>
            </Modal.Header>
            <form onSubmit={acaoCadastrar}>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Alerta alerta={alerta} />
                            <Col xs={12}>
                                <FloatingLabel controlId="txtDescricao" label="Descrição" className="mb-3">
                                    <Form.Control type="text" name="descricao" value={objeto.descricao || ""} onChange={handleChange} required />
                                </FloatingLabel>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setExibirForm(false)}>Fechar</Button>
                    <Button variant="success" type="submit">Salvar</Button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default Formulario;
