import React from 'react';
import { render, waitFor, act, screen} from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route } from 'react-router-dom';
import EpisodeDetails, { GET_EPISODE_DETAILS } from '../../src/components/EpisodeDetails';

const mockEpisode = {
  id: '1',
  name: 'Episode 1',
  characters: [
    {
      id: '1',
      name: 'Character 1',
      image: 'character1.jpg',
    },
    {
      id: '2',
      name: 'Character 2',
      image: 'character2.jpg',
    },
  ],
};

const mocks = [
  {
    request: {
      query: GET_EPISODE_DETAILS,
      variables: { id: '1' },
    },
    result: {
      data: {
        episode: mockEpisode,
      },
    },
  },
];


// jest.mock(
//   '../../src/components/EpisodeDetails',
//   () => (props: Record<string, any>) => {
//       return (
//           <div>
//               <div>Action Dialog</div>
//               <button onClick={props.onClose}>close dialog</button>
//               <button onClick={props.onSave}>save</button>
//           </div>
//       );
//   }
// );

describe('EpisodeDetails', () => {
  it('renders loading state initially', async () => {
 
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EpisodeDetails />
      </MockedProvider>
    );
    expect(getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {});
  });

  it('renders episode details after data is fetched', async () => {
    const { getByText, getByAltText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter initialEntries={['/episodes/1']}>
          <Route path="/episodes/:id">
            <EpisodeDetails />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );

    await act(async () => {
      await waitFor(() => {});
    });

    expect(getByText('Episode Name: Episode 1')).toBeInTheDocument();
    expect(getByText('Characters:')).toBeInTheDocument();
    expect(getByAltText('Character 1')).toBeInTheDocument();
    expect(getByAltText('Character 2')).toBeInTheDocument();
    expect(getByText('Name: Character 1')).toBeInTheDocument();
    expect(getByText('Name: Character 2')).toBeInTheDocument();
  });

  it('renders error message if there is an error', async () => {
    const errorMock = {
      request: {
        query: GET_EPISODE_DETAILS,
        variables: { id: '1' },
      },
      error: new Error('An error occurred'),
    };

    const { getByText } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <MemoryRouter initialEntries={['/episodes/1']}>
          <Route path="/episodes/:id">
            <EpisodeDetails />
          </Route>
        </MemoryRouter>
      </MockedProvider>
    );

    await act(async () => {
      await waitFor(() => {});
    });

    expect(getByText('Error: An error occurred')).toBeInTheDocument();
  });
});
