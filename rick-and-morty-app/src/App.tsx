import { FC } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import CharacterList from './components/CharacterList';
import CharacterDetails from './components/CharacterDetails';
import EpisodeDetails from './components/EpisodeDetails';
import client from './client'

const App: FC = () => {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<CharacterList />} />
          <Route path="/character/:id" element={<CharacterDetails />} />
          <Route path="/episode/:id" element={<EpisodeDetails />} />
        </Routes>
      </Router>
    </ApolloProvider>
  );
};

export default App;