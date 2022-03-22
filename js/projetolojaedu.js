// declaração de uma classe com o nome de Produto
class Produto {
    //definição dos atributos da classe
    constructor() {
        this.id = 1;
        //this.nome = "";
        //this.valor = 0;
        this.arrayProdutos = [];

        //propriedade para testar qual método deve ser executado pelo botão btn1
        this.testeBtn = 0;

        let foto = document.getElementById("imgFoto");
        let file = document.getElementById("flImagem")

        file.addEventListener("change", (e) => {
            let leitor = new FileReader();

            leitor.onload = () => {
                foto.src = leitor.result;
            }
            leitor.readAsDataURL(file.files[0]);
        })
    }

    //salvar o produto digitado pelo usuário no objeto produto
    salvar() {
        //alert("vamos salvar");
        let produto = this.lerDados();

        //chamamos o método para validar o conteúdo dos inputs (somente verificou inputs vazios)
        if (this.validarCampos(produto)) {
            //alert("Podemos salvar");
            if (this.testeBtn == 0) {
                this.adicionar(produto);
            } else {
                this.atualizar(this.testeBtn);
            }
            this.listaDados();
            this.cancelar();
        }
        console.log(this.arrayProdutos);

        //this.cancelar();
    }
    //capturar o que foi digitado pelo usuário nos inputs
    lerDados() {
        let produto = {};

        produto.nome = document.getElementById("nomeProduto").value;
        produto.valor = document.getElementById("valorProduto").value;
        produto.id = this.id;

        if ($("#flImagem").val() != "") {
            let nomeProduto = $("#flImagem")[0].files[0].name;
            produto.foto = "/imagens/" + nomeProduto;
        }
        return produto;
    }
    //método para alimentar a tabela com os produtos
    listaDados() {
        // declaração de uma variável para referenciar o tbody da tabela
        let tbody = document.getElementById("tbody");

        // limpar a tabela antes de ser mostrada 
        tbody.innerText = "";

        //loop para percorrer o array de Produtos
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            // inserir um nova linha no tbody
            let novaLinha = tbody.insertRow();

            // criar cada coluna(célula) de cada linha
            let td_id = novaLinha.insertCell();
            let td_nome = novaLinha.insertCell();
            let td_valor = novaLinha.insertCell();
            let td_acoes = novaLinha.insertCell();

            //alimentar as células
            td_id.innerText = this.arrayProdutos[i].id;
            td_nome.innerText = this.arrayProdutos[i].nome;
            td_valor.innerText = this.arrayProdutos[i].valor;

            //para adiconar uma classe (.center) as colunas
            td_id.classList.add("center");
            td_acoes.classList.add("center");

            // criando um elemento de imagem para ser colocado na quarta coluna da linha
            let imgEdit = document.createElement("img");
            // atribuindo a esse elemento o caminho
            imgEdit.src = "/imagens/edit.png";
            //adicionando um filho para a quarta coluna
            td_acoes.appendChild(imgEdit);

            // criando um elemento de imagem para ser colocado na quarta coluna da linha
            let imgDelete = document.createElement("img");
            // atribuindo a esse elemento o caminho
            imgDelete.src = "/imagens/delete.png";
            //adicionando um filho para a quarta coluna
            td_acoes.appendChild(imgDelete);

            //atribuir um método para imgDelete através do setAttribute como os parâmetros: ("evento", método)
            imgDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

            //atribuir um método para mostrar os dados do produto selecionado para posterior edição (evento, método)
            imgEdit.setAttribute("onclick", "produto.mostrarDados(" + JSON.stringify(this.arrayProdutos[i]) + ")");
        }

    }
    adicionar(produto) {

        this.arrayProdutos.push(produto);
        this.id++;

        this.limpar();

    }


    //método para limpar os inputs
    cancelar() {
        document.getElementById("nomeProduto").value = "";
        document.getElementById("valorProduto").value = "";
        //voltar a escrita do botão para salvar
        document.getElementById("btn1").innerText = "Salvar";
        this.testeBtn = 0;
        //alert("vamos cancelar");

        this.limpar()

    }

    limpar() {
        //limpar o conteúdo do value do input file
        $("#flImagem").val("");
        //substituir a última imagem carregada pela camêra (representa um produto sem imagem cadastrada)
        let imagem = document.getElementById("imgFoto");
        imagem.src = "/imagens/camera.png"
    }

    //validação dos conteúdos dos inputs (impedindo input vazio)
    validarCampos(produto) {
        let msg = "";
        if (produto.nome == "") {
            msg += "- informe o nome do produto \n";
        }
        if (produto.valor == "") {
            msg += "- informe o valor do produto \n"
        }
        if (msg != "") {
            alert(msg);
            return false;
        }
        return true;
    }

    deletar(idProcurado) {
        //alert("Vamos deletar o produto de id: " + idProcurado);
        if (confirm("Deseja realmente deletar o produto de id " + idProcurado)) {
            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == idProcurado) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
            // this.arrayProdutos.splice(idProcurado,1);
            // this.listaDados();
        }
    }

    mostrarDados(dados) {
        //alert(dados.id);
        this.testeBtn = dados.id;
        //mostrar as propriedades dos produtos nos inputs
        document.getElementById("nomeProduto").value = dados.nome;
        document.getElementById("valorProduto").value = dados.valor;

        let imagem = document.getElementById("imgFoto");
        imagem.src = dados.foto;

        //modificar o texto do botão "Salvar"
        document.getElementById("btn1").innerText = "Atualizar";


    }

    atualizar(id) {
        //alert("Agora vamos atualizar");
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (id == this.arrayProdutos[i].id) {
                this.arrayProdutos[i].nome = document.getElementById("nomeProduto").value;
                this.arrayProdutos[i].valor = document.getElementById("valorProduto").value;

                if ($("#flImagem").val() != "") {
                    let nomeProduto = $("#flImagem")[0].files[0].name;
                    this.arrayProdutos[i].foto = "./imagens/" + nomeProduto;
                }

            }
        }


    }

}
var produto = new Produto();

//*********Código para o Banner Rotativo*************/

let vtBanner = ["./imagens/b1.jpg", "./imagens/b2.jpg", "./imagens/b3.jpg", "./imagens/b4.png>"];
let max = vtBanner.length - 1;
let i = 0;

$("#btnAnte").text("<");
$("#btnProx").text(">");
$("#banner").css("backgroundImage", "url(" + vtBanner[0] + ")");

$("#btnAnte").click(function () {
    troca(-1);
})
$("#btnProx").click(function () {
    troca(1);
})

setInterval(() => troca(1), 5000)



function troca(opr) {
    $("#banner").css("backgroundImage", "url(" + vtBanner[i] + ")").fadeOut(1000, function () {
        i += opr;
        if (i > max) {
            i = 0;
        } else if (i < 0) {
            i = max;
        }

        $("#banner").css("backgroundImage", "url(" + vtBanner[i] + ")").fadeIn(1000);
        $("#b" + i).prop("checked", true);

    });
}

$("input[name='banners']").click(function () {
    let getNumber = $("input[name='banners']:checked").val()
    $("#banner").css("backgroundImage", "url(" + vtBanner[getNumber] + ")").fadeIn(1000);
})

$(function () {
    //toda vez que alguma tecla for pressionada e solta entra a função do keyup
    $("#tabela input").keyup(function () {
        //pega o indice da coluna a ser selecionada;
        let index = $(this).parent().index();
        //seleciona todos os filhos que os n-filhos do campo produto.nome
        let nth = $("#tabela td:nth-child(" + (index + 1).toString() + ")");
        //transformar o conteúdo do input para letras maiúsculas
        let valor = $(this).val().toUpperCase();
        //exibe na tela as linhas da tabela
        $("#tabela tbody tr").show();
        //percorre a tabela para procurar o texto digitado
        $(nth).each(function () {
            if ($(this).text().toUpperCase().indexOf(valor) < 0) {
                $(this).parent().hide();
            }
        });
    });

    $("#tabela input").blur(function () {
        $(this).val("")
        produto.listaDados();
    })
})

