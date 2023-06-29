import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { MemoryRouter } from 'react-router-dom';
import CharacterList, { GET_CHARACTERS }  from '../../src/components/CharacterList';
import '@testing-library/jest-dom'

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
      variables: { page: 1 },
    },
    result: {
      data: {
        characters: {
          info: {
            next: 2,
          },
          results: [
            {
              id: 1,
              name: 'Character 1',
              image: 'image1.jpg',
              status: 'Alive',
            },
            {
              id: 2,
              name: 'Character 2',
              image: 'image2.jpg',
              status: 'Dead',
            },
          ],
        },
      },
    },
  },
];

describe('CharacterList', () => {
  it('renders loading state initially', async() => {
    render(
      <MockedProvider mocks={mocks}>
        <CharacterList />
      </MockedProvider>
    );
    // screen.debug();
  expect(await screen.getByRole('progressbar')).toBeVisible()
  });

  it('renders character list after loading', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </MockedProvider>
    );

    
    expect(await screen.findByText('Character 1')).toBeVisible();
    expect(await screen.findByText('Character 2')).toBeVisible();
  });

  it('renders error message on error', async () => {
    const errorMocks = [
      {
        request: {
          query: GET_CHARACTERS,
          variables: { page: 1 },
        },
        error: new Error('GraphQL error'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <MemoryRouter>
          <CharacterList />
        </MemoryRouter>
      </MockedProvider>
    );
    expect(await screen.findByText('Error: GraphQL error')).toBeVisible();

  });
});
