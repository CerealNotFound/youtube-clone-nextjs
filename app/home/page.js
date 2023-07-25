import Navbar from "@/components/navbar/navbar";
import Sidebar from "@/components/sidebar/sidebar";
import Videos from "@/components/videos/videos";
import Menu from "@/components/menu/menu";
import styles from "./home.module.css";

const HomePage = () => {
  return (
    <div id={styles.homeWrapper}>
      <header id={styles.header}>
        <Navbar />
      </header>
      <main id={styles.main}>
        <Sidebar />
        <section id={styles.section}>
          <Menu />
          <Videos />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
