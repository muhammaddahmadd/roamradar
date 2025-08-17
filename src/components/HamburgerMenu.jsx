import { useState } from 'react';
import styles from './HamburgerMenu.module.css';

function HamburgerMenu({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button 
        className={`${styles.hamburger} ${isOpen ? styles.open : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`${styles.menuContent} ${isOpen ? styles.show : ''}`}>
        {children}
      </div>
    </div>
  );
}

export default HamburgerMenu;