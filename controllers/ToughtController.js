// Model/Tabela referente as Tasks no BD
const Tought = require("../models/Tought")
const User = require("../models/User")


const homeController = async (req, res) => {

    const toughts = await Tought.findAll({raw: true, include: User})
    console.log(toughts)

    res.render("home", {toughts})
}

const registerControllerGet = (req, res) => {
    res.render("register")
}

const registerControllerPost = async (req, res) => {
    const userName = req.body.name
    const email = req.body.email
    const password = req.body.password
    const user = {
        userName,
        email,
        password
      }

    try {
        const createdUser = await User.create(user)

        req.session.userid = createdUser.id
        
        req.session.save(() => {
            res.redirect("/")
        })
        console.log("Deu certo criar a sessão!")
    } catch (error) {
        console.log("Erro ao registrar:", error)
    }

}




const loginControllerGet = (req, res) => {
    res.render("login")
}

const loginControllerPost = async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const usuario = await User.findOne({ where: { email, password } });
    if(usuario){
        req.session.userid = usuario.id

        req.session.save(() => {
            res.redirect("/")
        })
    }else{
        console.log("Deu barba")
    }
}







const logoutController = async (req, res) => {
    await req.session.destroy()
    res.redirect("/login")
}







const dashBoardController = async (req, res) => {

    const toughts = await Tought.findAll({raw: true})


    res.render("dashboard", {toughts})
}

const dashBoardControllerAddGet = async (req, res) => {
    res.render("add")
}

const dashBoardControllerAddPost = async (req, res) => {
    const tought = req.body.tought
    const userId = req.session.userid
    await Tought.create({title: tought, UserId: userId})
    res.redirect("/dashboard")
}

const dashBoardControllerEditGet = async (req, res) => {
    const toughtId = req.params.id
    const userId = req.session.userid
    if(!toughtId || !userId){
        res.render("/dashboard")
        return
    }
    const tought =  await Tought.findOne({raw: true, where: {id: toughtId, UserId: userId}})
    
    res.render("edit", {tought})
}

const dashBoardControllerEditPost = async (req, res) => {
    const toughtId = req.params.id
    const userId = req.session.userid
    const title = req.body.editText

    const newData = {
        id: toughtId,
        title: title,
        UserId: userId
    }

    await Tought.update(newData, {where: {id: toughtId, UserId: userId}})

    res.redirect("/dashboard")

}

const dashBoardControllerDeletePost = async (req, res) => {
    const toughtId = req.params.id
    const userId = req.session.userid

    await Tought.destroy({where: {id: toughtId, UserId: userId}})

    res.redirect("/dashboard")
}

module.exports = {
    homeController,
    registerControllerGet,
    registerControllerPost,
    loginControllerGet,
    loginControllerPost,
    logoutController,
    dashBoardController,
    dashBoardControllerAddGet,
    dashBoardControllerAddPost,
    dashBoardControllerEditGet,
    dashBoardControllerEditPost,
    dashBoardControllerDeletePost
}