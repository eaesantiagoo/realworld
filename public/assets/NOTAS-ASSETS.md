# Tratamento dos assets

Material de origem: 2 fotos, 2 vídeos. Nada mais. O que está em uso no site
e o que foi descartado, com motivo.

---

## foto.jpg (1024×1024) — kimono, fundo branco liso

**Problema:** fundo branco chapado, incompatível com um site escuro.

> **Revisado a pedido do cliente:** o recorte **não é mais usado**. A figura
> solta sobre o breu ficava flutuando, e esconder o fundo do kimono não era
> necessário. A foto entra inteira, com o fundo branco assumido, numa **placa
> clara dentro de uma seção clara** — a placa usa exatamente o branco do fundo
> da foto (`#fefefe`), então não há emenda. O arquivo em uso é
> **`gi-estudio.webp`** (recorte de enquadramento apenas: tirou a margem branca
> excessiva, 650×914). O `gi-recortado.png` continua na pasta como alternativa,
> mas **não é referenciado pelo site**.

**O que foi feito antes (mantido como registro).** `rembg` com matting alpha
(`foreground_threshold=250`, `background_threshold=15`, `erode_size=8`),
seguido de limpeza das ilhas de alfa soltas (mantida só a maior componente
conexa) e corte na bounding box do conteúdo.

O caso era o difícil — kimono branco sobre fundo branco — mas o resultado
aguentou inspeção a 2× nas bordas críticas (ombro, manga, lateral direita):
sem halo claro, sem recorte comendo o tecido. Por isso **não** foi preciso
cair na opção 2 (foto inteira dentro de moldura branca).

→ **`gi-recortado.png`** (545×871, alfa). Usado na seção "Sobre".

### Logo bordada

Ampliada 8–12× nos dois ombros e no peito.

- **Peito:** legível — diz `REAL WORLD / GRAPPLING`, grotesca pesada em caixa
  alta. (A trama do tecido distorce o segundo P de "GRAPPLING".)
- **Ombro:** legível — anel circular com uma marca angular interna tipo ponta
  de lança. Foi **vetorizada de verdade**: crop ampliado 12×, desfoque leve,
  limiarização e traço com `potrace`. O resultado virou
  [`src/components/Logo.tsx`](../../src/components/Logo.tsx) e é usado no
  header e no rodapé.

> **PENDENTE:** arquivo vetorial oficial da logo. O bordado tem resolução
> suficiente para a silhueta, mas não para as curvas finas internas. Se o
> cliente tiver o `.ai`/`.svg` original, substituir o path de `Logo.tsx`.

---

## foto2.jpg (800×800) — enfaixando as mãos

A foto mais forte do conjunto: já tem fundo escuro, fumaça e luz de recorte
lateral. Combina com o breu sem tratamento nenhum.

Convertida para WebP qualidade 88, sem filtro — a foto já tem o tratamento
dela.

→ **`wraps.webp`** (800×800, 54 KB). Hero, com `priority`.

---

## video1.mp4 e video2.mp4

Codec verificado com `ffprobe`: ambos já vinham **h264 / 720×1280 / yuv420p**.
Nenhuma conversão de codec foi necessária — só remux com `+faststart`.

> Os dois vídeos são verticais (9:16) e curtos. Foram tratados como painéis
> verticais, não forçados em container horizontal.

### Avaliação de frames

Extraídos a 2 fps: **46 frames no total** (20 do vídeo 1, 26 do vídeo 2).
Todos foram abertos e avaliados um por um em folha de contato, depois os
finalistas em resolução maior.

**Aproveitado: 1 frame** (`v1_001`), como pôster.

Descartes, por motivo:

| Frames | Qtd | Motivo do descarte |
|---|---|---|
| `v2_001`–`v2_004` | 4 | Imagens de transmissão de terceiro (UFC, placar ESPN, logo Monster Energy) + título queimado na tela. Conteúdo licenciado — não entra no site de um cliente. |
| `v2_010`–`v2_012`, `v2_016`–`v2_017` | 5 | Texto queimado na tela: "STEP 1", "STEP 2", "PLANT", "Frame". |
| `v1_019`, `v1_020`, `v1_012`–`v1_016` | 7 | Mural "K.O CLUB SPORT" (academia parceira) em destaque no fundo. |
| `v1_002`–`v1_005`, `v1_017`, `v1_018` | 6 | Borrão de movimento, ou meio de transição ilegível. |
| `v1_006`–`v1_011`, `v2_013`–`v2_015`, `v2_018`–`v2_021` | 13 | Marcação vermelha dele já queimada no frame. Boa no vídeo, mas conflita com o TechMark que o site desenha por cima — duas marcações concorrendo. |
| `v2_005`–`v2_009`, `v2_022`–`v2_026` | 10 | Limpos e nítidos, mas pertencem ao vídeo 2, que foi descartado inteiro (ver abaixo). |

### Vídeo escolhido para o site

**`video1.mp4` → `training.mp4`.** Material 100% original, sem título queimado,
sem imagem de terceiro.

**`video2.mp4` não é usado.** Ele abre com ~2 s de luta de UFC com placar da
ESPN e logo Monster Energy visíveis. Publicar isso no site comercial de um
cliente é problema de licenciamento, independente de quão boa é a didática
depois.

→ **`training.mp4`** (1,9 MB, h264, +faststart) e
**`poster-training.webp`** (frame `v1_001`, 56 KB).

> **Nota sobre `v1_001`:** o mural ao fundo é um retrato pintado de um boxeador
> conhecido, decoração da academia. Não é logo de terceiro nem marca d'água, e
> é o único frame nítido do vídeo 1 sem o letreiro "K.O CLUB" legível — por isso
> passou. Se o cliente preferir, dá para regravar um pôster dedicado.

---

## Arquivos originais

`foto.jpg`, `foto2.jpg`, `video1.mp4` e `video2.mp4` foram mantidos na pasta
como fonte. Só os derivados (`gi-recortado.png`, `wraps.webp`,
`training.mp4`, `poster-training.webp`) são referenciados pelo site.
