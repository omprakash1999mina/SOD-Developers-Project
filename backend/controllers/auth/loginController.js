import Joi from 'joi';
import { User, RefreshToken } from "../../models";
import CustomErrorHandler from '../../Services/CustomerrorHandler';
import bcrypt from 'bcrypt';
import JwtService from '../../Services/JwtService';
import { REFRESH_SECRET } from '../../config';
import discord from '../../Services/discord';
import RedisService from '../../Services/redis';

const loginController = {

    async login(req, res, next) {
        // validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        });

        console.log(req.body);

        const { error } = loginSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        try {
            const { email } = req.body;
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials());
            }
            //      Token 
            const id = user._id;
            const access_token = JwtService.sign({ _id: user._id});
            const refresh_token = JwtService.sign({ _id: user._id }, '7d', REFRESH_SECRET);
            //       redis caching
            const ttl = 60 * 60 * 24 * 7;
            const ok = RedisService.createRedisClient().set(user._id, refresh_token,"EX", ttl);
            // const ok = RedisService.set(redis, email, refresh_token, ttl);

            if (!ok) {
                discord.SendErrorMessageToDiscord(email, "LogIN", "error in setup the token in redis !!");
                return next(CustomErrorHandler.serverError());
            }
            // await RefreshToken.create({ refresh_token: refresh_token });
            res.status(200).json({ id, access_token, refresh_token });
        } catch (err) {
            discord.SendErrorMessageToDiscord(req.body.email, "Login", err);
            return next(err);
        }

    },


    async logout(req, res, next) {
        // validation
        const refreshSchema = Joi.object({
            refresh_token: Joi.string().required(),
        });
        const { error } = refreshSchema.validate(req.body);

        if (error) {
            return next(error);
        }

        try {
            await RefreshToken.deleteOne({ refresh_token: req.body.refresh_token });
        } catch (err) {
            discord.SendErrorMessageToDiscord(req.body.refresh_token, "Logout", err);
            return next(new Error('Something went wrong in the database'));
        }
        res.status(200).json({ msg: "logout successfully", status: "success" });

    }
};

export default loginController;