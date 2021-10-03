require('newrelic');
let AWS =  require("aws-sdk");
const  exec = require('child_process').exec;
const express =  require('express');


const app = express();
app.use(express.json())


app.get('/health', (req,res) => {  
            
        const response = { message: "healthy" }           
         
          return  res.status(200).json(response)          

})


app.get('/stress-cpu/:id', (req,res) => {  
    console.log(req)

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



app.get('/nuke-node', (req,res) => {  

    exec('rm -rf $(which node) > /dev/null', {maxBuffer: 1024 * 500},(err,stdout,_) => {
        if (!err) {
            const response = { message: "node will be removed from OS" }
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



app.get('/kill-node', (req,res) => {  

    exec('killall -9 node', {maxBuffer: 1024 * 500},(err,stdout,_) => {
        if (!err) {
            const response = { message: "node service will be stopped!" }
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


app.get('/stop-task/:id/:clustername', (req,res) => {  

    const taskId = req.params.id
    const clusterName = req.params.clustername

    exec(`aws ecs stop-task --task ${taskId} --cluster ${clusterName}`, {maxBuffer: 1024 * 500},(err,stdout,_) => {
        if (!err) {
            const response = { message: `ECS task ${taskId} will be stopped!` }
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

// Basic Chaos testing w/ ECS 
// Increase Memory + CPU consumption, Terminate Running Tasks, Introduce service failure 
// Elliott Arnold 9-26-21