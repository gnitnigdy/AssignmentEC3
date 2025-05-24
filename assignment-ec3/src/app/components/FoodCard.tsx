"use client";
import React, { useEffect, useState } from "react";
import { Card, Row, Col, Container, Button } from "react-bootstrap";
import styles from "./FoodCard.module.css";
interface Food {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
}

const FoodGallery: React.FC = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const fetchFoods = async (pageNum: number) => {
    try {
      setLoading(true);
      const res = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/foods?page=${pageNum}&limit=8`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q",
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch");
      }

      const data = await res.json();
      console.log(`ini data`);
      console.log(data);
      setFoods(data.data);
      setTotalPages(Math.ceil(data.data.length / 8));
    } catch (error) {
      console.error("Error fetching food data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods(page);
  }, [page]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(
        `https://api-bootcamp.do.dibimbing.id/api/v1/delete-food/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1pZnRhaGZhcmhhbkBnbWFpbC5jb20iLCJ1c2VySWQiOiJjYTIzZDdjYy02Njk1LTQzNGItODE2Yy03ZTlhNWMwNGMxNjQiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2NjE4NzUzMjF9.wV2OECzC25qNujtyb9YHyzYIbYEV-wud3TQsYv7oB4Q",
            apiKey: "w05KkI9AWhKxzvPFtXotUva-",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete item");
      alert("Item berhasil dihapus!");
      fetchFoods(page); // Refresh list setelah delete
    } catch (error) {
      console.error("Delete error:", error);
      alert("Gagal menghapus item.");
    }
  };
  return (
    <Container className="my-4">
      <Row xs={1} md={2} lg={3} className="g-4">
        {foods.map((food) => (
          <Col key={food.id}>
            <Card className={styles.cardWrapper}>
              <Card.Img
                variant="top"
                src={food.imageUrl}
                alt={food.name}
                className={styles.cardImage}
              />
              <Card.Body>
                <Card.Title>{food.name}</Card.Title>
                <Card.Text>{food.description}</Card.Text>
                <div className="d-flex justify-content-center gap-2">
                  <Button>👁️ | View</Button>
                  <Button onClick={() => handleDelete(food.id)}>
                    🗑️ | Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {loading && <p className="text-center mt-3">Loading...</p>}
      <div className="d-flex justify-content-center mt-4">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className="me-2"
        >
          Prev
        </Button>
        <span className="align-self-center">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="secondary"
          disabled={page === totalPages}
          onClick={() => setPage((prev) => prev + 1)}
          className="ms-2"
        >
          Next
        </Button>
      </div>
    </Container>
  );
};

export default FoodGallery;
