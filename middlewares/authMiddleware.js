exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error','Ops!, Voce nao tem permissao para acessar esta pagina.');
        res.redirect('/users/login');
        return;
    }

    next();
};

exports.changePassword  = (req, res) => {
    // 1. Confirmar que as senhas batem.
    if(req.body.password != req.body['password-confirm']){
        req.flash('error', 'Senhas nao batem');
        res.redirect('/profile');
        return;
    }

    // 2. Procurar o usuario e trocar a senha dele.
    req.user.setPassword(req.body.password, async () => {
        await req.user.save();

        req.flash('success', 'Senhas alterada com sucesso!');
        res.redirect('/');
    });

    // 3. Redirecionar para a HOME


};