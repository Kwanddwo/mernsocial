import User from '../models/user.model';
import fs from 'fs';
import extend from 'lodash/extend';
import dbErrorHandler from '../helpers/dbErrorHandler';

const create = async (req, res, next) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save()
        .then(() => {
            res.json({
                message: 'Successfully signed up',
                user: user
            });
        })
        .catch((err) => {
            return res.status(400).json({
                error: err.message
            })
        });
};
const list = async (req, res, next) => {
    User.find().select({hashed_password: 0, salt: 0})
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            return res.status(400).json({
                error: err.message
            })
        });
    
};

const userById = async (req, res, next, id) => {
    User.findById(id)
        .populate('following', '_id name')
        .populate('followers', '_id name')
        .then((user) => {
            if (!user) {
                res.status(400).json({
                    error: 'User not found'
                });
            }
            req.profile = user;
            // don't wanna send a whole photo
            // req.profile.photo = undefined;
            next()
        })
        .catch((err) => {
            return res.status(400).json({
                error: err.message
            })
        });
};
const read = (req, res, next) => {
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    res.json(req.profile);
};

const photo = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set("Content-Type", req.profile.photo.contentType);
        return res.send(req.profile.photo.data)
    }
    next()
}

// Will have access to req.file because of multer in user.routes
const update = async (req, res, next) => {
    console.log(req.profile);

    let user = req.profile;
    user = extend(user, req.body);
    if (req.file) {
        user.photo.data = fs.readFileSync(req.file.path);
        user.photo.contentType = req.file.mimetype;
    }
    user.updated = Date.now();
    console.log(user);
    user.save()
        .then((user) => {
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        })
        .catch((err) => {
            return res.status(400).json({
                error: err.message
            })
        });
};
const remove = async (req, res, next) => {
    let user = req.profile;
    User.deleteOne({_id : user._id})
        .then(() => {
            user.hashed_password = undefined;
            user.salt = undefined;
            res.json(user);
        })
        .catch((err) => {
            return res.status(400).json({
                error: err.message
            })
        });
};

export default { userById, create, read, list, remove, update, photo };