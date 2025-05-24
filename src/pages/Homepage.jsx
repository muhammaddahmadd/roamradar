
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav";
import { Link } from "react-router-dom";
export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>
          You travel the world.
          <br />
          RoamRadar keeps track of your adventures.
        </h1>
        <h2>
          A world map that tracks your footsteps into every city you can think
          of.
        </h2>
        <Link to="/login" className="cta">
          Start Tracking Now..
        </Link>
      </section>
    </main>
  );
}
