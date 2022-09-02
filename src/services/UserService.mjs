import UserDB from "../database/UserDB.mjs";

export default function UserService() {
    const userDB = new UserDB();

    function getAll() {
        return userDB.getAll();
    }

    function getById() {
        //todo
    }

    function create(name, email) {
        const result = { success: false, message: "Erro ao criar usuário" };

        if (typeof name === "undefined" || name === null || name === "" || typeof email === "undefined" || email === null || email === "") {
            result.message = "Nome e email são obrigatórios";
            return result;
        }

        if (name.length < 5) {
            result.message = "Nome deve ter no mínimo 5 caracteres";
            return result;
        }
        if (email.length < 5 || !email.includes("@")) {
            result.message = "Email inválido";
            return result;
        }
        const user = userDB.add(name, email);
        console.log("user", user);
        if (user.id > 0) {
            result.successc = true;
            result.message = `O usuário ${user.name} foi criado com sucesso com o id ${user.id}`;
        }
        return result;
    }

    return { getAll, getById, create };
}
