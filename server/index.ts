import 'module-alias/register';

import * as config from '@common/config';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

import {ApiController} from './controllers/apicontroller';
import {AppController} from './controllers/appcontroller';
import {DefaultController} from './controllers/defaultcontroller';
import {ServeController} from './controllers/servecontroller';

const main = function() {
  // Create a new express application instance
  const app: express.Application = express();
  // The port the express app will listen on
  const port: number = 8080;

  app.use(bodyParser.json({
    'strict': false,
    'type': '*/*',
  }));
  app.use(cookieParser());

  // Mount the controllers
  app.use('/serve/', ServeController);
  app.use('/api/', ApiController);
  app.use('/app/', AppController);
  app.use('/', DefaultController);

  // Serve the application at the given port
  app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
  });
};
main();