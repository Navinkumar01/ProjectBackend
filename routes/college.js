const { response } = require("express");
const express = require("express");
const router = express.Router();
const College = require('../model/college.js');
const { authMiddleware } = require("../authenticate.js");

const JWT_SECRET = "some-very-secure-string";
const isValidObject = (obj) => Object.keys(obj).length>0;

//Fetch posts
router.get('/',authMiddleware, async(req, res) => {             
    const response = {
            success : true,
            code:200,
            message:"College Details",
            error:null,
            data: null,
            resource:req.originalUrl,
    };
    try{
        isDeleted = false;
        res.locals.userId;
        const colleges = await College.find();
        response.data = { colleges };
        return res.status(200).json(response);

    }
    catch(error){
        response.error=error;
        response.message=error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);
    }
});

//getbyId

router.get('/:id', async (req, res) => {
    const collegeId = req.params.id;
    const response = {
        success : true,
        code:200,
        message:"College Details",
        error:null,
        data: null,
        resource:req.originalUrl,
};
   
    try{
        const colleges = await College.findById({_id:collegeId });
    
            if(!colleges) throw new Error("College doesnot exist");
            response.data= { colleges };
            return res.status(500).json(response);
    }
    catch(error){
        response.error=error;
        response.message=error.message;
        response.code = error.code ? error.code : 500;
        return res.status(500).json(response);

    }
});


//Create Post

router.post('/',authMiddleware, async (req, res) =>{
    const college = req.body;
    const response = {
        success : true,
        code:200,
        message:"New College Details Created Successfully",
        error:null,
        data: null,
        resource:req.originalUrl,
    };
    if(!college && !(object.keys(college).length )){
        response.success = false;
        response.code = 400;
        response.message = "Invalid request data";
        response.error = "Invalid request data";
        return res.status(400).json(response);
    }; 
    // if(!college.Name || typeof college.Name !== "string" || college.Name.trim().length == 0 ){
    //     response.success = false;
    //     response.code = 400;
    //     response.message = "Invalid request data. Name is required";
    //     response.error = "Invalid request data.Name is required";
    //     return res.status(400).json(response)        
    // };
    // if(!college.tagline || typeof college.tagline !== "string" || college.tagline.trim().length == 0 ){
    //     response.success = false;
    //     response.code = 400;
    //     response.message = "Invalid request data. Tagline field is required";
    //     response.error = "Invalid request data. Tagline field is required";
    //     return res.status(400).json(response)        
    // }; 
    // if(typeof college.mobile == "Number" || college.mobile.trim().length == 0 ){
    //     response.success = false;
    //     response.code = 400;
    //     response.message = "Invalid request data. Mobile number is required";
    //     response.error = "Invalid request dat. Mobile number is required";
    //     return res.status(400).json(response)        
    // }; 
    // if(!college.address || typeof college.address !== "string" || college.address.trim().length == 0 ){
    //     response.success = false;
    //     response.code = 400;
    //     response.message = "Invalid request data. Address is required";
    //     response.error = "Invalid request data. Address is required";
    //     return res.status(400).json(response)        
    // }; 
    const new_college = new College({
        adminId: res.locals.userId,
        name: college.name,
        tagline: college.tagline,
        mobile: college.mobile,
        address: college.address,
    
    })
    try{
        const savedCollege  = await new_college.save();
        response.data = { savedCollege };
        return res.status(200).json(response);

    }
    catch(err){
        res.json({
            success : false,
            code:404,
            message:err.message,
            error:err,
            data:null,
            resource:req.url,
        })
    }
});


//Update Post

router.put('/:id',authMiddleware, async(req, res) => {
    const userId = req.params.id;
    const college = req.body;
    res.locals.userId;
    try{
         const updatedCollege = await College.updateMany(
            {_id: userId,
              isDeleted: false,
            },
            {$set: {name: college.name,
                   tagline: college.tagline,
                   mobile: college.mobile,
                   address: college.address,
                }}
                );
                res.status(500).json({
                success : true,
                code:200,
                message:"College details Updated Successfully",
                error:null,
                data:updatedCollege,
                resource:req.url
            });
    }
    catch(err){
        res.json({message : "Invalid Request Id"})
    }
})

//Delete Post
router.delete('/:id',authMiddleware, async (req, res) =>{
    const userId = req.params.id;
    if(!isValidObject(userId)){
        res.status(400).json({
            success : false,
            code:400,
            message:"Invalid College ID",
            error:null,
            data:null,
            resource:req.url,
        });
    }
    try{   
        const removedCollege = await College.deleteOne({  _id: userId, isDeleted:false})
        if(!removedCollege){
            res.status(404).json({
                success : false,
                code:400,
                message:"Invalid request, College ID is not found",
                error:null,
                data:null,
                resource:req.url,
            }) 
            }
           res.status(200).json({
           success : true,
           code:200,
           message:"College info deleted successfully",
           error:null,
           data:null,
           resource:req.url,
        })
    }
    catch(err){
     res.status(500).json({
         success : false,
         code:500,
         message:"Invalid Id, College details not found",
         error:null,
         data:null,
         resource:req.url,
     });
    }
    });



module.exports = router;