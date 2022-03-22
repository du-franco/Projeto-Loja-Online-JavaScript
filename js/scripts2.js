class Produto {

    constructor() {
        this.id = 1;
        //this.nomeProduto = "";
        //this.valor = 0;

        this.arrayProdutos = [];
        this.editId = null;
        this.verificaFoto = true;
        //this.foto = "";

        let foto = document.getElementById("imgFoto");
        let arquivo = document.getElementById("flImage");

        // let foto = $("#imgFoto");
        //let arquivo = $("#flImage");


        arquivo.addEventListener("change", (e) => {


            let leitor = new FileReader();

            leitor.onload = () => {
                foto.src = leitor.result;
            }
            leitor.readAsDataURL(arquivo.files[0]);




        })



    }

    //********************** AÇÃO NÚMERO 0 *******************************************************/
    salvar() {
        //alert("vamos adicionar um produto");
        //this.lerDados();

        let produto = this.lerDados();
        if (this.validaCampos(produto)) {
            if (this.editId == null) {
                this.adicionar(produto);
            } else {
                console.log(produto);
                this.atualizar(this.editId);
            }
        }
        this.listaTabela();
        this.cancelar();
        console.log(this.arrayProdutos);
        localStorage.setItem("meusProdutos", JSON.stringify(this.arrayProdutos));

    }

    //********************** AÇÃO NÚMERO 04 *******************************************************/
    listaTabela() {
        let tbody = document.getElementById("tbody");

        tbody.innerText = "";

        for (let i = 0; i < this.arrayProdutos.length; i++) {

            let newTr = tbody.insertRow();

            let td_id = newTr.insertCell();
            let td_nome = newTr.insertCell();
            let td_valor = newTr.insertCell();
            let td_acoes = newTr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_nome.innerText = this.arrayProdutos[i].nome;
            td_valor.innerText = this.arrayProdutos[i].valor;

            td_id.classList.add("center");
            td_acoes.classList.add("center");

            let imgEdit = document.createElement("img");
            imgEdit.src = "./imagens/edit.png"

            imgEdit.setAttribute("onclick", "produto.preparaEdicao(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDelete = document.createElement("img");
            imgDelete.src = "./imagens/delete.png"

            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);

        }
    }

    //********************** AÇÃO NÚMERO 03 *******************************************************/
    adicionar(produto) {
        this.arrayProdutos.push(produto);
        $("#flImage").val("");
        this.id++;
    }

    preparaEdicao(dados) {
        //alert(dados.id);

        this.editId = dados.id;
        document.getElementById("nomeProduto").value = dados.nome;
        document.getElementById("valorProduto").value = dados.valor;

        let foto = document.getElementById("imgFoto");
        if (dados.foto == "undefined") {
            foto.src = "./imagens/camera.png";
        } else {
            foto.src = dados.foto;
        }

        document.getElementById("btn1").innerText = "Atualizar";
    }

    atualizar(id) {
        //alert(id);

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (id == this.arrayProdutos[i].id) {
                this.arrayProdutos[i].nome = document.getElementById("nomeProduto").value;
                this.arrayProdutos[i].valor = document.getElementById("valorProduto").value

                if ($("#flImage").val() != "") {
                    let nomeDoArquivo = $("#flImage")[0].files[0].name;
                    this.arrayProdutos[i].foto = "imagens/" + nomeDoArquivo;
                }
            }
        }

        this.editId = null;
        $("#flImage").val("");
    }

    //********************** AÇÃO NÚMERO 01 *******************************************************/
    lerDados() {
        //alert("ler Dados");

        let produto = {};

        produto.id = this.id;
        produto.nome = document.getElementById("nomeProduto").value;
        produto.valor = document.getElementById("valorProduto").value;

        if ($("#flImage").val() != "") {
            let nomeDoArquivo = $("#flImage")[0].files[0].name;
            produto.foto = "imagens/" + nomeDoArquivo;
        } else {
            produto.foto = "./imagens/camera.png";
            this.verificaFoto = true;
        }

        let foto = document.getElementById("imgFoto");
        foto.src = "./imagens/camera.png";



        return produto;

    }

    //********************** AÇÃO NÚMERO 02 *******************************************************/
    validaCampos(produto) {

        let msg = "";

        if (produto.nome == "") {
            msg += "- informe o nome do produto \n";
        }
        if (produto.valor == "") {
            msg += "- informe o preço do produto \n";
        }
        if (msg != "") {
            alert(msg);
            return false;
        }

        return true;

    }

    //********************** AÇÃO NÚMERO 05 *******************************************************/
    cancelar() {
        //alert("produto deletado");

        document.getElementById("nomeProduto").value = "";
        document.getElementById("valorProduto").value = "";

        document.getElementById("btn1").innerText = "Salvar";
        this.editId = null;
    }

    deletar(idProcurado) {
        //alert("Vamos deletar o id: " + id);

        //console.log(this.arrayProdutos);

        if (confirm("Deseja realmente deletar o produto ID: " + idProcurado)) {
            let tbody = document.getElementById("tbody");

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == idProcurado) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
            localStorage.setItem("meusProdutos", JSON.stringify(this.arrayProdutos));
        }
        //console.log(this.arrayProdutos);

    }
}

var produto = new Produto();

function exibeCards() {
    let produtosCards = JSON.parse(localStorage.getItem("meusProdutos"));
    console.log(produtosCards);
    let i = 1;

    for (i = 0; i < produtosCards.length; i++) {
        //criação de uma variável para a div <div class="col-lg-3 col-md-6 col-sm-12">
        let coluna = document.createElement('div');
        // criação de uma variável pra o id da coluna criada
        let idColuna = document.createAttribute('id');

        //para div criada, estamos atribuindo as suas classes
        coluna.classList.add("col-lg-3", "col-md-6", "col-sm-12");
        //atribuindo para o id da coluna coluna1
        idColuna.value = "coluna" + i;
        //atrelando o id criado com a div coluna
        coluna.setAttributeNode(idColuna);
        //colocando no arquivo HTML a div criada
        document.querySelector("#linhaProdutos").appendChild(coluna);

        //*********************************************************************/

        //criação de uma variável para a div <div class="card" style="width: 17rem;">
        let card = document.createElement('div');
        // criação de uma variável pra o id do card
        let idCard = document.createAttribute('id');

        //adicionando a classe card para a div criada
        card.classList.add("card");
        // colocamos o valor para o id do card
        idCard.value = "card" + i;
        // atribuimos o id para o card
        card.setAttributeNode(idCard);
        //colocamos estilos para o card
        card.style.width = "17rem";
        //adicionando a div card ao DOM
        document.querySelector("#coluna" + i).appendChild(card);

        //*************************************************************************/

        // criação da tag imagem -  <img src="img/banana.jpg" class="card-img-top">
        let imagem = document.createElement('img');
        //adicionando a classe para a tag imagem
        imagem.classList.add("card-img-top");
        //adicionando o caminho do arquivo da imagem
        imagem.src = produtosCards[i].foto;
        //adicionando a imagem card ao DOM
        document.querySelector("#card" + i).appendChild(imagem);

        //criação da div que representa o corpo do card <div class="card-body">
        let divBodyCard = document.createElement('div');
        // criação de um id para a div BodyCard
        let idDivCard = document.createAttribute('id');

        //adicionando a classe "card-body" a div que acabamos de criar
        divBodyCard.classList.add("card-body");
        //colocando o valor para o id da div
        idDivCard.value = "bodyId" + i;
        //atribuindo o id criado para essa nova div
        divBodyCard.setAttributeNode(idDivCard);
        //acrescentando no DOM a div criada
        document.querySelector("#card" + i).appendChild(divBodyCard);

        // criando o cabeçalho do car <h5 class="card-title">Banana</h5>
        let titleCard = document.createElement('h5');
        //atribuimos para esse elemento a classe "card-title"
        titleCard.classList.add("card-title");
        //adicionamos o texto "Banana"
        titleCard.innerHTML = produtosCards[i].nome;
        //acrescentando no DOM h5 na div criada
        document.querySelector("#bodyId" + i).appendChild(titleCard);

        let textoCard = document.createElement('p');
        textoCard.classList.add("card-text");
        textoCard.innerHTML = "Frutas deliciosas vindas direto da fazenda da família Schmitt";
        document.querySelector("#bodyId" + i).appendChild(textoCard);

        //criando o botão final do card <a href="#" class="btn btn-primary">Comprar</a>
        let botaoCard = document.createElement('button');
        botaoCard.classList.add("btn", "btn-primary");
        botaoCard.innerHTML = "Comprar";
        document.querySelector("#bodyId" + i).appendChild(botaoCard);
    }
}
function exibeCards2() {
    let produtosCards = JSON.parse(localStorage.getItem("meusProdutos"));
    console.log(produtosCards);

    let containerCards = document.getElementById("linhaProdutos");

    for (i = 0; i < produtosCards.length; i++) {

        containerCards.innerHTML += `
    <div class="col-lg-3 col-md-6 col-sm-12">
          <div class="card" style="width: 17rem;">
            <img src="` + produtosCards[i].foto + `" class="card-img-top">
            <div class="card-body">
              <h5 class="card-title fw-bolder"> ${produtosCards[i].nome}</h5>
              <p class="card-text">Frutas deliciosas vindas direto da fazenda da família Schmitt</p>
              <p class="fw-bolder"> R$ ${parseFloat(produtosCards[i].valor).toFixed(2)}</p>
              <a href="#" class="btn btn-primary">Comprar</a>
            </div>
          </div>
        </div>
    `;

    }

}

function exibeCarrinho() {

    let carrinho = document.getElementById("listaCarrinho");
    let produtosCarrinhos = JSON.parse(localStorage.getItem("meusProdutos"));
    for (let i = 0; i < produtosCarrinhos.length; i++) {
        carrinho.innerHTML += `<li class="list-group-item my-2 py-3">
    <div class="row">
        <div class="col-lg-2 col-md-3 col-sm-4">
            <img src="${produtosCarrinhos[i].foto}" class="img-thumbnail" alt="${produtosCarrinhos[i].nome}">
        </div>
        <div class="col-lg-7 col-md-9 col-sm-8 align-self-center">
            <h5 class="fw-bold">${produtosCarrinhos[i].nome}</h5>
            <h5>Frutas deliciosas direto da fazenda Schmitt</h5>
        </div>
        <div class="col-lg-3 col-md-4 col-sm-6">
            <div class="input-group mb-3 p-3">
                <input type="number" class="form-control" >
                <button class="btn btn-outline-danger" id="basic-addon2"><img src="./imagens/delete.png" alt="" style="width: 20px;"></button>
            </div>
            <div class="mt-2 text-end p-2">
                <small>Valor kg: ${produtosCarrinhos[i].nome}</small><br>
                <span>Valor tota item: R$12,00</span>
            </div>
        </div>
    </div>
</li>`;

    }

}


$(function () {
    $("#tabela input").keyup(function () { //toda vez que alguma tecla for pressionada e solta entre nessa função
        let index = $(this).parent().index(); //pega o indíce da coluna a ser selecionada;
        console.log(index);
        let nth = $("#tabela td:nth-child(" + (index + 1).toString() + ")");// seleciona todos os filhos que os n-filhos do campo produto.nome
        let valor = $(this).val().toUpperCase();// transforma o conteúdo do input para letras maiúsculas
        $("#tabela tbody tr").show();// exibe na tela as linhas da tabela
        $(nth).each(function () { // percorre a tabela para procurar o texto digitado
            if ($(this).text().toUpperCase().indexOf(valor) < 0) {// percorrendo a tabela e não encontrando -> indexOf retorna -1
                $(this).parent().hide();
            }
        });
    });
    $("#tabela input").blur(function () {
        $(this).val("");
    })
})



