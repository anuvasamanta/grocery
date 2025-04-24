import { Box, Typography, Link } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: "#fff",
        padding: "20px",
        textAlign: "center",
        bottom: 0,
        width: "100%",
      }}
    >
      <Typography variant="body2">
        &copy; {new Date().getFullYear()} Grocery App
      </Typography>
      <Typography variant="body2">
        <Link href="/" color="inherit">
          About Us
        </Link>{" "}
        |{" "}
        <Link href="/" color="inherit">
          Contact Us
        </Link>{" "}
        |{" "}
        <Link href="/" color="inherit">
          Terms & Conditions
        </Link>
      </Typography>
    </Box>
  );
}
