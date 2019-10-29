const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res)=>{    
    res.render('postAdd');
}

exports.addAction = async (req, res)=>{    
    const post = new Post(req.body);
    post.tags = [];
    await post.save();
    req.flash('success','Post salvo com sucesso!');
    res.redirect('/');
}