const jwt = require("jsonwebtoken");
const JWT_SECRET = "some-very-secure-string";
const bcrypt = require("bcrypt");


const authMiddleware = (req, res, next) =>{
    const authorizationHeader = req.headers["authorization"];

    if(!authorizationHeader){
        return res.status(401).json({
            success:false,
            code:401,
            message:"unauthorized user",
            error:null,
            data:null,
        });
    }
        const [bearer, token] = authorizationHeader.split(" ");
        //console.log(bearer, token);

        if(!bearer || !token || (bearer && bearer !== 'Bearer')){
            return res.status(401).json({
            success:false,
            code:401,
            message:"unauthorized access, authorization informartion is not in a valid format",
            error:null,
            data:null,
            });
        }
        try{
            
            const decodedToken = jwt.verify(token, JWT_SECRET);
            //console.log(decodedToken);
            res.locals.userId =decodedToken.userId;
            next();
        }
        catch(error){
            return res.status(401).json({
            success:false,
            code:401,
            message:"unauthorized access" + " "+ error.message,
            error:null,
            data:null,
            });

        }
    
    }

module.exports.authMiddleware = authMiddleware;