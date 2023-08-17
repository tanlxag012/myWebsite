const express = require('express')
const ejs = require('ejs')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const expressSession = require('express-session');

const BlogPost = require('./models/BlogPost.js')
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home.js')
const getPostController = require('./controllers/getPost.js')
const storePostController = require('./controllers/storePost.js')
const newUserController = require('./controllers/newUser.js')
const storeUserController = require('./controllers/storeUser.js')
const loginController = require('./controllers/login.js')
const loginUserController = require('./controllers/loginUser')
const logOutController = require('./controllers/logout.js')
const app = new express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(expressSession({
    secret: 'keyboard cat'
   }))
   
app.listen(4000, () => {
 console.log('App listening on port 4000')
})

global.loggedIn = null;
app.use("*", (req, res, next) => {
 loggedIn = req.session.userId;
 next()
});


const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://nhuttan:bigbang99@cluster0.ovanefl.mongodb.net/', { useNewUrlParser: true });

// const validateMiddleWare = (req, res, next) => {
//     if (req.files == null || req.body.title == null || req.body.title == null) {
//     return res.redirect('/posts/new')
//     }
//     next()
//    }
// app.use('/posts/new',validateMiddleWare)





app.set('view engine','ejs')

    
app.get('/index', (request, response) =>{
        BlogPost.find({})
        .then((success) =>{
            console.log(request.session)
            response.render('index',{
                blogposts: success,
            })
            
        })
        .catch((err)=>{
            
        })
})       

app.get('/about', (req, res) => {
        
    res.render('about');
})
app.get('/contact', (req, res) => {
        
    res.render('contact');
})
        
app.get('/post/:id', getPostController)

app.get('/posts/new', newPostController)

app.post('/posts/store', storePostController)

app.get('/auth/register', newUserController)
    
app.post('/users/register', storeUserController)

app.get('/auth/login', loginController)

app.post('/users/login', loginUserController)

app.get('/auth/logout',logOutController)

app.use((req, res) => res.render('notfound'));