require('dotenv').config();
const express = require('express');
const { schoolRouter } = require('./routes/schoolRouter');

const app = express();;
app.use(express.json());

app.use('/api/v1/school', schoolRouter);


app.listen(process.env.PORT || 8001, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});