# Mama Sara 2027 — guia rápido

## Analytics (sem cookies)
Edite `CFG` em `js/analytics.js` e libere o host no CSP (`_headers`):
- **Plausible** `{provider:'plausible',id:'janaluzastrologia.com.br'}` -> `script-src` e `connect-src` + `https://plausible.io`
- **Umami** `{provider:'umami',id:'<website-id>'}` -> `https://cloud.umami.is` (+ `https://api-gateway.umami.dev` em connect-src)
- **GA4** usa cookies: exige aviso de consentimento (LGPD) e `googletagmanager.com` / `google-analytics.com` no CSP.

Eventos enviados: `order_open`, `order_submit_pix`, `checkout_card`, `whatsapp_click`, `instagram_click`, `email_click`, `section_view`, `scroll_depth`, `faq_open`, `web_vitals` (LCP/CLS), `js_error`. Origem (UTM/referrer) vai na mensagem do WhatsApp e nos links da Kiwify.

## Ser encontrada
1. Search Console: já há a meta de verificação; envie `sitemap.xml` e peça indexação da home.
2. Bing Webmaster Tools (importe do Search Console).
3. Google Perfil de Empresa, se houver atendimento/endereço.
4. Teste `og-image.jpg` no depurador de compartilhamento do Facebook/WhatsApp.

## Pendências suas
CNPJ/CPF + endereço (rodapé e Políticas), preço de referência "R$ 467", prazo de entrega, handle do Instagram do crédito (Pogian x poggian).
