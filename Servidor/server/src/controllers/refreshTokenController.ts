import { Request, Response, NextFunction } from 'express';
import { UserModel, IUser } from '../model/User';
import { Document } from 'mongoose';

import bcrypt from 'bcrypt';
const jwt = require('jsonwebtoken')


const handleRefreshToken = async (req:Request, res:Response): Promise<any>=>{
    const User = UserModel;
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err: any, decoded: { username: any }) => {
                if (err) {
                    return res.sendStatus(403); // Forbidden
                }
    
                console.log('Tentativa de reutilização de refreshToken!');
    
                const hackedUser: Document<IUser> | null = await UserModel.findOne({ username: decoded.username }).exec();
    
                if (hackedUser) {
                    const userWithRefreshToken = hackedUser as IUser; // Conversão forçada
                    userWithRefreshToken.refreshToken = [];
                    const result = await userWithRefreshToken.save();
                    console.log(result);
                } else {
                    console.log('Usuário não encontrado');
                    return res.sendStatus(403); // Forbidden
                }
            }
        );
    }
    
    const newRefreshTokenArray = (foundUser as IUser).refreshToken.filter(rt => rt !== refreshToken);

    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        async (err: any, decoded: { username: string; }) => {
            if (err) {
                console.log('expired refresh token');
                (foundUser as IUser).refreshToken = [...newRefreshTokenArray];
                const result = await (foundUser as IUser).save();
                console.log(result);
            }
            if (err || (foundUser as IUser).username !== decoded.username) return res.sendStatus(403);

            // Refresh token was still valid
            const roles = Object.values((foundUser as IUser).roles);
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
                { "username": (foundUser as IUser).username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            (foundUser as IUser).refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await (foundUser as IUser).save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

            res.json({ roles, accessToken })
        }
    );
}
export {handleRefreshToken}