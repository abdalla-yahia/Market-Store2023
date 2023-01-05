import { Request, Response, NextFunction } from 'express';
import UserModels from '../models/users.models';

const usermodel = new UserModels();

export const create = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user_create = await usermodel.create(req.body);
        res.json({
            status: 'Success',
            message: 'Create New User Done Successfully',
            data: { ...user_create },
        });
    } catch (error) {
        next(error);
    }
};

//Controls Update User

export const update = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const updateUser = await usermodel.update(
            req.body,
            req.params.id as string
        );
        if (updateUser === undefined) {
            res.json({
                message: `User With Id ${req.params.id} Not Found !!!`,
            });
        } else {
            res.json({
                status: 'success',
                message: 'Update User Done Successfully',
                data: { ...updateUser },
            });
        }
    } catch (error) {
        next(error);
    }
};

//Control Delete User

export const Delete = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const GetUser = await usermodel.GetUser(req.params.id as string);
        if (GetUser === undefined) {
            res.json({
                message: `User With Id ${req.params.id} Not Found !!!`,
            });
        } else {
            await usermodel.Delete(req.params.id);
            res.json({
                status: 'Success',
                message: 'Delete User Done Successfully',
            });
        }
    } catch (error) {
        next(error);
    }
};
//Control Delete All Users

export const DeleteAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const GetUsers = await usermodel.GetAllUsers();
        // eslint-disable-next-line no-constant-condition
        if ([...GetUsers].length < 1) {
            res.json({ message: 'Opps Not Found Any Users To Delete' });
        } else {
            await usermodel.DeleteAllUsers();
            res.json({
                status: 'Success',
                message: 'Delete All Users Done Successfully',
            });
        }
    } catch (error) {
        next(error);
    }
};
//Control Get One User

export const GetUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const GetUser = await usermodel.GetUser(req.params.id as string);
        if (GetUser === undefined || GetUser === null) {
            res.json({
                message: `User With Id ${req.params.id} Not Found !!!`,
            });
        } else {
            res.json({
                status: 'Success',
                message: 'Get User Done Successfully',
                data: { ...GetUser },
            });
        }
    } catch (error) {
        next(error);
    }
};
//Control Get All Users

export const GetAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const GetUsers = await usermodel.GetAllUsers();
        // eslint-disable-next-line no-constant-condition
        if ([...GetUsers].length < 1) {
            res.json({ message: 'Opps Not Found Any Users To Get' });
        } else {
            res.json({
                status: 'Success',
                message: 'Get All Users Done Successfully',
                data: { ...GetUsers },
            });
        }
    } catch (error) {
        next(error);
    }
};
