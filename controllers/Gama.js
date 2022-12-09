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

    update:function(req,res){
        var params = req.body;
        var gamaId = req.params.id;
        console.log(gamaId);
        var validateName = !validator.isEmpty(params.name);
        var validateDescription = !validator.isEmpty(params.description);
        
        if(validateName && validateDescription){
            var update = {
                name:params.nombre,
                description:params.description
            }

            Gama.findOneAndUpdate({gamaId},update,{new:true},(err,gamaUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"faltan parametros",
                        status:"error"
                        });
                }
                if(!gamaUpdate){
                    return res.status(400).send({
                        message:"gama no actualizada",
                        status:"error"
                        });
                }
                return res.status(200).send({
                    message:"gama actualizada",
                    status:"success",
                    gamaUpdate
                    });
            });          
            
        }else{
            return res.status(404).send({
            message:"faltan parametros"
            });

        }
        
    },

    eliminar:function(req,res){
        var params = req.body;
        var gamaId = req.params.id;
        Gama.findOneAndDelete({_id:gamaId},(err,gamaRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en el id",
                    status:"error"
                    });
            }
            if(!gamaRemoved){
                return res.status(400).send({
                    message:"Gama no eliminada",
                    status:"error"
                    });
            }
            return res.status(200).send({
                message:"Gama actualizada",
                status:"success"
            });
        });
        return res.status(200).send({
            message:"Eliminada"
        });
    },

    listarGamas:function(req,res){
        Gama.find(function(err,doc){
            console.log(doc);
            return res.status(200).send({
                message:"Gamas",
                doc
            });        
        });
    },
}

module.exports = controller;