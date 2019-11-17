$(document).ready(function(){
    $('#tab-agenda').hide();
    $('#alertas').hide();
    getDato();
    getAgenda();
    console.log('app.js IS ON');


    $('#tab-submit').submit(function(e) {
        let tab_guardar = "Programado";
        if($('#select').val() === tab_guardar){
            e.preventDefault();
            const postData = {
                datoid: $('#datoid').val(),
                userid: $('#userid').val(),
                name: $('#datoname').val(),
                tratamiento: $('#tratamiento').val(),
                teldato: $('#teldato').val(),            
                agenda: $('#date').val(),
                nota: $('#nota').val(),
                tab: $('#select').val(),  
            };
            $.post('post-agenda.php', postData, function(response){
                $('#tab-submit').trigger('reset');
                getAgenda();
                $('#tab-agenda').hide();
            });
            e.preventDefault();
            getDato();
        } else {
            const postData = {
                id: $('#datoid').val(),
                tab: $('#select').val(),
                nota: $('#nota').val(),
            };
            $.post('post-historial.php', postData, function(response){
                $('#tab-submit').trigger('reset');
            });
            e.preventDefault();
            getDato();
    }
});

});

$(document).on('click','.retab', function(){
    let element = $(this)[0];
    let dato_id = $(element).attr('thisdatoid');
    let tab_id = "#retabid";
    tab_id += dato_id;
    let nota_id = "#notaid";
    nota_id += dato_id;
    if(confirm('Estás seguro/a de retabular este dato?')){
        const postDataRetab = {
            datoid: dato_id,
            userid: $('#userid').val(),
            tab: $(tab_id).val(),
            nota: $(nota_id).val(),
        };
        $.post('retabular.php', postDataRetab, function(response){
            alertaSuccess(response);
            getAgenda();
          });
        };
});

function alertaSuccess(x){
    let alerta = '';
    alerta += `
    <div class="error-container" id="error-container">
    <div class="alert alert-success alert-dismissible">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Success!</strong> ${x}.
    </div></div>
    `;
    $('#alertas').html(alerta);
    $('#alertas').show(1000);
    closeAlerta();
};

function closeAlerta(){
    setTimeout(function(){ 
        let nada = '';
        $('#alertas').hide(1000);
        $('#alertas').html(nada);
    }, 5000);
};



$(document).on('click','#select', function(){
    if($('#select').val() === 'Programado'){
        $('#tab-agenda').show();
    } else {
        $('#tab-agenda').hide(); 
    }
})


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
                        <td>
                            <div class="input-group">
                                <input type="text" class="form-control" value="${data.tel}" id="teldato" style="background-color : #D2E3F3;">
                                <div class="input-group-append">
                                <button type="button" onclick="copiar('teldato')" class="btn btn-outline-info btn-sm">Copiar</button>
                                </div>
                            </div>
                        </td>
                        <td>${data.tratamiento}</td>                     
                    </tr>
                    
                `
            });
            dato.forEach(data => {
                dato_id += `
                <input type="hidden" name="datoid" id="datoid" value="${data.id}" />
                <input type="hidden" name="datoname" id="datoname" value="${data.name}" />
                <input type="hidden" name="tratamiento" id="tratamiento" value="${data.tratamiento}" />
                `
            });
            $('#dato').html(dato_template);
            $('#hidden-label').html(dato_id);
            getHistorial();
        }
    });
}

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
            alert(response);
            getDato();
    })
    }
});

$(document).on('click','.card-header', function(){
    let element = $(this)[0];
    let id_element = $(element).attr('eleid');
    $(id_element).toggle();
});


function getAgenda() {
    const userId = {
        id: $('#userid').val(),
    };
    $.post('get-agenda.php', userId, function(response){
        let agenda = JSON.parse(response);
        let agenda_temp ='';
        agenda.forEach(data => {
            agenda_temp += `
            <div class="card bg-light mb-3" style="max-width: 50rem;">
            <div class="card-header" eleid="#card${data.datoid}">
                <div class="row text-center">
                    <div class="col">${data.name}</div>
                    <div class="col">${data.tratamiento}</div>
                    <div class="col">${data.agenda}</div>
                </div>
            </div>
            <div class="card-body" id="card${data.datoid}">
                <div class="row text-center">
                    <div class="col">
                            <div class="form-group">
                                    <label class="control-label">Teléfono</label>
                                    <div class="form-group">
                                        <div class="input-group">
                                            <div class="input-group-prepend">
                                            </div>
                                            <input type="text" class="form-control" value="${data.tel}" id="copya${data.datoid}">
                                            <div class="input-group-append">
                                            <button type="button" onclick="copiar('copya${data.datoid}')" class="btn btn-outline-info btn-sm">Copiar</button>
                                            </div>
                                        </div>
                                    </div><br>
                            </div>
                            <form class="retabular"> <!-- TABULACION -->  
                                <div class="form-group">
                                        <label for="exampleSelect1"><b>Retabulación</b></label>
                                        <select class="form-control" id="retabid${data.datoid}">
                                                <option value="No Contesta">No Contesta</option>
                                                <option value="No tiene tarjeta">No tiene tarjeta</option>
                                                <option value="Le parece caro">Le parece caro</option>
                                                <option value="NO ABSOLUTO">NO ABSOLUTO</option>
                                                <option value="Numero erroneo">Numero erroneo</option>
                                        </select>                 
                                </div>
                                <input type="hidden" name="datoid" id="datoaid${data.datoid}" value="${data.datoid}" /> <!-- Acá almaceno el ID del Dato para insertar en "historial" -->
                                <button type="button" class="btn btn-success btn-block text-center retab" thisdatoid="${data.datoid}">Retabular</button>
                            </form> <!-- FIN TABULACION -->  
                    </div>
                    <div class="col">
                       <p id="notaid${data.datoid}">${data.notas}</p> 
                    </div>
                </div>
            </div>
    </div> 
        `
        });
        $('#meter-agenda').html(agenda_temp);
        $('.card-body').hide();
    }); 
}