import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import ProductGallery from "@/components/docs/ProductGallery";
import data from "@/data/hardware.json";

type RawItem = { id: string; name: string; image?: string; href?: string };
type GalleryItem = { name: string; href: string; image?: string };

export default function ControllerReaderIndex() {
  const list: RawItem[] = Array.isArray((data as any)?.controllerReader)
    ? ((data as any).controllerReader as RawItem[])
    : [];

  const items: GalleryItem[] = list.map((p) => ({
    name: p.name,
    image: p.image,
    href: p.href ? p.href : ("/docs/hardware/controller-reader/" + p.id),
  }));

  return (
    <DocsLayout title="Controller & Reader">
      {items.length > 0 ? (
        <ProductGallery items={items} />
      ) : (
        <div className="box has-text-grey" style={{ textAlign: "center" }}>
          <p style={{ margin: 0 }}>Nessun elemento disponibile.</p>
        </div>
      )}
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? "it", ["common"])) },
});
