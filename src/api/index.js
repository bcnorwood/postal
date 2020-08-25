// node imports
import { isNullOrUndefined } from 'util';

// module imports
import express from 'express';
import busboy from 'express-busboy';

// local imports
import { init as initData } from './data';
import routes from './routes/*.js';

// initialize data store
initData();

// start Express server
const app = express();

// extend with busboy to handle file uploads
busboy.extend(app, { upload: true });

// bind routes, handling errors and returning 500
Object.values(routes).forEach(({ route, method, handler }) => {
	app[method](route, (request, response) => handler(request, response).then(
		// success - pass result to front end (if necessary)
		(result) => isNullOrUndefined(result) || response.json(result),

		// failure - return 500 and pass error details to front end
		({ code, message, stack }) => response.status(500).json({ code, message, stack })
	));
});

// and we're off!
app.listen(80);
