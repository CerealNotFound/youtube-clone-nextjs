import styles from "./menu.module.css";

const getData = async () => {
  const response = await fetch("http://localhost:3000/api/filters");

  if (!response.ok) {
    throw new Error("Failed to fetch filters");
  }

  return response.json();
};

const Menu = async () => {
  const filters = await getData();

  const sortedCategories = filters.sort((a, b) => a.id - b.id);

  return (
    <div id={styles.menuWrapper}>
      {sortedCategories.map((category) => (
        <div key={category.id} className={styles.menuCategory}>
          {category.filter}
        </div>
      ))}
    </div>
  );
};

export default Menu;
