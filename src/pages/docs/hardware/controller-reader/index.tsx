import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import ProductGallery from "@/components/docs/ProductGallery";
import data from "@/data/hardware.json";

type RawItem = { id: string; name: string; image?: string; href: string };

export default function ControllerReaderIndex() {
  const list: RawItem[] = Array.isArray((data as any)?.controllerReader)
    ? ((data as any).controllerReader as RawItem[])
    : [];

  return (
    <DocsLayout title="Controller & Reader">
      {list.length > 0 ? (
        <ProductGallery items={list.map(({ name, href, image }) => ({ name, href, image }))} />
      ) : (
        <div className="box has-text-grey" style={{ textAlign: "center" }}>
          <p style={{ margin: 0 }}>Nessun prodotto disponibile in questa categoria.</p>
        </div>
      )}
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? "it", ["common"])) },
});
