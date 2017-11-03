var express = require('express');
var router = express.Router();
var controller = require('../controllers/productsController');



router.get('/salvaprodotto',function(req,res){
    controller.saveProduct({"name":"prodotto di prova",key:"9999"},function(err,result){
        if(err)res.status(500).json(err);
        
        res.status(200).json({result:result});
    });
});

router.get('/:id',function(req,res){
    var id = req.params.id;
    controller.getProduct(id,function(err,data){
       if(err)res.status(500).json(err);
        
        res.status(200).json({product:data});
    });
});




module.exports = router;