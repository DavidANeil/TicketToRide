
import {LoginRequest} from '@common/requests/loginrequest';
import {Request, Response, Router} from 'express';
import {LoginService} from '../services/loginservice';

// Assign router to the express.Router() instance
const router: Router = Router();

router.put('/login', (req: Request, res: Response) => {
  let request = LoginRequest.deserialize(req.body);
  if (request instanceof LoginRequest) {
    const loginService = new LoginService();
    const result = loginService.loginUser(request.username, request.password);
    if (result) {
      res.type('application/json').send(result);
    } else {
      res.status(401);
    }
  }
});


export const ApiController: Router = router;