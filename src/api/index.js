// built-in imports
import { isString } from 'util';

// module imports
import express from 'express';
import busboy from 'express-busboy';

// local imports
import routes from './routes/*.js';

// start Express server
const app = express();

// extend with busboy to handle file uploads
busboy.extend(app, { upload: true });

// bind routes, handling errors and returning 500
Object.values(routes).forEach(({ route, method, handler }) => {
	app[method](route, (request, response) => handler(request, response).then(
		(result) => response[isString(result) ? 'send' : 'json'](result),
		(error) => response.status(500).json({ code: error.code, message: error.message, stack: error.stack })
	));
});

// and we're off!
app.listen(80);
