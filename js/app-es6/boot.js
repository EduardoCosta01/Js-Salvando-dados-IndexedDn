import { instanciaCorrente } from './controllers/NegociacaoController';
import {} from './poiyfill/fetch';

let negociacaoController = instanciaCorrente();

document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);

