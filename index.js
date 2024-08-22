const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection URL
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        // Connect to MongoDB
        // await client.connect();
        // console.log("connected to MongoDB");

        const animalCollection = client.db('job-task').collection('animals')

        // Get All animal
        app.get("/animals", async (req, res) => {
            const result = await animalCollection.find().toArray()
            res.send(result)
        })

        // Save Animal in database
        app.post("/animals", async (req, res) => {
            const animal = req.body
            const result = await animalCollection.insertOne(animal)
            res.send(result)
        })

    } finally {
    }
}

run().catch(console.dir);


app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})