# LP Marmoraria Superiore | Padrão QH4

Landing page da **Marmoraria Superiore** (Belo Horizonte/MG). Produto: Start Stones. Contrato de 16/11/2026 a 16/05/2027.

## Estrutura de arquivos

```
index.html            LP principal
obrigado.html         página de obrigado (usada quando há webhook)
404.html              página de erro personalizada
robots.txt            robots (bloqueia só /obrigado)
sitemap.xml           sitemap
site.webmanifest      manifest
vercel.json           cleanUrls, cache e headers de segurança
TRACKING-QH4.md       guia de GTM, Pixel, conversões e eventos
assets/
  css/style.css
  js/tracking.js      CONFIG da LP (WhatsApp, webhook, rótulos)  <- editar aqui
  js/main.js          animações, formulário, galeria
  img/                imagens reais (jpg/png), logo, ícones e og-image
```

## Como publicar na Vercel

1. Descompacte o zip e envie a pasta para um repositório (ou arraste a pasta na Vercel).
2. Framework: **Other**. Sem build. Output directory: raiz.
3. Aponte o domínio e confira o checklist de pendências abaixo.

## Pendências antes de publicar

- [ ] **Domínio/canonical:** o cliente ainda não tem site nem domínio. Os arquivos usam `https://www.marmorariasuperiore.com.br/` como placeholder (canonical, og:url, sitemap.xml, robots.txt, JSON-LD). Trocar pelo domínio real.
- [ ] **GTM:** colar nos slots 1 e 5 (index, obrigado e 404). Ver `TRACKING-QH4.md`.
- [ ] **Meta Pixel / Google Ads:** slots 3, 4 e 8 (só se não for disparar pelo GTM).
- [ ] **Webhook (Apps Script):** preencher `webhook` em `assets/js/tracking.js`. Vazio = o formulário monta a mensagem completa e manda direto pro WhatsApp.
- [ ] **WhatsApp:** configurado com 5531996028911 (briefing). Confirmar com o Matheus.
- [ ] **Instagram da QH4 no rodapé:** apontei para `instagram.com/qh4growth`. Confirmar o @ correto.
- [ ] **Depoimentos/avaliações:** o cliente pediu avaliações de clientes, mas não há texto de depoimento no briefing, então nenhuma foi inventada. Quando houver prints ou textos reais do Google, criar a seção. O rodapé já tem o link "Avalie a Superiore no Google".
- [ ] **Fotos:** usei as 8 imagens da pasta "Imagens melhoradas". Confirmar que são trabalhos reais da Superiore antes de subir (a seção diz "serviços que já entregamos").
- [ ] **Logo:** gerada a partir do JPEG do cliente, com fundo transparente (versões branca e escura). Se vier vetor, trocar em `assets/img/logo-*.png`.

## Fonte do conteúdo

Só o que está no briefing e na mensagem do Malta. Nada inventado.

- WhatsApp, Instagram, CNPJ, horário (seg a sex, 08:00 às 17:00), prazo (15 a 25 dias úteis)
- Materiais: granitos, mármores, quartzos, quartzitos e lâminas ultracompactas (naturais e importados)
- Diferenciais: acabamento de qualidade, entrega dentro do prazo
- Região: Belo Horizonte e Nova Lima
- Promoções: "em algumas épocas, como Black Friday"
- Cor: preto e cinza (logo), fundo mesclado, tradicional/acessível/técnico, sem fonte pedida (Poppins + Inter)

**Não usados de propósito:** anos de mercado (o briefing diz que a empresa surgiu em 05/11/2025 e a nota do contrato fala em gestão passada em 2024; os dados divergem), faturamento, conversão, concorrentes, nota do GMN e os dados pessoais do dono que vieram no briefing (CPF, endereço, nascimento).

## Eventos de rastreamento (dataLayer)

| Evento | Quando |
|---|---|
| `whatsapp_click` (`wa_local`) | clique em qualquer CTA de WhatsApp |
| `form_start` | primeiro campo do formulário preenchido |
| `generate_lead` | envio válido do formulário |
| `thank_you_view` | abertura da página de obrigado |

Script do IVO (Funil do LIA & IVO) já instalado na index e no obrigado: `data-lp="lp-marmoraria-superiore"`.

## Checklist de SEO

- [x] Title e meta description com cidade/nicho
- [x] H1 com "Marmoraria" e "perto de você"
- [x] Open Graph completo + Twitter Card + og-image 1200x630
- [x] Canonical, robots.txt, sitemap.xml, site.webmanifest
- [x] JSON-LD `HomeAndConstructionBusiness` + `FAQPage`
- [x] width/height em todas as imagens, lazy-load fora do hero, preload da imagem do hero
- [x] Páginas obrigado e 404 com `noindex`
- [x] Rodapé "Desenvolvido por QH4 Growth"

## Observações de design

Fundo "carvão" (não preto absoluto) alternando com pedra clara, acento latão discreto, veios de mármore animados em SVG, scroll reveal, galeria arrastável com lightbox, lista de materiais com microinteração e botão flutuante de WhatsApp.
