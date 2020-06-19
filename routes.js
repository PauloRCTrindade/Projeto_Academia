const express = require('express')
const routes = express.Router()

routes.get('/',function(req,res){
    return res.redirect('/instrutores')
})

routes.get('/instrutores',function(req,res){
    return res.render('instrutores/index')
})

routes.get('/instrutores/create',function(req,res){
    return res.render('instrutores/create')
})

routes.post("/instrutores",function(req,res){
    return res.send('instrutores')
})

routes.get('/membros',function(req,res){
    return res.send('membros')
})

module.exports = routes