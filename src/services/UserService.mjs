import UserDB from "../database/UserDB.mjs";

export default function UserService() {
    const userDB = new UserDB();
    userDB.init();

    function get(data) {
        if (typeof data === "undefined" || data === null || data === "") {
            return userDB.getAll();
        }
        return userDB.search(data);
    }

    function getById(id) {
        const result = { success: false, message: "Erro ao recuperar o usuário", data: null };
        if (typeof id === "undefined" || id === null || id === "") {
            result.message = "Id é obrigatório";
            return result;
        }

        if (isNaN(id) || !Number.isInteger(Number(id)) || id < 1) {
            result.message = "Id deve ser um número inteiro maior que zero";
            return result;
        }

        const user = userDB.get(Number(id));
        if (user === null) {
            result.message = "Usuário não encontrado";
            return result;
        }

        result.success = true;
        result.message = "Usuário recuperado com sucesso";
        result.data = user;

        return result;
    }
    

    function create(name, email) {
        const result = { success: false, message: "Erro ao criar usuário", data: null };

        if (typeof name === "undefined" || name === null || name === "" || typeof email === "undefined" || email === null || email === "") {
            result.message = "Nome e email são obrigatórios";
            return result;
        }

        if (name.length < 4) {
            result.message = "Nome deve ter no mínimo 4 caracteres";
            return result;
        }
        if (email.length < 10 || !email.includes("@")) {
            result.message = "Email inválido";
            return result;
        }

        const user = userDB.add(name, email);
        
        if (user.id > 0) {
            result.success = true;
            result.message = `O usuário ${user.name} foi criado com sucesso com o id ${user.id}`;
            result.data = user;
        }
        return result;
    }

    function update(id, name, email) {
        const result = { success: false, message: "Erro ao alterar o usuário", data: null };
        if (typeof id === "undefined" || id === null || id === "") {
            result.message = "Id é obrigatório";
            return result;
        }

        if (isNaN(id) || !Number.isInteger(Number(id)) || id < 1) {
            result.message = "Id deve ser um número inteiro maior que zero";
            return result;
        }

        if (typeof name === "undefined" || name === null || name === "" || typeof email === "undefined" || email === null || email === "") {
            result.message = "Nome e email são obrigatórios";
            return result;
        }

        if (name.length < 4) {
            result.message = "Nome deve ter no mínimo 4 caracteres";
            return result;
        }
        if (email.length < 10 || !email.includes("@")) {
            result.message = "Email inválido";
            return result;
        }

        const user = userDB.update(Number(id), name, email);
        if (user === null) {
            result.message = "Usuário não encontrado";
            return result;
        }

        result.success = true;
        result.message = "Usuário alterado com sucesso";
        result.data = user;

        return result;
    }

    function remove(id) {
        const result = { success: false, message: "Erro ao remover o usuário", data: null };
        if (typeof id === "undefined" || id === null || id === "") {
            result.message = "Id é obrigatório";
            return result;
        }

        if (isNaN(id) || !Number.isInteger(Number(id)) || id < 1) {
            result.message = "Id deve ser um número inteiro maior que zero";
            return result;
        }

        const user = userDB.remove(Number(id));
        if (user === null) {
            result.message = "Usuário não encontrado";
            return result;
        }

        result.success = true;
        result.message = "Usuário removido com sucesso";
        result.data = user;

        return result;
    }

    return { get, getById, create, update, remove };
}
