import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useCart } from "@/context/CartContext";
import { Box, Grid,  ListItemText } from "@mui/material";
import { groceryItems } from "@/lib/constants";
import GroceryFilter from "./GrosaryFilter";
import SearchBar from "./SearchBar";

export default function Cards() {
  const {  addToCart } = useCart();
//   console.log(groceryItems);
  
  return (
    <Box>
      <SearchBar/>
        <GroceryFilter/>
        <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {groceryItems.map((item) => (
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
              onClick={() => addToCart(item)}
            >
              Add
            </Button>
          </CardActions>
        </Card>
        </Grid>
      ))}
      </Grid>
    </Box>
  );
}
