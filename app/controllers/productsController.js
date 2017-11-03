var pg = require('pg');

module.exports = {    
    getProduct: function(idProduct,callback){
        callback(null,idProduct);
    },
    saveProduct: function(product,callback){
        
        callback(null,"Prodotto salvato con successo");
    }
}