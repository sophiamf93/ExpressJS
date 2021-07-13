const express = require('express');
const path = require('path');
const fs = require('fs');
let app = express();

app.use(express.urlencoded({ extended: false }));

app.post('/contact', (req, res) => {
    const newMessage = {
        email: req.body.email,
        message: req.body.message
    }

    fs.readFile('contact.json', (err, data) => {
        const messageArr = JSON.parse(data);

        messageArr.push(newMessage);

        fs.writeFile('contact.json', JSON.stringify(messageArr), (err) => {
            if (err) console.log(err)
        });

    })


    res.redirect('/formsubmissions');
});

app.get("/formsubmissions", (req, res) => {
    fs.readFile('contact.json', (err, data) => {
        res.send(JSON.parse(data));
    });
})


//middleware logger
app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});


app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', (req, res) => {
//     res.send('Hello from the web server side...');
// });

// app.get('/order/:id', (req, res) => {
//     let id = req.params.id;
//     let email = req.query.email;
//     res.send(`your id is ${id} and your email is ${email}`);
// })


app.listen(3000);

