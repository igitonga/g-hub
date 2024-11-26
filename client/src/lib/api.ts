import { gql } from "@apollo/client";

export const LIST_GAMES = gql`
  query GetGames {
    games {
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