const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const Profile = require("../models/profile.model");
module.exports.registration = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: 405,
        message: "Method is not allowed.",
      });
    }
    const email_check = await User.findOne({ where: { email: req.body.email } });
    if (email_check) {
      return res.status(409).json({
        status: 409,
        message: "Try another email",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({ email: req.body.email, password: password });
    await Profile.create({email:req.body.email,userId:newUser.id});
    return res.status(200).json({
      status: 200,
      message: "Successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error,
    });
  }
};
module.exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const checkEmail = await User.findAll({where:{ email: email }});
    if (checkEmail.length > 0) {
      const checkPassword = await bcrypt.compare(
        req.body.password,
        checkEmail[0].password
      );
      if (checkPassword) {
        const token = jwt.sign(
          {
            id: checkEmail[0].id,
            email: checkEmail[0].email,
          },
          process.env.JWT_TOKEN
        );
        
        return res.status(200).json({
          access_token: token,
          status:200,
          message: "logged in",
        });
      } else {
        return res.status(401).json({
          status:401,
          message: "Failed",
        });
      }
    } else {
      return res.status(401).json({
        status:401,
        message: "Authentication failed",
      });
    }
  } catch(error){
    return res.status(500).json({
      status:500,
      message: error,
    });
  }
};
module.exports.updateProfile = async (req,res)=>{
  try{
    if(req.method != 'POST'){
      return res.status(405).json({
        status:200,
        message:"Method is not allowed."
      })
    }
    const userProfile = {
      name: req.body.name,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone
    }
    console.log(userProfile);
    await Profile.update(userProfile,{where:{userId:req.id}});
    return res.status(200).json({
      status:200,
      message:"Profile has beed updated."
    })
  }
  catch(error){
    return res.status(500).json({
      status:500,
      message:error
    })
  }
}
module.exports.getProfile = async (req,res)=>{
  try{
    if(req.method != 'GET'){
      return res.status(405).json({
        status:200,
        message:"Method is not allowed."
      })
    }
    const profile = await Profile.findOne({where:{userId:req.id}});
    return res.status(200).json({
      status:200,
      profile:profile
    })
  }
  catch(error){
    return res.status(500).json({
      status:500,
      message:error
    })
  }
}