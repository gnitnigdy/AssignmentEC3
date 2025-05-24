import Image from "next/image";
import { Button, Container } from "react-bootstrap";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Hello World</h1>
      <Button variant="success">First Button In The Making</Button>
    </div>
  );
}
