import type { GetStaticProps } from "next";
import { i18nProps } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await i18nProps(locale)
});


import DocsLayout from "@/components/docs/DocsLayout";
import data from "@/data/hardware.json";
import CardGrid from "@/components/docs/CardGrid";

export default function ControllerReaderIndex(){
  const items = (data as any[]).filter(d=>d.category==="controller-reader").map(p=>({
    id: p.id, name: p.name, image: p.image, href: `/docs/hardware/controller-reader/${p.id}`
  }));
  return (
    <DocsLayout title="Controller & Reader">
      <h1 className="title">Controller & Reader</h1>
      <CardGrid items={items} />
    </DocsLayout>
  );
}