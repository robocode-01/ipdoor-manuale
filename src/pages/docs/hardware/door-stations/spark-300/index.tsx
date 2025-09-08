import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";
import Image from "next/image";
import Link from "next/link";

export default function Spark300Page() {
  return (
    <DocsLayout title="SPARK 300 — Dispositivo esterno">
      {/* Hero */}
      <div className="box" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
        <div>
          <h1 className="title">SPARK 300</h1>
          <p className="subtitle">Videocitofono IP — compatto, PoE, pronto al cloud IpDoor</p>
          <ul className="content" style={{ marginTop: "1rem" }}>
            <li>Alimentazione <strong>PoE</strong> 802.3af</li>
            <li>Camera integrata con illuminatore</li>
            <li>Relè porta / gestione accesso</li>
            <li>Onboarding rapido su piattaforma <strong>cloud IpDoor</strong></li>
          </ul>

          {/* Mini-Nav (CTA) */}
          <div className="buttons" style={{ marginTop: "1rem" }}>
            <Link className="button is-primary" href="/docs/hardware/door-stations/spark-300/installazione">
              Guida Installazione
            </Link>
            <Link className="button is-link is-light" href="/docs/hardware/door-stations/spark-300/scheda-tecnica">
              Scheda Tecnica
            </Link>
          </div>
        </div>

        <div style={{ position: "relative", width: "100%", aspectRatio: "4 / 3" }}>
          <Image
            src="/media/door-stations/spark-300/hero.png"
            alt="IpDoor SPARK 300"
            fill
            sizes="(max-width: 1024px) 100vw, 600px"
            priority
            style={{ objectFit: "contain" }}
          />
        </div>
      </div>

      {/* Specifiche rapide */}
      <div className="box">
        <h2 className="title is-5">Specifiche rapide</h2>
        <div className="content">
          <table className="table is-fullwidth">
            <tbody>
              <tr><th>Alimentazione</th><td>PoE 802.3af</td></tr>
              <tr><th>Networking</th><td>Ethernet 10/100, DHCP/Static</td></tr>
              <tr><th>Montaggio</th><td>Incasso / Parete (a seconda accessori)</td></tr>
              <tr><th>Integrazione</th><td>Cloud IpDoor, App Mobile</td></tr>
            </tbody>
          </table>
        </div>
        <p className="has-text-grey is-size-7">
          Per i dettagli completi vedi <Link href="/docs/hardware/door-stations/spark-300/scheda-tecnica">Scheda Tecnica</Link>.
        </p>
      </div>

      {/* Documenti (non nei pulsanti in alto) */}
      <div className="box">
        <h2 className="title is-5">Documenti</h2>
        <ul className="content">
          <li>
            <a href="/media/door-stations/spark-300/DS-IT-300.pdf" target="_blank" rel="noreferrer">
              Datasheet SPARK 300 (PDF)
            </a>
          </li>
          <li>
            <a href="/media/door-stations/spark-300/QS-IE-300.pdf" target="_blank" rel="noreferrer">
              Quick Start SPARK 300 (PDF)
            </a>
          </li>
        </ul>
      </div>
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? "it", ["common"])) },
});
