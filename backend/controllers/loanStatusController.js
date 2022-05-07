import Joi from 'joi';
import { Loan, LoanRequest, User } from "../models";
import CustomErrorHandler from '../Services/CustomerrorHandler';

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
            console.log(document);
        } catch (err) {
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
                return next(new Error("No such data for reject !!!   "));
            }
            const type = "reject";

            await LoanRequest.create({
                // name: name,
                lendersId,
                loanId,
                type,
                message
            });
            res.status(201).json({status: "success", msg:"Successfully rejected"});
        } catch (err) {
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
            return next(CustomErrorHandler.unAuthorized())
        }
        const type = "negotiation";
        try {
            // document = await Product.find().select('-updatedAt -__v -createdAt').sort({_id: -1});
            const loan = await Loan.find({ loanId });
            if (loan.status === "available") {
                await LoanRequest.create({
                    // name: name,
                    lendersId,
                    loanId,
                    type,
                    message
                });
                res.status(201).json({status: "success", msg:"negotiation request posted successfully !"});
            }
            else {
                return next(CustomErrorHandler.badRequest("Loan already accepted by someone !!"))
            }
        } catch (err) {
            return next(CustomErrorHandler.serverError());
        }

    },

    async getAllLoans(req, res, next) {

        let document;
        try {
            document = await Loan.find({ status: "available" }).select('-__v')
        } catch (error) {
            return next(error)
        }
        res.status(200).json({ status: "success", loans: document });
    },

    async getLoan(req, res, next) {
        console.log(req.params.id)
        let document;
        try {
            document = await Loan.findOne({ status: "available", _id: req.params.id }).select('-__v')
            // console.log(document)
            if(!document){
                return next(CustomErrorHandler.badRequest())
            }
        } catch (error) {
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
        const exist = isUserExist(lendersId);

        if (!exist) {
            return next(CustomErrorHandler.unAuthorized())
        }
        const { error } = applyLoanSchema.validate(req.body);
        if (error) {
            return next(CustomErrorHandler.badRequest());
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
                return next(CustomErrorHandler.serverError())
            }
            console.log(document);
        } catch (error) {
            return next(error);
        }
        res.status(200).json({ status: "success", msg: "Loan applied successfully." });
    }

}
export default loanStatusController;
