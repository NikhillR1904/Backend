const express = require('express')
const dotenv = require('dotenv')
const { Pool } = require('pg')

dotenv.config();

const app = express()
const port = 5000
app.use(express.json())

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 6543,
  idleTimeoutMillis: 20000,
  max: 10
});


app.get('/test', (_, res) => {
  res.send('working')
})

app.post('/create-employee', async(req,res)=> {

    try {

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
        await pool.query("INSERT INTO employee (f_name, n_name, email, ph, empno, role, dept, date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",[data.f_name, data.n_name, data.email, data.ph, data.empno, data.role, data.dept, data.date]);
        res.status(200).json({ msg: "created record sucessfully", sucess: true });

    }catch (error) {

        res.status(500).json({ msg: "error", sucess: false });

    }

})

app.post('/get-employee',async (req,res)=> {
    try {

        const id = req.body.id;
        const val = await pool.query("SELECT * FROM employee WHERE id=$1",[id]);
        res.status(200).json({ msg: "record found", sucess: true, data: val.rows });

    }catch (error) {

        res.status(500).json({ msg: "error", sucess: false });

    }
})

app.get('/get-all-employee',async (_,res)=> {

    try {

        const val = await pool.query("SELECT id, f_name, n_name FROM employee");
        res.status(200).json({ msg: "record found", sucess: true, data: val.rows });

    }catch (error) {
        
        res.status(500).json({ msg: "error", sucess: false });

    }

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
