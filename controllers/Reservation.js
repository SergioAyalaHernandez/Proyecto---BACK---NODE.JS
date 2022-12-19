var validator = require("validator");
const Reservation = require("../models/Reservation");
var Gama = require("../models/Reservation");

var controller ={
    save:function(req,res){
        var params = req.body;
        var validateStartDate = !validator.isEmpty(params.startDate);
        var validateDevolutionDate = !validator.isEmpty(params.devolutionDate);
        var validateidVehiculo = !validator.isEmpty(params.devolutionDate);
        var validateidUsuario = !validator.isEmpty(params.devolutionDate);
        
        if(validateStartDate && validateDevolutionDate && validateidVehiculo && validateidUsuario){
            var reservation = new Reservation();
            reservation.startDate = params.startDate;
            reservation.devolutionDate = params.devolutionDate;
            reservation.idVehiculo = params.idVehiculo;
            reservation.idUsuario = params.idUsuario;

            reservation.status = "Created";
            reservation.save((err,reservationStored)=>{
                if(err || !reservationStored){
                    return res.status(404).send({
                        message:"Error al guardar la reserva",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Reservación guardada"
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
        var reservationId = req.params.id;
        console.log(reservationId);
        var validateStartDate = !validator.isEmpty(params.startDate);
        var validateDevolutionDate = !validator.isEmpty(params.devolutionDate);
        var validateidVehiculo = !validator.isEmpty(params.devolutionDate);
        var validateidUsuario = !validator.isEmpty(params.devolutionDate);
        
        if(validateStartDate && validateDevolutionDate && validateidVehiculo && validateidUsuario){
            var update = {
                startDate:params.startDate,
                devolutionDate:params.devolutionDate,
                idUsuario:params.idUsuario,
                idVehiculo:params.idVehiculo,
                status:params.status
            }

            Reservation.findOneAndUpdate({reservationId},update,{new:true},(err,reservationUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"faltan parametros",
                        status:"error"
                        });
                }
                if(!reservationUpdate){
                    return res.status(400).send({
                        message:"Reservación no actualizada",
                        status:"error"
                        });
                }
                return res.status(200).send({
                    message:"Reservación actualizada",
                    status:"success",
                    reservationUpdate
                    });
            });          
            
        }else{
            return res.status(404).send({
            message:"faltan parametros"
            });

        }
        
    },

    eliminar:function(req,res){
        var reservationId = req.params.id;
        Reservation.findOneAndDelete({_id:reservationId},(err,reservationRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en la petición",
                    status:"Error"
                });
            }

            if(!reservationRemoved){
                return res.status(404).send({
                    message:"-reserva no eliminada",
                    status:"Error"
                });
            }

            return res.status(200).send({
                message:"Eliminado exitosamente",
                usuario:reservationRemoved
            });
        })
        
    },


    listarreservations:function(req,res){
        Reservation.find(function(err,doc){
            return res.status(200).send({
                message:"reservations",
                doc
            });        
        });
    },
}

module.exports = controller;