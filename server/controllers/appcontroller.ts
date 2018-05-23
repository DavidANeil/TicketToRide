import {Request, Response, Router} from 'express';

// Assign router to the express.Router() instance
const router: Router = Router();

router.use((req: Request, res: Response) => {
  var options = {
    root: __dirname + '/../../client',
    dotfiles: 'deny',
  };

  res.sendFile('index.html', options);
});


export const AppController: Router = router;