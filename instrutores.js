const fs = require('fs')
const data = require('./data.json')

exports.post =  function(req,res){

    const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Por favor preencha todos os campos para prosseguir !!!")
            }
        }

        req.body.nascimento = Date.parse(req.body.nascimento)
        req.body.criar_data = Date.now()

        data.instrutores.push(req.body)

        fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
            if (err) return res.send('Erro ao salvar dados')

            return res.redirect("/instrutores/create")
        })
}