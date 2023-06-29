import React from 'react';
import { render, screen } from '@testing-library/react';
import EpisodeDetails, { GET_EPISODE_DETAILS } from '../../src/components/EpisodeDetails';
import { MockedProvider } from '@apollo/client/testing';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'

const episodeId = '1';

const mockEpisodeData = {
  episode: {
    name: 'Test Episode',
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
  },
};

const mocks = [
  {
    request: {
      query: GET_EPISODE_DETAILS,
      variables: { id: episodeId },
    },
    result: {
      data: mockEpisodeData,
    },
  },
];

const mockParams = {
  id: episodeId,
};

describe('EpisodeDetails', () => {
  it('renders loading state initially', async() => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <EpisodeDetails episodeId={episodeId} />
        </BrowserRouter>
      </MockedProvider>
    );

    expect(await screen.getByRole('progressbar')).toBeVisible();
  });

  it('renders error message if there is an error', async () => {
    const errorMessage = 'Error: Something went wrong.';

    const errorMocks = [
      {
        request: {
          query: GET_EPISODE_DETAILS,
          variables: { id: episodeId },
        },
        error: new Error(errorMessage),
      },
    ];

   render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <BrowserRouter>
          <EpisodeDetails episodeId={episodeId} />
        </BrowserRouter>
      </MockedProvider>
    );

      expect(await screen.findByText(`Error: ${errorMessage}`)).toBeVisible();
  });

  it('renders episode details correctly', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <EpisodeDetails episodeId={episodeId} />
        </BrowserRouter>
      </MockedProvider>
    );

      expect(await screen.findByText('Episode Name: Test Episode')).toBeVisible();
      expect(await screen.findByText('Name: Character 1')).toBeVisible();
      expect(await screen.findByText('Name: Character 2')).toBeVisible();

  });
});