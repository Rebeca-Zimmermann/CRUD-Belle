document.addEventListener("DOMContentLoaded", loadProdutos);

const produtoList = document.getElementById("main");
const form = document.querySelector("#form");

const recebe = document.getElementById("produtoID");

async function loadProdutos() {
  produtoList.innerHTML = "";
  try {
    let resposta = await fetch("http://192.168.1.115:3000/api/produtos");
    let produtos = await resposta.json();
    produtos.forEach((prod) => addProdutoToTable(prod));
  } catch (error) {
    console.error("Erro ao carregar produtos:", error);
    alert("Erro ao carregar produtos do servidor.");
  }
}

async function createProduto(
  nome,
  descricao,
  preco,
  quantidade_estoque,
  categoria
) {
  try {
    await fetch("http://192.168.1.115:3000/api/produtos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        descricao,
        preco,
        quantidade_estoque,
        categoria,
      }),
    });
    alert("Produto cadastrado!");
    loadProdutos();
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    alert("Erro ao cadastrar produto.");
  }
}

async function updateProduto(id) {
  console.log(id);
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const preco = document.getElementById("preco").value;
  const quantidade_estoque = document.getElementById("quantidade").value;
  const categoria = document.getElementById("categoria").value;

  try {
    await fetch(`http://192.168.1.115:3000/api/produtos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nome,
        descricao,
        preco,
        quantidade_estoque,
        categoria,
      }),
    });
    alert("Produto atualizado!");
    loadProdutos();
  } catch (error) {
    console.error("Erro ao atualizar produto:", error);
    alert("Erro ao atualizar produto.");
  }
}

async function deleteProduto(id) {
  try {
    await fetch(`http://192.168.1.115:3000/api/produtos/${id}`, {
      method: "DELETE",
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
        <td>${prod.quantidade_estoque}</td>
        <td>${prod.categoria}</td>
        <td>
            <button class="editProduto">🖊 Editar</button>
            <button onclick="deleteProduto(${prod.id})">🗑 Excluir</button>
        </td>
    `;
  produtoList.appendChild(row);

  row.querySelector('.editProduto').addEventListener('click',()=> {
    recebe.value = prod.id;
    document.getElementById("nome").value = prod.nome;
    document.getElementById("descricao").value = prod.descricao;
    document.getElementById("preco").value = prod.preco;
    document.getElementById("quantidade").value = prod.quantidade_estoque;
    document.getElementById("categoria").value = prod.categoria;
    window.scrollTo(0,0);
    console.log(recebe)
  })
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const id = recebe.value;
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const preco = document.getElementById("preco").value;
  const quantidade_estoque = document.getElementById("quantidade").value;
  const categoria = document.getElementById("categoria").value;
  if (id) {
    updateProduto(id,nome, descricao, preco, quantidade_estoque, categoria);
  } else {
    createProduto(nome, descricao, preco, quantidade_estoque, categoria);
  }

  form.reset();
});
