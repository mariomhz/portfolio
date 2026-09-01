import Link from "next/link";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Not found / José Mario Hernández",
};

export default function NotFound() {
  return (
    <div className={styles.page}>
      <p className={styles.code}>404</p>
      <h1 className={styles.title}>That page does not exist.</h1>
      <p className={styles.body}>
        The link may be old, or I may have moved something. These do exist:
      </p>

      <nav className={styles.links} aria-label="Suggested pages">
        <Link href="/">Home</Link>
        <Link href="/work">Work</Link>
        <Link href="/work/micultura">MiCultura</Link>
        <Link href="/work/skyabove">SkyAbove</Link>
        <Link href="/work/mosir">MOSIR</Link>
      </nav>
    </div>
  );
}
