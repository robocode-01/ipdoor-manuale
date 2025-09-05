import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import Image from "next/image";
import data from "@/data/hardware.json";

type Item = { id: string; name: string; image?: string };

export default function Page() {
  // Leggo in modo sicuro la lista "controllerReader" se esiste
  const list: Item[] = Array.isArray((data as any)?.controllerReader)
    ? ((data as any).controllerReader as Item[])
    : [];

  // Cerca l’elemento con id "reader" (oppure lascia item undefined)
  const item = list.find((x) => x.id === "reader");

  return (
    <DocsLayout title="Reader — Controller & Reader">
      <h1 className="title">Reader</h1>

      {item?.image ? (
        <div style={{ maxWidth: 360, marginBottom: "1rem" }}>
          <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              priority={false}
            />
          </div>
        </div>
      ) : null}

      <div className="content">
        <p>Scheda in preparazione.</p>
        {!item && (
          <p className="has-text-grey">
            (Suggerimento: popola <code>hardware.json</code> con la sezione <code>controllerReader</code> e un item con <code>id: "reader"</code> per mostrare i dati reali.)
          </p>
        )}
      </div>
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "it", ["common"])),
  },
});
