    firebase.initializeApp({
    apiKey: "AIzaSyBekI9xBnfnem_Dg468ykxcJ8PZ1H1roX0",
    authDomain: "hola-mundo-82ade.firebaseapp.com",
    projectId: "hola-mundo-82ade",
  });
  
  var db = firebase.firestore();
//Agregar datos
  function guardar(){
    var nombre = document.getElementById('nombre').value;
    var apellido = document.getElementById('apellido').value;
    var edad = document.getElementById('edad').value;
    var direccion = document.getElementById('direccion').value;

    db.collection("Fotografo").add({
        Nombre: nombre,
        Apellido: apellido,
        Edad: edad,
        Direccion: direccion
    })
    .then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
        alert("Fotografo agregado correctamente");
        document.getElementById('nombre').value = '';
        document.getElementById('apellido').value = '';
        document.getElementById('edad').value = '';
        document.getElementById('direccion').value = '';
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
        alert('Ocurrio un error al agregar. Vuelve a intentarlo');
    });
  }

//Leer datos
var tabla = document.getElementById('tabla');
db.collection("Fotografo").onSnapshot((querySnapshot) => {
    document.getElementById('tabla').innerHTML = '';
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().Nombre}`);
        document.getElementById('tabla').innerHTML += `
        <tr>
            <td>${doc.data().Nombre}</td>
            <td>${doc.data().Apellido}</td>
            <td>${doc.data().Edad}</td>
            <td>${doc.data().Direccion}</td>
            <td><button class="btn btn-outline-danger" onclick="eliminar('${doc.id}')"><i class="fas fa-trash-alt"></i></button></td>
            <td><button class="btn btn-outline-info" onclick="editar('${doc.id}', '${doc.data().Nombre}', '${doc.data().Apellido}', '${doc.data().Edad}', '${doc.data().Direccion}')"><i class="fas fa-pencil-alt"></i></button></td>
        </tr>
        `
    });
});

//Borrar datos
function eliminar(id)
{
    var opcion = confirm("¿Deseas eliminar este fotografo?");
    if(opcion == true)
    {
        db.collection("Fotografo").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
        alert('Fotografo eliminado correctamente');
            
        }).catch(function(error) {
            console.error("Error removing document: ", error);
            alert("Ocurrio un error. Vuelve a intentarlo");
        });
    }
}

//Editar datos
function editar(id, nombre, apellido, edad, direccion)
{
    document.getElementById('nombre').value = nombre;
    document.getElementById('apellido').value = apellido;
    document.getElementById('edad').value = edad;
    document.getElementById('direccion').value = direccion;
    var boton = document.getElementById('boton');
    boton.innerHTML = 'Editar';

    boton.onclick = function()
    {
        var washingtonRef = db.collection("Fotografo").doc(id);
        // Set the "capital" field of the city 'DC'

        var nombre = document.getElementById('nombre').value;
        var apellido = document.getElementById('apellido').value;
        var edad = document.getElementById('edad').value;
        var direccion = document.getElementById('direccion').value;

        return washingtonRef.update({
            Nombre: nombre,
            Apellido: apellido,
            Edad: edad,
            Direccion: direccion
        })
        .then(function() {
            console.log("Document successfully updated!");
            alert('Fotografo editado correctamente');
            boton.innerHTML = 'Guardar';
            document.getElementById('nombre').value = '';
            document.getElementById('apellido').value = '';
            document.getElementById('edad').value = '';
            document.getElementById('direccion').value = '';
        })
        .catch(function(error) {
            // The document probably doesn't exist.
            console.error("Error updating document: ", error);
            alert('Hubo un error al editar. Vuelve a intentarlo');
        });
    }    
}
