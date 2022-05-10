import Joi from 'joi';
import { User } from "../../models";
import CustomErrorHandler from '../../Services/CustomerrorHandler';
import bcrypt from 'bcrypt';
import discord from '../../Services/discord';
import RedisService from '../../Services/redis';

const forgotPasswordController = {

    async forgot(req, res, next) {

        const forgotPasswordSchema = Joi.object({
            email: Joi.string().required(),
            otp: Joi.string().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).min(8).max(50).required()
        });

        const { error } = forgotPasswordSchema.validate(req.body);

        if (error) {
            return next(CustomErrorHandler.badRequest());
        }
        //   DataBasse   
        try {
            const { email, otp, password } = req.body;
            const exist = await User.exists({ email: email });
            if (!exist) {
                discord.SendErrorMessageToDiscord(email, "Forgot password", "user not exist in our database !!");
                return next(CustomErrorHandler.unAuthorized())
            }
            // verifing the otp with redis
            let redisOTP = RedisService.get(email);
            
            if (redisOTP === null) {
                return next(CustomErrorHandler.unAuthorized("OTP expired !!"));
            }
            if (redisOTP != otp) {
                return next(CustomErrorHandler.badRequest("invalid OTP !"))
            }
            // if otp verified then update in database
            const hashedPassword = await bcrypt.hash(password, 10);
            let document = User.findOneAndUpdate({ email: email }, {
                password: hashedPassword
            })
            if (!document) {
                discord.SendErrorMessageToDiscord(req.body.email, "forgot password", err);
            }
        } catch (err) {
            discord.SendErrorMessageToDiscord(req.body.email, "forgot password", err);
            return next(CustomErrorHandler.serverError());
        }
        res.status(201).json({ status: "success", msg: "Password updated Successfully !!!  " });

    }
}

export default forgotPasswordController;
