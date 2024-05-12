import { MongoClient } from "mongodb";

const connectionString = process.env.DB || "mongodb://localhost:27017";
const client = new MongoClient(connectionString);

let connection;

const connectToMongoDB = async () => {
  try {
    await client.connect();
    connection = client.db("UserDatabase");
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export { connectToMongoDB, connection };
