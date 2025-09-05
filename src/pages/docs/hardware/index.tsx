import type { GetStaticProps } from "next";
import { i18nProps } from "@/lib/i18n";

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: await i18nProps(locale)
});


import DocsLayout from "@/components/docs/DocsLayout";
import Link from "next/link";
export default function HardwareIndex(){
  return (
    <DocsLayout title="Hardware">
      <h1 className="title">Hardware</h1>
      <ul className="content">
        <li><Link href="/docs/hardware/door-stations">Dispositivi esterni (Door stations)</Link></li>
        <li><Link href="/docs/hardware/indoor-stations">Dispositivi interni (Indoor stations)</Link></li>
        <li><Link href="/docs/hardware/controller-reader">Controller & Reader</Link></li>
      </ul>
    </DocsLayout>
  );
}