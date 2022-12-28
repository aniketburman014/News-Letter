const express=require('express');
const request=require('request')
const bodyParser=require('body-parser');
const app=express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.get('/',function(req,res){
    res.sendFile(__dirname+'/signup.html');
});

app.post('/',function(req,res){
    var firstName=req.body.fname;
    var lastName=req.body.lname;
    var email=req.body.email;
    console.log(firstName,lastName,email);
    var data={
        members: [{email_address: email, status:"subscribed", merge_fields:{
            FNAME: firstName,
            LNAME: lastName
        }}]
    };
    var Jsondata=JSON.stringify(data);
    var options={
        url: 'https://us21.api.mailchimp.com/3.0/lists/70d0d414e4',
        method: 'Post',
        headers: {
            "Authorization": "aniket1 a5acd68c37962d947e2d316b042f7062-us21"
        },
       body: Jsondata
    };

    request(options,function(error,response,body){
        if(error){
            res.sendFile(__dirname+'/failure.html');
        }
        else{
            if(response.statusCode===200){
                res.sendFile(__dirname+'/success.html');
            }
            else{
                res.sendFile(__dirname+'/failure.html');
            }
        }
    })

})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(3000,function(){
    console.log("Listening at port number 3000");
})