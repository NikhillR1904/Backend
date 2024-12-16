const express = require('express')
const app = express()
const port = 5000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/create-employee',(req,res)=> {
    const data = {
        f_name:string = req.body.fname,
        n_name:string=req.body.nname,
        email:string=req.body.email,
        ph:string=req.body.ph,
        empno:string=req.body.empno,
        role:string=req.body.role,
        dept:string=req.body.dept,
        date:string=req.body.date,
    };
    console.log(data);
    res.send("success")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})