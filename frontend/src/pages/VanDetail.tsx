import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
});

type Van = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: string;
};

const VanDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [van, setVan] = useState<Van>({
    id: 0,
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
    type: "",
  });

  useEffect(() => {
    instance
      .get(`/api/vans/${id}`)
      .then((response) => {
        setVan(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  return (
    <div>
      <img src={van.imageUrl} alt="" />
      <h1>{van.name}</h1>
      <p>
        {van.price} <span>/day</span>
      </p>
      <p>{van.description}</p>
    </div>
  );
};

export default VanDetail;
