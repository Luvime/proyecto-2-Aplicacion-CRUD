class Usuario {
    constructor(name, empresa, telefono, email) {
        this.name = name;
        this.empresa = empresa;
        this.telefono = telefono;
        this.email = email;
    }
}

function showData() {
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    let html = "";
    usersList.forEach((user, index) => {
        html += `<tr><td>${user.name}</td><td>${user.empresa}</td><td>${user.telefono}</td><td>${user.email}</td><td><button class="btn btn-danger" onclick="deleteData(${index})">Eliminar</button><button class="btn btn-warning" onclick="editData(${index})">Editar</button></td></tr>`
    });
    document.querySelector('tbody').innerHTML = html;
}

document.onload = showData()

function addData(event) {
    event.preventDefault();
    let name = document.querySelector('#name').value;
    let empresa = document.querySelector('#empresa').value;
    let telefono = document.querySelector('#telefono').value;
    let email = document.querySelector('#email').value;

    if (name === "" || empresa === "" || telefono === "" || email === "") return;

    const usuario = new Usuario(name, empresa, telefono, email); // {name: 'matias', email: 'blabla}
    console.log(usuario)
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    usersList.push(usuario)
    localStorage.setItem("usersList", JSON.stringify(usersList))
    showData()

    document.querySelector('#name').value = ""
    document.querySelector('#empresa').value = ""
    document.querySelector('#telefono').value = ""
    document.querySelector('#email').value = ""
}

function editData(index) {
    document.getElementById('add-btn').style.display = 'none';
    document.getElementById('edit-btn').style.display = 'block';

    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = []
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"))
    }
    document.querySelector('#name').value = usersList[index].name;
    document.querySelector('#empresa').value = usersList[index].empresa;
    document.querySelector('#telefono').value = usersList[index].telefono;
    document.querySelector('#email').value = usersList[index].email;

    document.getElementById('edit-btn').onclick = function () {
        usersList[index].name = document.querySelector('#name').value
        usersList[index].empresa = document.querySelector('#empresa').value
        usersList[index].telefono = document.querySelector('#telefono').value
        usersList[index].email = document.querySelector('#email').value

        localStorage.setItem("usersList", JSON.stringify(usersList));
        showData();
        document.querySelector('#name').value = ""
        document.querySelector('#empresa').value = ""
        document.querySelector('#telefono').value = ""
        document.querySelector('#email').value = ""

        document.getElementById('add-btn').style.display = 'block';
        document.getElementById('edit-btn').style.display = 'none';
    }
}
function deleteData(index) {
    let usersList;
    if (localStorage.getItem("usersList") === null) {
        usersList = [];
    } else {
        usersList = JSON.parse(localStorage.getItem("usersList"));
    }

    usersList.splice(index, 1); // Elimina el usuario en la posición index
    localStorage.setItem("usersList", JSON.stringify(usersList));
    showData();
}



/*const usuario = {
    nombre: 'mmolina',
    email: 'matias.molina@bootcampudd.cl',
    roles: [
        'ADMIN', // 0
        'USER'  // 1
    ],
    activo: true
}

const estudiante = {
    nombre: 'Joaquin',
    edad: 20,
    carrera: 'Bootcamp de Desarrollo Web',
    universidad: 'Universidad del Desarrollo'
};
const agregarDataEnLocalStorage = () => {
    localStorage.setItem("estudiante", JSON.stringify(estudiante));
}
const obtenerDataDesdeLocalStorage = () => {
    const data = localStorage.getItem("estudiante");
    return JSON.parse(data);
}
const mostrarData = () => {
    const data = obtenerDataDesdeLocalStorage()
    const cuerpoTabla = document.querySelector('tbody');
    const tr = document.createElement('tr');
    for( const propiedad in data){
        tr.innerHTML += `<td>${data[propiedad]}</td>`
    }
    console.log(tr)
    cuerpoTabla.appendChild(tr)
}
agregarDataEnLocalStorage()
mostrarData()
*/