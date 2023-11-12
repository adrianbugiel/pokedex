import {Box, IconButton} from "@mui/material";
import { Link } from 'react-router-dom';

const Topbar = () => {
    return (
      <Box display="flex" justifyContent="space-around" alignItems="center" padding={2} sx={{ backgroundColor: 'whitek' }}>

          <Link to="/" style={{ textDecoration: 'none', color: 'black', fontSize: '60px'}}>
            <Box display="flex" alignItems="center" padding={2}>
              <img src='./home.png' alt="Logo" width='300' />
            </Box>
          </Link>
  
          <Link to="/pokemon">
            <Box display="flex" alignItems="center" padding={2}>
              <img src='./pokemonlogo.png' alt="Logo" width='300' />
            </Box>
          </Link>
  
          <Link to="/about" style={{ textDecoration: 'none', color: 'black', fontSize: '60px' }}>
            <Box display="flex" alignItems="center" padding={2}>
              <img src='./about.png' alt="Logo" width='300' />
            </Box>
          </Link>
      </Box>
    );
  };
  
  export default Topbar;