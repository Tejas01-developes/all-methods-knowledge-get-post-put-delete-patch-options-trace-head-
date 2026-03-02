import express from 'express';
import { deleteusers, getdata, insertuser, login, update } from '../apis/apis.js';

const router=express.Router();


router.post("/",insertuser);
router.post("/login",login);
router.get("/get",getdata);
router.put("/update",update);
router.delete("/delete",deleteusers);

router.patch("/patch",getdata);
router.head("/login",login);






router.trace("/login",login);
router.trace("/",insertuser);
router.trace("/login",login);
router.trace("/get",getdata);
router.trace("/update",update);
router.trace("/delete",deleteusers);

router.patch("/patch",getdata);

export default router;