import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../contexts/AuthContext';
import { registerUsuario } from '../../../servicos/LoginEntrarServico'; 

function Registro() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [confirmarEmail, setConfirmarEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email !== confirmarEmail) {
            Swal.fire({
                icon: 'warning',
                title: 'Os e-mails não coincidem',
                text: 'Por favor, verifique os campos de e-mail.',
            });
            return;
        }

        try {
            const data = await registerUsuario(nome, email, senha); 

            Swal.fire({
                icon: 'success',
                title: 'Cadastro realizado com sucesso!',
                showConfirmButton: false,
                timer: 2000,
            });

            login(data.usuario, data.token);
            navigate('/');
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Erro no cadastro',
                text: err.toString() || 'Erro ao registrar nova conta.',
            });
        }
    };

    return (
        <Container className="mt-5">
            <Card className="mx-auto" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">Cadastro</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Digite seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Digite seu email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Confirmar Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Confirme seu email"
                                value={confirmarEmail}
                                onChange={(e) => setConfirmarEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="success" type="submit" className="w-100">
                            Registrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Registro;
