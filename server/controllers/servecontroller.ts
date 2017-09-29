
// Import only what we need from express
import {Request, Response, Router} from 'express';

// Assign router to the express.Router() instance
const router: Router = Router();

router.get('/:filename', (req: Request, res: Response) => {
  let options: {[key: string]: string} = {
    dotfiles: 'deny',
  };
  let fileName: string = req.params['filename'];
  console.log('requesting', fileName);

  if (fileName.endsWith('.html')) {
    // serve html files directly from source directory
    options.root = __dirname + '/../../client';
  } else {
    options.root = __dirname + '/../../target';
  }

  res.sendFile(fileName, options, () => {
    console.log('Served: ', fileName);
  });
});


export const ServeController: Router = router;