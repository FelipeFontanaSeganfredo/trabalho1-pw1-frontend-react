import { useState, useEffect } from 'react';
import EntradaContext from './EntradaContext';
import { buscarEntradaPorId, buscarEntradas, criarEntrada, atualizarEntrada, excluirEntrada } from '../../../servicos/EntradaServico';
import { buscarMapaDeEmocoes, buscarEmocoes } from '../../../servicos/EmocaoServico';
import Tabela from './Tabela';
import Formulario from './Formulario';

function Entrada() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({ 
        id: 0, 
        titulo: "", 
        texto: "", 
        emocoes: [] 
    });
    const [emocoes, setEmocoes] = useState([]);
    const [mapaEmocoes, setMapaEmocoes] = useState({});

    const recuperarEntradas = async () => {
        try {
            const entradas = await buscarEntradas();
            setListaObjetos(entradas);
        } catch (error) {
            setAlerta({ status: "error", message: error.message });
        }
    }

    const carregarEmocoes = async () => {
        try {
            const listaEmocoes = await buscarEmocoes();
            setEmocoes(listaEmocoes);
            
            const mapa = await buscarMapaDeEmocoes();
            setMapaEmocoes(mapa);
        } catch (error) {
            setAlerta({ status: "error", message: error.message });
        }
    }

    const remover = async id => {
        if (window.confirm('Deseja remover esta entrada?')) {
            try {
                await excluirEntrada(id);
                setAlerta({ status: "success", message: "Entrada removida com sucesso" });
                recuperarEntradas();
            } catch (error) {
                setAlerta({ status: "error", message: error.message });
            }
        }
    }

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ 
            id: 0, 
            titulo: "", 
            texto: "", 
            emocoes: [] 
        });
        setExibirForm(true);
    }

    const editarObjeto = async id => {
        try {
            const obj = await buscarEntradaPorId(id);
            setObjeto(obj);
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setExibirForm(true);
        } catch (error) {
            setAlerta({ status: "error", message: error.message });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        try {
            let retornoAPI;
            if (editar) {
                retornoAPI = await atualizarEntrada(objeto.id, {
                    titulo: objeto.titulo,
                    texto: objeto.texto,
                    emocoes: objeto.emocoes
                });
            } else {
                retornoAPI = await criarEntrada({
                    titulo: objeto.titulo,
                    texto: objeto.texto,
                    emocoes: objeto.emocoes
                });
            }
            setAlerta({ status: "success", message: "Entrada salva com sucesso." });
            setObjeto(retornoAPI);
            if (!editar) setEditar(true);
            recuperarEntradas();
            setExibirForm(false);
        } catch (error) {
            setAlerta({ status: "error", message: error.message });
        }
    }

    useEffect(() => {
        recuperarEntradas();
        carregarEmocoes();
    }, []);

    return (
        <EntradaContext.Provider value={{
            alerta, setAlerta, 
            listaObjetos, remover, 
            objeto, setObjeto,
            editarObjeto, acaoCadastrar, 
            novoObjeto, exibirForm, 
            setExibirForm, editar,
            emocoes, mapaEmocoes
        }}>
            <Tabela />
            <Formulario />
        </EntradaContext.Provider>
    );
}

export default Entrada;