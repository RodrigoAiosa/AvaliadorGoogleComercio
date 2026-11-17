# Avaliador Google Comércio

Site (Next.js + Vercel) que gera um QR code por estabelecimento e leva o cliente a uma tela de avaliação
(Comida, Serviço, Ambiente) e, ao final, ao formulário oficial de avaliação do Google.

## Como funciona
1. Abra `/` (a raiz do site), preencha **nome**, **local** e o **Place ID / link de avaliação do Google**.
2. Baixe o QR code gerado e imprima.
3. O cliente escaneia, avalia e toca em **Enviar avaliação no Google**: o texto é copiado e o formulário oficial abre.
   O Google exige que o cliente conclua com a própria conta; nenhum site pode preencher ou enviar por ele.

Todos os clientes, com qualquer nota, têm acesso ao Google (a política do Google proíbe filtrar só as notas altas).

## Desenvolvimento
```bash
npm install
npm run dev
```

## Deploy
Importe o repositório na Vercel (framework Next.js detectado automaticamente). Não há variáveis de ambiente.
