import jwt from 'jsonwebtoken';
export const verifyJwt = ((req, res, next) => {
    var _a;
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!Array.isArray(authHeader) && !(authHeader === null || authHeader === void 0 ? void 0 : authHeader.startsWith('Bearer '))) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = Array.isArray(authHeader) ? (_a = authHeader[0]) === null || _a === void 0 ? void 0 : _a.split(' ')[1] : authHeader === null || authHeader === void 0 ? void 0 : authHeader.split(' ')[1];
    jwt.verify(token, process.env.ACCESSTOKEN_SECRET, (err, decoded) => {
        var _a, _b;
        if (err) {
            console.log(err);
            return res.status(403).json({ error: err });
        }
        req.userId = (_a = decoded === null || decoded === void 0 ? void 0 : decoded.Userinfo) === null || _a === void 0 ? void 0 : _a.id;
        req.userEmail = (_b = decoded.Userinfo) === null || _b === void 0 ? void 0 : _b.email;
        next();
    });
});
//# sourceMappingURL=verifyJwt.js.map