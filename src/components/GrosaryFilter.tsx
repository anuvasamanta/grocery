import { groceryItems } from "@/lib/constants";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function GroceryFilter() {
  const [sortOrder, setSortOrder] = useState("");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const { addToCart } = useCart();
  const sortedItems = groceryItems.sort((a, b) => {
    if (sortOrder === "asc") return a.price - b.price;
    if (sortOrder === "desc") return b.price - a.price;
    return 0;
  });

  return (
    <div>
      {!showSortOptions && (
        <Button
          onClick={() => setShowSortOptions(true)}
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            border: "1px solid white",
          }}
        >
          Sort by Price
        </Button>
      )}
      {showSortOptions && (
        <div>
          <Button
            onClick={() => {
              setSortOrder("asc");
              setShowSortOptions(false);
            }}
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid white",
            }}
          >
            Low to High
          </Button>
          <Button
            onClick={() => {
              setSortOrder("desc");
              setShowSortOptions(false);
            }}
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid white",
            }}
          >
            High to Low
          </Button>
        </div>
      )}
      {sortOrder && (
        <div>
          <h2>
            Sorted by Price (
            {sortOrder === "asc" ? " Low to High" : " High to Low"})
          </h2>
          <ul>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {sortedItems.map((item) => (
                <Grid
                         key={item?.id}
                         sx={{ marginTop: "20px" }}
                         size={{ xs: 6, md: 4, lg: 3 }}
                       >
                <Card key={item.id}>
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
                </Card>
                </Grid>
              ))}
            </Grid>
          </ul>
        </div>
      )}
    </div>
  );
}
