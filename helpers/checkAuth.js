//Checar se o usuário está logado, caso esteja, libera ir para a página seguite, caso contrario, é redirecionado para a página de login
const checkAuth = (req, res, next) => {
    const userId = req.session.userid

    if(!userId){
        res.redirect("/login")
    }

    next()
}

module.exports = checkAuth