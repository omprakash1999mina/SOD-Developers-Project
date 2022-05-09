import Joi from 'joi';
import { Loan, LoanRequest, User } from "../models";
import CustomErrorHandler from '../Services/CustomerrorHandler';
import discord from '../Services/discord';

const loanStatusReqSchema = Joi.object({
    lendersId: Joi.string().required(),
    loanId: Joi.string().required(),
    message: Joi.string(),
});

const isUserExist = async (lendersId) => {
    try {
        const user = await User.exists({ _id: lendersId })
        console.log(user)
        if (!user) {
            return false
        }
    } catch (error) {
        return false
    }
    return true
}

const loanStatusController = {
    async accept(req, res, next) {

        const { error } = loanStatusReqSchema.validate(req.body);
        if (error) {
            return next(CustomErrorHandler.badRequest());
        }
        const { lendersId, loanId } = req.body;
        const exist = isUserExist(lendersId);

        if (!exist) {
            return next(CustomErrorHandler.unAuthorized())
        }

        const type = 'accepted';
        // check does loan already accepted by someone or not
        try {
            const loan = Loan.find({ loanId });
            if (loan.status === 'accepted') {
                return next(CustomErrorHandler.badRequest("Loan already accepted by someone !!"))
            }
        }
        catch (err) {
            return next(err)
        }

        let document;
        try {
            document = await LoanRequest.create({
                // name: name,
                lendersId,
                loanId,
                type,
            });
            if(!document){
                discord.SendErrorMessageToDiscord(req.body.lendersId, "Accept Loan", "error in creating loan reaquest in database !!");
                return next(CustomErrorHandler.serverError())
            }
            console.log(document);
        } catch (err) {
            discord.SendErrorMessageToDiscord(req.body.lendersId, "Accept Loan", err);
            return next(err);
        }

        res.status(201).json({ status: "success", msg: "Loan accepted Successfully !!!  " });
    },
    async reject(req, res, next) {
        const { error } = loanStatusReqSchema.validate(req.body);
        if (error) {
            return next(CustomErrorHandler.badRequest());
        }

        try {
            const { lendersId, loanId, message } = req.body;
            const exist = isUserExist(lendersId);

            if (!exist) {
                return next(CustomErrorHandler.unAuthorized())
            }
            const loan = await Loan.findOneAndUpdate({ loanId }, {
                status: "rejected",
            });
            if (!loan) {
                discord.SendErrorMessageToDiscord(req.body.loanId, "Reject", "loan Id not exist in database !!");
                return next(new Error("No such data for reject !!!   "));
            }
            const type = "reject";

            const request = await LoanRequest.create({
                lendersId,
                loanId,
                type,
                message
            });
            if (!request) {
                discord.SendErrorMessageToDiscord(req.body.lendersId, "Reject", "error in creating loan request in database !!");
                return next(CustomErrorHandler.serverError())
            }
            res.status(201).json({ status: "success", msg: "Successfully rejected" });
        } catch (err) {
            discord.SendErrorMessageToDiscord(req.body.lendersId, "Reject", err);
            return next(CustomErrorHandler.serverError());
        }

    },
    async negotiation(req, res, next) {

        const { error } = loanStatusReqSchema.validate(req.body);
        if (error) {
            return next(CustomErrorHandler.badRequest());
        }
        //  use pagination here for big data library is mongoose pagination
        const { lendersId, loanId, message } = req.body;
        const exist = isUserExist(lendersId);
        if (!exist) {
            discord.SendErrorMessageToDiscord(req.body.lendersId, "Negotiation", "user not exist in our database !!");
            return next(CustomErrorHandler.unAuthorized())
        }
        const type = "negotiation";
        try {
            // document = await Product.find().select('-updatedAt -__v -createdAt').sort({_id: -1});
            const loan = await Loan.find({ loanId });
            if (loan.status === "available") {
                const request = await LoanRequest.create({
                    lendersId,
                    loanId,
                    type,
                    message
                });
                if (!request) {
                    discord.SendErrorMessageToDiscord(req.body.lendersId, "Negotiation", "error in creating loan request in database !!");
                    return next(CustomErrorHandler.serverError())
                }
                res.status(201).json({ status: "success", msg: "negotiation request posted successfully !" });
            }
            else {
                return next(CustomErrorHandler.badRequest("Loan already accepted by someone !!"))
            }
        } catch (err) {
            discord.SendErrorMessageToDiscord(req.body.lendersId, "Negotiation", err);
            return next(CustomErrorHandler.serverError());
        }

    },

    async getAllLoans(req, res, next) {

        let document;
        try {
            document = await Loan.find({ status: "available" }).select('-__v')
        } catch (error) {
            discord.SendErrorMessageToDiscord(req.body.customerId, "Get Request All Loans", error);
            return next(error)
        }
        res.status(200).json({ status: "success", loans: document });
    },

    async getLoan(req, res, next) {
        // console.log(req.params.id)
        let document;
        try {
            document = await Loan.findOne({ status: "available", _id: req.params.id }).select('-__v')
            // console.log(document)
            if (!document) {
                discord.SendErrorMessageToDiscord(req.params.id, "Get Request One loan", "Loain Id is not exist in our database !!");
                return next(CustomErrorHandler.badRequest())
            }
        } catch (error) {
            discord.SendErrorMessageToDiscord(req.params.id, "Get Request One Loan", error);
            return next(error)
        }
        res.status(200).json({ status: "success", loan: document });
    },
    async applyLoan(req, res, next) {

        const applyLoanSchema = Joi.object({
            customerId: Joi.string().required(),
            loanAmount: Joi.string().required(),
            tenure: Joi.string().required(),
            intRate: Joi.string().required(),
        });
        const { error } = applyLoanSchema.validate(req.body);
        if (error) {
            return next(CustomErrorHandler.badRequest());
        }
        const exist = isUserExist(req.body.customerId);
        if (!exist) {
            discord.SendErrorMessageToDiscord(req.body.customerId, "Apply Loan", "User not exist in our database !!");
            return next(CustomErrorHandler.unAuthorized())
        }

        try {
            const { customerId, loanAmount, tenure, intRate } = req.body;
            let document = await Loan.create({
                customerId,
                loanAmount,
                tenure,
                intRate
            })
            if (!document) {
                discord.SendErrorMessageToDiscord(req.body.customerId, "Apply Loan", "error in creating loan in database ");
                return next(CustomErrorHandler.serverError())
            }
            console.log(document);
        } catch (error) {
            discord.SendErrorMessageToDiscord(req.body.customerId, "Apply Loan", error);
            return next(error);
        }
        res.status(200).json({ status: "success", msg: "Loan applied successfully." });
    },

    async updateLoan(req, res, next) {
        const updateLoanSchema = Joi.object({
            customerId: Joi.string().required(),
            loanId: Joi.string().required(),
            loanAmount: Joi.string().required(),
            tenure: Joi.string().required(),
            intRate: Joi.string().required()
        })

        const { error } = updateLoanSchema.validate(req.body);
        if (error) {
            return next(CustomErrorHandler.badRequest());
        }

        try {
            const { customerId, loanId, loanAmount, tenure, intRate } = req.body;

            const exist = isUserExist(customerId);
            if (!exist) {
                discord.SendErrorMessageToDiscord(req.body.customerId, "Loan Update", "error user not exist in database ");
                return next(CustomErrorHandler.unAuthorized())
            }
            const loan = await Loan.exists({ _id: loanId })
            if (!loan) {
                return next(CustomErrorHandler.badRequest())
            }

            let document = await Loan.findOneAndUpdate({ _id: loanId }, {
                loanAmount,
                tenure,
                intRate
            })
            if (!document) {
                discord.SendErrorMessageToDiscord(req.body.customerId, "Loan Update", "error in finding and update loanId");
                return next(CustomErrorHandler.serverError())
            }
            console.log(document);
        } catch (error) {
            discord.SendErrorMessageToDiscord(req.body.customerId, "Loan Update", error);
            return next(error);
        }
        res.status(200).json({ status: "success", msg: "Loan updated successfully." });
    }

}
export default loanStatusController;
