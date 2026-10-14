import { Header } from "@/components/sections/Header";
import { Hero } from "@/components/sections/Hero";
import { Disciplines } from "@/components/sections/Disciplines";
import { Private } from "@/components/sections/Private";
import { Library } from "@/components/sections/Library";
import { About } from "@/components/sections/About";
import { Gear } from "@/components/sections/Gear";
import { Booking } from "@/components/sections/Booking";
import { Footer } from "@/components/sections/Footer";

// Ritmo de fundo — contraste duro, sem transicao suave entre secoes.
// A pagina alterna escuro e CLARO, e o claro nao e enfeite: e onde entram as
// duas coisas que precisam de luz — a secao de conversao e a foto de estudio
// de fundo branco, que assenta na placa clara sem recorte nenhum.
//
//   hero          breu     (escuro)
//   disciplinas   grafite  (escuro)
//   particulares  osso     (CLARO)  <- conversao
//   biblioteca    breu     (escuro)
//   sobre         osso     (CLARO)  <- foto de estudio
//   equipamento   grafite  (escuro)
//   agendamento   AMARELO  (unico bloco chapado)
//   rodape        #070708
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Disciplines />
        <Private />
        <Library />
        <About />
        <Gear />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
