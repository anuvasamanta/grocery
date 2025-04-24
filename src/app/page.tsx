'use client'
import { Container, Typography } from "@mui/material";
import Header from "../../layout/header/Header";
import GroceryList from "@/components/GrosaryItem";
import Footer from "../../layout/footer/footer";

export default function Home() {
  return (
    <div>
       <Header/>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
        </Typography>
        <GroceryList />
      </Container>
      <Footer/>
    </div>
  );
}
