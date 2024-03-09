const User = require('../models').users;

exports.CreateUser = async (req, res) => {
    try {
        const { fullname, email, from, to } = req.body
        if (!fullname || !email || !from || !to) {
            return res.json({
                status: 400,
                msg: "All fields are required"
            })
        }
        const user = await User.create({
            fullname: fullname,
            email: email,
            from : from,
            to: to
        })
        
        // await User.save()
        return res.json({ status: 200, msg: "User created successfully" })
    } catch (error) {
        return res.json({ status: 500, msg: error.message })
    }
}


exports.UpdateUser = async(req,res) =>{
    try{
    const {id} = req.params
    const {fullname,email,from,to} = req.body
    if(!fullname || !email || !from || !to){
      return res.json({
        status:400,
        msg:"All fields are required"
      })
    }

    const user = await User.findOne({where:{id:id}})
    if(!user){
      return res.json({
        status:404,
        msg:"User not found"
      })
    }

    user.fullname = fullname
    user.email = email
    user.from = from
    user.to = to

    await user.save()

    return res.json({
      status:200,
      msg:"User updated successfully"
    })

  }catch(error){
    return res.json({status:500,msg:error.message})
  }
}
exports.GetAllUsers = async (req, res) => {
    try {
        const user = await User.findAll({
            order: [['createdAt','DESC']]
        })
        return res.json({status:200, msg:user})
    } catch (error) {
      return res.json({status: 500, msg: error.message})  
    }
}