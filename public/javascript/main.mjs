import Users from "./UsersAPI.mjs";
import { renderTable, setSortedBy } from "./table.mjs";
const api = new Users();

const modal = document.querySelector("#modal");
const modalTitle = document.querySelector("#modal-title");
const alertModal = document.querySelector("#alert-modal");
const alertMain = document.querySelector("#alert-main");
const result = document.querySelector("#result");

const txtId = document.querySelector("#txt-id");
const txtName = document.querySelector("#txt-name");
const txtEmail = document.querySelector("#txt-email");
const btnSave = document.querySelector("#btn-save");
const btnCancel = document.querySelector("#btn-cancel");

const modalQuestion = document.querySelector("#modal-question");
const divQuestionData = document.querySelector("#question-data");
const txtDeleteId = document.querySelector("#txt-delete-id");
const btnOk = document.querySelector("#btn-ok");
const btnNok = document.querySelector("#btn-nok");

const search = document.querySelector("#search");
const btnAdd = document.querySelector("#btn-add");
const btnList = document.querySelector("#btn-list");

function insert() {
    txtId.value = "";
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

export async function remove(id) {
    const user = await api.getById(id);
    txtDeleteId.value = user.id;
    divQuestionData.innerHTML = `<p>#ID: <span>${user.id}</span> Nome: <span>${user.name}</span> </p> <p>E-mail: <span>${user.email}</span></p>`;
    openModalAlert(true);
}

async function deleteById() {
    const id = txtDeleteId.value;
    const user = await api.deleteById(id);
    await list();
    try {
        result.innerHTML = `Usuário ${user.id} - ${user.name} excluído com sucesso!`;
    } catch (error) {
        result.innerHTML = error.message;
        console.log(error);
    }
    openModalAlert(false);
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

        if (user.id == "") {
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
    renderTable(users);
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

function openModalAlert(open) {
    if (open) {
        modalQuestion.style.display = "flex";
    } else {
        modalQuestion.style.display = "none";
    }
}

list();

btnSave.onclick = save;
btnCancel.onclick = () => openModal(false);
btnAdd.onclick = insert;
btnList.onclick = list;
btnNok.onclick = () => openModalAlert(false);
btnOk.onclick = deleteById;
