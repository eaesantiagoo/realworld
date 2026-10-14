# Real World

Site de REAL WORLD — faixa preta de BJJ que ensina MMA, boxe, kickboxing e
defesa pessoal em Ho Chi Minh City, Vietnã. Bilíngue inglês / vietnamita.

```bash
npm run dev       # desenvolvimento, porta 3000
npm run build     # build de produção
npm run preview   # serve o build, porta 3100
```

## Leia antes de publicar

- [`PENDENCIAS.md`](PENDENCIAS.md) — o que ainda falta confirmar com o cliente.
  **Nenhum nome, credencial ou preço foi publicado sem fonte.**
- [`public/assets/NOTAS-ASSETS.md`](public/assets/NOTAS-ASSETS.md) — como as
  2 fotos e os 2 vídeos foram tratados, e por que 45 dos 46 frames extraídos
  foram descartados.

## Estrutura

```
src/
  app/
    globals.css          tokens, escala fluida e todo o CSS das seções
    layout.tsx           fontes (Chivo · Be Vietnam Pro · JetBrains Mono)
    page.tsx             composição das 9 seções
  components/
    RW.tsx               TapeDivider, TechMark, MonoLabel, PlayerVideo,
                         Reveal, RevealLines, GrainOverlay, LangSwitch,
                         Drawer e os ícones (todos SVG inline)
    Logo.tsx             marca vetorizada do bordado do kimono
    sections/            uma seção por arquivo
  hooks/useScrollEffects.ts
  i18n/                  en.json · vi.json · LangProvider
  lib/site.ts            contatos e links confirmados
```

## Ícone e preview de link

O favicon e o ícone do iOS são a **marca do kimono redesenhada** (anel + ponta
de lança de duas lâminas). O bordado tem uma mancha na base que é sombra da
dobra do tecido, não parte da marca — ela aparece em qualquer limiarização, e
por isso o ícone foi redesenhado limpo em vez de rasterizado direto da foto. A
versão fiel, traçada com `potrace`, continua no header e no rodapé, onde há
tamanho para o detalhe.

- `src/app/favicon.ico` — multi-tamanho, 16 a 256
- `src/app/icon.svg` — vetorial, navegadores modernos
- `src/app/apple-icon.png` — 180×180, atalho do iOS
- `public/og.jpg` — 1200×630, **JPEG** (o WhatsApp não renderiza preview de
  WebP), 88 KB

O `metadataBase` em `layout.tsx` é obrigatório: sem ele o Next emite `og:image`
relativa e o WhatsApp manda o link sem preview nenhum.

## Armadilha do build

O Turbopack às vezes serve CSS de uma build anterior, inclusive em produção.
Se uma mudança de CSS não aparecer, **apague `.next` antes de buildar**:

```bash
rm -rf .next && npm run build
```

## Decisões que não são arbitrárias

**Be Vietnam Pro** é escolha técnica, não estética: foi desenhada para
vietnamita e latim ao mesmo tempo. Inter, Manrope e similares renderizam mal
os diacríticos empilhados (ế, ộ, ữ, ỹ). Num site bilíngue isso aparece.
**Chivo** e **JetBrains Mono** também carregam o subset vietnamita — foi
verificado, não presumido.

**Títulos têm entrelinha diferente em vietnamita.** Os diacríticos sobem acima
da altura de caixa latina; com `line-height: 0.92` eles encostam na linha de
cima. Ver `:lang(vi)` em `globals.css`.

**As três linhas do hero nunca quebram.** `"THAT ACTUALLY"` mede 7,75× o
font-size em Chivo 900, então o título tem teto de `9vw` e as linhas são
`nowrap` — no desktop ele avança sobre a borda escura da foto de propósito.

**A página alterna escuro e claro, e o claro tem função.** As duas seções
claras são a de conversão (aulas particulares) e a do instrutor — esta última
porque a foto de estúdio tem fundo branco: numa seção clara ela assenta numa
placa do mesmo branco e o fundo deixa de ser um problema a esconder. Nada de
degradê entre seções: preto, corta, osso, corta.

**Nenhum ponto do site rola para o lado.** As oito técnicas são uma grade —
2 colunas no celular, 3 no tablet, 4 no desktop. Carrossel lateral esconderia
metade do conteúdo atrás de um gesto que o visitante não tem como adivinhar, e
ainda briga com a rolagem vertical da página.

**Todo alvo de toque tem no mínimo 44px de altura**, inclusive os links de
texto do rodapé e os handles sociais — o padding entra sem mexer no ritmo
visual, porque o `gap` das listas foi zerado na mesma medida.

**A revelação tem rede de segurança.** O IntersectionObserver usa margem
negativa embaixo para dar ritmo, o que cria uma faixa morta no rodapé da tela.
Quando a rolagem assenta, uma varredura exige `opacity: 1` de tudo que esteja
de fato visível — mais uma varredura 400 ms após a montagem, para a página que
já abre rolada.

**O vermelho só existe nas marcações técnicas.** São 4 TechMarks na página
inteira (hero, aulas particulares, sobre, agendamento) — é assinatura, não
padrão de fundo. O amarelo chapado aparece em um único bloco: o agendamento.

**O estado final de toda animação é `opacity: 1`, sem exceção.** Além do
IntersectionObserver, `useRevealOnScroll` faz uma medição de fallback no frame
seguinte à montagem — rolagem rápida, aba em segundo plano ou navegador sem
IntersectionObserver não deixam conteúdo invisível.
