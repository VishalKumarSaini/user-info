import express from 'express';
import { deleteUser, getAllUser, updateUser } from '../controller/user';
import { isAuthenticated, isOwner} from '../middleware';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUser);
    router.delete('/user/:id',isAuthenticated, isOwner, deleteUser);
    router.patch('/user/:id',isAuthenticated, isOwner, updateUser);
}
