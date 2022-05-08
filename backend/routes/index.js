const router = express.Router();
import express from "express";
import auth from "../middleware/auth";
import admin from "../middleware/admin";
import { messagesController, loginController , userController, refreshController, loanStatusController} from '../controllers';

router.post('/apply/loan',loanStatusController.applyLoan);
router.get('/getloans',loanStatusController.getAllLoans);
router.get('/loan/:id',loanStatusController.getLoan);
router.post('/loanrequest/accept',loanStatusController.accept);
router.post('/loanrequest/reject',loanStatusController.reject);
router.post('/loanrequest/negotiation',loanStatusController.negotiation);

router.post('/message',messagesController.message);
router.post('/refresh',refreshController.refresh);
router.post('/logout',loginController.logout);

router.put('/update/:id',[ auth ], userController.update);

router.delete('/message/:id',[auth , admin], messagesController.destroy);
router.get('/users/:id',[ auth ], userController.getUsersOne);
router.get('/messages',[auth , admin], messagesController.getmessages);
router.post('/user',loginController.logout);
 
export default router;

