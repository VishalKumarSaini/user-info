import express from 'express';
import { getUserById, getUserBySessionToken } from '../db/user';
import { get, merge } from 'lodash';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as unknown as string;

        if(!currentUserId){
            return res.sendStatus(403);
        }

        if(currentUserId != id){
            return res.json({
                "Unauthorized": "You are not authorised"
            }).status(401);
        }

        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
}

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['VISHAL_AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const user = await getUserBySessionToken(sessionToken);
        if (!user) {
            return res.sendStatus(403);
        }

        merge(req, { identity: user });

        return next();
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}