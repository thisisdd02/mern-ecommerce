import userModel from '../../models/userModel.js';
import bcrypt from 'bcrypt'

const registerUser = async (req, res) => {
    try {
       
        const { email, password, name} = req.body; 
      
      
        //checking user Already exist or not
        const exist = await userModel.findOne({ email })
        if (exist) {
            throw new Error('User Already Exist')
        }  

        if (!email) {
            throw new Error('please provoid Email')
        }

        if (!password) {
            throw new Error('please provoid password')
        }
        if(password.length<8){
            throw new Error('password should be 8 character')
        }
       
        if (!name) {
            throw new Error('please provoid name')
        }
        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        if (!hashedPassword) {
            throw new Error('password hashing failed')
        }  

        const payload ={
            ...req.body,
            role:"GENERAL",
            password:hashedPassword
        }

        const userData = new userModel(payload)
        const saveUser = await userData.save()
        res.json({ success: true, message: "register SuccessFull" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Register Failed' })
    }
}

export { registerUser }