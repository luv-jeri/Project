import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./AllProducts.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  deleteProduct,
  getAdminProduct,

} from "../../actions/productAction";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import MetaData from "../MetaData/MetaData";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "./Sidebar";
import { ToastContainer, toast } from 'react-toastify';
import { DELETE_PRODUCT_RESET } from "../../constants/productConstant";


const AllProducts = () => {
  const navigate = useNavigate();
const dispatch = useDispatch();

const { error, products } = useSelector((state) => state.adminProduct);


const { error: deleteError, isDeleted } = useSelector(
    (state) => state.deleteProduct
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (deleteError) {
        toast.error(deleteError);
        dispatch(clearErrors());
      }
  
      if (isDeleted) {
        toast.success("Product Deleted Successfully");
        navigate("/admin/products");
        dispatch({ type: DELETE_PRODUCT_RESET });
      }
    dispatch(getAdminProduct());
  }, [dispatch, navigate,isDeleted]);

const columns = [
  {
    field: "id", 
    headerName: "Product Id",
     maxWidth: 200,
     minWidth:200,
      flex: 1.5 
  },
    { field: "name", 
    headerName: "Name",
     maxWidth: 200,
     minWidth:200,
      flex: 1.5 },

    
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      maxWidth: 250,
      minWidth:200,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      maxWidth: 250,
      minWidth:200,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.6,
      headerName: "Actions",
      maxWidth: 350,
      minWidth:200,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Link to={`/edit/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
            onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id:item._id,
        name: item.name,
        stock: item.stock,
        price: item.price,
        
      });
    });

    return (
       <Fragment>
      <MetaData title={`ALL PRODUCTS - Admin`} />

      <div className="dashboard">
        <SideBar />
        <div className="productListContainer">
          <h1 id="productListHeading">ALL PRODUCTS</h1>

          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </div>
      </div>
      <ToastContainer 
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
    </Fragment>
    )
}

export default AllProducts
