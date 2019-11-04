module.exports.isLogged = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.flash('error','Ops!, Voce nao tem permissao para acessar esta pagina.');
        res.redirect('/users/login');
        return;
    }

    next();
};