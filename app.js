$(document).ready(function(){
    console.log('app.js IS ON');
    getDato();

    $('#tab-submit').submit(function(e) {
        const postData = {
            id: $('#datoid').val(),
            tab: $('#select').val(),
            nota: $('#nota').val(),
        };
        $.post('post-historial.php', postData, function(response){
            console.log(response);
            $('#tab-submit').trigger('reset');
        });
        console.log(postData);
        e.preventDefault();
        getDato();
    });
});

function getHistorial(){
    const postId = {
        id: $('#datoid').val(),
    }
    $.post('get-historial.php', postId, function(response){
        let historial = JSON.parse(response);
        let historial_temp ='';
        historial.forEach(data => {
            historial_temp += `
                <tr class="table-info">
                    <td>${data.fecha}</td>
                    <td>${data.tab}</td>
                    <td>${data.nota}</td>
                </tr>               

            `
        });
        $('#historial').html(historial_temp);

    });
}

function getDato(){
    $.ajax({
        url: 'dato-get.php',
        type: 'GET',
        success: function(response){
            let dato = JSON.parse(response)
            let dato_template = '';
            let dato_id = '';
            dato.forEach(data => {
                dato_template += `              
                    <tr class="table-primary">
                        <td>${data.name}</td>
                        <td><input id="c2" class="form-control-plaintext" type="text" name="table" value="${data.tel}" /></td>
                        <td>${data.tratamiento}</td>                     
                    </tr>
                    
                `
            });
            dato.forEach(data => {
                dato_id += `
                <input type="hidden" name="datoid" id="datoid" value="${data.id}" />
                `
            });
            $('#dato').html(dato_template);
            $('#hidden-label').html(dato_id);
            getHistorial();
        }
    });
}


$('#task-form').submit(function(e) {
    const postData = {
        name: $('#name').val(),
        description: $('#description').val(),
    };
    $.post('task-add.php', postData, function(response){
        console.log(response);
        $('#task-form').trigger('reset');
    });
    console.log(postData);
    e.preventDefault();
});

function copiar(id_elemento) {
    var aux = document.createElement("input");
    aux.setAttribute("value", document.getElementById(id_elemento).value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand("copy");
    document.body.removeChild(aux);
  }

$(document).on('click','.delete-historial', function(){
    if(confirm('Estas eliminando la tabla Historial, estas seguro/a?')) {
        let confirm2 = true;
        $.post('reset-historial.php',{confirm2}, function(response){
            console.log(response);
            getDato();
    })
    }
});