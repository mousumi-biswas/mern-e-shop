import React from "react";
import Jumbotron from "../components/cards/Jumbotron";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from "../images/carousel-img1.png";
import banner2 from "../images/carousel-img6.jpg";
import banner3 from "../images/carousel-img3.jpg";

const Home = () => {
  return (
    <>
      <Carousel showArrows={true} autoPlay infiniteLoop className="mt-2">
        <div style={{ height: "500px" }}>
          <img src={banner1} />
        </div>
        <div style={{ height: "500px" }}>
          <img src={banner2} />
        </div>
        <div style={{ height: "500px" }}>
          <img src={banner3} />
        </div>
      </Carousel>

      <div className="jumbotron text-danger h1 font-weight-bold text-center">
        <Jumbotron text={["Latest Products", "NewArrival", "Best Sellers"]} />
      </div>

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        New Arrivals
      </h4>

      <NewArrivals />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Best Sellers
      </h4>
      <BestSellers />

      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Categories
      </h4>
      <CategoryList />
      <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        Sub Categories
      </h4>
      <SubList />

      <br />
      <br />
    </>
  );
};

export default Home;
