exports.userMiddleWare = (req, res, next)=>{

    let info = {
        name:'Maike', id:123 
    };  
    req.userInfo = info;
    next();
};

exports.index = (req, res)=>{

    let obj = {
        pageTitle:'Home Teste',
        userInfo:req.userInfo
    };
    res.render('home',obj);
};