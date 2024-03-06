import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { UserModel, IUser } from '../model/User';
import { promisify } from 'util'; // Adicionado import para o módulo util
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req: Request, res: Response): Promise<any> => {
    const User = UserModel;
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundUser) {
        const verifyAsync = promisify(jwt.verify); // Transforma jwt.verify em uma função que suporta async/await
        try {
            const decoded: { username: any } = await verifyAsync(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            console.log('Tentativa de reutilização de refreshToken!');
    
            const hackedUser: Document<IUser> | null = await UserModel.findOne({ username: decoded.username }).exec();
    
            if (hackedUser) {
                const userWithRefreshToken = hackedUser as IUser; // Conversão forçada
                userWithRefreshToken.refreshToken = [];
                const resultSave = await userWithRefreshToken.save();
                console.log(resultSave);
            } else {
                console.log('Usuário não encontrado');
                return res.sendStatus(403); // Forbidden
            }
        } catch (err) {
            return res.sendStatus(403); // Forbidden
        }
    }

    if (!foundUser || !foundUser.refreshToken) {
        console.log('Usuário não encontrado ou refreshToken não disponível');
        return res.sendStatus(403); // Forbidden
    }

    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt
    const verifyAsync = promisify(jwt.verify); // Transforma jwt.verify em uma função que suporta async/await
    try {
        const decoded: { username: string } = await verifyAsync(refreshToken, process.env.REFRESH_TOKEN_SECRET);

        console.log('expired refresh token');
        foundUser.refreshToken = [...newRefreshTokenArray];
        const resultSave = await foundUser.save();
        console.log(resultSave);

        if (foundUser.username !== decoded.username) return res.sendStatus(403);

        // Refresh token was still valid
        const roles = Object.values(foundUser.roles);
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "username": decoded.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '10s' }
        );

        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        // Saving refreshToken with the current user
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const resultSaveNewToken = await foundUser.save();

        // Creates Secure Cookie with the refresh token
        res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

        res.json({ roles, accessToken });
    } catch (err) {
        console.log('Error verifying refresh token:', err);
        return res.sendStatus(403); // Forbidden
    }
};

export { handleRefreshToken };
