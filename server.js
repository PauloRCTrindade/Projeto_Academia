const express = require('express')
const nunjucks = require('nunjucks')
const routes = require('./routes')


const server = express()

server.use('/public',express.static('public'))
server.use(routes)

server.set('view engine','njk')

nunjucks.configure('views',{
   express: server
})



server.listen(5000,function(){
    console.log('Server rodando')
})



