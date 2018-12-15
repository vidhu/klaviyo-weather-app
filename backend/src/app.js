import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', (req, res) => {
  res.json('hello world!');
});

app.use(express.static(path.resolve(__dirname, '../', 'static')));


console.log('Listening on port 5000');
app.listen(5000);
