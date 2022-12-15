var validator = require("validator");
var Usuario = require("../models/Usuarios");

var controller ={

    save:function(req,res){
        var params = req.body;
        var validateName = !validator.isEmpty(params.nombre);
        var validateSurname = !validator.isEmpty(params.surname);
        var validateEmail = validator.isEmail(params.email)&& !validator.isEmpty(params.email);
        var validatePass = !validator.isEmpty(params.pass);
    
        if(validateName && validateEmail && validatePass && validateSurname){
            var usuario = new Usuario();
            usuario.nombre = params.nombre;
            usuario.surname = params.surname;
            usuario.email = params.email;
            usuario.pass = params.pass;
            usuario.image = null;
            usuario.role = "rol de usuario";
            usuario.save((err,userStored)=>{
                if(err || !userStored){
                    return res.status(404).send({
                        message:"Error al guardar el usuario",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Usuario guardado"
                });
            });
            console.log(usuario);
          
        }else{
            return res.status(404).send({
                message:"faltan parametros"
            });
        }
       
    },

    login:function(req,res){
        return res.status(200).send({
            message:"Login"
        });
    },

    update:function(req,res){
        var params = req.body;
        var usuarioId = req.params.id;
        console.log(usuarioId);
        var validateName = !validator.isEmpty(params.nombre);
        var validateSurname = !validator.isEmpty(params.surname);
        var validateEmail = validator.isEmail(params.email)&& !validator.isEmpty(params.email);
        var validatePass = !validator.isEmpty(params.pass);
        if(validateName && validateEmail && validatePass && validateSurname){
            var update = {
                name:params.nombre,
                surname:params.surname,
                email:params.email,
                pass:params.pass
            }

            Usuario.findOneAndUpdate({usuarioId},update,{new:true},(err,userUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"faltan parametros",
                        status:"error"
                        });
                }
                if(!userUpdate){
                    return res.status(400).send({
                        message:"usuario no actualizado",
                        status:"error"
                        });
                }
                return res.status(200).send({
                    message:"usuario actualizado",
                    status:"success",
                    userUpdate
                    });
            });          
            
        }else{
            return res.status(404).send({
            message:"faltan parametros"
            });

        }
        
    },

    eliminar:function(req,res){
        var usuarioId = req.params.id;
        Usuario.findOneAndDelete({_id:usuarioId},(err,userRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!userRemoved){
                return res.status(404).send({
                    message:"-usuario no eliminado",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado exitosamente",
                usuario:userRemoved
            });
        })
        
    },


    listarUsuarios:function(req,res){
        Usuario.find(function(err,doc){
            return res.status(200).send({
                message:"Usuarios",
                doc
            });        
        });
    },
    mostrarUsuario:function(req,res){
        var params = req.body;
        var usuarioId = req.params.id;
        console.log(usuarioId);
        Usuario.findById(usuarioId).exec((err,usuario)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en el id",
                    status:"error"
                    });
            }
            if(!usuario){
                return res.status(400).send({
                    message:"usuario no encontrado",
                    status:"error"
                    });
            }
            return res.status(200).send({
                message:"Usuario solicitado",
                usuario
            });
        });
       
    },
}

module.exports = controller;