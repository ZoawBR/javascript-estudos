class Despesa{
    constructor(ano, mes,dia,tipo, descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == "" || this[i] == null){
                return false
            }
            return true
        }
    }
}

class Bd{
    constructor(){
        let id = localStorage.getItem("id")
        if(id === null){
            localStorage.setItem("id", 0)
        }
    }
    getNextId(){
        let nextid = localStorage.getItem("id")
        return parseInt(nextid) +1
    }

    gravar(d){
        // localStorage.setItem("despesa", JSON.stringify(d))
        let id = this.getNextId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem("id", id)
    }

    recuperarTodosRegistros(){
        let despesas = Array();
        let id = localStorage.getItem("id")
        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i))
            if(despesa === null){
                continue
            }
            despesa.id = i;
            despesas.push(despesa)
        }
        return despesas
    }

    remover(id){
        localStorage.removeItem(id)
    }

    pesquisar(despesa){
        let despesasFiltradas = Array()
        despesasFiltradas = this.recuperarTodosRegistros()
        console.log(despesasFiltradas)
        if (despesa.ano != ""){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano)
        }
        
        if (despesa.mes != ""){
            despesasFiltradas =despesasFiltradas.filter(d => d.mes == despesa.mes)
        }

        if (despesa.dia != ""){
            despesasFiltradas =despesasFiltradas.filter(d => d.dia == despesa.dia)
        }

        if (despesa.tipo != ""){
            despesasFiltradas =despesasFiltradas.filter(d => d.tipo == despesa.tipo)
        }

        if (despesa.descricao != ""){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao)
        }

        if (despesa.valor != ""){
            despesasFiltradas =despesasFiltradas.filter(d => d.valor == despesa.valor)
        }
        console.log(despesasFiltradas)
        return despesasFiltradas
    }
}

let bd = new Bd()

function cadastrarDispesas(){
    let ano = document.getElementById("ano")
    let mes = document.getElementById("mes")
    let dia = document.getElementById("dia")
    let tipo = document.getElementById("tipo")
    let descricao = document.getElementById("descricao")
    let valor = document.getElementById("valor")

    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )

    if(despesa.validarDados()){
        bd.gravar(despesa)
        document.getElementById("modalTitulo").innerHTML = "Registro foi inserido com sucesso" 
        document.getElementById("modalTITULOdIV").className = "modal-header btn-success"
        document.getElementById("modal-conteudo").innerHTML = "Despesa foi cadastrada com sucesso"
        document.getElementById("modalbtn").innerHTML = "Voltar"
        document.getElementById("modalbtn").className = "btn btn-success"
        document.getElementById("modalbtn").onclick = resetFilds()
        $('#modalRegistroDespesa').modal('show')
        
    }else{
        document.getElementById("modalTitulo").innerHTML = "Erro na inclusão do registro" 
        document.getElementById("modalTITULOdIV").className = "modal-header btn-danger"
        document.getElementById("modal-conteudo").innerHTML = "Erro na gravação, verifique se os campos foram preenchisdos corretamente"
        document.getElementById("modalbtn").innerHTML = "Voltar e corrigir"
        document.getElementById("modalbtn").className = "btn btn-danger"
        $('#modalRegistroDespesa').modal('show')
    }
}

function resetFilds(){
    document.getElementById("ano").value = ""
    document.getElementById("mes").value = ""
    document.getElementById("dia").value = ""
    document.getElementById("tipo").value = ""
    document.getElementById("descricao").value = ""
    document.getElementById("valor").value = ""
}



function carregaListaDespesas(){
    let despesas = Array()
    despesas = bd.recuperarTodosRegistros()
    let listaDespesas = document.getElementById("listaDespesas")
    despesas.forEach(function(d){

        let linha = listaDespesas.insertRow();
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        switch(d.tipo){
            case "1":
                d.tipo = "Alimentação"
                break
            case "2":
                d.tipo = "Educação"
                break
            case "3":
                d.tipo = "Laze"
                break
            case "4":
                d.tipo = "Saúde"
                break
            case "5":
                d.tipo = "Transporte"
                break
        }
        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;

        let btn = document.createElement("button")
        btn.className = "btn btn-danger"
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)
    })
}

function pesquisarDespesas(){
    let ano = document.getElementById("ano").value
    let mes = document.getElementById("mes").value
    let dia = document.getElementById("dia").value
    let tipo = document.getElementById("tipo").value
    let descricao = document.getElementById("descricao").value
    let valor = document.getElementById("valor").value
    
    let despesa = new Despesa(ano, mes, dia, tipo, descricao, valor)

    despesas = bd.pesquisar(despesa)

    let listaDespesas = document.getElementById("listaDespesas")
    listaDespesas.innerHTML = ""
    despesas.forEach(function(d){

        let linha = listaDespesas.insertRow();
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
        switch(d.tipo){
            case "1":
                d.tipo = "Alimentação"
                break
            case "2":
                d.tipo = "Educação"
                break
            case "3":
                d.tipo = "Laze"
                break
            case "4":
                d.tipo = "Saúde"
                break
            case "5":
                d.tipo = "Transporte"
                break
        }
        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;

        let btn = document.createElement("button")
        btn.className = "btn btn-danger"
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `id_despesa_${d.id}`
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_', '')
            bd.remover(id)
            window.location.reload()
        }
        linha.insertCell(4).append(btn)

    })
}