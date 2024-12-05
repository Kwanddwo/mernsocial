import User from '../models/user.model';
import jwt from 'jsonwebtoken';
import { expressjwt as expressJwt } from 'express-jwt'
import config from './../../config/config';

// const EXPIRE_HOURS = 2;

const signIn = async (req, res, next) => {
    // Might be an error here because the key should be a string?
    // Refusal of this promise should throw an error and give it to next
    // If not, implement it yourself!
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            res.status(401).json({
                error: "Email is incorrect"
            })
            return;
        }
        if (!user.authenticate(req.body.password)) {
            res.status(401).json({
                error: "Password does not match email"
            })
            return;
        }

        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        // This is optional, if you want to store in localStorage, don't do this.
        // res.cookie('t', token, { expires: new Date(Date.now() + EXPIRE_HOURS * 3600000) });
        // return?
        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
        return;
    } catch (err) {
        res.json({
            error: "Couldn't sign in " + err.message
        })
        return;
    }
}
// For cookies!
const signOut = (req, res, next) => {
    res.clearCookie('t');
    res.status(200).json({
        message: 'Successfully signed out'
    });
}
const requireSignIn = expressJwt({
    secret: config.jwtSecret,
    algorithms: ['HS256'],
    userProperty: 'auth'
});
// This should always be put after requireSignIn, else req.auth will be undefined
const hasAuthorization = (req, res, next) => {
    const isAuthorized = req.auth && req.profile && req.profile._id == req.auth._id;
    if (!isAuthorized) {
        res.status(403).json({
            error: 'You are not authorized for this action'
        });
    }
    next();
}

export default { signIn, signOut, requireSignIn, hasAuthorization};