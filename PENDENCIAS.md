# Real World — o que falta confirmar com o cliente

**No ar:** https://realworld-nu-eight.vercel.app

Nada nesta lista foi inventado para preencher o site. Onde faltou informação,
o site simplesmente não afirma nada — é mais barato ficar em silêncio do que
publicar credencial vaga em artes marciais.

Cada item aparece também como comentário no ponto exato do código.

## Bloqueia a publicação

| # | Pendência | Onde | Por quê |
|---|---|---|---|
| 1 | **Nome da marca.** O cliente usa "RealWorldMMA" no Instagram e "Real World Grappling" no TikTok, no e-mail e no kimono. O site usa "Real World" provisoriamente. | `src/app/layout.tsx`, `Header.tsx`, `Footer.tsx` | Define título, domínio e open graph. |
| 2 | **Nome completo do instrutor.** Nenhum nome de pessoa foi publicado. O título da seção "Sobre" é a marca, não a pessoa. | `src/components/sections/About.tsx` | Não publicar nome deduzido. |
| 3 | **Linhagem da faixa preta** — por quem, que ano, quantos graus; tempo de treino, tempo de ensino, cartel, equipe/associação. | `About.tsx` | Em artes marciais, credencial vaga custa autoridade. |
| 4 | **Revisão do vietnamita por falante nativo.** | `src/i18n/vi.json` | Tradução automática de termo técnico de luta sai errada. Os nomes das técnicas foram mantidos em inglês de propósito (é o uso real no Vietnã); só as categorias foram traduzidas. |
| 5 | **Números de alcance** (10M+ / 23K / 200+) — baseados no Instagram em outubro de 2026. | `src/i18n/en.json` e `vi.json`, chave `library.stats` | Confirmar antes de publicar. |

## Precisa de autorização explícita

| # | Pendência | Observação |
|---|---|---|
| 6 | **"Law Enforcement"** aparece na bio do TikTok. **Não está no site.** | Se autorizado, vira o argumento mais forte da página: alguém que ensina defesa pessoal e usa no trabalho. Entra como bloco de destaque em `About.tsx`. |

## Completa a conversão

| # | Pendência | Onde |
|---|---|---|
| 7 | **Preço, moeda, pacotes**, onde exatamente a aula acontece, se ele vai até o aluno, se atende grupo/casal. | `Private.tsx` |
| 7b | **Deep links por produto da Amazon.** Hoje as quatro categorias de equipamento apontam todas para a vitrine (`amazon.com/shop/mmarealworld`), que e o unico link de afiliado confirmado. Com a lista de produtos e as tags dele, basta trocar o `href` de cada card em `Gear.tsx`. | `Gear.tsx` |
| 8 | **WhatsApp e Zalo.** Zalo é o mensageiro dominante no Vietnã — para cliente local, é mais relevante que WhatsApp. Hoje o e-mail é o único contato confirmado. | `src/lib/site.ts` |
| 8b | **Domínio próprio.** Quando existir, definir a variável `NEXT_PUBLIC_SITE_URL` no projeto da Vercel. Ela alimenta o `metadataBase`, que é o que faz o `og:image` sair como URL **absoluta** — sem isso o WhatsApp descarta a imagem e o link vai sem preview. | `src/app/layout.tsx` |
| 9 | **Arquivo vetorial oficial da logo.** A marca do header/rodapé foi vetorizada a partir do bordado do kimono com `potrace` — fiel na silhueta, não nas curvas finas. | `src/components/Logo.tsx` |

## Decisões tomadas que vale revisar

- **O link do beacons não é usado em lugar nenhum** — ele aponta para um
  Instagram que não existe mais.
- **A Amazon é tratada como afiliado**, com o aviso explícito no texto, nunca
  como loja própria. O link leva `rel="sponsored"`.
- **`video2.mp4` não entrou no site.** Abre com ~2 s de luta de UFC com placar
  da ESPN e logo Monster Energy — problema de licenciamento. Detalhes e a
  avaliação dos 46 frames em [`public/assets/NOTAS-ASSETS.md`](public/assets/NOTAS-ASSETS.md).

## Expansão já prevista na estrutura

A **Biblioteca técnica** foi montada para virar biblioteca de verdade. Hoje
cada card abre o Instagram; quando houver vídeo hospedado ou produto digital,
basta trocar o `href` de cada card por uma rota própria (`/technique/[slug]`).
Ver `src/components/sections/Library.tsx`.
