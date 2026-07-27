import express from "express";
import {createCategory,  getById,update, remove} from "../controllers/category.controllers.js";




const router=express.Router();

// *createcategory
router.post("/", createCategory);

// *getbyid

router.get("/:id",getById );

// *updatecategory

router.put("/:id",update);

// *deletecategory

router.delete("/id:",remove);