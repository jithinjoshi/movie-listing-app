import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken'
import validateSignup from "../helpers/signupValidator.js"
import { User } from "../model/user.js";
import validateSignin from "../helpers/signinValidator.js";
export const signup = (async (req: Request, res: Response) => {
    try {
        const { error, value } = validateSignup(req.body);
        if (error) {
            res.status(422).json(error.details[0]?.message)
        } else {
            const hash = await bcrypt.hash(value?.password, 10);
            const newUser = new User({
                username: value?.username,
                email: value?.email,
                password: hash
            });

            await newUser.save();
            res.status(201).json(newUser)
        }
    } catch (error) {
        res.status(500).json({ err: error })

    }

});

//sign in 
export const signin = async (req: Request, res: Response) => {
    const accessTokenSecret: string | undefined = process.env.ACCESSTOKEN_SECRET;
    const refreshTokenSecret: string | undefined = process.env.REFRESHTOKEN_SECRET;

    if (!accessTokenSecret) {
        throw new Error('Access token secret is not defined.');
    }

    if (!refreshTokenSecret) {
        throw new Error('refresh token secret is not defined.');
    }



    try {
        const { error, value } = validateSignin(req.body);
        if (error) {
            return res.status(422).json({ err: error?.details[0]?.message })
        } else {
            const user = await User.findOne({ email: value?.email });

            if (!user) {
                return res.status(401).json({ error: 'unauthorized' });
            }

            const match = await bcrypt.compare(value?.password, user?.password);

            if (!match) return res.status(401).json({ err: 'unauthorized user' });

            const accessToken = jwt.sign({
                "Userinfo": {
                    "id": user?._id,
                    "email": user?.email
                }
            },
                accessTokenSecret,
                {
                    expiresIn: '15min'
                }
            );

            const refreshToken = jwt.sign(
                {
                    "id": user?._id,
                    "email": user?.email

                },
                refreshTokenSecret,
                { expiresIn: '7d' }
            );

            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            res.json({ accessToken })
        }

    } catch (error) {
        res.status(500).json({ err: error })

    }
};

//refresh token
export const refresh = async (req: Request, res: Response) => {
    try {

        const accessTokenSecret: string | undefined = process.env.ACCESSTOKEN_SECRET;
        const refreshTokenSecret: string | undefined = process.env.REFRESHTOKEN_SECRET;

        if (!accessTokenSecret) {
            throw new Error('Access token secret is not defined.');
        }

        if (!refreshTokenSecret) {
            throw new Error('refresh token secret is not defined.');
        }
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });

        const refreshToken: string = cookies.jwt;

        const data = jwt.verify(refreshToken, refreshTokenSecret) as string | JwtPayload;

        if (typeof data === 'string') {
            return res.status(403).json({ error: 'Forbidden' });
        }

        const user = await User.findOne({ _id: data?.id });

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const accessToken = jwt.sign(
            {
                Userinfo: {
                    id: user._id,
                    email: user.email
                }
            },
            accessTokenSecret,
            { expiresIn: '15min' }
        );

        return res.json({ accessToken });
    } catch (error) {
        res.status(500).json({ err: error })

    }
}

//signout
export const signout = ((req: Request, res: Response) =>{
    try {
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.status(204).json({ err: "can't clear cookie" })
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).json({ message: 'Cookie cleared and logout successfull'})

    } catch (error) {
        console.log(error)
        res.status(500).json({ err: error })

    }
})


export const getUsersCount = (async (req:Request, res : Response)=>{
    try {
        const getAllUserCount : number = await User.find({}).count();
        res.status(200).json({count : getAllUserCount})
    } catch (error) {
        res.status(500).json({err:error})
        
    }
})