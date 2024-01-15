const router = express.Router();
import express from "express";
import auth from "../middleware/auth";
import { loginController, userController, refreshController, loanStatusController, registerController, forgotPasswordController,NotificationController } from '../controllers';
import otpController from "../controllers/auth/otpController";

router.post('/apply/loan', [auth], loanStatusController.applyLoan);
router.get('/getloans', loanStatusController.getAllLoans);
router.get('/loan/:id', [auth], loanStatusController.getLoan);
router.post('/loanrequest/accept', [auth], loanStatusController.accept);
router.post('/loanrequest/reject', [auth], loanStatusController.reject);
router.post('/loanrequest/negotiation', [auth], loanStatusController.negotiation);
router.post('/loanrequest/update/loan', [auth], loanStatusController.updateLoan);
router.post('/update/balance', [auth], loanStatusController.updateBalance);
router.post('/pay/installment', [auth], loanStatusController.payInstallment);

router.post('/login', loginController.login);
router.post('/forgot/password', forgotPasswordController.forgot);
router.post('/register', registerController.register);
router.post('/refresh', refreshController.refresh);
router.post('/logout', loginController.logout);
router.put('/update/:id', [auth], userController.update);
router.get('/users/:id', [auth], userController.getUsersOne);
router.post('/email/verify', otpController.send);
router.put('/notification/cycle/:username/:key', NotificationController.DailyCheck);

export default router;