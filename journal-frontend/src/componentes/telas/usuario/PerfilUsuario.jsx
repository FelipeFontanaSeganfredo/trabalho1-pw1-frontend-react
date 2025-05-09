import { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { atualizarUsuario, atualizarSenha, excluirUsuario } from '../../../servicos/UsuarioServico';
import Alerta from '../../comuns/Alerta';

function PerfilUsuario() {
  const { usuario, logout } = useContext(AuthContext);
  const [alerta, setAlerta] = useState({ status: '', message: '' });

  const [nome, setNome] = useState(usuario?.nome || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [novaSenha, setNovaSenha] = useState('');

  const handleAtualizarUsuario = async () => {
    try {
      await atualizarUsuario(usuario.id, nome, email);
      setAlerta({ status: 'success', message: 'Usuário atualizado com sucesso!' });
    } catch (err) {
      setAlerta({ status: 'error', message: err });
    }
  };

  const handleAtualizarSenha = async () => {
    try {
      await atualizarSenha(usuario.id, novaSenha);
      setAlerta({ status: 'success', message: 'Senha atualizada com sucesso!' });
    } catch (err) {
      setAlerta({ status: 'error', message: err });
    }
  };

  const handleExcluir = async () => {
    const confirmado = window.confirm("Tem certeza que deseja excluir sua conta? Essa ação não poderá ser desfeita.");

    if (!confirmado) return;

    try {
      await excluirUsuario(usuario.id);
      logout();
      setAlerta({ status: 'success', message: 'Conta excluída com sucesso!' });
    } catch (err) {
      setAlerta({ status: 'error', message: err });
    }
  };

  return (
    <div className="container mt-4">
      <Alerta alerta={alerta} />

      <h2>Meu Perfil</h2>
      <div className="mb-3">
        <label>Nome</label>
        <input value={nome} onChange={(e) => setNome(e.target.value)} className="form-control" />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" />
      </div>

      <button onClick={handleAtualizarUsuario} className="btn btn-primary">Atualizar Perfil</button>

      <hr />

      <h3>Atualizar Senha</h3>
      <div className="mb-3">
        <label>Nova Senha</label>
        <input type="password" value={novaSenha} onChange={(e) => setNovaSenha(e.target.value)} className="form-control" />
      </div>

      <button onClick={handleAtualizarSenha} className="btn btn-warning">Atualizar Senha</button>

      <hr />

      <button onClick={handleExcluir} className="btn btn-danger">Excluir Conta</button>
    </div>
  );
}

export default PerfilUsuario;
