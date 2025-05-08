import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Card, Alert } from 'react-bootstrap';
import { AuthContext } from '../../../contexts/AuthContext';


const LOGIN_URL = 'https://trabalho1-pw1-journal.onrender.com/login';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        try {
            const resposta = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, senha }),
            });

            const data = await resposta.json();

            if (resposta.ok) {
                login(data.usuario, data.token);
                navigate('/');
            } else {
                setErro(data.message || 'Erro ao fazer login');
            }
        } catch (err) {
            setErro('Erro de conexão com o servidor');
        }
    };

    return (
        <Container className="mt-5">
            <Card className="mx-auto" style={{ maxWidth: '400px' }}>
                <Card.Body>
                    <Card.Title className="text-center mb-4">Login</Card.Title>
                    {erro && <Alert variant="danger">{erro}</Alert>}
                    <Form onSubmit={handleSubmit}>
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
                            <Form.Label>Senha</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" className="w-100">
                            Entrar
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Login;
