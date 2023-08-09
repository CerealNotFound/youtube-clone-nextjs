import {
  Hamburger,
  YtLogo,
  Search,
  Mic,
  Create,
  Notification,
} from "../../assets/Icons";
import { User } from "@/components/user/user";
//   import { Logout } from "./logout.js";
import styles from "./navbar.module.css";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav id={styles.nav}>
      <div id={styles.hamburgerLogoWrapper}>
        <div id={styles.hamburger}>
          <Hamburger />
        </div>
        <div id={styles.logo}>
          <div id={styles.logoSvgWrapper}>
            <YtLogo />
          </div>
          <span id={styles.supWrapper}>IN</span>
        </div>
      </div>
      <div id={styles.searchWrapper}>
        <div id={styles.searchBarWrapper}>
          <span className={styles.searchIconWrapper}>
            <Search />
          </span>
          <input id={styles.searchBar} type="text" placeholder="Search" />
        </div>
        <span id={styles.iconSearchbar}>
          <Search />
        </span>
        <div id={styles.mic}>
          <Mic />
        </div>
      </div>
      <div id={styles.rightIconsWrapper}>
        <Link id={styles.createIcon} href="/upload">
          <Create />
        </Link>
        <div id={styles.notificationsContainer}>
          <Notification />
        </div>
        <div id={styles.userContainer}>
          <User />
          {/* {Logout()} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
