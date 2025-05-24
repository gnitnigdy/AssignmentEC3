import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import NavbarMenu from "./components/NavbarMenu";
import FoodCard from "./components/FoodCard";

export default function Home() {
  return (
    <div className={""}>
      <NavbarMenu></NavbarMenu>
      <FoodCard></FoodCard>
    </div>
  );
}
