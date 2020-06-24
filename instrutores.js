const fs = require('fs')
const data = require('./data.json')
const { age, date } = require('./utils')

// Show
exports.show = function(req,res){
    const {id} = req.params

    const foundInstrutores = data.instrutores.find(function(instrutores){
        return instrutores.id == id
    })

    if (!foundInstrutores) return res.send("Instrutor não encontrado")

    const instrutores = {
        ... foundInstrutores,
        idade: age(foundInstrutores.idade),
        funcao: foundInstrutores.funcao.split(","),
        data_inicio: new Intl.DateTimeFormat('pt-BR').format(foundInstrutores.data_inicio),
    }

    return res.render("instrutores/show",{instrutores})
}

// Creat
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

//Edit
exports.edit = function(req,res){
    const {id} = req.params

    const foundInstrutores = data.instrutores.find(function(instrutores){
        return instrutores.id == id
    })

    if (!foundInstrutores) return res.send("Instrutor não encontrado")

    const instrutor = {
        ...foundInstrutores,
        idade: date(foundInstrutores.idade)
    }

    return res.render('instrutores/edit',{ instrutor })
}

// Put
exports.put = function(req,res){
    const {id} = req.body
    let index = 0

    const foundInstrutores = data.instrutores.find(function(instrutores,foundIndex){
        if(instrutores.id == id){
            index = foundIndex
            return true
        }
    })

    if (!foundInstrutores) return res.send("Instrutor não encontrado")

    const instrutor = {
        ...foundInstrutores,
        ...req.body,
        idade: Date.parse(req.body.idade)
    }

    data.instrutores[index] = instrutor

    fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
        if (err) return res.send("[ERRO]")

        return res.redirect(`/instrutores/${id}`)
    })

}