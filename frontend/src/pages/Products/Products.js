import React, { useEffect, useState } from "react";
import "./Products.css";
import Loader from "../../components/loader/Loader";
import Card from "../../components/card/Card";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productAction";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import bg from "../../assets/bg.png";
import MetaData from '../../components/MetaData';

const Products = () => {
  const categories = [
    "Appetizers",
    "Soups",
    "Salads",
    "Entrees",
    "Sides",
    "Desserts",
    "Beverages",
    "meat",
    "pasta",
    "seafood",
  ];
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(5);
  const [price, setPrice] = useState([0, 250000]);
  const [category, setCategory] = useState("");
  const [ratings , setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productCount,
    resultPerPage,
    filterProductCount,
  } = useSelector((state) => state.products);
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    dispatch(getProduct(keyword, currentPage, price,category,ratings));
  }, [dispatch, keyword, currentPage, price,category,ratings]);

  let count = filterProductCount;

  return (
    <>
     <MetaData title="Product Page" />
      {" "}
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            backgroundImage: `url(${bg})`,
            width: "100vw",
 
            height: "fit-content",
            backgroundRepeat: "repeat",
            backgroundSize: "cover",
            backgroundPosition: "right",
          }}
        >
          <h2 className="productsHeading">Delicious Foods</h2>

          <div className="product-container">
            <div className="filterbox">
              <Typography className="price-title">Price:</Typography>
              <Slider
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                aria-labelledby="discrete-slider"
               
                min={0}
                max={250000}
                style={{ zIndex: "1" }}
              />
                <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
           <fieldset>
           <Typography component="legend">Rating Above </Typography>
           <Slider value={ratings}
           onChange={(e, newRating)=>{
            setRatings(newRating);
           }}
           aria-labelledby="continuous-slider"
           min={0}
           max={5}
           valueLabelDisplay="auto"
           ></Slider>
           </fieldset>
            </div>
          

            <hr className="hr-line" />
            <div className="products">
              {products &&
                products.map((product) => (
                  <Card key={product._id} product={product} />
                ))}
            </div>
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
                min={0}
                max={250000}
                style={{zIndex:"1"}}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Products;
