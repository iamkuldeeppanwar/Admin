import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import "./Products.css";

function Products({ title, image, price, description }) {
  const shortName = `${description
    .split(" ")
    .slice(0, 25)
    .join(" ")
    .replace(/<.+?>/g, "")}...`;

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader title={title} />
        <CardMedia component="img" height="194" image={image} alt="img" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            ₹ {price}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {shortName}
          </Typography>
        </CardContent>
      </Card>
      <button className="cartbtn">{<ShoppingCartIcon />}</button>
    </div>
  );
}

export default Products;
