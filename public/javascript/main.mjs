import Users from "./UsersAPI.mjs";
import {renderTable, setSortedBy} from "./table.mjs";
const api = new Users();


const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modal-title");
const alertModal = document.querySelector("#alert-modal");
const alertMain = document.querySelector("#alert-main");
const result = document.querySelector("#result");

const search = document.querySelector("#search");

const txtId = document.querySelector("#txtId");
const txtName = document.querySelector("#txtName");
const txtEmail = document.querySelector("#txtEmail");

const btnSave = document.querySelector("#btnSave");
const btnCancel = document.querySelector("#btnCancel");
const btnAdd = document.querySelector("#btnAdd");
const btnList = document.querySelector("#btnList");










function update(product) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == product.id) {
            products[i].nome = product.nome;
            products[i].valor = product.valor;
            products[i].descricao = product.descricao;
            products[i].modificadoEm = Date.now();
            return true;
        }
    }
    throw "Não foi possível atualizar o produto";
}

export function remove(id) {
    let nome = "";
    for (let i in products) {
        if (products[i].id == id) {
            products.splice(i, 1);
        }
    }
    list();
    console.log("Produto excluído com sucesso!");
    result.innerHTML = `Produto ${nome} excluído com sucesso!`;
}

function insert() {
    txtId.value = "#ID";
    txtName.value = "";
    txtEmail.value = "";
    result.innerHTML = "";
    modalTitle.innerHTML = "Novo Usuário";
    openModal(true);
}

export async function edit(id) {
    const user = await api.getById(id);
    txtId.value = user.id;
    txtName.value = user.name;
    txtEmail.value = user.email;
    modalTitle.innerHTML = `Editar ${user.name}`;
    openModal(true);
}

async function save() {
    alert.innerHTML = "";
    result.innerHTML = "";
    let user = {};
    try {
        user.id = txtId.value;
        if (txtName.value.length < 4) throw new Error("Falha no cadastro do usuário! Nome inválido. Nome mínimo de 4 caracteres");
        user.name = txtName.value;

        if (txtEmail.value.length < 4) throw new Error("Falha no cadastro do usuário! E-mail inválido. E-mail mínimo de 4 caracteres");
        if (!txtEmail.value.includes("@")) throw new Error("Falha no cadastro do usuário! E-mail inválido. E-mail deve conter @");
        user.email = txtEmail.value;

        if (user.id === "#ID") {
            user = await api.create(user);
            if (user.id > 0) {
                await list();
                result.innerHTML = `Usuário ${user.id} - ${user.name} incluído com sucesso!`;
                openModal(false);
            }
        } else {
            user = await api.update(user);
            if (user.id > 0) {
                await list();
                result.innerHTML = `Usuário ${user.id} - ${user.name} alterado com sucesso!`;
                openModal(false);
            }
        }
    } catch (error) {
        alertModal.innerHTML = error.message;
        console.log(error);
    }
}

async function list() {
    result.innerHTML = "";
    alertMain.innerHTML = "";
    setSortedBy("");
    const users = await api.get(search.value);

    if (search.value != "") {
        if (users.length <= 0) {
            alertMain.innerHTML = "Não foram encontrados usuários que atenda a pesquisa";
            return;
        } else {
            result.innerHTML = `Foram encontrado(s) ${users.length}.`;
        }
    } else if (users.length <= 0) {
        alertMain.innerHTML = "Não há usuários cadastrados";
        return;
    }
    renderTable(users);
}



function openModal(open) {
    if (open) {
        modal.style.display = "flex";
        alertModal.innerHTML = "</br>";
    } else {
        modal.style.display = "none";
        alertMain.innerHTML = "";
    }
}



btnSave.onclick = save;
btnCancel.onclick = () => openModal(false);
btnAdd.onclick = insert;
btnList.onclick = list;

