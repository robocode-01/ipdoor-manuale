import styles from "@/styles/docs.module.scss";
export default function Callout({ type = "info", children }:{ type?: "info"|"warn"|"success"; children: React.ReactNode }){
  const map = { info: styles.calloutInfo, warn: styles.calloutWarn, success: styles.calloutInfo } as const;
  return <div className={map[type]}>{children}</div>;
}