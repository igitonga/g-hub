import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";
import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { typeDefs } from "./schema";

let db = null;
try {
    await client.connect();
    console.log('Connected to database');

    db = client.db(process.env.DB_NAME);
} catch (error) {
    console.error(`Database connection error: ${error}`);
}

let gamesCollection: any;
let authorsCollection: any;
let reviewsCollection: any;

if(db !== null){
    gamesCollection = db.collection('games');
    authorsCollection = db.collection('authors');
    reviewsCollection = db.collection('reviews');
}

const resolvers = {
    Query: {
        async games() { 
            const allGames = await gamesCollection.find({}).toArray();

            return allGames;
        },
        async game(_: unknown, args: any) {
            const game = await gamesCollection.findOne({ _id: new ObjectId(args.id) }); 
            
            return game;
        },
        async authors() {
            const allAuthors = await authorsCollection.find({}).toArray();

            return allAuthors;
        },
        async author(_: unknown, args: any) {
            const author = await authorsCollection.findOne({ _id: new ObjectId(args.id) }); 

            return author;
        },
        async reviews() {
            const allReviews = await reviewsCollection.find({}).toArray();

            return allReviews;
        },
        async review(_: unknown, args: any) {
            const review = await reviewsCollection.findOne({ _id: new ObjectId(args.id) }); 

            return review;
        }
    },
    Game: {
        id: (parent: any) => parent._id.toString(),
        reviews(parent: any) {
            return reviewsCollection.find({game_id: parent._id.toString()}).toArray();
        }
    },
    Author: {
        reviews(parent: any) {
            return reviewsCollection.find({author_id: parent._id.toString()}).toArray();
        }
    },
    Review : {
        author(parent: any) {
            return authorsCollection.findOne({_id: new ObjectId(parent.author_id)});
        },
        game(parent: any) {
            return gamesCollection.findOne({_id: new ObjectId(parent.game_id)});
        }
    },
    Mutation: {
        async addGame(_: unknown, args: any) {
            let newGame = {...args.game};
            await gamesCollection.insertOne(newGame);

            return newGame;
        },
        async deleteGame(_: unknown, args: any) {
            let deleteGame = await gamesCollection.deleteOne({_id: new ObjectId(args.id)});

            return deleteGame;
        },
        async updateGame(_: unknown, args: any) {
            let game = await gamesCollection.updateOne({_id: new ObjectId(args.id)},{$set: {...args.game}});

            return game;
        },

        async addAuthor(_: unknown, args: any) {
            let newAuthor = {...args.author}
            await authorsCollection.insertOne(newAuthor);

            return newAuthor;
        },
        async updateAuthor(_: unknown, args: any) {
            let author = await authorsCollection.updateOne({_id: new ObjectId(args.id)}, {$set: {...args.author}});

            return author;
        },
        async deleteAuthor(_: unknown, args: any) {
            let author = await authorsCollection.deleteOne({_id: new ObjectId(args.id)})

            return author;
        },

        async addReview(_: unknown, args: any) {
            let newReview = {...args.review};
            await reviewsCollection.insertOne(newReview);

            return newReview;
        },
        async updateReview(_: unknown, args: any) {
            let review = await reviewsCollection.updateOne({_id: new ObjectId(args.id)}, {$set: {...args.review}});

            return review;
        },
        async deleteReview(_: unknown, args: any) {
            let review = await reviewsCollection.deleteOne({_id: new ObjectId(args.id)})

            return review;
        },        
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
    context: async req => ({ req }),
});

export default handler;
