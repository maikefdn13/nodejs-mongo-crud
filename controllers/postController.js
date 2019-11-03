const mongoose = require('mongoose');
const Post = mongoose.model('Post');

exports.add = (req, res)=>{    
    res.render('postAdd');
}

exports.addAction = async (req, res)=>{    
    const post = new Post(req.body);
    post.tags = [];

    try{
        await post.save();
    } catch(error){        
        req.flash('error', 'Erro: '+error.message);
        res.redirect('/post/add');
        return
    }
    
    req.flash('success','Post salvo com sucesso!');
    res.redirect('/');
}

exports.edit = async (req, res)=>{    
    // 1. Pegar as informacoes do post em questao
    const post = await Post.findOne({slug:req.params.slug});

    // 2. Carregar o formulario de edicao
    res.render('postEdit',{post});

}

exports.editAction = async (req, res) => {
    //Essa `e uma forma de usar uma funcao direta, sem necessidade de criar uma costante
    //Foi necessario criar essa modificacao porque o mongose nao excutou o postSchema.pre('save', function(next){});
    req.body.slug = require('slug')(req.body.title,{lower:true});

    //Uso de try para resolver as excecoes, caso o usuario enviar o campo vazio
    try{
        // Procurar o item enviado e pegar os dados e atualizar  
        const post = await Post.findOneAndUpdate(
            {slug:req.params.slug}, // Buscar o post pelo Slug
            req.body, //Objeto com os dados
            {
                new:true, //Retornar NOVO item atualizado.
                runValidators:true // Ativar as validacoes da classe.
            }
        ); 
    }catch(error){
        req.flash('error', 'Erro: '+error.message);
        res.redirect('/post/'+req.params.slug+'/edit');
        return
    }       
    // Mostrar mensagem de sucesso
    req.flash('success','Post atualizado com sucesso!');
    // Redirecionar para Home
    res.redirect('/');
}