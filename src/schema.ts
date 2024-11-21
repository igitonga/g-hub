export const typeDefs = `#graphql 
    type Game {
        id: ID!
        title: String!
        platform: [String!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        rating: Int!
        content: String!
        game_id: String!
        author_id: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
        reviews: [Review]
        review(id: ID!): Review
    }
    type Mutation {
        addGame(game: AddGameInput): Game
        deleteGame(id: ID!): Game
        updateGame(id: ID!, game: UpdateGameInput): Game

        addAuthor(author: AddAuthorInput): Author

        addReview(review: AddReviewInput): Review
    }
    input AddGameInput {
        title: String!
        platform: [String!]!
    }
    input UpdateGameInput {
        title: String
        platform: [String!]
    }
    input AddAuthorInput {
        name: String!
        verified: Boolean!
    }
    input AddReviewInput {
        rating: Int!
        content: String
        game_id: String!
        author_id: String!
    }
`