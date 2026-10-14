// Contatos e links confirmados do cliente.
//
// PENDENTE: WhatsApp e Zalo. Zalo e o mensageiro dominante no Vietna —
// para cliente local, e mais relevante que WhatsApp.
// O e-mail e o unico contato confirmado hoje.
//
// O link do beacons NAO e usado em lugar nenhum: ele aponta para um
// Instagram que nao existe mais.

export const EMAIL = "realworldgrappling@gmail.com";
export const INSTAGRAM = "https://www.instagram.com/mmarealworld/";
export const INSTAGRAM_HANDLE = "@mmarealworld";
export const TIKTOK = "https://www.tiktok.com/@realworldgrappling";
export const TIKTOK_HANDLE = "@realworldgrappling";
export const AMAZON_SHOP = "https://www.amazon.com/shop/mmarealworld";

export function mailto(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
