import express from "express"
import  {fetch,create,update,deleteUser, getUserByEmail,} from '../controller/userController.js'

const route = express.Router()

route.get("/get_all_users",fetch)

route.post("/create_user",create)

route.put("/update_user/:id",update)

route.delete("/delete_user/:id",deleteUser)

route.get("/get_user_by_email/:email",getUserByEmail)

export default route