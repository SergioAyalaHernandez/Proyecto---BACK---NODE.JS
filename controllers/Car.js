var validator = require("validator");
var Car = require("../models/Car");

var controller ={
    save:function(req,res){
        var params = req.body;
        var validateName = !validator.isEmpty(params.name);
        var validateBrand = !validator.isEmpty(params.brand);
        var validateYear = !validator.isEmpty(params.year);
        var validateDescription = !validator.isEmpty(params.description);
        
        if(validateName && validateDescription){
            var car = new Car();
            car.name = params.name;
            car.brand = params.brand;
            car.year = params.year;
            car.description = params.description;
            car.payDay = params.payDay;
            car.link = params.link;
            car.save((err,carStored)=>{
                if(err || !carStored){
                    return res.status(404).send({
                        message:"Error al guardar el carro",
                        status: "error"
                    });
                }
                return res.status(200).send({
                    message:"Carro guardado"
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
        var carId = req.params.id;
        console.log(carId);
        var validateName = !validator.isEmpty(params.name);
        var validateBrand = !validator.isEmpty(params.brand);
        var validateYear = !validator.isEmpty(params.year);
        var validateDescription = !validator.isEmpty(params.description);
        
        if(validateName && validateBrand && validateDescription && validateYear){
            var update = {
                name:params.nombre,
                brand:params.brand,
                year:params.year,
                description:params.description,
                payDay:params.payDay,
                link:params.link
            }

            Car.findOneAndUpdate({carId},update,{new:true},(err,carUpdate)=>{
                if(err){
                    return res.status(500).send({
                        message:"faltan parametros",
                        status:"error"
                        });
                }
                if(!carUpdate){
                    return res.status(400).send({
                        message:"carro no actualizado",
                        status:"error"
                        });
                }
                return res.status(200).send({
                    message:"Carro actualizado",
                    status:"success",
                    carUpdate
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
        var carId = req.params.id;
        Car.findOneAndDelete({_id:carId},(err,carRemoved)=>{
            if(err){
                return res.status(500).send({
                    message:"Error en el id",
                    status:"error"
                    });
            }
            if(!carRemoved){
                return res.status(400).send({
                    message:"Carro no eliminado",
                    status:"error"
                    });
            }
            return res.status(200).send({
                message:"Carro actualizado",
                status:"success"
            });
        });
        return res.status(200).send({
            message:"Eliminado"
        });
    },

    listarCarros:function(req,res){
        Car.find(function(err,doc){
            return res.status(200).send({
                message:"Carros",
                doc
            });        
        });
    },
}

module.exports = controller;