import { useEffect, useState } from "react";
import { experimentalStyled as styled } from '@mui/material/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import IconButton from '@mui/material/IconButton';

const getTypeColor = (type) => {
    const typeColors = {
      normal: 'gray',
      fire: 'orange',
      water: 'lightblue',
      electric: 'yellow',
      grass: 'lightgreen',
      ice: 'white',
      fighting: 'red',
      poison: 'purple',
      ground: 'brown',
      flying: 'skyblue',
      psychic: 'pink',
      bug: 'green',
      rock: 'brown',
      ghost: 'purple',
      dragon: 'indigo',
      dark: 'darkgray',
      steel: 'silver',
      fairy: 'lightpink',
    };
  
    return typeColors[type] || 'gray';
  };

const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Pokemon = () => {

    const [offset, setOffset] = useState(0)
    const [limit, setLimit] = useState(20);
    const [pokemonData, setPokemonData] = useState([]);

    useEffect(() => {
        getPokemonDetailsData();
      }, [limit, offset]);
      
      async function getPokemonDetailsData() {
        try {
          const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
          const data = await response.json();
      
          const detailsPromises = data.results.map((pokemon) => getPokemonDetails(pokemon.url));
          const detailsData = await Promise.all(detailsPromises);
      
          const newData = data.results.map((pokemon, index) => ({ ...pokemon, details: detailsData[index] }));
      
          setPokemonData(newData);
        } catch (error) {
          console.error("Error fetching data: ", error);
        }
      }
      
      async function getPokemonDetails(url) {
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error getting Pokemon details: ", error);
          return null;
        }
      }

    const handleLeftClick = () => {
        setOffset((previousOffset) => Math.max(0, previousOffset - limit));
        console.log(offset)
    };
    
    const handleRightClick = () => {
        setOffset((previousOffset) => previousOffset + limit);
        console.log(offset)
    };


    return (
      <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {pokemonData.map((pokemon, index) => (
                  <Grid item xs={2} sm={4} md={3} key={index}>
                  {pokemon.details && (
                    <Item
                      display="flex"
                      justifyContent="space-between"
                      sx={{
                        backgroundColor: getTypeColor(pokemon.details.types[0].type.name),
                        fontSize: "16px"
                      }}
                    >
                      <div>
                        <div>ID: {pokemon.details.id}</div>
                        <div>Name: {pokemon.name} </div>
                      </div>
                      <div>
                        <img src={pokemon.details.sprites.front_default} alt={pokemon.name} />
                      </div>
                    </Item>
                  )}
                </Grid>
              ))}
          </Grid>
            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <IconButton onClick={handleLeftClick}>
                    <img src='leftarrow.png' alt="Left Arrow" style={{ width: '60px', height: '50px' }} />
                </IconButton>
                <IconButton onClick={handleRightClick}>
                    <img src='rightarrow.png' alt="Right Arrow" style={{ width: '60px', height: '50px' }} />
                </IconButton>
            </Box>
      </Box>
  );
}

export default Pokemon;