const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
module.exports.registration = async (req, res) => {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({
        status: "405",
        mgs: "method not allowed",
      });
    }
    const email_check = await User.findOne({ where: { email: req.body.email } });
    if (email_check) {
      return res.status(409).json({
        status: 409,
        mgs: "Try another email",
      });
    }
    const password = await bcrypt.hash(req.body.password, 10);
    await User.create({ email: req.body.email, password: password });
    return res.status(200).json({
      status: 200,
      mgs: "successfully created",
    });
  } catch (error) {
    return res.status(500).json({
      status: 500,
      mgs: "server error",
    });
  }
};
module.exports.login = async (req, res) => {
  console.log(req.method);
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
        
        res.status(200).json({
          access_token: token,
          mgs: "logged in",
          status:200
        });
      } else {
        res.status(401).json({
          mgs: "Failed",
        });
      }
    } else {
      res.status(401).json({
        mgs: "Authentication failed",
      });
    }
  } catch {
    res.status(500).json({
      mgs: "Server error",
    });
  }
};