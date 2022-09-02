import fs from "fs/promises";
import fsExists from "fs.promises.exists";
import User from "../model/User.mjs";

export default class UserDB {
    #users;
    #dataFile;

    constructor() {
        this.#load();
    }

    async #load() {
        try {
            this.#dataFile = new URL("database.json", import.meta.url);
            const exists = await fsExists(this.#dataFile);
            if (!exists) {
                await fs.writeFile(this.#dataFile, JSON.stringify([]));
            }
            const data = await fs.readFile(this.#dataFile);
            this.#users = JSON.parse(data);
            console.log("Database carregado com sucesso");
        } catch (error) {
            console.log("Erro ao carregar database: " + error);
        }
    }

    add(name, email) {
        const id = this.#users.length + 1;
        const user = new User(id, name, email);
        this.#users.push(user);
        this.#writeFile();
        return user;
    }

    get(id) {
        if (id <= this.#users.length && id > 0 && !this.#users[id - 1].deleted) {
            return this.#users[id - 1];
        }
        return null;
    }

    getAll() {
        const users = this.#users.filter((user) => !user.deleted);
        return users;
    }

    search(data) {
        const users = this.#users.filter((user) => {
            return !user.deleted && (user.name.toLowerCase().includes(data.toLowerCase()) || user.email.toLowerCase().includes(data.toLowerCase()));
        });
        return users;
    }

    update(id, name, email) {
        if (id <= this.#users.length && id > 0 && !this.#users[id - 1].deleted) {
            this.#users[id - 1].name = name;
            this.#users[id - 1].email = email;
            this.#writeFile();
            return this.#users[id - 1];
        }
        return null;
    }

    remove(id) {
        if (id <= this.#users.length && id > 0 && !this.#users[id - 1].deleted) {
            this.#users[id - 1].deleted = true;
            this.#writeFile();
            return this.#users[id - 1];
        }
        return null;
    }

    async #writeFile() {
        try {
            fs.writeFile(this.#dataFile, JSON.stringify(this.#users));
        } catch (error) {
            console.log("Erro ao escrever no database" + err);
        }
    }
}
