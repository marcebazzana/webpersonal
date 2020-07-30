var database=firebase.database();
var formacion=database.ref('cv/formacion/')
var cursos=database.ref('cv/cursos/')
var idiomas=database.ref('cv/idiomas/')
var mensajes=database.ref('mensajes/')

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

mensajes.once('value', function(snapshot){
    console.log(mensajes)
    var listamens=snapshot.val();
    cadenam=""
    for(var i in listamens){
        var mensi=listamens[i]
        cadenam+=`<div>
        <h1>${mensi.nombre}</h1><br>
        <p>${mensi.contacto}</p><br>
        <p>${mensi.mensaje}</p>
        <button class"borrar" onclick="borrarMensaje(`+mensi.id+`)">Borrar mensaje</button>
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
    database.ref('mensajes/'+id).remove();
}