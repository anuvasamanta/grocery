"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Badge, { badgeClasses } from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useCart } from '@/context/CartContext';
const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;
export default function CartIcon() {
  const {getTotalItem}=useCart();;
  return (
    <IconButton sx={{ mr: 7,color:'black' }}>
      <ShoppingCartIcon fontSize="medium" />
      <CartBadge badgeContent={getTotalItem()} color="primary" overlap="circular" />
    </IconButton>
    
  );
}