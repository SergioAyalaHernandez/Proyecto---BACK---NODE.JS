var validator = require("validator");
var Gama = require("../models/Gama");

var controller ={
    save:function(req,res){
        var params = req.body;
        var validateName = !validator.isEmpty(params.name);
        var validateDescription = !validator.isEmpty(params.description);
        
        if(validateName && validateDescription){
            var gama = new Gama();
            gama.name = params.name;
            gama.description = params.description;
            gama.save((err,gamaStored)=>{
                if(err || !gamaStored){
                    return res.status(404).send({
                        message:"Error al guardar la gama",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Gama guardado"
                });
            });
        }else{
            return res.status(404).send({
                message:"faltan parametros"
            });
        }
    },
}

module.exports = controller;