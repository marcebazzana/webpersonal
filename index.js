var database=firebase.database();
var formacion=database.ref('cv/formacion/')
var cursos=database.ref('cv/cursos/')
var idiomas=database.ref('cv/idiomas/')
var mensajes=database.ref('mensajes/')

//Mostrar formación
formacion.once('value', function(snapshot){
    var listaform=snapshot.val();
    console.log('formacion',listaform)
    cadenaf=""
    for(var i in listaform){
        var form=listaform[i]
        cadenaf+='<li class="text-cv">\
        <h6>'+form.titulo+'</h6>\
        <p id="cvt">'+form.institucion+'<br>'+form.lugar+' - '+form.periodo+'<br>'+form.estado+'</p>\
    </li>'
    }
$('#formacion').html(cadenaf);
})
cursos.once('value', function(snapshot){
    var listacurs=snapshot.val();
    console.log('formacion',listacurs)
    cadenac=""
    for(var i in listacurs){
        var curs=listacurs[i]
        cadenac+='<li class="text-cv">\
        <h6>'+curs.titulo+'</h6>\
        <p id="cvt">'+curs.institucion+'<br>'+curs.lugar+' - '+curs.periodo+'<br>'+curs.estado+'</p>\
    </li>'
    }
$('#cursos').html(cadenac);
})
idiomas.once('value', function(snapshot){
    var listaid=snapshot.val();
    cadenai=""
    for(var i in listaid){
        var idi=listaid[i]
        cadenai+='<li class="text-cv">\
        <h6>'+idi.idioma+'</h6>\
        <p id="cvt">'+idi.nivel+'<br>'+idi.formac+'</p>\
    </li>'
    }
$('#idiomas').html(cadenai)
})

//Mensajes página de contacto
mensajes.on('value', function(snapshot){
    var listamens=snapshot.val();
    cadenam=""
    for(var i in listamens){
        var mensi=listamens[i]
        cadenam+=`<div>
        <h1>${mensi.nombre}</h1>
        <p>${mensi.contacto}</p>
        <p>${mensi.mensaje}</p>
        <button class="borrar" onclick="borrarMensaje('${mensi.id}')" id="'${mensi.id}'">Borrar mensaje</button>
        </div>`
    }
$('.mostrarMensaje').html(cadenam);
})
$('.msg-send').click((ev)=>{
    const clave=database.ref('mensajes/').push().key;
    var data={
        id:clave,
        nombre:$("#nombre-f").val(),
        contacto:$("#email-f").val(),
        mensaje:$("#mensaje-f").val(),
    }
    $("#nombre-f").val("");
    $("#email-f").val("");
    $("#mensaje-f").val("");
    database.ref('mensajes/'+data.id).set(data);
})
function borrarMensaje(id){
    database.ref('mensajes/'+id).remove()
}

//PANEL DE CONTROL

//Cargar datos formación
$(".guardarFormacion").click((ev)=>{
    const clave=database.ref('cv/formacion/').push().key;
    var data={
        id:clave,
        titulo:$(".fTitulo").val(),
        institucion:$(".fInstitucion").val(),
        lugar:$(".fLugar").val(),
        periodo:$(".fPeriodo").val(),
        estado:$(".fEstado").val(),
    }
    $(".fTitulo").val("");
    $(".fInstitucion").val("");
    $(".fLugar").val("");
    $(".fPeriodo").val("");
    $(".fEstado").val("");
    database.ref('cv/formacion/'+data.id).set(data);
})


$(".guardarCursos").click((ev)=>{
    const clave=database.ref('cv/cursos/').push().key;
    var data={
        id:clave,
        titulo:$(".fTitulo").val(),
        institucion:$(".fInstitucion").val(),
        lugar:$(".fLugar").val(),
        periodo:$(".fPeriodo").val(),
        estado:$(".fEstado").val(),
    }
    $(".fTitulo").val("");
    $(".fInstitucion").val("");
    $(".fLugar").val("");
    $(".fPeriodo").val("");
    $(".fEstado").val("");
    database.ref('cv/cursos/'+data.id).set(data);
})

$(".guardarIdiomas").click((ev)=>{
    const clave=database.ref('cv/idiomas/').push().key;
    var data={
        id:clave,
        idioma:$(".fIdioma").val(),
        nivel:$(".fNivel").val(),
        formacion:$(".fFormacion").val(),
    }
    $(".fIdioma").val("");
    $(".fNivel").val("");
    $(".fFormacion").val("");
    database.ref('cv/idiomas/'+data.id).set(data);
})

//Datos formación

formacion.on('value', function(snapshot){
    var listaform=snapshot.val();
    cadenaf=""
    for(var i in listaform){
        var form=listaform[i]
        cadenaf+=`<li class="text-cv">
        <h6>${form.titulo}</h6>
        <p id="cvt">${form.institucion}<br>${form.lugar} - ${form.periodo}<br>${form.estado}</p>
        <button class="editar" onclick="editarFormacion('${form.id}')">Editar</button>
        <button class="borrar" onclick="borrarFormacion('${form.id}')">Borrar</button>
    </li>`
    }
$('.panelFormacion').html(cadenaf);
})
cursos.on('value', function(snapshot){
    var listacurs=snapshot.val();
    cadenac=""
    for(var i in listacurs){
        var curs=listacurs[i]
        cadenac+=`<li class="text-cv">
        <h6>${curs.titulo}</h6>
        <p id="cvt">${curs.institucion}<br>${curs.lugar} - ${curs.periodo}<br>${curs.estado}</p>
        <button class="editar" onclick="editarFormacion('${curs.id}')">Editar</button>
        <button class="borrar" onclick="borrarCursos('${curs.id}')">Borrar</button>
    </li>`
    }
$('.panelCursos').html(cadenac);
})
idiomas.on('value', function(snapshot){
    var listaid=snapshot.val();
    cadenai=""
    for(var i in listaid){
        var idi=listaid[i]
        cadenai+=`<li class="text-cv">
        <h6>${idi.idioma}</h6>
        <p id="cvt">${idi.nivel}<br>${idi.formac}</p>
        <button class="editar" onclick="editarFormacion('${idi.id}')">Editar</button>
        <button class="borrar" onclick="borrarIdiomas('${idi.id}')">Borrar</button>
    </li>`
    }
$('.panelIdiomas').html(cadenai)
})

function editarFormacion(id){
    $(".formularioEditarFormacion").show()
    $(".formularioEditarIdiomas").show()
    $(".id-editar").text(id)
}
$(".editarFormacion").click((ev)=>{
    var path=$(".path-e").val();
    var data={
        id:$(".formularioEditarFormacion > .id-editar").text(),
        titulo:$(".fTitulo-e").val(),
        institucion:$(".fInstitucion-e").val(),
        lugar:$(".fLugar-e").val(),
        periodo:$(".fPeriodo-e").val(),
        estado:$(".fEstado-e").val(),
    }
    database.ref(`cv/${path}/${data.id}`).update(data);
})
$(".editarIdiomas").click((ev)=>{
    var data={
        id:$(".formularioEditarIdiomas > .id-editar").text(),
        idioma:$(".fIdioma-e").val(),
        nivel:$(".fNivel-e").val(),
        formacion:$(".fFormacion-e").val(),
    }
    database.ref(`cv/idiomas/${data.id}`).update(data);
})
function borrarFormacion(id){
    database.ref(`cv/formacion/${id}`).remove();
}
function borrarCursos(id){
    database.ref(`cv/cursos/${id}`).remove();
}
function borrarIdiomas(id){
    database.ref(`cv/idiomas/${id}`).remove();
}