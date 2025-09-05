import type { GetStaticProps } from "next";
import { i18nProps } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await i18nProps(locale)
});


import DocsLayout from "@/components/docs/DocsLayout";
import SpecTable from "@/components/docs/SpecTable";
import Callout from "@/components/docs/Callout";
import data from "@/data/hardware.json";

export default function Page(){
  const item = (data as any[]).find(x=>x.id==="aura");
  return (
    <DocsLayout title="AURA monitor — Indoor station">
      <h1 className="title">AURA monitor</h1>
      <p className="content">Indoor station.</p>
      <SpecTable productId="aura" />
      <Callout type="info">Consultare linee guida PoE/IP e protezioni meccaniche in esterno.</Callout>
      {item?.siteUrl ? <p><a href={item.siteUrl} target="_blank" rel="noreferrer">Scheda ufficiale sul sito</a></p> : null}
    </DocsLayout>
  );
}
