  const express = require("express");
  const userModel = require("../model/user.js");
  const router = express.Router();

  const bcrypt = require("bcrypt");
  const jwt = require("jsonwebtoken");
  const JWT_SECRET = "some-very-secure-string";

  //validators
  const isValidObject = (obj) => Object.keys(obj).length>0;
  const isValid = (value) => value !== null || typeof value !== 'undefinded'
  const isValidEmail = (email) => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);

  
  //to getallusers
  router.get('/', async (req, res) => { 
      const response ={ 
          success:true,
          code:500,
          message:"user List",
          error:null,
          data:null,
          resource:req.originalUrl
      };
      try{
          const UsersList = await userModel.find();
          response.data = { UsersList };
          return res.status(500).json(response);
      }
      catch(error){
          response.error = error;
          response.message = error.message;
          response.code = error.code ? error.code : 500;
          return res.status(500).json(response);
      }
  });

  //creatUser

      router.post('/signup', async (req, res) =>{
      const user = req.body;
      const response={
        success: true,
        code: 201,
        message: "user crerated successfully",
        error: null,
        data: null,
        resource: req.originalUrl,
      };
      if(!user && !(object.keys(user).length )){
          response.success = false;
          response.code = 400;
          response.message = "Invalid request data";
          response.error = "Invalid request data";
          return res.status(400).json(response);
      };
      if(user.title !== "Mr" && user.title !== "Mrs" && user.title !== "Miss" ){
          response.success = false;
          response.code = 400;
          response.message = "Entered title is not valid";
          response.error = "Entered title is not valid";
          return res.status(400).json(response)
      };
      if(!user.name || typeof user.name !== "string" || user.name.trim().length == 0 ){
          response.success = false;
          response.code = 400;
          response.message = "Invalid request data, Name is required";
          response.error = "Invalid request data.Name is required";
          return res.status(400).json(response)        
      };
      if(!user.email || typeof user.email !== "string" || user.email.trim().length == 0 ){
          response.success = false;
          response.code = 400;
          response.message = "Invalid request data, Email is required";
          response.error = "Invalid request data. Email is required";
          return res.status(400).json(response)        
      };
      if(!user.password || typeof user.password !== "string" || user.password.trim().length == 0 ){
          response.success = false;
          response.code = 400;
          response.message = "Invalid request data, Password is required";
          response.error = "Invalid request data. Password is required";
          return res.status(400).json(response)        
      };
      try {
        const isEmailExist = await userModel.findOne({
          email: user.email,
        });
        if (isEmailExist)
          throw new Error(`This email ${user.email} id is already registered.`);
      } catch (error) {
        return res.status(400).json({
          success: false,
          code: 400,
          message: error.message,
          error: error,
          data: null,
          resource: req.originalUrl,
        });
      }
      const saltRounds = 16;
      const salt = await bcrypt.genSalt(saltRounds);
      const hashPassword = await bcrypt.hash(user.password.trim(), salt);
      const post = new userModel({
        title: user.title,
        name: user.name,
        email: user.email,
        password: hashPassword
    
    })
    try{
    
        const savedPost  = await post.save();
        response.data = { savedPost };
        return res.status(500).json(response);

    }
          catch(error){
              response.error = error;
              response.message = error.message;
              response.code = error.code ? error.code : 500;
              return res.status(500).json(response);

          }
      });

      //login user

      router.post('/login',async (req, res) =>{
        const data = req.body;
        if(!isValid(data) || (isValid(data) && !isValidObject(data))){
          return res.status(400).json({
            success: false,
            code: 400,
            message: "Invalid request body",
            error: null,
            data: null,
            resource: req.originalUrl,
          });
        }
        if(!isValid(data.email || (isValid(data.email) && !isValidEmail(data.email)))){
          return res.status(400).json({
            success: false,
            code: 400,
            message: "Invalid Email Id",
            error: null,
            data: null,
            resource: req.originalUrl,
          });
        }
        if(!isValid(data.password || (isValid(data.password) && !isValidEmail(data.password)))){
          return res.status(400).json({
            success: false,
            code: 400,
            message: "Invalid Password",
            error: null,
            data: null,
            resource: req.originalUrl,
          });
        }

        try{
          const user = await userModel.findOne({ email:data.email});

          if(!user){
            return res.status(404).json({
              success: false,
              code: 404,
              message: "Invalid user credentials",    
              error: null,
              data: null,
              resource: req.originalUrl,
            });
          }
        
          const token = await jwt.sign({userId: user._id}, JWT_SECRET);
          return res.status(200).json({
              success: true,
              code  : 200,
              data: { user, token },  
              message: "Login Successful",
              error: null,
              resource: req.originalUrl,
            });
          }
          catch(error){
            return res.status(400).json({
              success: false,
              code: 400,
              message: "Invalid Login",
              error: null,
              data: null,
              resource: req.originalUrl,
            });
          }
        });
        module.exports = router;

        