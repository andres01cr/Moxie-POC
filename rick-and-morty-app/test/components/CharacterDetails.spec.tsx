import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import { useParams } from 'react-router';
import CharacterDetails, { GET_CHARACTER_DETAILS } from '../../src/components/CharacterDetails';

const characterId = '1';
const characterMock = {
  id: characterId,
  name: 'Test Character',
  image: 'test-image.jpg',
  episode: [
    {
      id: 'episode1',
      name: 'Episode 1',
      characters: [
        {
          id: 'character1',
          name: 'Character 1',
          image: 'character1-image.jpg',
        },
        {
          id: 'character2',
          name: 'Character 2',
          image: 'character2-image.jpg',
        },
      ],
    },
    {
      id: 'episode2',
      name: 'Episode 2',
      characters: [
        {
          id: 'character3',
          name: 'Character 3',
          image: 'character3-image.jpg',
        },
      ],
    },
  ],
};

const mocks = [
  {
    request: {
      query: GET_CHARACTER_DETAILS,
      variables: { id: characterId },
    },
    result: {
      data: {
        character: characterMock,
      },
    },
  },
];

jest.mock('react-router', () => ({
  useParams: jest.fn().mockReturnValue({ id: characterId }),
}));

describe('CharacterDetails', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading state initially', () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterDetails />
      </MockedProvider>
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render character details', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterDetails />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByAltText('Test Character')).toBeInTheDocument();
    //   expect(screen.getByText('Name: Test Character')).toBeInTheDocument();
    //   expect(screen.getByText('Episodes:')).toBeInTheDocument();
    //   expect(screen.getByText('Episode 1')).toBeInTheDocument();
    //   expect(screen.getByText('Episode 2')).toBeInTheDocument();
    //   expect(screen.getByText('Characters:')).toBeInTheDocument();
    //   expect(screen.getByAltText('Character 1')).toBeInTheDocument();
    //   expect(screen.getByText('Name: Character 1')).toBeInTheDocument();
    //   expect(screen.getByAltText('Character 2')).toBeInTheDocument();
    //   expect(screen.getByText('Name: Character 2')).toBeInTheDocument();
    //   expect(screen.getByAltText('Character 3')).toBeInTheDocument();
    //   expect(screen.getByText('Name: Character 3')).toBeInTheDocument();
    });
  });

  it('should render error state', async () => {
    const errorMessage = 'GraphQL error';
    const errorMocks = [
      {
        request: {
          query: GET_CHARACTER_DETAILS,
          variables: { id: characterId },
        },
        error: new Error(errorMessage),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <CharacterDetails />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });
});