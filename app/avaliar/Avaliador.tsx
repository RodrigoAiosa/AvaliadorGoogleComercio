"use client";

import { useState } from "react";

const LABELS = ["", "Péssimo", "Ruim", "Regular", "Bom", "Excepcional"];
const CATEGORIAS = ["Comida", "Serviço", "Ambiente"] as const;
const TEMAS = [
  "Sobre a comida: ",
  "Sobre o atendimento: ",
  "Sobre o ambiente: ",
  "Sobre o preço: ",
  "Sobre a limpeza: ",
  "Sobre o tempo de espera: ",
];

function Stars({ value, onChange, size, nome }: { value: number; onChange: (n: number) => void; size: "big" | "small"; nome: string }) {
  return (
    <div className={`stars ${size}`} role="radiogroup" aria-label={nome}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          role="radio"
          aria-checked={value === n}
          aria-label={`${n} ${n === 1 ? "estrela" : "estrelas"}`}
          className={n <= value ? "on" : ""}
          onClick={() => onChange(n)}
        >
          {n <= value ? "★" : "☆"}
        </button>
      ))}
    </div>
  );
}

export default function Avaliador({ nome, local, googleUrl }: { nome: string; local: string; googleUrl: string }) {
  const [geral, setGeral] = useState(0);
  const [cats, setCats] = useState<Record<string, number>>({});
  const [texto, setTexto] = useState("");
  const [copiado, setCopiado] = useState(false);

  function addTema(t: string) {
    setTexto((prev) => (prev && !prev.endsWith("\n") ? prev + "\n" : prev) + t);
  }

  async function enviar() {
    // Abre o formulário oficial do Google (o cliente conclui lá, logado na própria conta).
    window.open(googleUrl, "_blank", "noopener");
    if (texto.trim()) {
      try {
        await navigator.clipboard.writeText(texto.trim());
        setCopiado(true);
      } catch {
        setCopiado(false);
      }
    }
  }

  return (
    <main>
      <h1>{nome || "Avalie sua experiência"}</h1>
      {local && <p className="sub">{local}</p>}

      <div className="overall">
        <Stars value={geral} onChange={setGeral} size="big" nome="Avaliação geral" />
        <div className="label">{LABELS[geral]}</div>
      </div>

      {CATEGORIAS.map((c) => (
        <div className="cat" key={c}>
          <span>{c}</span>
          <Stars value={cats[c] ?? 0} onChange={(n) => setCats((p) => ({ ...p, [c]: n }))} size="small" nome={c} />
        </div>
      ))}

      <label className="field" style={{ marginTop: 20 }}>
        Conte como foi sua experiência neste lugar
        <textarea value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Escreva com suas palavras…" />
      </label>

      <div className="hint">Precisa de ideias? Toque para começar um tópico:</div>
      <div className="chips">
        {TEMAS.map((t) => (
          <button key={t} type="button" className="chip" onClick={() => addTema(t)}>
            {t.replace("Sobre ", "").replace(": ", "")}
          </button>
        ))}
      </div>

      <button className="primary" onClick={enviar} disabled={geral === 0}>
        Enviar avaliação no Google
      </button>

      <div className="notice">
        {copiado
          ? "Texto copiado! Na tela do Google, marque as estrelas e cole o texto (Ctrl+V / tocar e segurar → Colar)."
          : "Você será levado ao formulário oficial do Google, onde confirma as estrelas e publica com a sua conta."}
      </div>
    </main>
  );
}
