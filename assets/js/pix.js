// Gera o código Pix "copia e cola" (padrão BR Code do Banco Central) com ou sem valor.
(function () {
  function campo(id, valor) { return id + String(valor.length).padStart(2, '0') + valor; }
  function crc16(txt) {
    var crc = 0xFFFF;
    for (var i = 0; i < txt.length; i++) {
      crc ^= txt.charCodeAt(i) << 8;
      for (var j = 0; j < 8; j++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
    }
    return crc.toString(16).toUpperCase().padStart(4, '0');
  }
  function semAcento(s) { return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase(); }
  // chave: só números do CPF; valor: número (ex.: 150.5) ou vazio para a pessoa digitar no banco
  window.gerarPix = function (chave, nome, cidade, valor) {
    var p = campo('00', '01') +
      campo('26', campo('00', 'br.gov.bcb.pix') + campo('01', chave)) +
      campo('52', '0000') + campo('53', '986') +
      (valor ? campo('54', Number(valor).toFixed(2)) : '') +
      campo('58', 'BR') + campo('59', semAcento(nome).slice(0, 25)) + campo('60', semAcento(cidade).slice(0, 15)) +
      campo('62', campo('05', '***')) + '6304';
    return p + crc16(p);
  };
})();
