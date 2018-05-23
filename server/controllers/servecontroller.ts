import * as express from 'express';
import {Request, Response, Router} from 'express';

const router: Router = Router();

router.use(express.static(__dirname + '/../../target'));
router.use(express.static(__dirname + '/../../client'));



export const ServeController: Router = router;