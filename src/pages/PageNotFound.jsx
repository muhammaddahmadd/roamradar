import styles from "./PageNotFound.module.css";

export default function PageNotFound() {
  return (
    <main className={styles.pageNotFound}>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>Sadly, Page not found</h1>
      </div>
    </main>
  );
}
