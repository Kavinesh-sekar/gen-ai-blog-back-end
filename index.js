const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const {blogPosts,addBlog} = require('./blogPost');
dotenv.config();

let port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

// console.log('bb',blogPosts);


app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        error: err.message || 'Something went wrong'
    });
});


app.get('/api/get_all_blog',(req,res,next)=>{
try{
    
    res.status(200).json({
     'message' :'Fetch All blog',
        'data':blogPosts
    })
}catch(err){
   next(err);
}
})

app.get('/api/get_blog/:blog_id',(req,res,next)=>{
    try{

        let requestedId = req.params;

        console.log('requestedId',requestedId);
        

        let blog = blogPosts.filter((e)=>e.id === Number(requestedId.blog_id));

        // console.log('bb',blog);
        
        res.status(200).json({
            'message' :'Fetch specific blog',
            'data':blog
        })
    }catch(err){
       next(err);
    }
    })

    app.post('/api/create_blog',(req,res,next)=>{
        try{

            let {blogData} = req.body

            console.log('rrrrrrrrr',req.body);


            let a = addBlog(req.body);

            

            console.log('aaaaaaa',a);
            
            
            res.status(200).json({
             'message' :'Fetch All blog',
                'data':blogPosts
            })
        }catch(err){
           next(err);
        }
        })


        app.delete('/api/delete_blog/:blog_id',(req,res,next)=>{
            try{
        
                let requestedId = req.params;
        
                console.log('requestedId',requestedId);
                
                const index = blogPosts.findIndex(item => item.id === Number(requestedId) );

                    if (index !== -1) {
                        blogPosts.splice(index, 1); 
                    }

                    console.log('fffffff',blogPosts.length);
                    
        
                // let blog = blogPosts.filter((e)=>e.id === Number(requestedId.blog_id));
        
                // console.log('bb',blog);
                
                res.status(200).json({
                    'message' :'Blog delete sucess',
                    'data':[]
                })
            }catch(err){
               next(err);
            }
            })

app.listen(port,()=>{
    console.log(`server running port ${port}`)
})  