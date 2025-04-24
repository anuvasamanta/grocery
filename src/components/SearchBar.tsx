
"use client";
import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { groceryItems } from "@/lib/constants";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, ListItemText } from "@mui/material";
import { useCart } from "@/context/CartContext";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));
  export default function SearchBar() {
 const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

  const [searchTerm, setSearchTerm] = React.useState("");
  const filteredItems = groceryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
 const {  addToCart } = useCart();
  return (
    <Box sx={{ flexGrow: 1 }} component="form">
      <Search>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search…"
            />
          </Box>
        </Box>
      </Search>
    
      {searchTerm && (
        <Box sx={{ mt: 2 }}>
          {filteredItems.length > 0  ? (
            groceryItems && groceryItems.map((item) => (
                 <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                  >
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
     </Grid>
            ))
          
          ) : (
            <Box>No items found</Box>
          )}
        </Box>
      )}
    </Box>
  );
}
