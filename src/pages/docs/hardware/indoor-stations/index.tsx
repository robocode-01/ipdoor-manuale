import DocsLayout from "@/components/docs/DocsLayout";
import data from "@/data/hardware.json";
import CardGrid from "@/components/docs/CardGrid";

export default function IndoorStationsIndex(){
  const items = (data as any[]).filter(d=>d.category==="indoor-stations").map(p=>({
    id: p.id, name: p.name, image: p.image, href: `/docs/hardware/indoor-stations/${p.id}`
  }));
  return (
    <DocsLayout title="Dispositivi interni (Indoor stations)">
      <h1 className="title">Dispositivi interni (Indoor stations)</h1>
      <CardGrid items={items} />
    </DocsLayout>
  );
}