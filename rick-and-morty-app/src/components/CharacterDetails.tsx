import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams } from 'react-router';
import { styled } from '@mui/system';
import { Typography, CircularProgress, List, ListItem, ListItemText, Avatar } from '@mui/material';
import { Character, Episode, CharacterDetailsProps } from '../interfaces/types';

const LoadingWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  margin: '2rem',
});

const ErrorMessage = styled('div')({
  margin: '2rem',
  color: 'red',
});

const CharacterImage = styled('img')({
  width: '200px',
  height: '200px',
  marginBottom: '2rem',
});

const EpisodeName = styled(Typography)({
  fontWeight: 'bold',
  marginTop: '2rem',
});

const CharacterList = styled(List)({
  marginLeft: '2rem',
});

const CharacterAvatar = styled(Avatar)({
  width: '50px',
  height: '50px',
  marginRight: '1rem',
});

export const GET_CHARACTER_DETAILS = gql`
  query GetCharacterDetails($id: ID!) {
    character(id: $id) {
      name
      image
      episode {
        id
        name
        characters {
          id
          name
          image
        }
      }
    }
  }
`;

const CharacterDetails: React.FC<CharacterDetailsProps> = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
    variables: { id },
  });

  if (loading) {
    return (
      <LoadingWrapper>
        <CircularProgress />
        <Typography variant="body1" sx={{ mt: 2 }}>
          Loading...
        </Typography>
      </LoadingWrapper>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        <Typography variant="body1">
          Error: {error.message}
        </Typography>
      </ErrorMessage>
    );
  }

  const character = data.character;

  return (
    <div>
      <CharacterImage src={character.image} alt={character.name} />
      <Typography variant="body1">Name: {character.name}</Typography>
      <Typography variant="body1">Episodes:</Typography>
      <List>
        {character.episode.map((episode: Episode) => (
          <ListItem key={episode.id}>
            <EpisodeName variant="body1">
              {episode.name}
            </EpisodeName>
            <CharacterList>
              {episode.characters.map((character: Character) => (
                <ListItem key={character.id}>
                  <CharacterAvatar src={character.image} alt={character.name} />
                  <ListItemText primary={`Name: ${character.name}`} />
                </ListItem>
              ))}
            </CharacterList>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CharacterDetails;