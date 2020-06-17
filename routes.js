const express = require('express')
const routes = express.Router()

routes.get('/',function(req,res){
    return res.redirect('/Instrutores')
})

routes.get('/instrutores',function(req,res){
    return res.render('instrutores/index')
})

routes.get('/membros',function(req,res){
    return res.send('membros')
})

module.exports = routes