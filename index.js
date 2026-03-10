// stock market portfolio

const express = require('express');
const app = express();
const { Pool } = require('pg');
// const { engine } = require ('express-handlebars');
// const path = require('path');

//const PORT = process.env.PORT || 5000;

// Set Handlebars Middleware
// app.engine('handlebars',engine());
// app.set('view engine', 'handlebars');

// const otherstuff = "hello this is otherstuff!";


// Set Handlebars Routes
// app.get('/', function (req, res) {
//     res.render('home', {
//     	stuff: otherstuff
//     });
// });
// create about page routes
// app.get('/about.html', function (req, res) {
//     res.render('about');
// });

// set static folder
//app.use(express.static(path.join(__dirname, 'public')));


app.get('/',(req,res)=>{
    res.send("Hello from server")
});




const pool = new Pool({
  user: 'postgres',
  host: 'localhost', // Change if using a remote database
  database: 'stock',
  password: 'mujahith19',
  port: 5432, // Default PostgreSQL port
});

pool.connect()
  .then(() => console.log('Connected to PostgreSQL ✅'))
  .catch(err => console.error('Connection error ❌', err.stack));


  app.get('/getstocknames', async (req, res) => {
    try {
        const query = 'SELECT name FROM stock_table';
        const result = await pool.query(query); // Wait for the query to finish

        console.log(result.rows); // Log fetched data
        res.json(result.rows); // Send data as JSON response
    } catch (error) {
        console.error('Error fetching stock names:', error);
        res.status(500).send("Error fetching stock names");
    }
});


app.listen(4001, () => console.log('Server Listening on port 4001'))

