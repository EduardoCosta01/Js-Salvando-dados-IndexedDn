"use strict";

System.register(["./HttpService", "./ConnectionFactory", "../dao/NegociacaoDao", "../models/Negociacao"], function (_export, _context) {
    "use strict";

    var HttpService, ConnectionFactory, NegociacaoDao, Negociacao, _createClass, NegociacaoService;

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    return {
        setters: [function (_HttpService) {
            HttpService = _HttpService.HttpService;
        }, function (_ConnectionFactory) {
            ConnectionFactory = _ConnectionFactory.ConnectionFactory;
        }, function (_daoNegociacaoDao) {
            NegociacaoDao = _daoNegociacaoDao.NegociacaoDao;
        }, function (_modelsNegociacao) {
            Negociacao = _modelsNegociacao.Negociacao;
        }],
        execute: function () {
            _createClass = function () {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                return function (Constructor, protoProps, staticProps) {
                    if (protoProps) defineProperties(Constructor.prototype, protoProps);
                    if (staticProps) defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();

            _export("NegociacaoService", NegociacaoService = function () {
                function NegociacaoService() {
                    _classCallCheck(this, NegociacaoService);

                    this._http = new HttpService();
                }

                _createClass(NegociacaoService, [{
                    key: "obterNegociacoesSemana",
                    value: function obterNegociacoesSemana() {

                        return this._http.get("negociacoes/semana").then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new "N??o foi poss??vel obter as negocia????es da semana."();
                        });
                    }
                }, {
                    key: "obterNegociacoesSemanaAnterior",
                    value: function obterNegociacoesSemanaAnterior() {

                        return this._http.get("negociacoes/semanaAnterior").then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new "N??o foi poss??vel obter as negocia????es da semana anterior."();
                        });
                    }
                }, {
                    key: "obterNegociacoesSemanaRetrasada",
                    value: function obterNegociacoesSemanaRetrasada() {

                        return this._http.get("negociacoes/semanaRetrasada").then(function (negociacoes) {
                            return negociacoes.map(function (objeto) {
                                return new Negociacao(new Date(objeto.data), objeto.quantidade, objeto.valor);
                            });
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new "N??o foi poss??vel obter as negocia????es da semana retrasada."();
                        });
                    }
                }, {
                    key: "obterNegociacoes",
                    value: function obterNegociacoes() {

                        return Promise.all([this.obterNegociacoesSemana(), this.obterNegociacoesSemanaAnterior(), this.obterNegociacoesSemanaRetrasada()]).then(function (periodos) {

                            var negociacoes = periodos.reduce(function (dados, periodo) {
                                return dados.concat(periodo);
                            }, []);

                            return negociacoes;
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error(erro);
                        });
                    }
                }, {
                    key: "cadastra",
                    value: function cadastra(negociacao) {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.adiciona(negociacao);
                        }).then(function () {
                            return 'Negocia????o adicionada com sucesso';
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('N??o foi poss??vel adicionar a negocia????o');
                        });
                    }
                }, {
                    key: "lista",
                    value: function lista() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.listaTodos();
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('N??o foi poss??vel obter as negocia????es');
                        });
                    }
                }, {
                    key: "apaga",
                    value: function apaga() {

                        return ConnectionFactory.getConnection().then(function (connection) {
                            return new NegociacaoDao(connection);
                        }).then(function (dao) {
                            return dao.apagaTodos();
                        }).then(function () {
                            return 'Negocia????es apagadas com sucesso';
                        }).catch(function (erro) {
                            console.log(erro);
                            throw new Error('N??o foi poss??vel apagar as negocia????es');
                        });
                    }
                }, {
                    key: "importa",
                    value: function importa(listaAtual) {

                        return this.obterNegociacoes().then(function (negociacoes) {
                            return negociacoes.filter(function (negociacao) {
                                return !listaAtual.some(function (negociacaoExistente) {
                                    return JSON.stringify(negociacao) == JSON.stringify(negociacaoExistente);
                                });
                            });
                        }).catch(function (erro) {

                            consoli.log(erro);
                            throw new Error('N??o foi poss??vel buscar negocia????es para importar');
                        });
                    }
                }]);

                return NegociacaoService;
            }());

            _export("NegociacaoService", NegociacaoService);

            ;
        }
    };
});
//# sourceMappingURL=NegociacaoService.js.map