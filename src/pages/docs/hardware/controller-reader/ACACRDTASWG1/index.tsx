import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import Image from "next/image";
import data from "@/data/hardware.json";

type Item = { id: string; name: string; image?: string };

export default function Page() {
  const list: Item[] = Array.isArray((data as any)?.controllerReader)
    ? ((data as any).controllerReader as Item[])
    : [];
  const item = list.find((x) => x.id === "ACACRDTASWG1");

  return (
    <DocsLayout title="ACACRDTASWG1 — Controller & Reader">
      <h1 className="title">ACACRDTASWG1</h1>

      {item?.image && (
        <div style={{ maxWidth: 460, marginBottom: "1rem" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 80vw, 460px"
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
