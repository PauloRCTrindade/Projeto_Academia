const express = require('express')
const routes = express.Router()
const instrutores = require('./instrutores')

routes.get('/',function(req,res){
    return res.redirect('/instrutores')
})

routes.get('/instrutores',function(req,res){
    return res.render('instrutores/index')
})

routes.get('/instrutores/create',function(req,res){
    return res.render('instrutores/create')
})

routes.get('/instrutores/:id',instrutores.show)

routes.get('/instrutores/:id/edit',instrutores.edit)

routes.post("/instrutores",instrutores.post)

routes.put("/instrutores",instrutores.put)

routes.get('/membros',function(req,res){
    return res.send('membros')
})

module.exports = routes