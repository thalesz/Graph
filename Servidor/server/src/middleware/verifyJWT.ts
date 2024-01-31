import { Request, Response, NextFunction } from 'express';
const jwt = require('jsonwebtoken')

interface CustomRequest extends Request {
    user?: string;
    roles?: string[];
}

const verifyJWT = (req: CustomRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    const isAuthHeaderArray = Array.isArray(authHeader);
    const token = (isAuthHeaderArray ? authHeader[0] : authHeader)?.split(' ')[1];

    if (!token) {
        return res.sendStatus(401);
    }

    //obserse os comentarios
    //1.eu poderia fazer isso aqui? e substituir
    const { user, pwd } = req.body;
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if (err) return res.sendStatus(403); // Token inválido
            req.user = decoded.UserInfo.username; //2. nessa linha 
            req.roles = decoded.UserInfo.roles;    //3. e nessa
            next();
        }
    );
}

export default verifyJWT;
