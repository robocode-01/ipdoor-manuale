import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import Image from "next/image";
import data from "@/data/hardware.json";

type Item = { id: string; name: string; image?: string };
const SLUG = "vertex-1110";

export default function Page() {
  const list: Item[] = Array.isArray((data as any)?.doorStations)
    ? ((data as any).doorStations as Item[])
    : [];
  const item = list.find(x => x.id === SLUG);

  return (
    <DocsLayout title="VERTEX 1110 — Dispositivo esterno">
      <h1 className="title">VERTEX 1110</h1>

      {item?.image && (
        <div style={{ maxWidth: 520, marginBottom: "1rem" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 80vw, 520px"
            />
          </div>
        </div>
      )}

      <div className="content">
        <p>Scheda in preparazione.</p>
      </div>
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? "it", ["common"])) },
});
