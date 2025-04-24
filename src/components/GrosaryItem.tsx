
import {  Typography, Box } from '@mui/material';
import Cards from './Card';

export default function GroceryList() {


  return (
    <Box>
        <Typography sx={{textAlign:"center",fontSize:"30px",fontWeight:600}}>
        Available Items
        </Typography>
      <Cards/>
    </Box>
  );
}