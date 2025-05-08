import { useState, useEffect } from 'react';
import EmocaoContext from './EmocaoContext';
import Tabela from './Tabela';
//import {
//    getCategoriasAPI, getCategoriaPorCodigoAPI,
//    deleteCategoriaPorCodigoAPI, cadastraCategoriaAPI
//} from '../../../servicos/CategoriaServico';

import {
    buscarEmocoes
} from '../../../servicos/EmocaoServico'

function Categoria() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const recuperarEmocoes = async () => {
        setListaObjetos(await buscarEmocoes());
    }

    useEffect(() => {
        recuperarEmocoes();
    }, []);

    return (
		<EmocaoContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos,
            }
        }>
            <Tabela/>
        </EmocaoContext.Provider>
   )
}

export default Categoria;