import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography } from '@mui/material';
import store from './store/store';
import TaskForm from './components/tasks/TaskForm';
import TaskList from './components/tasks/TaskList';
import CategoryForm from './components/categories/CategoryForm';

// Updated Material-UI Theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#0288d1', // A vibrant blue for primary actions
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f50057', // A bold pink for secondary actions
    },
    background: {
      default: '#fafafa', // Light gray background
      paper: '#ffffff', // White cards
    },
    text: {
      primary: '#212121', // Darker text for readability
      secondary: '#757575', // Softer gray for secondary text
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif', // Modern font
    h4: { fontWeight: 700 },
    h6: { fontWeight: 600 },
    body1: { fontSize: '1rem' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Softer, modern corners
          boxShadow: '0 6px 12px rgba(0,0,0,0.08)', // Subtle shadow
          transition: 'transform 0.2s ease-in-out',
          '&:hover': { transform: 'translateY(-4px)' }, // Hover lift effect
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8, // Rounded buttons
          textTransform: 'none', // No uppercase
          padding: '8px 16px',
        },
        contained: {
          boxShadow: 'none', // Flat design
          '&:hover': { boxShadow: '0 4px 8px rgba(0,0,0,0.1)' },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8, // Rounded inputs
          },
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Container maxWidth="lg">
          <Box sx={{ py: 4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Typography
              variant="h4"
              component="h1"
              align="center"
              sx={{ fontWeight: 700, color: 'primary.main' }}
            >
              Task Manager
            </Typography>
            <CategoryForm />
            <TaskForm />
            <TaskList />
          </Box>
        </Container>
      </Provider>
    </ThemeProvider>
  );
};

export default App;