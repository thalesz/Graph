import express from 'express';
import cors from 'cors';
import corsOptions from './config/corsOptions';
import dotenv from 'dotenv';
import verifyJWT from './middleware/verifyJWT';
//importe mongoose
const mongoose = require('mongoose');
import connectDb from './config/dbConn';
import { credentials } from './middleware/credentials';
const logMiddleware = require('./middleware/logEvents')
const cookieParser = require('cookie-parser')


// import { userRoutes } from './routes/userRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3500;

const path = require('path');


connectDb()
app.use(credentials)
//app.use(logger);
app.use((req, res, next) => {
    logMiddleware.logger(req, res, next);
});

// Usa o corsOption
app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const clientDir = path.join(__dirname, '../../../Cliente/src');


app.use(cookieParser());

app.use('/', express.static(path.join(__dirname,'/public')))

// app.get('/login', (req, res) => {
//   res.sendFile(path.join(clientDir, 'index.tsx'));
// });

//implementar rotas
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'))
app.use('/auth', require('./routes/auth'))
app.use('/refresh', require('./routes/refresh'))
app.use('/logout', require('./routes/logout'))

app.use(verifyJWT);
app.use('/users', require('./routes/api/users'));
app.use('/turmas', require('./routes/api/turmas'));
app.use('/disciplinas',require('./routes/api/disciplinas'))
app.use('/simulados', require('./routes/api/simulados'))
app.use('/mediaPondGrupo', require('./routes/api/mediaPondGrupo'));
app.use('/duvidaQuestaoAluno', require('./routes/api/duvidaQuestaoAluno'))
app.use('/metricas', require('./routes/api/metricas'))
app.use('/medias', require('./routes/api/medias'))
app.listen(PORT, () => {
  
  console.log(`Servidor rodando na porta ${PORT}`);
  // const url = `http://localhost:${PORT}/login`;
  
  // if (process.platform === 'darwin') {
  //   // Para macOS
  //   exec(`open ${url}`);
  // } else if (process.platform === 'win32') {
  //   // Para Windows
  //   exec(`start ${url}`);
  // } else {
  //   // Para sistemas baseados em Linux
  //   exec(`xdg-open ${url}`);
  // }

});
// function cookieParser(): any {
//     throw new Error('Function not implemented.');
// }

