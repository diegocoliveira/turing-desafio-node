import Users from "./UsersAPI.mjs";
import { remove, edit } from "./main.mjs";
const api = new Users();

const table = document.querySelector("#list-users");
const search = document.querySelector("#search");
let sortedBy = "";

export function setSortedBy(column) {
    sortedBy = column;
}

export function renderTable(users) {
    table.innerHTML = "";
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const row1 = document.createElement("tr");
    const heading1 = document.createElement("th");
    heading1.innerHTML = "#ID";
    heading1.id = "th-id";
    row1.appendChild(heading1);

    const row2 = document.createElement("tr");
    const heading2 = document.createElement("th");
    heading2.innerHTML = "Usuário";
    heading2.id = "th-name";
    heading2.onclick = () => {
        orderBy("name");
    };
    row1.appendChild(heading2);

    const heading3 = document.createElement("th");
    heading3.innerHTML = "E-mail";
    heading3.id = "th-email";
    heading3.onclick = () => {
        orderBy("email");
    };
    row1.appendChild(heading3);

    const heading4 = document.createElement("th");
    heading4.innerHTML = "Editar";
    row1.appendChild(heading4);

    const heading5 = document.createElement("th");
    heading5.innerHTML = "Excluir";
    row1.appendChild(heading5);

    thead.appendChild(row1);

    if (sortedBy == "name asc") {
        heading2.innerHTML = "Usuário \u2191";
    }
    if (sortedBy == "name desc") {
        heading2.innerHTML = "Usuário \u2193";
    }
    if (sortedBy == "email asc") {
        heading3.innerHTML = "E-mail \u2191";
    }
    if (sortedBy == "email desc") {
        heading3.innerHTML = "E-mail \u2193";
    }

    let row;
    let cell1, cell2, cell3, cell4, cell5;
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        let id = user.id;
        row = document.createElement("tr");
        cell1 = document.createElement("td");
        cell1.innerHTML = user.id;
        row.appendChild(cell1);

        cell2 = document.createElement("td");
        cell2.innerHTML = user.name;
        row.appendChild(cell2);

        cell3 = document.createElement("td");
        cell3.innerHTML = user.email;
        row.appendChild(cell3);

        cell4 = document.createElement("td");
        cell4.innerHTML = "<span class='material-icons'>edit</span>";
        cell4.onclick = () => {
            edit(id);
        };
        row.appendChild(cell4);

        cell5 = document.createElement("td");
        cell5.innerHTML = "<span class='material-icons'>delete</span>";
        cell5.onclick = () => {
            remove(id);
        };
        row.appendChild(cell5);
        tbody.appendChild(row);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
}

async function orderBy(column) {
    const users = await api.get(search.value);

    function byName(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
        } else if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    }

    function byEmail(a, b) {
        if (a.email.toLowerCase() > b.email.toLowerCase()) {
            return 1;
        } else if (a.email.toLowerCase() < b.email.toLowerCase()) {
            return -1;
        } else {
            return 0;
        }
    }

    function byId(a, b) {
        return a.id - b.id;
    }

    if (column == "name") {
        if (sortedBy == "name asc") {
            sortedBy = "name desc";
            users.sort(byName).reverse();
        } else if (sortedBy == "name desc") {
            sortedBy = "";
            users.sort(byId);
        } else {
            sortedBy = "name asc";
            users.sort(byName);
        }
    } else {
        if (sortedBy == "email asc") {
            sortedBy = "email desc";
            users.sort(byEmail).reverse();
        } else if (sortedBy == "email desc") {
            sortedBy = "";
            users.sort(byId);
        } else {
            sortedBy = "email asc";
            users.sort(byEmail);
        }
    }
    renderTable(users);
}
