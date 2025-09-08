import type { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DocsLayout from "@/components/docs/DocsLayout";

export default function InstallazioneSpark300() {
  return (
    <DocsLayout title="SPARK 300 — Guida Installazione">
      <h1 className="title">Guida Installazione — SPARK 300</h1>

      <div className="content">
        <h2>1) Contenuto e prerequisiti</h2>
        <ul>
          <li>Dispositivo SPARK 300</li>
          <li>Rete LAN con alimentazione <strong>PoE 802.3af</strong> (switch o injector)</li>
          <li>Accesso a piattaforma cloud IpDoor (account tecnico)</li>
          <li>Smartphone con app IpDoor per test chiamata</li>
        </ul>

        <h2>2) Montaggio</h2>
        <ul>
          <li>Prepara la sede (incasso o parete) secondo dima del produttore.</li>
          <li>Proteggi il cablaggio da intemperie; rispetta i reach di curvatura e le norme locali.</li>
        </ul>

        <h2>3) Cablaggio</h2>
        <ul>
          <li>Collega la porta Ethernet del dispositivo alla rete PoE (802.3af).</li>
          <li>Verifica l’accensione LED e il link di rete.</li>
          <li>(Opz.) Collega contatti relè alla serratura elettrica tramite alimentatore dedicato.</li>
        </ul>

        <h2>4) Prima accensione e rete</h2>
        <ul>
          <li>Default: DHCP attivo. In assenza di DHCP, imposta IP statico dal pannello locale (se previsto) o tool.</li>
          <li>Assicurati che il dispositivo raggiunga Internet per l’accesso al cloud.</li>
        </ul>

        <h2>5) Associazione al cloud IpDoor</h2>
        <ol>
          <li>Accedi al portale tecnico IpDoor.</li>
          <li>Aggiungi nuovo dispositivo e inserisci i dati seriali / QR code (se previsto).</li>
          <li>Conferma la registrazione e attendi lo stato “Online”.</li>
        </ol>

        <h2>6) Configurazione base</h2>
        <ul>
          <li>Imposta profilo chiamata: destinatari (App, interni, PBX, ecc.).</li>
          <li>Configura attuatori: relè porta, tempi di impulso, fasce orarie.</li>
          <li>Abilita funzioni video/audio e qualità secondo banda disponibile.</li>
        </ul>

        <h2>7) Test e collaudo</h2>
        <ul>
          <li>Esegui una chiamata di prova verso l’App o monitor interno.</li>
          <li>Verifica apertura porta e log eventi.</li>
          <li>Controlla video in condizioni diurne/notturne.</li>
        </ul>

        <h2>Documentazione</h2>
        <ul>
          <li><a href="/media/door-stations/spark-300/QS-IE-300.pdf" target="_blank" rel="noreferrer">Quick Start SPARK 300 (PDF)</a></li>
          <li><a href="/media/door-stations/spark-300/DS-IT-300.pdf" target="_blank" rel="noreferrer">Scheda Tecnica SPARK 300 (PDF)</a></li>
        </ul>
      </div>
    </DocsLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale ?? "it", ["common"])) },
});
