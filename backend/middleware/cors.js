const allowCors= (req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:5173");
    res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,PATCH,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    res.setHeader("Access-Control-Allow-Credentials",true);
    if(req.method==="OPTIONS"){
        return res.sendStatus(200);
    }
    else{
        next();
    }
}
module.exports=allowCors;


