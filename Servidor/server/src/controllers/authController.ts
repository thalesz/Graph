import { Request, Response } from "express"

import { UserModel, IUser } from '../model/User';
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const handleLogin = async(req: Request, res: Response): Promise<any>=>{
    const User = UserModel
    //pegou o cookie 
    const cookies = req.cookies;
    // console.log("entrou aqui")
    // pegou login e senha e verificou se não extava vazio
    const {user, pwd} = req.body

    //console.log(user)

    try{
        if (!user || !pwd){
            return res.status(400).json({ 'message': 'Username and password are required.' });
        }
    }catch(err){
        console.log(err)
    }
    

    //procurou usuario e verificou a existencia dele
    const foundUser = await User.findOne({username:user}).exec()
    if (!foundUser) return res.sendStatus(401); //Unauthorized 

    // comparou a senha com a senha do usuario encontrado
    const match = await bcrypt.compare(pwd, foundUser.password);
    if (match) {
        const roles = Object.values(foundUser.roles)
        // create JWTs
        const accessToken = jwt.sign(
            {"UserInfo":{
                "username": foundUser.username,
                "roles":roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '3s' }
        );

        const newRefreshToken = jwt.sign(
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const newRefreshTokenArray = 
            !cookies?.jwt
                ?foundUser.refreshToken
                :foundUser.refreshToken.filter((rt: any)=>rt!==cookies.jwt)
        
        if(cookies?.jwt)res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

        // Saving refreshToken with current user
        foundUser.refreshToken=[...newRefreshTokenArray, newRefreshToken]
        const result = await foundUser.save()
        //console.log(result)

        // res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
        // res.json({ accessToken });


        res.cookie('jwt', newRefreshToken,  {httpOnly:true, maxAge: 24*60*60*1000});
        res.json({accessToken, roles:roles});
    } else {
        res.sendStatus(401);
    }
}
export {handleLogin}