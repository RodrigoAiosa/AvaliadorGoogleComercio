import Avaliador from "./Avaliador";
import { googleReviewUrl } from "@/lib/google";

type SP = Promise<{ [k: string]: string | string[] | undefined }>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? "";

export default async function Page({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const nome = one(sp.nome);
  const local = one(sp.local);
  const g = one(sp.g);
  return <Avaliador nome={nome} local={local} googleUrl={googleReviewUrl(g, nome, local)} />;
}
