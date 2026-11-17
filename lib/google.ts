/**
 * Monta o link do formulário oficial de avaliação do Google.
 * `ref` pode ser um Place ID (ex.: ChIJ...) ou um link completo
 * (g.page/r/..., maps.app.goo.gl/..., google.com/maps/...).
 */
export function googleReviewUrl(ref?: string, nome?: string, local?: string): string {
  const r = (ref ?? "").trim();
  if (/^https?:\/\//i.test(r)) return r;
  if (r) return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(r)}`;
  const q = [nome, local, "avaliações"].filter(Boolean).join(" ");
  return `https://www.google.com/search?q=${encodeURIComponent(q)}`;
}
