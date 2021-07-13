const express = require('express');
const path = require('path');
let app = express();

//middleware logger
app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
})

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.send('Hello from the web server side...');
});

app.get('/order/:id', (req, res) => {
    let id = req.params.id;
    let email = req.query.email;
    res.send(`your id is ${id} and your email is ${email}`);
})


app.listen(3000);

