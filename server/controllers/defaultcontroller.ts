import {Request, Response, Router} from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
  res.redirect('/app');
});

export const DefaultController: Router = router;