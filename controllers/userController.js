const User = require('../models/User');

exports.login = (req, res)=>{
    res.render('login');
};

exports.loginAction = (req, res)=>{
    const auth = User.authenticate();

    auth(req.body.email, req.body.password, (error, result) =>{
        if(!result){           
            req.flash('error', 'Seu e-mail e/ou senha estao errados!');
            res.redirect('/users/login');
            return;
        }

        req.login(result,()=>{});        

        req.flash('success','Voce foi logado com sucesso!');
        res.redirect('/');
    });
};

exports.register = (req, res)=>{
    res.render('register');
};

exports.registerAction = (req, res)=>{
    const newUser = new User(req.body)
    User.register(newUser, req.body.password, (error)=>{
        if(error){
            req.flash('error','Ocorreu um erro, tente mais tarde');
            console.log('Erro ao registrar', error);
            res.redirect('/users/register');
            return;
        }
        req.flash('success','Registro efetuado com sucesso. Faca o Login.');
        res.redirect('/users/login');
    });
};

exports.logout = (req, res)=>{
    req.logout();
    res.redirect('/');
};

exports.profile = (req, res) => {
    res.render('profile');
};

exports.profileAction = async (req, res) => {
    try{    
        const user = await User.findOneAndUpdate(
            { _id:req.user._id },
            { name:req.body.name, email:req.body.email },
            { new:true, runValidators:true }
        );
    } catch(e){
        req.flash('error', 'Ocorreu algum error'+e.message);
        res.redirect('/profile');
        return;
    }

    req.flash('success', 'Dados atualizados com sucesso!');
    res.redirect('/profile');
};