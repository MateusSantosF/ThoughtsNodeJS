

const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static showLogin(req, res){
        res.render('auth/login');
    }

    static showRegister(req, res){
        res.render('auth/register');
    }

    static async logout(req,res){
        req.session.destroy()
        res.redirect('/auth/login')
    }

    static async auth(req,res){
        const {email, password} = req.body;



        if(email == '' || password == ''){
            req.flash('error', 'Preencha todos os campos');
            res.render('auth/login')
            return;
        }

     
        const user = await User.findOne({raw:true,where:{email:email}});

        if(!user){
            req.flash('error', 'Usuário não encontrado');
            res.render('auth/login')
            return;
        }
        
        const matchPassword = bcrypt.compareSync(password, user.password);

        if(!matchPassword){
            req.flash('error', 'Senha incorreta.');
            res.render('auth/login')
            return;
        }

        req.session.userid = user.id;
        req.flash('success', 'Login realizado com sucesso')

        req.session.save(()=>{
            res.redirect('/')
        })

    }
    
    static async register(req,res){

        const {name, email, password, confirmPassword} = req.body;


        if(email == "" || name == ""  || password == "" || confirmPassword == ""){
            req.flash('error', 'Preencha todos os campos');
            res.render('auth/register')
            return;
        }

        if(password != confirmPassword){
            req.flash('error', 'As senhas não conferem, tente novamente');
            res.render('auth/register')
            return;
        }

        const checkIfUserExists = await User.findOne({where:{email:email}})
   
        if(checkIfUserExists){
            req.flash('error', 'O email já está em uso');
            res.render('auth/register')
            return;
        }

    
        const user  = {
            name,
            email,
            password: generateHashedPassword(password)
        }
        try{
            const createdUser = await User.create(user);

            req.session.userid = createdUser.id;

            req.flash('success', 'Cadastro realizado com sucesso!')

            req.session.save(()=>{
                res.redirect('/')
            })
           
        }catch(err){    

        }
    }
}

const generateHashedPassword = (password)=>{

    const salt = bcrypt.genSaltSync(10)
    const passwordHashed = bcrypt.hashSync(password, salt)

    return passwordHashed;
}