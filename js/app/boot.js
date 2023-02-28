'use strict';

System.register(['./controllers/NegociacaoController', './poiyfill/fetch'], function (_export, _context) {
  "use strict";

  var instanciaCorrente, negociacaoController;
  return {
    setters: [function (_controllersNegociacaoController) {
      instanciaCorrente = _controllersNegociacaoController.instanciaCorrente;
    }, function (_poiyfillFetch) {}],
    execute: function () {
      negociacaoController = instanciaCorrente();


      document.querySelector('.form').onsubmit = negociacaoController.adiciona.bind(negociacaoController);
      document.querySelector('[type=button]').onclick = negociacaoController.apaga.bind(negociacaoController);
    }
  };
});
//# sourceMappingURL=boot.js.map