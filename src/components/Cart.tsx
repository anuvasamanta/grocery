
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
  ListItemText,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import React from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  url?: string;
}

interface CartAction {
  type: "ADD" | "REMOVE";
  item: CartItem;
  timestamp: number;
}

const discountRules = [
  { threshold: 100, discountPercentage: 5 },
  { threshold: 200, discountPercentage: 10 },
  { threshold: 500, discountPercentage: 15 },
];

const calculateDiscount = (totalPrice: number): number => {
  const applicableRule = discountRules
    .filter((rule) => totalPrice >= rule.threshold)
    .sort((a, b) => b.threshold - a.threshold)[0];

  return applicableRule ? (totalPrice * applicableRule.discountPercentage) / 100 : 0;
};

function Cart() {
  const { cart, removeFromCart, addToCart, total } = useCart();
  const [actionHistory, setActionHistory] = React.useState<CartAction[]>([]);
  const [openUndo, setOpenUndo] = React.useState(false);
  const [lastAction, setLastAction] = React.useState<CartAction | null>(null);

  const handleRemove = (item: CartItem) => {
    removeFromCart(item.id);
    const action = { type: "REMOVE" as const, item, timestamp: Date.now() };
    setActionHistory([...actionHistory, action]);
    setLastAction(action);
    setOpenUndo(true);
  };

  const handleUndo = () => {
    if (!lastAction) return;
    
    if (lastAction.type === "REMOVE") {
      addToCart(lastAction.item);
    } else if (lastAction.type === "ADD") {
      removeFromCart(lastAction.item.id);
    }
    
    setOpenUndo(false);
    setLastAction(null);
    setActionHistory(actionHistory.slice(0, -1));
  };

  const handleCloseUndo = () => {
    setOpenUndo(false);
  };

  const discount = calculateDiscount(total);
  const totalPriceWithDiscount = total - discount;

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ textAlign: "center", mb: 4 }}>
        Your Cart
      </Typography>

      {cart.length === 0 ? (
        <Typography variant="h5" gutterBottom sx={{ textAlign: "center" }}>
          Your cart is empty
        </Typography>
      ) : (
        <>
          <Grid container spacing={3}>
            {cart.map((item) => (
              <Grid  key={item.id} size={{xs:12,md:4}} sx={{ mt: 4 }}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image={item.url}
                    title={item.name}
                  />
                  <CardContent>
                    <ListItemText
                      primary={item.name}
                      secondary={`$${item.price.toFixed(2)}`}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      color="error"
                      onClick={() => handleRemove(item)}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid size={{xs:12,md:4}} sx={{ mt: 4 }}>
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography>Subtotal:</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Box>
              {discount > 0 && (
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                  <Typography>Discount:</Typography>
                  <Typography color="success.main">-${discount.toFixed(2)}</Typography>
                </Box>
              )}
              <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, pt: 1, borderTop: '1px solid #ddd' }}>
                <Typography variant="subtitle1">Total:</Typography>
                <Typography variant="subtitle1">${totalPriceWithDiscount.toFixed(2)}</Typography>
              </Box>
              <Button variant="contained" color="primary" fullWidth>
                Checkout
              </Button>
            </Card>
          </Grid>
        </>
      )}

      <Snackbar
        open={openUndo}
        autoHideDuration={6000}
        onClose={handleCloseUndo}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="info"
          action={
            <Button color="inherit" size="small" onClick={handleUndo}>
              UNDO
            </Button>
          }
          sx={{ width: '100%' }}
        >
          {lastAction?.type === "REMOVE" ? "Item removed" : "Item added"}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Cart;