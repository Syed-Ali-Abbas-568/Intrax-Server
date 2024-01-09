import jwt from 'jsonwebtoken';

import mongoose from 'mongoose';
import adminModel from '../models/adminSchema.js';

const requireLogin = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "You must be logged in" });
    }

    const token = authorization.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "You must be logged in" });
        }

        const { _id } = payload;

        adminModel.findById(_id).then(userdata => {
            req.user = userdata;
            next();
        });
    });
};

export default requireLogin;
