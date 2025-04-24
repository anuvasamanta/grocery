"use client";
import { useCart } from "@/context/CartContext";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";

function Carts() {
  const { cart, removeFromCart, total } = useCart();
  return (
    <Box>
      <Typography variant="h5" gutterBottom sx={{textAlign:"center"}}>
        Your Cart
      </Typography>
      {cart.length === 0 ? (
        <Typography variant="h5" gutterBottom sx={{textAlign:"center"}} >Your cart is empty</Typography>
      ) : (
        <>
          <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {cart.map((item) => (
         <Grid
         key={item?.id}
         sx={{ marginTop: "20px" }}
         size={{ xs: 6, md: 4, lg: 3 }}
       >
        <Card sx={{ maxWidth: 345 }} key={item.id}>
          <CardMedia
            sx={{ height: 140 }}
          image={`${item?.url}`}
            title="green iguana"
          />
          <CardContent>
            <ListItemText
              primary={item.name}
              secondary={`$${item.price.toFixed(2)}`}
            ></ListItemText>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="outlined"
              onClick={() =>removeFromCart(item.id)}
            >
            Remove
            </Button>
          </CardActions>
        </Card>
        </Grid>
      ))}
      </Grid>
      <Paper elevation={7} />

      <Box sx={{backgroundColor:"black"}} height={70}>
          <Typography variant="h5" sx={{ mt: 2,textAlign:"right",color:"white",margin:"20px 20px 20px 20px"}}>
            Total Price: ${total.toFixed(2)}
          </Typography>
          </Box>
          <Paper />
        </>
      )}
    </Box>

  );
}

export default Carts;
