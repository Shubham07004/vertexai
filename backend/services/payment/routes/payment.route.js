import express from "express"
import { createOrder, verify } from "../controllers/payment.controllers.js"

const router=express.Router()

router.post("/create",createOrder)
router.post("/verify",verify)
export default router