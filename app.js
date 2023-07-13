require('dotenv').config()
const express = require('express')
const exphbs = require('express-handlebars')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const flash = require('express-flash')
const conn = require('./src/db/conn')

const PORT = process.env.PORT | 3000;
const hbs = exphbs.create({
    partialsDir:['views/partials']
})

const app = express();

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', 'src/views')

// midlewares
app.use(flash())
app.use(express.static('src/public'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(session({
    name:'session',
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: ()=>{

        },
        path: require('path').join('./src/', 'sessions'),
    }),
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge: 36000,  
    }
}))


app.use((req,res,next)=>{
    if(req.session.userid){
        res.locals.session = req.session
    }
    next()
})


// models

const User = require('./src/models/User')
const Thought = require('./src/models/Thought')

// Routes

const ThoughtRoutes = require('./src/routes/ThoughtRoutes')
const AuthRoutes = require('./src/routes/AuthRoutes')
app.use('/thoughts', ThoughtRoutes);
app.use('/auth', AuthRoutes);


app.get('/', (req,res)=>{
    res.redirect('/thoughts')   
})
conn
    .sync({force:false})
    .then(()=>{
        app.listen(PORT, ()=>{
            console.log(`Aplicação iniciada da porta ${PORT}`)
        })
    }).catch(err=>{
        console.log(`Erro ao sincronizar banco de dados ${err}`)
    })