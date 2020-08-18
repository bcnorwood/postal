// module imports
import express from 'express';

// create Express server
const app = express();
app.get('/', (req, res) => res.send('bird law'));
app.listen(80);
