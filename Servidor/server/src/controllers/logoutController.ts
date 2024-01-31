import { UserModel, IUser } from '../model/User';
import { Request, Response, NextFunction } from 'express';

const handleLogout = async (req:Request, res:Response): Promise<any> => {
    // On client, also delete the accessToken
    const User = UserModel;
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    // Is refreshToken in db?
    const foundUser = await User.findOne({refreshToken}).exec()
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.sendStatus(204);
    }

    // Delete refreshToken in dbY
    foundUser.refreshToken=foundUser.refreshToken.filter((rt: any) => rt !== refreshToken);
    const result = await foundUser.save()
    
    
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
}

export  { handleLogout }