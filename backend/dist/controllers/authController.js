var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validateSignup from "../helpers/signupValidator.js";
import { User } from "../model/user.js";
import validateSignin from "../helpers/signinValidator.js";
export const signup = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { error, value } = validateSignup(req.body);
        if (error) {
            res.status(422).json((_a = error.details[0]) === null || _a === void 0 ? void 0 : _a.message);
        }
        else {
            const hash = yield bcrypt.hash(value === null || value === void 0 ? void 0 : value.password, 10);
            const newUser = new User({
                username: value === null || value === void 0 ? void 0 : value.username,
                email: value === null || value === void 0 ? void 0 : value.email,
                password: hash
            });
            yield newUser.save();
            res.status(201).json(newUser);
        }
    }
    catch (error) {
        res.status(500).json({ err: error });
    }
}));
//sign in 
export const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const accessTokenSecret = process.env.ACCESSTOKEN_SECRET;
    const refreshTokenSecret = process.env.REFRESHTOKEN_SECRET;
    if (!accessTokenSecret) {
        throw new Error('Access token secret is not defined.');
    }
    if (!refreshTokenSecret) {
        throw new Error('refresh token secret is not defined.');
    }
    try {
        const { error, value } = validateSignin(req.body);
        if (error) {
            return res.status(422).json({ err: (_b = error === null || error === void 0 ? void 0 : error.details[0]) === null || _b === void 0 ? void 0 : _b.message });
        }
        else {
            const user = yield User.findOne({ email: value === null || value === void 0 ? void 0 : value.email });
            if (!user) {
                return res.status(401).json({ error: 'unauthorized' });
            }
            const match = yield bcrypt.compare(value === null || value === void 0 ? void 0 : value.password, user === null || user === void 0 ? void 0 : user.password);
            if (!match)
                return res.status(401).json({ err: 'unauthorized user' });
            const accessToken = jwt.sign({
                "Userinfo": {
                    "id": user === null || user === void 0 ? void 0 : user._id,
                    "email": user === null || user === void 0 ? void 0 : user.email
                }
            }, accessTokenSecret, {
                expiresIn: '15min'
            });
            const refreshToken = jwt.sign({
                "id": user === null || user === void 0 ? void 0 : user._id,
                "email": user === null || user === void 0 ? void 0 : user.email
            }, refreshTokenSecret, { expiresIn: '7d' });
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.json({ accessToken });
        }
    }
    catch (error) {
        res.status(500).json({ err: error });
    }
});
//refresh token
export const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessTokenSecret = process.env.ACCESSTOKEN_SECRET;
        const refreshTokenSecret = process.env.REFRESHTOKEN_SECRET;
        if (!accessTokenSecret) {
            throw new Error('Access token secret is not defined.');
        }
        if (!refreshTokenSecret) {
            throw new Error('refresh token secret is not defined.');
        }
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.status(401).json({ message: 'Unauthorized' });
        const refreshToken = cookies.jwt;
        const data = jwt.verify(refreshToken, refreshTokenSecret);
        if (typeof data === 'string') {
            return res.status(403).json({ error: 'Forbidden' });
        }
        const user = yield User.findOne({ _id: data === null || data === void 0 ? void 0 : data.id });
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const accessToken = jwt.sign({
            Userinfo: {
                id: user._id,
                email: user.email
            }
        }, accessTokenSecret, { expiresIn: '15min' });
        return res.json({ accessToken });
    }
    catch (error) {
        res.status(500).json({ err: error });
    }
});
//signout
export const signout = ((req, res) => {
    try {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.status(204).json({ err: "can't clear cookie" });
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.status(200).json({ message: 'Cookie cleared and logout successfull' });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ err: error });
    }
});
export const getUsersCount = ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getAllUserCount = yield User.find({}).count();
        res.status(200).json({ count: getAllUserCount });
    }
    catch (error) {
        res.status(500).json({ err: error });
    }
}));
//# sourceMappingURL=authController.js.map