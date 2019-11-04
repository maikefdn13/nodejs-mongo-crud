exports.defaultPageTitle = "Site ABC";

exports.menu = [
    {name:'Home', slug:'/', guest:true, logged:true},
    {name:'Adicionar Post', slug:'/post/add', guest:false, logged:true}, 
    {name:'Cadastro', slug:'/users/register', guest:true, logged:false},  
    {name:'Login', slug:'/users/login', guest:true, logged:false},    
    {name:'Sair', slug:'/users/logout', guest:false, logged:true}
];