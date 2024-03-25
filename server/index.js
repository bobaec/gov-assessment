const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(express.json());
app.use(express.text());
app.use(cors());

// routes
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/admin'));
app.use('/paints', require('./routes/paints'));

app.listen(5000, () => {
    console.log('server is running on server 5000');
})