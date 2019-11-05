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
        posts:[],
        tags:[],
        tag:''
    };

    responseJson.tag = req.query.t;
    const postFilter = (typeof responseJson.tag != 'undefined')?{tags:responseJson.tag}:{};

    // Usando promise para ganho de tempo na consulta
    const tagsPromise =  Post.getTagsList();
    const postsPromise =  Post.findPosts(postFilter);

    // Execucao do Promisse
    const [ tags, posts ] = await Promise.all([tagsPromise, postsPromise]);
  

    for(let i in tags){
       if(tags[i]._id == responseJson.tag ){
            tags[i].class = "selected";
       } 
    }

    responseJson.tags = tags;    
    responseJson.posts = posts;

    res.render('home',responseJson);
};