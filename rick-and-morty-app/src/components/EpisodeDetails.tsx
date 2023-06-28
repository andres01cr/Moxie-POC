import { FC } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { useParams } from "react-router";
import { Character, EpisodeDetailsProps } from '../interfaces/types';
import { makeStyles } from '@mui/styles';
import { CircularProgress, Typography } from '@mui/material';

const useStyles = makeStyles(() => ({
  root: {
    padding: '16px',
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  error: {
    color: 'red',
  },
  episodeName: {
    marginBottom: '16px',
  },
  characterImage: {
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  characterName: {
    marginTop: '8px',
  },
}));

export const GET_EPISODE_DETAILS = gql`
  query GetEpisodeDetails($id: ID!) {
    episode(id: $id) {
      name
      characters {
        id
        name
        image
      }
    }
  }
`;

const EpisodeDetails: FC<EpisodeDetailsProps> = ({ episodeId }) => {
  const classes = useStyles();
  const { id } = useParams() || episodeId;
  const { loading, error, data } = useQuery(GET_EPISODE_DETAILS, {
    variables: { id },
  });

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className={classes.error}>
        Error: {error.message}
      </div>
    );
  }

  const episode = data.episode;

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.episodeName}>
        Episode Name: {episode.name}
      </Typography>
      <Typography variant="h6">Characters:</Typography>
      <ul>
        {episode.characters.map((character: Character) => (
          <li key={character.id}>
            <img
              src={character.image}
              alt={character.name}
              className={classes.characterImage}
            />
            <Typography variant="body1" className={classes.characterName}>
              Name: {character.name}
            </Typography>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EpisodeDetails;