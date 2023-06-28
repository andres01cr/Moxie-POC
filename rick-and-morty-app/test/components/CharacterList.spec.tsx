import React from 'react';
import { render, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import  { GET_CHARACTERS, CharacterList } from '../../src/components/CharacterList';

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
              id: '1',
              name: 'Character 1',
              image: 'image-url-1',
              status: 'Alive',
            },
            {
              id: '2',
              name: 'Character 2',
              image: 'image-url-2',
              status: 'Dead',
            },
          ],
        },
      },
    },
  },
];

describe('CharacterList', () => {
  it('renders loading spinner when loading', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders error message when there is an error', async () => {
    const errorMock = {
      request: {
        query: GET_CHARACTERS,
        variables: { page: 1 },
      },
      error: new Error('Error occurred'),
    };

    render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    const errorMessage = await screen.findByText('Error: Error occurred');
    expect(errorMessage).toBeInTheDocument();
  });

  it('renders character list when data is loaded', async () => {
    renderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    const character1Name = await screen.findByText('Character 1');
    const character2Name = await screen.findByText('Character 2');

    expect(character1Name).toBeInTheDocument();
    expect(character2Name).toBeInTheDocument();
  });
});