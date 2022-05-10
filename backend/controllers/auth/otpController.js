import Joi from 'joi';
import { User } from "../../models";
import CustomErrorHandler from '../../Services/CustomerrorHandler';
import discord from '../../Services/discord';
import RedisService from '../../Services/redis';
import mailService from '../../Services/sendMail';


const otpController = {

    async send(req, res, next) {

        const otpSchema = Joi.object({
            email: Joi.string().email().required(),
        });

        const { error } = otpSchema.validate(req.body);

        if (error) {
            return next(CustomErrorHandler.badRequest());
        }
        //   DataBasse   
        try {
            const { email } = req.body;
            const user = await User.findOne({ email: email });
            if (!user) {
                discord.SendErrorMessageToDiscord(email, "OTP SEND", "user not exist in our database !!");
                return next(CustomErrorHandler.unAuthorized())
            }

            const type = 'otp';
            const company = "Loan Corner PVT LTD"
            const otp = mailService.send(user.userName, type, email, company)
            if (otp) {
                const ttl = 60 * 10; // for 10 mins
                const ok = RedisService.createRedisClient().set(email, otp, "EX", ttl);
                // let ok = RedisService.set(email, otp, ttl);
                if (!ok) {
                    discord.SendErrorMessageToDiscord(email, "OTP SEND", "error in setup the otp in redis !!");
                    return next(CustomErrorHandler.serverError());
                }
            }

        } catch (err) {
            discord.SendErrorMessageToDiscord(req.body.email, "OTP SEND", err);
            return next(CustomErrorHandler.serverError());
        }
        res.status(201).json({ status: "success", msg: "mail sent Successfully !!!  " });

    }
    // async verify(req, res, next) {

    //     const otpSchema = Joi.object({
    //         email: Joi.string().email().required(),
    //         otp: Joi.string().required(),
    //     });

    //     const { error } = otpSchema.validate(req.body);

    //     if (error) {
    //         return next(CustomErrorHandler.badRequest());
    //     }
    //     //   DataBasse   
    //     try {
    //         const { email, otp } = req.body;
    //         const user = await User.exists({ email: email });
    //         if (!user) {
    //             discord.SendErrorMessageToDiscord(email, "OTP VERIFY", "user not exist in our database !!");
    //             return next(CustomErrorHandler.unAuthorized())
    //         }

    //         let redisOTP = RedisService.get(email);

    //         if (redisOTP === null) {
    //             return next(CustomErrorHandler.unAuthorized("OTP expired !!"));
    //         }
    //         if (redisOTP != otp) {
    //             return next(CustomErrorHandler.badRequest("invalid OTP !"))
    //         }

    //     } catch (err) {
    //         discord.SendErrorMessageToDiscord(req.body.email, "OTP VERIFY", err);
    //         return next(CustomErrorHandler.serverError());
    //     }
    //     res.status(201).json({ status: "success", msg: "OTP verified Successfully !!!  " });
    // }
}

export default otpController;
// const generateOtpCode = () => {
//     const randomNumber = Math.floor(100000 + Math.random() * 900000);
//     return randomNumber;
// }
