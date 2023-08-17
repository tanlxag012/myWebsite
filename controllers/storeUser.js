const User = require('../models/User');
module.exports = (req,res) =>{
    User.find({username: req.body.username})
    .then((data)=>{
        if(data.length == 0)
        {
            User.create(req.body)
            .then((data) =>{
            res.status(400).send('Tạo thành công.');
            })
            
        }else{
            res.status(400).send('Tên đăng nhập đã được sử dụng.');
        }
        
    })

    // const check = User.find({username: req.body.username});
    // console.log(check)
    // if(check === [])
    // {
    //     User.create(req.body)
    //     .then((success) =>{
    //     res.status(400).send('Tạo thành công.');
    //     console.log("Tạo User thành công");
    // })
        
    // }
    // else{
    //     res.status(400).send('Tên đăng nhập đã được sử dụng.');
    // }
    // User.create(req.body)
    // .then((success) =>{
    //     res.status(400).send('Tạo thành công.');
    //     console.log("Tạo User thành công");
    // }).catch((err)=>{
    //     res.status(400).send('Tên đăng nhập đã được sử dụng.');
    //     console.log(err);
    // })
}