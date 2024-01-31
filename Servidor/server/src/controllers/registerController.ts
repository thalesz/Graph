import { Request, Response, NextFunction } from 'express';
import { UserModel, IUser } from '../model/User';
import bcrypt from 'bcrypt';

const handleNewUser = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
  const User = UserModel;
  const { user, pwd }: { user: string; pwd: string } = req.body;

  console.log(user);

  if (!user || !pwd) {
    return res.status(400).json({ 'message': 'Username and password are required.' });
  }

  try {
    // check for duplicate usernames in the db
    const duplicate: IUser | null = await User.findOne({ username: user });
  //  console.log(duplicate);

    //erro começa aqui
    if (duplicate) {
      return res.sendStatus(409);
   
    }
   // termina aqui

    // encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);

    // create and store the new user
    const result = await User.create({
      username: user,
      password: hashedPwd,
    });

    console.log(result);

    // Envie a resposta apenas depois que todas as operações forem concluídas com sucesso
    return res.status(201).json({ 'success': `New user ${user} created!` });
  } catch (err) {
    // Se ocorrer um erro, envie a resposta de erro ao cliente
     return res.status(500).json({ 'message': err });
  }
};

export { handleNewUser };
