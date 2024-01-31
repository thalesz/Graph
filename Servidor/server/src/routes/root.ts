import express, { Router, Request, Response } from 'express';
import path from 'path';

const router: Router = express.Router();

router.get('^/$|/index(.html)?', (req: Request, res: Response) => {
  return console.log('Rota raiz acessada. Exibindo mensagem no console.');
  //res.send('Rota acessada. Verifique o console para a mensagem.');
});

module.exports = router;