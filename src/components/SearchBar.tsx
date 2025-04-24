
"use client";
import { useState, FormEvent } from 'react';
import { 
  TextField,
  List,
  ListItem,
  ListItemText,
  InputAdornment,
  Box,
  ListItemAvatar,
  Avatar,
  CardContent,
  CardActions,
  Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Swal from 'sweetalert2';
import { groceryItems } from '@/lib/constants';
import { useCart } from '@/context/CartContext';




const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const {  addToCart } = useCart();
  const filteredItems = groceryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const term = searchQuery.trim();
    
    if (!term) {
      setSearchTerm('');
      Swal.fire({
        icon: 'warning',
        title: 'Empty Search',
        text: 'Please enter a search term',
      });
      return;
    }

    const results = groceryItems.filter(item => 
      item.name.toLowerCase().includes(term.toLowerCase())
    );

    if (results.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Item Not Found',
      });
      setSearchTerm('');
    } else {
      setSearchTerm(term);
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}
    >
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search grocery items..."
        value={searchQuery}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
        aria-label="Search grocery items"
      />

      {searchTerm && (
        <List sx={{ 
          bgcolor: 'background.paper',
          boxShadow: 1,
          borderRadius: 2,
          maxHeight: 300,
          overflow: 'auto',
        }}>
          {filteredItems.map((item, index) => (
            <ListItem key={index} divider>
              <ListItemAvatar>
                <Avatar alt={item.name} src={item.url} />
              </ListItemAvatar>
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
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default SearchBar;