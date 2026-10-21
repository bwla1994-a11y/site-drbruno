/* Origem do contato: marca os links de WhatsApp com um código "(ref: ...)" para a secretária
   saber se o paciente veio do Google Ads, do Instagram, do Google Meu Negócio ou do site.
   Códigos: G-TAT, G-IBI, G-ADS, IG-BIO, IG-STO, IG-REELS, IG, GMB-TAT, GMB-IBI, GMB, SITE.
   A origem fica em sessionStorage para sobreviver à navegação entre páginas (o gclid se perde). */
(function () {
  var CHAVE = 'bw_origem';
  var p = new URLSearchParams(window.location.search);
  var unidadeParam = (p.get('unidade') || '').toLowerCase();
  var src = (p.get('utm_source') || '').toLowerCase();
  var med = (p.get('utm_medium') || '').toLowerCase();
  var camp = (p.get('utm_campaign') || '').toLowerCase();
  var ref = document.referrer || '';

  var un = { tatuape: 'TAT', ibirapuera: 'IBI' }[unidadeParam] || '';
  if (!un) un = /tatuap/.test(camp) ? 'TAT' : (/ibirapuera/.test(camp) ? 'IBI' : '');

  var codigo = '';
  if (p.get('gclid') || p.get('gbraid') || p.get('wbraid') || med === 'cpc' || med === 'ppc') {
    codigo = 'G-' + (un || 'ADS');
  } else if (src === 'gmb' || src === 'google_meu_negocio') {
    codigo = 'GMB' + (un ? '-' + un : '');
  } else if (src === 'instagram' || src === 'ig' || /(^|\.)instagram\.com/.test(ref.replace(/^https?:\/\//, ''))) {
    var m = { bio: '-BIO', story: '-STO', stories: '-STO', reels: '-REELS', reel: '-REELS' }[med] || '';
    codigo = 'IG' + m;
  } else if (unidadeParam) {
    codigo = 'G-' + un;
  }

  try {
    if (codigo) sessionStorage.setItem(CHAVE, codigo);
    else codigo = sessionStorage.getItem(CHAVE) || '';
  } catch (e) {}
  if (!codigo) codigo = 'SITE';
  window.__origem = codigo;

  var anuncio = {
    TAT: 'Olá, Dr. Bruno! Vim pelo anúncio da unidade Tatuapé e gostaria de agendar uma consulta de alergia e imunologia.',
    IBI: 'Olá, Dr. Bruno! Vim pelo anúncio da unidade Ibirapuera e gostaria de agendar uma consulta de alergia e imunologia.'
  };

  document.querySelectorAll('a[href*="wa.me"]').forEach(function (a) {
    var url = new URL(a.href);
    var texto = url.searchParams.get('text');
    if (!texto || texto.indexOf('(ref:') !== -1) return;
    texto = texto.replace(/\s*\(Vim pelo site\)/, '');
    if (codigo.indexOf('G-') === 0 && anuncio[codigo.slice(2)] && /consulta/.test(texto) && !/teleconsulta/.test(texto)) {
      texto = anuncio[codigo.slice(2)];
    }
    url.searchParams.set('text', texto + ' (ref: ' + codigo + ')');
    a.href = url.toString();
  });
})();
