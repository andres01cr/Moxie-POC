import React from 'react';
import { render, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/react-testing';
import CharacterList, { GET_CHARACTERS } from './CharacterList';

const mocks = [
  {
    request: {
      query: GET_CHARACTERS,
    },
    result: {
      data: {
        characters: {
          results: [
            {
              id: '1',
              name: 'Character 1',
              image: 'image-url-1',
              status: 'Status 1',
            },
            {
              id: '2',
              name: 'Character 2',
              image: 'image-url-2',
              status: 'Status 2',
            },
          ],
        },
      },
    },
  },
];

describe('CharacterList', () => {
  it('renders loading state', () => {
    const { getByText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('renders error state', async () => {
    const errorMock = {
      request: {
        query: GET_CHARACTERS,
      },
      error: new Error('GraphQL error'),
    };

    const { getByText } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(getByText('Error: GraphQL error')).toBeInTheDocument();
  });

  it('renders character list', async () => {
    const { getByText, getByAltText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    );

    await act(() => new Promise((resolve) => setTimeout(resolve, 0)));

    expect(getByText('Character 1')).toBeInTheDocument();
    expect(getByAltText('Character 1')).toBeInTheDocument();
    expect(getByText('Status: Status 1')).toBeInTheDocument();

    expect(getByText('Character 2')).toBeInTheDocument();
    expect(getByAltText('Character 2')).toBeInTheDocument();
    expect(getByText('Status: Status 2')).toBeInTheDocument();
  });
});
