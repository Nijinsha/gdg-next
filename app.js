var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var user            = require('./models/user');
var member          = require('./models/member');
var certificate     = require('./models/certificate')
var badge           = require('./models/badge')
var passport        = require('passport');
var localStrategy   = require('passport-local');
var skey            = 'codename';

app.set('view engine','ejs');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/gdg');


app.use('/',express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
    secret : "Secret word goes here in production",
    resave :false,
    saveUninitialized :false}));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(new localStrategy(user.authenticate()));
    passport.serializeUser(user.serializeUser());
    passport.deserializeUser(user.deserializeUser());    


/*=======================================*/
/*            Routes                     */
/*=======================================*/

//home
app.get('/',function(req,res){
    res.render('home');
});

//members
app.get('/members',function(req,res){
    
    member.find({},function(err,members){
             if(!err){
                res.render('members',{
                    members : members
                });
             }
         });
});

//profile
app.get('/members/:id',function(req,res){
     member.find({username : req.params.id},function(err,result){
            if(!err){
                if(result.username){
                console.log(result);
                return res.render('profile',{
                    result : result
                });}
                else {
                    res.render('404');
                }
            }
     });
});

//login
app.get('/login',function(req,res){
    res.render('login');
});

//login post
app.post('/login',passport.authenticate('local',{
    successRedirect : '/admin',
    failureRedirect : '/login'
}),function(req,res){
    
});

//admin page
app.get('/admin',isLoggedIn,function(req,res){
    res.render('admin');
});

//admin post
app.post('/admin',isLoggedIn,function(req,res){
    var intomember = new member({
        username : req.body.username,
        name     : req.body.name,
        github   : req.body.github,
        twitter  : req.body.twitter,
        jobtitle : req.body.job,
        location : req.body.location 
    });
    intomember.save(function(err){
        if(!err){
         console.log("done");
         
         return res.end();       
                 
      }
        console.log(err);
        

    });
    var intobadge= new badge ({
        badgeid : req.params.badgeid,
        badgeimg: req.params.badgeimg,
        badgetxt : req.params.badgetxt
    }) ;
    intobadge.save(function(err,datas){
        if(!err){
            res.end();
        }
    });
});

//register
app.get('/register',function(req,res){
        res.render('register');
});

//register post
app.post('/register',function(req,res){
    if(req.body.skey === skey){
      user.register(new user({username : req.body.username}),
                             req.body.password,
                             function(err,user){
                                 if(err){
                                     //errror handling
                                 }
                                 passport.authenticate("local")(req,res,function(){
                                                    res.redirect('/login');
                                 });
                             }); 
    }
    else{
        console.log("err");
        res.end();
    }
    
});

//logout
app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
})


//isLogedIn 
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/login');
}


app.listen(3000,function(){
   console.log("Server running at 3000"); 
});

