import { useState, useEffect } from 'react';
import ObjetivoContext from './ObjetivoContext';
import {
    buscarObjetivos,
    buscarObjetivoPorId,
    criarObjetivo,
    atualizarObjetivo,
    excluirObjetivo
} from '../../../servicos/ObjetivoServico';
import Tabela from './Tabela';
import Formulario from './Formulario';

function Objetivo() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({ id: 0, descricao: "", concluido: false });

    const recuperarObjetivos = async () => {
        setListaObjetos(await buscarObjetivos());
    }

    const remover = async id_objetivo => {
        if (window.confirm('Deseja remover este objetivo?')) {
            let retornoAPI = await excluirObjetivo(id_objetivo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            recuperarObjetivos();
        }
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ id_objetivo: 0, descricao: "", concluido: false });
        setExibirForm(true);
    }

    const editarObjeto = async id_objetivo => {
        const obj = await buscarObjetivoPorId(id_objetivo);
        //if (id_objetivo || isNaN(id_objetivo)) {
        //    setAlerta({ status: "error", message: "ID do objetivo inválido" });
        //    return;
        //}
        setObjeto(obj);
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        try {
            let retornoAPI;
            if (editar) {
                retornoAPI = await atualizarObjetivo(objeto.id, objeto.descricao, objeto.concluido);
            } else {
                retornoAPI = await criarObjetivo(objeto.descricao);
            }
            setAlerta({ status: "success", message: "Objetivo salvo com sucesso." });
            setObjeto(retornoAPI);
            if (!editar) setEditar(true);
            recuperarObjetivos();
        } catch (err) {
            setAlerta({ status: "error", message: err});
        }
    }

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setObjeto({ ...objeto, [name]: type === 'checkbox' ? checked : value });
    }

    const alternarConcluido = async (id, descricao, concluidoAtual) => {
        try {
            await atualizarObjetivo(id, descricao, !concluidoAtual);
            recuperarObjetivos();
        } catch (err) {
            setAlerta({ status: "error", message: "Erro ao atualizar status." });
        }
    };
    

    useEffect(() => {
        recuperarObjetivos();
    }, []);

    return (
        <ObjetivoContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover, objeto, editarObjeto,
            acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm, 
            alternarConcluido
        }}>
            <Tabela />
            <Formulario />
        </ObjetivoContext.Provider>
    );
}

export default Objetivo;
