import { Badge, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "@/context/CartContext";
export default function CartIcon() {
  const { itemCount, totalQuantity } = useCart();
  
  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Badge badgeContent={itemCount} color="secondary">
        <Badge badgeContent={totalQuantity} color="primary">
          <ShoppingCartIcon fontSize="large" />
        </Badge>
      </Badge>
      </Box>
  );
}