var validator = require("validator");
const Reservation = require("../models/Reservation");
var Gama = require("../models/Reservation");

var controller ={
    save:function(req,res){
        var params = req.body;
        var validateStartDate = !validator.isEmpty(params.startDate);
        var validateDevolutionDate = !validator.isEmpty(params.devolutionDate);
        
        if(validateStartDate && validateDevolutionDate){
            var reservation = new Reservation();
            reservation.startDate = params.startDate;
            reservation.devolutionDate = params.devolutionDate;
            reservation.status = "Created";
            reservation.save((err,reservationStored)=>{
                if(err || !reservationStored){
                    return res.status(404).send({
                        message:"Error al guardar la gama",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Reservación guardado"
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
        
        if(validateStartDate && validateDevolutionDate){
            var update = {
                startDate:params.startDate,
                devolutionDate:params.devolutionDate
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
        var params = req.body;
        var reservationId = req.params.id;
        Reservation.findOneAndDelete({_id:reservationId},(err,reservationRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en el id",
                    status:"error"
                    });
            }
            if(!reservationRemoved){
                return res.status(400).send({
                    message:"Reservación no eliminada",
                    status:"error"
                    });
            }
            return res.status(200).send({
                message:"Reservación actualizada",
                status:"success"
            });
        });
        return res.status(200).send({
            message:"Eliminada"
        });
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