# Mama Sara 2027 — refatoração v2

**Acessibilidade/contraste:** dourado sobre marrom (1,8:1 -> 4,3:1+), avatar AR, botão/FAB WhatsApp, sticky não focável fora da tela, `inert` no fundo com o modal aberto, aria-label nas estrelas, alvos de toque 44px, alt corrigidos, `:user-invalid`.
**Bugs:** hover do CTA moss agora muda de cor; `theme-color` e rgba alinhados aos tokens; classes mortas removidas; Cormorant 700 removido do carregamento.
**Hierarquia/conversão:** hero sem lista duplicada (CTA sobe), preço menor que o h1, cor de ação única (moss), promessas repetidas reduzidas (trust-bar removida, "garantia" agora fala de arrependimento/defeito), upsell Agenda -> Box (+R$ 122), CTAs "Pagar com Pix" / "Pagar no cartão", seção Dúvidas com botões.
**Tipografia/espaço:** text-wrap balance/pretty, conteúdo >= 14px, lining-nums nos preços, scroll-padding, svh/dvh, cards de produto 16:10.
**Motion:** press scale .97, transition sem `all`, modal enter/exit, FAQ accordion, sticky 320/200ms + FAB acoplado + some sobre Produtos/CTA final, manifesto com reveal + stagger. Tudo em transform/opacity, com reduced-motion.
**Identidade:** emblema do sol no logo, favicon SVG e apple-touch-icon.

Não alterado (precisa de decisão): âncora "de R$ 467" (soma dos avulsos = R$ 492), "12x" sem valor, fotografia, self-host de fontes, analytics.

**Botões (revisão):** altura única de 48px (btn-m e btn-s), secundário em moss (cor de ação única), rótulo "Pedir com Pix" (abre formulário -> WhatsApp), Ritual: "Cartão pelo WhatsApp".
