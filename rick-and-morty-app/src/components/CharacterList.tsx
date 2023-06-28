import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { Link } from 'react-router-dom';
import { Typography, CircularProgress, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Character } from '../interfaces/types';

const useStyles = makeStyles(() => ({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  errorContainer: {
    color: 'red',
    textAlign: 'center',
    padding: '16px',
  },
  characterListItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #ddd',
    '&:hover': {
      backgroundColor: '#ddd',
    },
  },
  characterAvatar: {
    marginRight: '16px',
  },
}));

const GET_CHARACTERS = gql`
  query GetCharacters {
    characters {
      results {
        id
        name
        image
        status
      }
    }
  }
`;

const CharacterList: React.FC = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CHARACTERS);

  if (loading) {
    return (
      <Box className={classes.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" className={classes.errorContainer}>
        Error: {error.message}
      </Typography>
    );
  }

  return (
    <List>
      {data?.characters.results.map((character: Character) => (
        <ListItem key={character.id} component={Link} to={`/character/${character.id}`} className={classes.characterListItem}>
          <ListItemAvatar>
            <Avatar className={classes.characterAvatar} alt={character.name} src={character.image} />
          </ListItemAvatar>
          <ListItemText
            primary={character.name}
            secondary={`Status: ${character.status}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default CharacterList;
