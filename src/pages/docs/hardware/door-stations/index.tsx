import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import ProductGallery from "@/components/docs/ProductGallery";
import data from "@/data/hardware.json";

export default function DoorStationsIndex() {
  // atteso in data.doorStations: [{ name, href, image }, ...]
  return (
    <DocsLayout title="Dispositivi esterni">
      <ProductGallery items={data.doorStations} />
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "it", ["common"])),
  },
});
