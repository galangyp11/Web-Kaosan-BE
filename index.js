const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const app = express()

const port = 3069

app.listen(port)
app.use(express.json())
app.use(cors({
    Credential: true,
    origin : 'http://localhost:3000'
}))

const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_kaosan'
})

app.get("/admin", (req, res)=>{
    let sqlQuery = `SELECT * FROM admin`;

    con.query(sqlQuery, (err, rows)=>{
        res.json(rows);
    })
})

app.get("/admin/:id", (req, res)=>{
    const id = req.params.id

    let sqlQuery = `SELECT * FROM admin WHERE id_admin = ${id}`

    con.query(sqlQuery, (err, rows)=>{
        res.json(rows[0])
    })
})

app.get("/barang", (req, res)=> {
    const sqlQuery = `SELECT * FROM barang`

    con.query(sqlQuery, (err, rows)=> {
        res.json(rows)
    })
})

app.post("/barang", (req,res)=>{
    const nama_barang = req.body.nama_barang;
    const deksripsi = req.body.deksripsi;
    const jenis = req.body.jenis;
    const ukuran = req.body.ukuran;
    const warna = req.body.warna;
    const harga = req.body.harga;

    console.log(req.body)

    const sqlQuery = `INSERT INTO barang (nama_barang, deksripsi, jenis, ukuran, warna, harga) VALUES ('${nama_barang}', '${deksripsi}', '${jenis}', '${ukuran}', '${warna}', '${harga}')`

    con.query(sqlQuery, (err, rows) => {
        res.json(rows)
    })
})