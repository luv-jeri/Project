    // eslint-disable-next-line
    import React from "react";
    import "./BottomTabs.css";
    import { Link } from "react-router-dom";
    import { useSelector } from "react-redux";
    import HomeIcon from "@mui/icons-material/Home";
    import SearchIcon from '@mui/icons-material/Search';
    import LocalMallIcon from '@mui/icons-material/LocalMall';
    import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
    import PersonIcon from '@mui/icons-material/Person';
    import DehazeIcon from '@mui/icons-material/Dehaze';
    
    const BottomTab = () => {

      const { cartItems } = useSelector((state) => state.cart);
      // const { favouriteItems } = useSelector((state) => state.favourite);

      return (
        <>
        <div className="bottomOption">
          <Link to="/">
            <HomeIcon  
            style={{
              color:"#000",
              fontSize:"35px",
              margin:"5px",
              opacity:".8"
            }}
            />
          </Link>
          <Link to="/search">
           <SearchIcon 
           style={{
            color:"#000",
            fontSize:"35px",
            margin:"5px"
          }}
           />
          </Link>
          <Link to="/cart">
            <div style={{
              position:"relative"
            }}>
            <LocalMallIcon 
             style={{
              color:"#000",
              fontSize:"35px",
              margin:"5px",
              opacity:".8"
            }} 
            />
            
             <span style={{
              position:"absolute",
              bottom:"70%",
              left:"10%",
              height:"20px",
              width:"20px",
              border:"none",
              background:"tomato",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50%",
              color:"#fff",
              fontWeight:"700"
            }}>{cartItems.length}</span>
            </div>
          </Link>
          <Link to="/favourites">
            <div style={{
              position:"relative"
            }}>
            <FavoriteBorderIcon 
            style={{
              color:"#000",
              fontSize:"35px",
              margin:"5px",
              opacity:".8",
            }} 
            />
             {/* <span style={{
              position:"absolute",
              bottom:"70%",
              left:"10%",
              height:"20px",
              width:"20px",
              border:"none",
              background:"tomato",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              borderRadius:"50%",
              color:"#fff",
              fontWeight:"400",
            }}>
              {favouriteItems.length}</span> */}
            </div>
          </Link>
          <Link to="/account">
          <PersonIcon 
           style={{
            color:"#000",
            fontSize:"35px",
            margin:"5px",
            opacity:".8"
          }}
          />
          </Link>
          <Link to="/more">
            <DehazeIcon style={{
              color:"#000",
              fontSize:"35px",
              margin:"5px",
              opacity:".8"
            }} />
          </Link>
        </div>
        </>
      );
    };
    
    export default BottomTab;
    