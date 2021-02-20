const $ = require('jQuery')
var dataFormated    // Recebe o objeto com os dados
var dataJson        // Recebe os dados do json

let e = localStorage.getItem('db')
if(e == null){
    localStorage.setItem('db','[{"name":"Welcome!","content":""}]')
}



// Insere os dados          ----------------------------------------------
var putValues = (dados, eventAply = 1) => {
    if(typeof(dados) == "object"){
        // Converte para json caso seja um objeto
        dados = JSON.stringify(dados)
    }
    localStorage.setItem('db',dados)
    if(eventAply == 1){
        M.toast({html: 'Anotação salva com sucesso!'})
    }
    if(eventAply == 0){
        M.toast({html: 'Anotação Excluída.'})
    }
    
    getValues()
}



// Recupera os dados        -----------------------------------------------
var getValues = () => {
    let dataText = ""   // Formato com os dados para serem inseridos no HTML
    
    let data = localStorage.getItem('db')
    dataJson = data
    dataFormated = JSON.parse(dataJson)
        
    dataFormated.forEach(note => {
        let name = note.name
        dataText = `<a href="#" class="collection-item waves-dark waves-effect black-text" onclick="selectNote('${name}')"> ${name} </a>` + dataText
        // Co
        qtdNotes = dataFormated.lenght  // Quantidade de notas
        if(dataText === ""){ dataText = "Nenhuma anotação." }
        $(".collection").html(dataText) // Insere as notas na lista
    });

    
}

// Inicializa o getValues assim que carregar o app
getValues()



// Seleciona uma nota             --------------------------------------------
var selectNote = name => {
    //alert(name)
    dataFormated.forEach(note => {
        if(name == note.name){
            $('#name').val(note.name)
            $('#content').val(note.content)
            $('#content').focus()
            $('#name').focus()
        }
    })
}



// Create a New Note               ---------------------------------------------
var newNote = () => {
    $('#name').val('')
    $('#content').val('')
    $('#name').focus()
}


// Save the New Note               ---------------------------------------------
var saveNote = () => {
    let nameNew = $('#name').val()
    let contentNew = $('#content').val()
    let identify = 0

    if(nameNew === ""){
        M.toast({html: 'Preencha os campos para salvar.'})
        return $('#name').focus
    }
    if(contentNew === ""){
        M.toast({html: 'Preencha os campos para salvar.'})
        return $('#content').focus()
    }
    if (dataFormated != ""){
        dataFormated.forEach(note => {
            if(nameNew === note.name){
                // Atualiza os dados
                let name = $('#name').val()
                let newDataObj = []
                dataFormated.forEach(note => {
                    if(name == note.name){
                    } else {
                        newDataObj.push(note)
                    }
                })
                dataFormated = newDataObj
                let valorNovo = JSON.stringify(dataFormated)
                putValues(valorNovo, 2)
                identify = 1
            }
        })
    }
    if(identify == 0){
        // Salva como nova nota
        let newFormated = {
            name: nameNew,
            content: contentNew
        }
        dataFormated.push(newFormated)
        let valor = JSON.stringify(dataFormated)

        putValues(valor)
    }
    if(identify == 1){
        saveNote()
    }
}



// Deleta a nota        ----------------------------------------------

function deleteNote() {
    let name = $('#name').val()

    if(name === ""){ return 0 }

    let newDataObj = []
    dataFormated.forEach(note => {
        if(name == note.name){
        } else {
            newDataObj.push(note)
        }
    })
    dataFormated = newDataObj
    let valorNovo = JSON.stringify(dataFormated)
    putValues(valorNovo, 0)

    newNote()
}




// Recursos envolvendo o Materialize

$(document).ready(function(){
    $('.modal').modal();
});

