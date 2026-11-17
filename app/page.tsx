"use client";

import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";

export default function Configurador() {
  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [google, setGoogle] = useState("");
  const [origin, setOrigin] = useState("");
  const [qr, setQr] = useState("");
  const [copiado, setCopiado] = useState(false);

  useEffect(() => setOrigin(window.location.origin), []);

  const link = useMemo(() => {
    if (!nome.trim() || !origin) return "";
    const p = new URLSearchParams();
    p.set("nome", nome.trim());
    if (local.trim()) p.set("local", local.trim());
    if (google.trim()) p.set("g", google.trim());
    return `${origin}/avaliar?${p.toString()}`;
  }, [nome, local, google, origin]);

  useEffect(() => {
    if (!link) {
      setQr("");
      return;
    }
    QRCode.toDataURL(link, { width: 600, margin: 1, errorCorrectionLevel: "M" }).then(setQr);
  }, [link]);

  async function copiar() {
    await navigator.clipboard.writeText(link);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 1800);
  }

  return (
    <main>
      <h1>Gerador de QR de avaliação</h1>
      <p className="sub">
        Informe os dados do estabelecimento. O QR code abre a tela de avaliação já com o nome do local.
      </p>

      <label className="field">
        Nome do estabelecimento *
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: Padaria Estrela" />
      </label>

      <label className="field">
        Local (cidade / bairro / endereço)
        <input type="text" value={local} onChange={(e) => setLocal(e.target.value)} placeholder="Ex.: Vila Mariana, São Paulo" />
      </label>

      <label className="field">
        Place ID ou link de avaliação do Google
        <input type="text" value={google} onChange={(e) => setGoogle(e.target.value)} placeholder="ChIJ... ou https://g.page/r/.../review" />
        <span className="hint">
          Recomendado. No Perfil da Empresa no Google, copie o link “Pedir avaliações”. Sem isso, o botão abrirá uma busca
          do Google pelo nome e local.
        </span>
      </label>

      {link && (
        <div className="card">
          {qr && <img className="qr" src={qr} alt={`QR code de avaliação de ${nome}`} />}
          <p className="linkbox">{link}</p>
          <div className="row">
            <button className="ghost" onClick={copiar}>{copiado ? "Copiado!" : "Copiar link"}</button>
            <a className="ghost" style={{ textAlign: "center", textDecoration: "none", color: "inherit", padding: "10px 14px", border: "1px solid var(--line)", borderRadius: 20 }} href={qr} download={`qr-${nome.trim().replace(/\s+/g, "-").toLowerCase()}.png`}>
              Baixar QR (PNG)
            </a>
          </div>
          <div className="row">
            <a className="primary" href={link} target="_blank" rel="noreferrer">Testar tela de avaliação</a>
          </div>
        </div>
      )}
    </main>
  );
}
