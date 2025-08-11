import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Pricing() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            Simple pricing.
            <br />
            Just $9/month.
          </h2>
          <p>
            Unlock unlimited access to RoamRadar's premium features and start
            building your perfect travel journey today.
          </p>
          <p>
            <strong>What's included:</strong>
          </p>
          <ul>
            <li>✨ Unlimited city tracking and memories</li>
            <li>🗺️ Interactive world map with click-to-add cities</li>
            <li>📝 Detailed notes and travel journaling</li>
            <li>📱 Mobile-responsive design</li>
            <li>🔒 Secure cloud storage for your travel data</li>
            <li>🌍 Access to global city database</li>
          </ul>
         
          <button className={styles.ctaButton}>
            Start Your Adventure Today
          </button>
        </div>
        <img
          src="dist/imgs/img-1.jpg"
          alt="Travel destinations and pricing overview"
        />
      </section>
    </main>
  );
}