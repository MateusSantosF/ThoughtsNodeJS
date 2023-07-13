const User = require('../models/User')
const Thought = require('../models/Thought');

module.exports = class ThoughtController {

    static async showHome(req, res){
       
        const thoughts = await Thought.findAll({ include:User})     
        const data = thoughts.map( r => r.get({plain:true}));


        res.render('home', {thoughts:data, hasNoThoughts: thoughts.length === 0});
    }

    static async showDashboard(req,res){
        
        let thoughts = []

        if(req.session.userid){
            thoughts = await Thought.findAll({raw:true,where:{userId:req.session.userid}}) 
        }
      
        res.render('thought/dashboard', {thoughts})
    }

    static createThoughtView(req,res){
        res.render('thought/create')
    }

    static async createThought(req,res){
        const {title} = req.body;
        const userId = req.session.userid;
        
        if(title == "" ){
            req.flash('error', 'Insira algum pensamento!')
            res.redirect('/thoughts/create')
            return;
        }

        const thought = {
            title:title,
            UserId: userId
        }
        await Thought.create(thought)

        req.flash('sucess', 'Pensamento criado com sucesso!')
        res.redirect('/thoughts/dashboard')

    }

    static async removeThought(req,res){
        const thoughtId = req.body.thoughtId;

        await Thought.destroy({where:{id:thoughtId}})
        req.flash('sucess', 'Pensamento deletado com sucesso!')
        res.redirect('/thoughts/dashboard')
    }
}