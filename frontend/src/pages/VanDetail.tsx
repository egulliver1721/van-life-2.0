import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
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
      <Link to="/vans" className="back">
        back to vans
      </Link>
      <div className="van-detail-container">
        {van ? (
          <div className="van-detail">
            <img src={van.imageUrl} />
            <i className={`van-type ${van.type} selected centered`}>
              {van.type}
            </i>
            <h2>{van.name}</h2>
            <p className="van-price">
              <span>${van.price}</span>/day
            </p>
            <p>{van.description}</p>
            <button className="link-button">Rent this van</button>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </div>
    </div>
  );
};

export default VanDetail;
