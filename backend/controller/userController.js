import User from "../model/userModel.js"

export const create = async (req, res)=>{
    try{
        const userData = new User(req.body)
        const {email} = userData

        const userExist = await User.findOne({email})
        if(userExist){
            return res.status(400).json({message : "User already exists."})
        }
        const saveUser = await userData.save()
        res.status(200).json(saveUser)

    }catch(error){
        res.status(500).json({error:"Internal Server error"})
    }
}

export const fetch = async (req, res)=>{
    try{
        const users = await User.find();
        if (users.length === 0){
            return res.status(404).json({message : "Users not found yet..."})
        }
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({error:"Internal Server error"})
    }
}
export const update = async (req, res)=>{
    try{
        const id = req.params.id
        console.log(id)
        const userExist = await User.findOne({_id:id})
        if (!userExist) {
            console.log(id)
            return res.status(404).json({message : "User not found... Enter user id correctly"})
        }
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true})
        res.status(201).json(updateUser)
    }catch(error){
        res.status(500).json({error:"Internal Server error"})
    }
}

export const deleteUser = async(req,res) =>{
    try{
        const id = req.params.id
        console.log(id)
        const userExist = await User.findById({_id:id})
        if (!userExist) {
            console.log(id)
            return res.status(404).json({message : "User not found... Enter user id correctly"})
        }
        await User.findByIdAndDelete(id)
        res.status(201).json({message : "User deleted successfully "})
        
    }catch(error){
        res.status(500).json({error:"Internal Server error"})
    }
}

export const getUserByEmail = async (req, res) => {
    try {
        const { email } = req.params;  // Get email from request parameters
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found with the given email." });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Internal Server error" });
    }
};

