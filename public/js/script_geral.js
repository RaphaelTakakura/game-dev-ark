
if (!sessionStorage.USER_USUARIO) {

    document.getElementById("login_perfil").innerHTML = `<a href="cadastro.html"> Cadastro </a>`
    document.getElementById("login_deslogar").innerHTML = `<a href="login.html"> Login </a>`
}

else {
    document.getElementById("login_perfil").innerHTML = `<a href="dashboard/dashboard.html"> Perfil </a>`
    document.getElementById("login_deslogar").innerHTML = `<a href="login.html" onclick="Sair()"> Sair </a>`
}

function Sair() {

    sessionStorage.clear()
}
