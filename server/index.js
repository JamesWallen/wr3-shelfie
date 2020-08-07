//require all packages needed
require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      ctrl = require('./controller'),
      {SERVER_PORT, CONNECTION_STRING} = process.env,
      app = express();

app.use(express.json());

//massive setup
massive({
    connectionString: CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
})
    .then(db => {
        app.set("db", db);
        console.log("db connected");
    })
    .catch(err => console.log(err));

//endpoints
app.get('/api/inventory', controller.getInventory);
app.get('/api/inventory/:id', controller.getItem);
app.post('/api/inventory', controller.postInventory);
app.delete('/api/inventory/:id', controller.deleteInventory);
app.put('/api/inventory/:id', controller.putInventory);

//server
app.listen(SERVER_PORT, () => console.log('Server running in port ${SERVER_PORT}'));