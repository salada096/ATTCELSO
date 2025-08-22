import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
import path from 'path';

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user:   'root',
    database: 'produtos',
    port: '3308'
});

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + "/index.html");
});

app.post('/cadastrar', (req, res) => {
    console.log("Dados recebidos: ", req.body);

    const { nome, preco, quantidade} = req.body;

    const sql = 'INSERT INTO produto ( NOME, PRECO, QUANTIDADE )  VALUES (?, ?, ?)';
        db.query(sql, [nome, preco, quantidade], (err, result) => {
            if (err) {
            console.error('Erro ao inserir dados:', err);
            return res.status(500).send('Erro ao inserir dados.');
            }

            console.log('Dados inseridos com sucesso:', result);
            return res.redirect('/');
        }); 
    });

app.listen(3005, () => {
    console.log('O servidor está na porta http://localhost:3005');
});