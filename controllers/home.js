const BlogPost = require('../models/BlogPost.js');

module.exports = (req, res) =>{
    BlogPost.find({})
        .then((success) =>{
            console.log(success);
            response.render('index',{
                blogposts: success,
            })
            
        })
        .catch((err)=>{
                console.log("Thất bại");
        })
}