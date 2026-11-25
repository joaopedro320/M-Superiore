# Rastreamento | LP Marmoraria Superiore

Os slots `[QH4 SLOT n]` aparecem como blocos de comentário grandes no código, iguais em `index.html`, `obrigado.html` e `404.html`.

| Slot | Onde | O que colar |
|---|---|---|
| 1 | `<head>` | GTM (script do head) |
| 2 | `<head>` | Metas de verificação de domínio (Meta, Search Console) |
| 3 | `<head>` | Meta Pixel direto, **só sem GTM** |
| 4 | `<head>` | gtag Google Ads/GA4 direto, **só sem GTM** |
| 5 | logo após `<body>` | GTM noscript |
| 6 | antes de `</body>` | Scripts de terceiros (Clarity, Hotjar, RD etc.) |
| 7 | antes de `</body>` | Config em `assets/js/tracking.js` (WhatsApp, webhook, rótulos de conversão) |
| 8 | `obrigado.html` | Conversão de lead (Google Ads/Meta) |

## Config rápida (`assets/js/tracking.js`)

```js
whatsapp: '5531996028911',
webhook: '',                // URL do Apps Script (vazio = manda tudo direto pro WhatsApp)
adsConversionWhats: '',     // AW-XXXXXXXXX/xxxx
adsConversionLead: ''       // AW-XXXXXXXXX/xxxx
```

## Fluxo do formulário

- **Sem webhook:** monta a mensagem completa (nome, WhatsApp, bairro, projeto, material, detalhes) e abre o WhatsApp direto.
- **Com webhook:** envia (POST) para o Apps Script, abre `obrigado.html` e redireciona ao WhatsApp com "Olá, acabei de preencher o formulário no site. Aguardo mais informações."
- O botão de envio só habilita com todos os campos obrigatórios válidos.

## Eventos no dataLayer

`whatsapp_click` (com `wa_local`: header, hero, galeria, prazo, material-1..5, info, cta-final, footer, flutuante), `form_start`, `generate_lead` (com `projeto` e `material`), `thank_you_view`.

No GTM, crie gatilhos de evento personalizado com esses nomes.

## IVO

`<script src="https://app-validacao-lp-sapp-validacao-lp.vercel.app/api/t" data-lp="lp-marmoraria-superiore" defer></script>` já instalado na index e no obrigado (não na 404).
