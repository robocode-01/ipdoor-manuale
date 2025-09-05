import Link from "next/link";

const sections = [
  {
    title: "INIZIA QUI",
    items: [
      { label: "Panoramica", href: "/docs" },
      { label: "Installazione", href: "/docs/installazione" }
    ],
  },
  {
    title: "HARDWARE",
    items: [
      { label: "Dispositivi esterni", href: "/docs/hardware/door-stations" },
      { label: "Dispositivi interni", href: "/docs/hardware/indoor-stations" },
      { label: "Controller & Reader", href: "/docs/hardware/controller-reader" }
    ],
  },
  {
    title: "SOFTWARE",
    items: [
      { label: "App Mobile", href: "/docs/software/app-mobile" },
      { label: "App PC Base", href: "/docs/software/app-pc-base" },
      { label: "App PC Concierge", href: "/docs/software/app-pc-concierge" }
    ],
  },
  {
    title: "INSTALLAZIONE E CONFIGURAZIONE",
    items: [
      { label: "Console", href: "/docs/installazione/console" },
      { label: "Server On Premise", href: "/docs/installazione/server-on-premise" }
    ],
  },
  {
    title: "FAQ",
    items: [
      { label: "Domande frequenti", href: "/docs/faq" }
    ],
  }
];

export default function Sidebar({ activePath }: { activePath?: string }) {
  return (
    <nav className="menu sidebar-nav">
      {sections.map(section => (
        <div className="menu-section" key={section.title}>
          <p className="menu-label">{section.title}</p>
          <ul className="menu-list">
            {section.items.map(it => {
              const isActive = activePath === it.href;
              return (
                <li key={it.href} className={isActive ? "is-active" : undefined}>
                  <Link href={it.href} className="menu-link">
                    <span className="bullet" aria-hidden />
                    <span className="text">{it.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}
