// pages/foods/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Card, Container } from "react-bootstrap";

interface Food {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

const FoodDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [food, setFood] = useState<Food | null>(null);

  const fetchFood = async () => {
    try {
      const res = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/food/${id}`,
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to fetch detail");
      const data = await res.json();
      setFood(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Hapus makanan ini?");
    if (!confirmDelete || !id) return;

    try {
      const res = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/delete-food/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete");
      alert("Berhasil dihapus!");
      router.push("/"); // kembali ke halaman list
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus makanan.");
    }
  };

  useEffect(() => {
    if (id) fetchFood();
  }, [id]);

  if (!food) return <p className="text-center mt-5">Loading detail...</p>;

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ width: "24rem" }}>
        <Card.Img variant="top" src={food.imageUrl} />
        <Card.Body>
          <Card.Title>{food.name}</Card.Title>
          <Card.Text>{food.description}</Card.Text>
          <div className="d-flex justify-content-between mt-3">
            <Button variant="secondary" onClick={() => router.back()}>
              Back
            </Button>
            <Button variant="danger" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FoodDetailPage;
