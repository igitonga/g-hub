import { gql } from "@apollo/client";

export const LIST_GAMES = gql`
  query GetGames {
    games {
      id,
      title,
      description,
      imageUrl
      reviews {
        rating
      }
    }
  }
`;

export const ADD_GAME = gql`
    mutation AddGame($game: AddGameInput!) {
        addGame(game: $game) {
            title,
            platform
        }
    }
`;

export const GET_GAME = gql`
  query GetGame($gameId: ID!) {
    game(id: $gameId) {
      title,
      platform,
      description,
      imageUrl
    }
  }
`