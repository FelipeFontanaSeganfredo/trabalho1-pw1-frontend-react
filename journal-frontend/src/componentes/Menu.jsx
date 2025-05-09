import { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

function Menu() {
    const { usuario, logout } = useContext(AuthContext);

    return (
        <div>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <NavLink className="navbar-brand" to="/">Journaler</NavLink>
                    <Navbar.Toggle />
                    <Navbar.Collapse>
                        <Nav className="me-auto">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                            <NavLink className="nav-link" to="/sobre">Sobre...</NavLink>

                            {!usuario ? (
                                <NavDropdown title="Entrar">
                                    <NavLink className="dropdown-item" to="/login">Login</NavLink>
                                    <NavLink className="dropdown-item" to="/register">Criar Conta</NavLink>
                                </NavDropdown>
                            ) : (
                                <>
                                    <NavLink className="nav-link" to="/entradas">Registros Diários</NavLink>
                                    <NavLink className="nav-link" to="/objetivos">Objetivos</NavLink>
                                    <NavLink className="nav-link" to={`/usuario/${usuario.id}`}>Meu Perfil</NavLink>
                                    <NavLink className="nav-link" onClick={logout}>Sair</NavLink>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </div>
    );
}

export default Menu;
