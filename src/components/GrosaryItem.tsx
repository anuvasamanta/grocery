import { useCart } from '@/context/CartContext';
import {  Typography, Box } from '@mui/material';
import Cards from './Card';

export default function GroceryList() {


  return (
    <Box>
        <Typography sx={{textAlign:"center",fontSize:"20px",fontWeight:600}}>
        Available Items
        </Typography>
      <Cards/>
    </Box>
  );
}