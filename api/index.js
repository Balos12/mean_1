const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { mongoose } = require('./server')
const bodyParser = require('body-parser');
const port = 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const todoAppCollection = mongoose.connection.collection('todoAppCollection');

app.get('/api/todoapp/GetTodos', async (req, res) => {
    try {
        const documents = await todoAppCollection.find().toArray();

        res.json(documents)
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
})

app.get('/api/todoapp/GetTodos/:id', async (req, res) => {
    try {
        const document = await todoAppCollection.findOne({id: req.params.id});

        res.json(document)
    } catch (error) {
        res.status(500).json({error: 'Internal server error'})
    }
})

app.post('/api/todoapp/AddTodos', multer().none(), async (req,res) => {
    try {
        const numOfDocs = await todoAppCollection.countDocuments({});

        await todoAppCollection.insertOne({
            id: Math.random().toString(),
            description: req.body.description
        });
        res.json('Added Successfully')
    } catch (error) {
        res.status(500).json({error: error.message})
    }
});

app.patch('/api/todoapp/UpdateTodos/:id', async (req, res) => {
    await todoAppCollection.updateOne(
    {
        id: req.params.id
    }, 
    {
        $set: 
        {
            description: req.body.description
        }
    });
})

app.delete('/api/todoapp/DeleteTodos/:id', async (req,res) => {
    await todoAppCollection.deleteOne({
        id: req.params.id
    });
    res.json("Delete Successfully")
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})