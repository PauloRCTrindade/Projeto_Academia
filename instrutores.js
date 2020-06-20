const fs = require('fs')
const data = require('./data.json')

exports.post =  function(req,res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Por favor preencha todos os campos para prosseguir !!!")
        }
    }

    let {avatar_url,nome,nascimento,genero,função} = req.body

    nascimento = Date.parse(req.body.nascimento)
    const  data_inicio = Date.now()
    const  id = Number(data.instrutores.length + 1)

    data.instrutores.push({
        id,
        avatar_url,
        nome,
        nascimento,
        genero,
        função,
        data_inicio
    })

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if (err) return res.send('Erro ao salvar dados')

        return res.redirect("/instrutores/create")
    })
}