const bcrypt = require('bcrypt')
const User = require('../models/User')
module.exports = (req, res) => {

    User.findOne({username: req.body.username})
    .then((user)=>{
        if(user)
        {
            bcrypt.compare(req.body.password, user.password, (error, same) => {
                if (same) 
                {
                    req.session.userId = user._id;
                    console.log("đăng nhập thành công")
                    res.redirect('/index')
                }
                else 
                {
                    console.log("Sai")
                    res.redirect('/auth/login')
                }
                })
        }
        else
        {
            res.redirect('/auth/login')
        }
    })
}