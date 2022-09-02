import fs from "fs";
import User from "../model/User.mjs";

export default class UserDB {
    #users;
    #dataFile;

    constructor() {
        this.#dataFile = new URL("database.json", import.meta.url);

        if (!fs.existsSync(this.#dataFile)) {
            fs.writeFileSync(this.#dataFile, JSON.stringify([]));
        }
        const data = fs.readFileSync(this.#dataFile);
        this.#users = JSON.parse(data);
    }

    add(name, email) {
        const id = this.#users.length + 1;
        const user = new User(id, name, email);
        this.#users.push(user);
        this.#writeFile();
        return user;
    }

    delete(id) {
        const user = this.#users.find((user) => user.id === id);
        if (user) {
            user.deleted = true; // soft delete
            this.#writeFile();
            return true;
        }
        return false;
    }

    getAll() {
        //todo somente usuários ativos
        return this.#users;
    }

    #writeFile() {
        fs.writeFile(this.#dataFile, JSON.stringify(this.#users), (err) => {
            if (err) {
                console.log("Erro ao escrever no database" + err);
            }
        });
    }
}
