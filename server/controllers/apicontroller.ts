
// Import only what we need from express
import {Request, Response, Router} from 'express';

// Assign router to the express.Router() instance
const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  var options = {
    root: __dirname + '../../target',
    dotfiles: 'deny',
  };

  var fileName = req.params['filename'];
  res.sendFile(fileName, options, () => {
    console.log('Served: ', fileName);
  });
});


export const ApiController: Router = router;