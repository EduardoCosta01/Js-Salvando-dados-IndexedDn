import { HttpService } from "./HttpService";
import { ConnectionFactory } from "./ConnectionFactory";
import { NegociacaoDao } from "../dao/NegociacaoDao";
import { Negociacao } from "../models/Negociacao";

export class NegociacaoService {

    constructor() {
        
        this._http = new HttpService();
    }

    obterNegociacoesSemana() {

        return this._http
            .get("negociacoes/semana")
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));
            })
            .catch((erro) => {
                console.log(erro)
                throw new ("Não foi possível obter as negociações da semana.")
            })
    }

    obterNegociacoesSemanaAnterior() {

        return this._http
            .get("negociacoes/semanaAnterior")
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

            })
            .catch((erro) => {
                console.log(erro)
                throw new("Não foi possível obter as negociações da semana anterior.")
            })
    };

    obterNegociacoesSemanaRetrasada() {

        return this._http
            .get("negociacoes/semanaRetrasada")
            .then(negociacoes => {
                return negociacoes.map(objeto => new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor));

            })
            .catch((erro) => {
                console.log(erro)
                throw new("Não foi possível obter as negociações da semana retrasada.")
            })
         
    };

    obterNegociacoes() {

        return Promise.all([
            this.obterNegociacoesSemana(),
            this.obterNegociacoesSemanaAnterior(),
            this.obterNegociacoesSemanaRetrasada()
        ]).then(periodos => {

            let negociacoes = periodos
                .reduce((dados, periodo) => dados.concat(periodo), []);
            
            return negociacoes;
        }).catch((erro) => {
            console.log(erro)
            throw new Error (erro)
        })
    }

    cadastra(negociacao) {

        return ConnectionFactory
            .getConnection()
            .then(connection =>  new NegociacaoDao(connection))
            .then(dao => dao.adiciona(negociacao))
            .then(() => 'Negociação adicionada com sucesso')
            .catch((erro) => {
                console.log(erro);
                throw new Error('Não foi possível adicionar a negociação')
            });
    };

    lista() {

        return ConnectionFactory
            .getConnection()
            .then(connection =>  new NegociacaoDao(connection))
            .then(dao => dao.listaTodos())
            .catch((erro) => {
                console.log(erro);
                throw new Error('Não foi possível obter as negociações');
            });
    }

    apaga() {

        return ConnectionFactory
            .getConnection()
            .then(connection => new NegociacaoDao(connection))
            .then(dao => dao.apagaTodos())
            .then(() => 'Negociações apagadas com sucesso')
            .catch(erro => {
                console.log(erro);
                throw new Error('Não foi possível apagar as negociações')
            });
    };

    importa(listaAtual) {

        return this.obterNegociacoes()
            .then(negociacoes =>
                negociacoes.filter(negociacao =>
                !listaAtual.some(negociacaoExistente =>
                        JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente)))             
                )
            .catch(erro => {
                
                consoli.log(erro)
                throw new Error('Não foi possível buscar negociações para importar');
            });   
    };
};
