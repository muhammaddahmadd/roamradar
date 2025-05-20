import styles from "./Product.module.css";
import PageNav from "../components/PageNav";
export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav/>
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About WorldWide.</h2>
          <p>
            This is a travel website that allows you to find the best places to visit.
          </p>
          <p>
            Some lorum ipsum content here...
          </p>
        </div>
      </section>

    </main>
  );
}
