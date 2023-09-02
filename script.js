const { fork } = require("child_process");
const express=require("express");
const app=express();
app.use(express.json());
const database=
{ users: [
    {
        id: "1",
        name: "John",
        email: "John@mail.com",
    },
    {
        id: "2",
        name: "Sally",
        email: "Sally@mail.com",
    },
],
blogs:[{ id:"1",
post:"Hi my name is john,I'm new here."
},
{
   id:"2" , post:"My name is Sally."
}
]
};



app.get("/users",(req,res)=>{
    res.json(database.users);

})


app.get("/users/:userId",(req,res)=>{
    const {userId} =req.params;
    const user=database.users.find((user)=>user.id===userId);
    if(user){
        res.json(database.users[userId-1]);
    }
    else{
        res.json("UserId not accurete.")
    }

});
app.post("/users",(req,res)=>{
    const {name,email}=req.body;
    database.users.push({
        id:database.users.length+1,
        name,
        email

    } )
    res.json(`User ${name} has been added.`)
});



app.get("/blogs",(req,res)=>{
    let posts = [];
    for(let j = 0; j < database.blogs.length; j+=1) 
    {
        posts.push(database.blogs[j].post);
    }
    res.json(posts);
});

app.get("/blogs/:blogId",(req,res)=>{
    const {blogId}=req.params;
    var post=database.blogs.find((post)=>post.id===blogId);
    if(post){
        res.json(database.blogs[blogId-1].post);
    }
    else{
        res.json("Post not found");
    }

});

app.post("/blogs",(req,res)=>{
    const {post}=req.body;
    database.blogs.push({
        post:post
    });
res.json(` A New blog post has been added.`);
// res.json(database.blogs)
    
});


app.listen(3000,()=>console.log("server is ready on port 3000"));