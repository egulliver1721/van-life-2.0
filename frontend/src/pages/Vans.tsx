import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/*
Cross-Origin Resource Sharing (CORS) is an HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources.
*/

// ATTENTION LEARN THIS WELL! This is how you create a new instance of axios
const instance = axios.create({
  baseURL: "http://localhost:8080",
});

const getVans = async () => {
  const response = await instance.get("/api/vans");
  return response.data;
};

type Vans = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  type: string;
};

const Home = () => {
  const [vans, setVans] = useState<Vans[]>([]);

  useEffect(() => {
    getVans().then((vans) => setVans(vans));
  }, []);

  const vanElements = vans.map((van) => (
    <div key={van.id} className="van-tile">
      <Link to={`/vans/:${van.id}`}>
        <img src={van.imageUrl} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));

  return (
    <div className="van-list-container">
      <div className="van-list">{vanElements}</div>
    </div>
  );
};

export default Home;
