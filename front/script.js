document.addEventListener("DOMContentLoaded", loadProdutos);

const produtoList = document.getElementById("main");
const form = document.querySelector("#form");

async function loadProdutos() {
    produtoList.innerHTML = "";
    try {
        let resposta = await fetch("http://localhost:3000/produtos");
        let produtos = await resposta.json();
        produtos.forEach(prod => addProdutoToTable(prod));
    } catch (error) {
        console.error("Erro ao carregar produtos:", error);
        alert("Erro ao carregar produtos do servidor.");
    }
}

async function createProduto(nome, descricao, preco, quantidade, categoria) {
    try {
        await fetch("http://localhost:3000/produtos/novo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, descricao, preco, quantidade, categoria })
        });
        alert("Produto cadastrado!");
        loadProdutos();
    } catch (error) {
        console.error("Erro ao cadastrar produto:", error);
        alert("Erro ao cadastrar produto.");
    }
}

async function updateProduto() {
    const id = document.getElementById("produtoID").value;
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;
    const quantidade = document.getElementById("quantidade").value;
    const categoria = document.getElementById("categoria").value;

    try {
        await fetch(`http://localhost:3000/produto/alterar/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, descricao, preco, quantidade, categoria })
        });
        alert("Produto atualizado!");
        loadProdutos();
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto.");
    }
}

async function editProduto(id) {
    try {
        let resposta = await fetch(`http://localhost:3000/produto/${id}`);
        let prod = await resposta.json();

        document.getElementById("produtoID").value = prod.id_produto;
        document.getElementById("nome").value = prod.nome;
        document.getElementById("descricao").value = prod.descricao;
        document.getElementById("preco").value = prod.preco;
        document.getElementById("quantidade").value = prod.quantidade;
        document.getElementById("categoria").value = prod.categoria;
    } catch (error) {
        console.error("Erro ao carregar produto:", error);
        alert("Erro ao carregar produto.");
    }
}

async function deleteProduto(id) {
    try {
        await fetch(`http://localhost:3000/produto/excluir/${id}`,
            {
                method: "DELETE"
            });
        alert("Produto excluído!");
        loadProdutos();
    } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto.");
    }
}

function addProdutoToTable(prod) {
    let row = document.createElement("tr");
    row.innerHTML = `
        <td>${prod.nome}</td>
        <td>R$ ${prod.preco}</td>
        <td>${prod.quantidade}</td>
        <td>${prod.categoria}</td>
        <td>
            <button onclick="editProduto(${prod.id_produto})">🖊 Editar</button>
            <button onclick="deleteProduto(${prod.id_produto})">🗑 Excluir</button>
        </td>
    `;
    produtoList.appendChild(row);
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const id = document.getElementById("produtoID").value;
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;
    const quantidade = document.getElementById("quantidade").value;
    const categoria = document.getElementById("categoria").value;

    if (id) {
        updateProduto();
    } else {
        createProduto(nome, descricao, preco, quantidade, categoria);
    }

    form.reset();
});