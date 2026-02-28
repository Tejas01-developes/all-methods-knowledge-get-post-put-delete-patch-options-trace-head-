import express from 'express';
import { deleteusers, getdata, insertuser, update } from '../apis/apis.js';

const router=express.Router();


router.post("/",insertuser);
// router.get("/get",getdata);
router.patch("/update",update);
// router.head("/get",getdata);
router.trace("/get",getdata);
router.delete("/delete",deleteusers);

export default router;