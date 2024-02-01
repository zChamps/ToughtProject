const express = require("express")
//Importando a view engine
const exphbs = require("express-handlebars")
//Importando os dois arquivos para armazenar dados na sessão
const session = require("express-session")
const FileStore = require("session-file-store")(session)
//Uso das flash massages
const flash = require("express-flash")



const app = express()

//Importando a conexão com o BD
const conn = require("./db/conn")

//Chamando as rotas
const Routes = require("./routes/Routes")

//Setando a engine com oo handlebars
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")


app.use(
  express.urlencoded({
    extended: true,
  }),
)




// Configuração do MiddleWare das sessões, onde ele vai armazenar os dados de login e registro no navegador
app.use(
  session({
    name: 'session',
    secret: 'nosso_secret',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  }),
)


// flash messages
app.use(flash());




// set session to res
app.use((req, res, next) => {

  //Definido o userid na sessão
  if (req.session.userid) {
    res.locals.session = req.session;
  }

  next();
});















//Definindo o arquivo de rotas para as rotas a partir de /tasks
app.use("/", Routes)


//Transformar o retorno do body em json  
app.use(express.json())


//Setando a pasta public como pasta pai para os arquivos estáticos, como css
app.use(express.static("public"))


//Fazer o bd ficar ativo e após isso deixar o servidor on
conn.sync().then(() => {
    app.listen(3000)
}).catch(error => console.log(error))