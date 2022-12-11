var validator = require("validator");
var Message = require("../models/Message");

var controller ={
    save:function(req,res){
        var params = req.body;
        var validateMessageText = !validator.isEmpty(params.messageText);

        if(validateMessageText){
            var message = new Message();
            message.messageText = params.messageText;
            message.save((err,messageStored)=>{
                if(err || !messageStored){
                    return res.status(404).send({
                        message:"Error al guardar la message",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"message guardado"
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
        var messageId = req.params.id;
        var validateMessageText = !validator.isEmpty(params.messageText);
        
        if(validateMessageText){
            var update = {
                messageText:params.messageText,
            }
            Message.findOneAndUpdate({messageId},update,{new:true},(err,messageUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"faltan parametros",
                        status:"error"
                        });
                }
                if(!messageUpdate){
                    return res.status(400).send({
                        message:"message no actualizado",
                        status:"error"
                        });
                }
                return res.status(200).send({
                    message:"message actualizado",
                    status:"success",
                    messageUpdate
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
        var messageId = req.params.id;
        Message.findOneAndDelete({_id:messageId},(err,messageRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en el id",
                    status:"error"
                    });
            }
            if(!messageRemoved){
                return res.status(400).send({
                    message:"Mensaje no eliminado",
                    status:"error"
                    });
            }
            return res.status(200).send({
                message:"Mensaje actualizado",
                status:"success"
            });
        });
        return res.status(200).send({
            message:"Eliminada"
        });
    },

    listarMensajes:function(req,res){
        Message.find(function(err,doc){
            return res.status(200).send({
                message:"Mensajes",
                doc
            });        
        });
    },
}

module.exports = controller;