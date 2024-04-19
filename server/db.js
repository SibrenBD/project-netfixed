import { MongoClient } from "mongodb";
const connectionString = process.env.DB || "";
const client = new MongoClient(connectionString);
let connection;
try {
    connection = await client.connect();
} catch (e) {
    console.error(e);
}
let db = connection.db("<databas-name>");
export default db;
