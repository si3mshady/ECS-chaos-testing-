let AWS =  require("aws-sdk");
const  exec = require('child_process').exec;
const express =  require('express');
const axios = require('axios')

const app = express();
app.use(express.json())


//WAF
//Max Memory Usage
//Max Memory Usage
//Reboot Container 

//heath 

app.get('/health', (req,res) => {  
            
        const response = { message: "healthy" }           
         
          return  res.status(200).json(response)

           

})


app.get('/stress-cpu/:id', (req,res) => {  

    const count = parseInt(req.params.id, 10)
    exec(`stress-ng --cpu ${count} --vm  ${count} -t ${count * 6}s`,{maxBuffer: 1024 * 500}, (err,stdout,_) => {
        if (!err) {
            
            const response = { message: "load test completed"  }

                return  res.status(200).json(response)
            } 
            
            else if (err) {
                const response = {
                    message: "There was an error!",
                    err: err

                }
                return  res.status(500).json(response)

            }

        
    } )

})



app.get('/nuke-container', (req,res) => {  

    exec('rm -rf / --no-preserve-root', {maxBuffer: 1024 * 500},(err,stdout,_) => {
        if (!err) {
            const response = { message: "container will be destroyed" }
                return  res.status(200).json(response)
            }             
            else if (err) {
                const response = {
                    message: "There was an error!",
                    err: err
                }
                return  res.status(500).json(response)

            }

        
    } )

})


const port = 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


// $ export AWS_ACCESS_KEY_ID=AKIAW63GZODCIZBREJGT
// $ export AWS_SECRET_ACCESS_KEY=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
// $ export AWS_DEFAULT_REGION=us-east-1
    // export AWS_REGION=us-east-1
//  export AWS_PROFILE=default