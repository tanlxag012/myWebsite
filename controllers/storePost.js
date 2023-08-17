const BlogPost = require('../models/BlogPost.js')
const path = require('path')
module.exports = (req, res) => {
    let image = req.files.image;
            image.mv(path.resolve(__dirname, 'public/upload/', image.name), function(err){
                
                BlogPost.create({
                    ...req.body,
                    image: '/upload/' + image.name
                    })
                .then((success) =>{
                    res.redirect('/index');
                    console.log(success)
                }).catch((err)=>{
                    console.log(err);
                })
            })
}