const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.userMiddleWare = (req, res, next)=>{

    let info = {
        name:'Maike', id:123 
    };  
    req.userInfo = info;
    next();
};

exports.index = async (req, res)=>{

    let responseJson = {
        pageTitle:'Home Teste',
        userInfo:req.userInfo,
        posts:[]
    };

    const posts = await Post.find();
    responseJson.posts = posts;

    res.render('home',responseJson);
};