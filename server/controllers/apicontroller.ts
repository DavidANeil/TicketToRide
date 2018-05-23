
import {Serializable} from '@common/interface/serializable';
import {LoginRequest} from '@common/requests/loginrequest';
import {GameListingIdResponse} from '@common/responses/gamelistingidresponse';
import {Request, Response, Router} from 'express';

import {Player} from '../../common/model/player';
import {LobbyService} from '../services/lobbyservice';
import {LoginService} from '../services/loginservice';
import {WorldService} from '../services/worldservice';

// Assign router to the express.Router() instance
const router: Router = Router();
// TODO: Use the consts from config instead of literal strings

router.put('/login', (req: Request, res: Response) => {
  let request = LoginRequest.deserialize(req.body);
  if (request instanceof LoginRequest) {
    const loginService = new LoginService();
    loginService.loginUser(request.username, request.password)
        .then((key: string) => {
          res.type('application/json').send(key);
        })
        .catch(() => {
          res.sendStatus(401);
        });
  }
});

router.post('/register', (req: Request, res: Response) => {
  let request = LoginRequest.deserialize(req.body);
  if (request instanceof LoginRequest) {
    const loginService = new LoginService();
    loginService.registerUser(request.username, request.password)
        .then((key: string) => {
          res.type('application/json').send(key);
        })
        .catch((err: any) => {
          res.sendStatus(401);
        });
  }
});

router.get('/gamelist', (req: Request, res: Response) => {
  const worldService = new WorldService();
  worldService.getListings().then((listings: Serializable) => {
    res.type('application/json').send(listings.serialize());
  });
});

router.post('/creategame', (req: Request, res: Response) => {
  const worldService = new WorldService();
  worldService.createGame(req.cookies)
      .then((gameId: string) => {
        console.log('gameId: ', gameId);
        res.type('application/json')
            .send(new GameListingIdResponse(gameId).serialize());
      })
      .catch((err: any) => {
        console.log('err: ', err);
        res.sendStatus(401);
      });
});

router.get('/player/:playerid', (req: Request, res: Response) => {
  const lobbyService = new LobbyService();
  lobbyService.getPlayer(req.params.playerid)
      .then((player: Player) => {
        res.type('application/json').send(player.serialize());
      })
      .catch((err: any) => {
        console.log('err: ', err);
        res.sendStatus(404);
      });

});


export const ApiController: Router = router;