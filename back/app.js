import express from 'express';
import cors from 'cors';
import sql from './database.js';


const app = express();
app.use(cors());
app.use(express.json());

// Listar todos os produtos
app.get('/produtos', async (req, res) => {
    try {
        const produtos = await sql`SELECT * FROM produtos`;
        res.status(200).json(produtos);
    } catch (error) {
        console.error(error);
        res.status(500).json("Erro ao buscar produtos");
    }
});

// Criar produto
app.post('/produtos/novo', async (req, res) => {
    try {
        const { nome, descricao, preco, quantidade, categoria } = req.body;
        await sql`
            INSERT INTO produtos (nome, descricao, preco, quantidade, categoria) 
            VALUES (${nome}, ${descricao}, ${preco}, ${quantidade}, ${categoria})
        `;
        res.status(201).json("Produto cadastrado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).json("Erro ao cadastrar produto");
    }
});

// BUSCAR produto por ID
app.get('/produto/:id', async (req, res) => {
  const { id } = req.params;
  const produto = await sql`SELECT * FROM produtos WHERE id_produto = ${id}`;
  res.status(200).json(produto[0]);
});

// Atualizar produto
app.put('/produto/alterar/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, descricao, preco, quantidade, categoria } = req.body;
    try {
        await sql`
            UPDATE produtos 
            SET nome=${nome}, descricao=${descricao}, preco=${preco}, quantidade=${quantidade}, categoria=${categoria}
            WHERE id_produto=${id}
        `;
        res.status(200).json("Produto atualizado com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).json("Erro ao atualizar produto");
    }
});

// Excluir produto
app.delete('/produto/excluir/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql`DELETE FROM produtos WHERE id_produto = ${id}`;
        res.status(200).json("Produto excluído com sucesso!");
    } catch (error) {
        console.error(error);
        res.status(500).json("Erro ao excluir produto");
    }
});


app.listen(3000, () => {
    console.log("Rodando na porta 3000 🚀");
});