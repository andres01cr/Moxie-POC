import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CharacterDetails, { GET_CHARACTER_DETAILS } from '../../src/components/CharacterDetails';
import '@testing-library/jest-dom'
// Mocked data for the GraphQL query
const mockCharacterData = {
  id: '1',
  name: 'Character 1',
  image: 'character1.jpg',
  episode: [
    {
      id: '1',
      name: 'Episode 1',
      characters: [
        { id: '1', name: 'Character 1', image: 'character1.jpg' },
        { id: '2', name: 'Character 2', image: 'character2.jpg' },
      ],
    },
  ],
};

// Mock the Apollo query response
const mocks = [
  {
    request: {
      query: GET_CHARACTER_DETAILS,
      variables: { id: '1' },
    },
    result: { data: { character: mockCharacterData } },
  },
];

describe('CharacterDetails', () => {
  it('renders loading state initially', async() => {
    render(
      <MockedProvider mocks={mocks}>
        <CharacterDetails characterId="1" />
      </MockedProvider>
    );

    expect(await screen.findByText('Loading...')).toBeVisible();
  });

  it('renders error state if query fails', async () => {
    const errorMessage = 'Error occurred';

    render(
      <MockedProvider mocks={[{ ...mocks[0], error: new Error(errorMessage) }]}>
        <CharacterDetails characterId="1" />
      </MockedProvider>
    );


      expect(await screen.findByText(`Error: ${errorMessage}`)).toBeVisible()
  });

  it('renders character details and episodes', async () => {
    render(
      <MockedProvider mocks={mocks}>
        <MemoryRouter initialEntries={['/character/1']}>
        <Routes>
          <Route path="/character/:id" element={<CharacterDetails />} />
        </Routes>
        </MemoryRouter>
      </MockedProvider>
    );

      expect(await screen.findByText('Name: Character 1')).toBeVisible();
      expect(await screen.findByText('Episodes:')).toBeVisible();
      expect(await screen.findByText('Episode 1 Episode # 1')).toBeVisible();
      expect(await screen.findByText('Name: Character 1, id 1')).toBeVisible();
      expect(await screen.findByText('Name: Character 2, id 2')).toBeVisible();
  });
});