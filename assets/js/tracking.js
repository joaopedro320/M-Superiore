/* ============================================================
   [QH4 SLOT 7] CONFIGURAÇÃO DA LP | Marmoraria Superiore
   Tudo que o time de tráfego/automação precisa mexer fica aqui.
   ============================================================ */
window.QH4 = {
  lp: 'lp-marmoraria-superiore',

  /* WhatsApp que recebe os leads (DDI + DDD + número, só dígitos) */
  whatsapp: '5531996028911',

  /* Webhook do Google Apps Script (planilha/CRM).
     VAZIO = o formulário monta a mensagem completa e manda direto pro WhatsApp.
     PREENCHIDO = envia pro webhook, abre a página de obrigado e depois
     redireciona pro WhatsApp com a mensagem curta padrão.
     Exemplo: 'https://script.google.com/macros/s/XXXXXXXX/exec' */
  webhook: '',

  /* Mensagens do WhatsApp */
  msgCTA: 'Olá! Vim pelo site da Marmoraria Superiore e gostaria de pedir um orçamento.',
  msgFormWebhook: 'Olá, acabei de preencher o formulário no site. Aguardo mais informações.',

  /* Rótulos de conversão (Google Ads) | usados no SLOT 8 da página de obrigado */
  adsConversionWhats: '',   // ex.: 'AW-XXXXXXXXX/AbCdEfGhIjK'
  adsConversionLead: ''     // ex.: 'AW-XXXXXXXXX/LmNoPqRsTuV'
};

window.dataLayer = window.dataLayer || [];
function qh4Push(evt, data) {
  var o = { event: evt, lp: QH4.lp };
  if (data) for (var k in data) o[k] = data[k];
  window.dataLayer.push(o);
}
function qh4WaUrl(msg) {
  return 'https://wa.me/' + QH4.whatsapp + '?text=' + encodeURIComponent(msg || QH4.msgCTA);
}
