import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="dist/imgs/img-2.jpg"
          alt="Travel destinations around the world"
        />
        <div>
          <h2>About RoamRadar</h2>
          <p>
            RoamRadar is your ultimate travel companion, designed to help you discover, 
            track, and remember your adventures around the world. Whether you're a seasoned 
            traveler or planning your first big trip, our platform makes it easy to explore 
            new destinations and keep track of your travel memories.
          </p>
          <p>
            Our interactive map allows you to click anywhere in the world to discover 
            new cities and add them to your personal travel list. Each location you visit 
            can be documented with notes, photos, and memories, creating a digital travel 
            journal that grows with every adventure.
          </p>
          <p>
            Join thousands of travelers who use RoamRadar to plan their next adventure, 
            track their bucket list destinations, and preserve their travel memories for 
            years to come. Start exploring the world today!
          </p>
        </div>
      </section>
    </main>
  );
}