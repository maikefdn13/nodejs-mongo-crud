const mongoose = require('mongoose');
const slug = require('slug');

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
    photo:String,
    title:{
        type:String,
        trim:true,
        required:'O post precisa de um titulo'
    },
    slug:String,
    body:{
        type:String,
        trim:true
    },
    tags:[String]

});

postSchema.pre('save', async function(next){
    if(this.isModified('title')){
        this.slug = slug(this.title, {lower:true});

        // EXPRESSAO REGULAR - Verificar a variacao de slug com a mesma expressao.
        const slugRegex = new RegExp(`^(${this.slug})((-[0-9]{1,}$)?)$`,'i');

        // Chama a consulta pelo contrutur da classe.
        const postWithSlug = await this.constructor.find({slug:slugRegex});

        // Atualiza o Slug com a quantidade existente mais um.
        if(postWithSlug.length > 0){
            this.slug = `${this.slug}-${postWithSlug.length + 1}`;
        }

    }

    next();
});

module.exports = mongoose.model('Post', postSchema);