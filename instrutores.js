const fs = require('fs')
const data = require('./data.json')

exports.show = function(req,res){
    const {id} = req.params

    const foundInstrutores = data.instrutores.find(function(instrutores){
        return instrutores.id == id
    })

    if (!foundInstrutores) return res.send("Instrutor não encontrado")

    function age(timestamp){
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()){
            age = age - 1
        }

        return age
    }

    const instrutores = {
        ... foundInstrutores,
        idade: age(foundInstrutores.idade),
        funcao: foundInstrutores.funcao.split(","),
        data_inicio: new Intl.DateTimeFormat('pt-BR').format(foundInstrutores.data_inicio),
    }

    return res.render("instrutores/show",{instrutores})
}

exports.post =  function(req,res){

    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ""){
            return res.send("Por favor preencha todos os campos para prosseguir !!!")
        }
    }

    let {avatar_url,nome,idade,genero,funcao} = req.body

    idade = Date.parse(req.body.idade)
    const  data_inicio = Date.now()
    const  id = Number(data.instrutores.length + 1)

    data.instrutores.push({
        id,
        avatar_url,
        nome,
        idade,
        genero,
        funcao,
        data_inicio
    })

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if (err) return res.send('Erro ao salvar dados')

        return res.redirect("/instrutores/create")
    })
}