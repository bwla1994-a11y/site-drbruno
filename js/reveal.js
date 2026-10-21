/* Entrada suave dos blocos das páginas internas; sem JS o conteúdo aparece normalmente */
(function () {
  document.documentElement.classList.add('js');
  var sel = 'main h2,.toc,.alerta,.destaque,.cid-box,.band,.card,.related,.revisao,.sos,.passos li,.steps li,.service-card,.page-head>*';
  var els = document.querySelectorAll(sel);
  els.forEach(function (e, i) { e.classList.add('rv'); });
  if (!('IntersectionObserver' in window)) { els.forEach(function (e) { e.classList.add('on'); }); return; }
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -4% 0px' });
  els.forEach(function (e) { io.observe(e); });
})();
