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
            return (
                !user.deleted &&
                (user.name.toLowerCase().includes(data.toLowerCase()) ||
                user.email.toLowerCase().includes(data.toLowerCase()) )
            );
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

    #writeFile() {
        fs.writeFile(this.#dataFile, JSON.stringify(this.#users), (err) => {
            if (err) {
                console.log("Erro ao escrever no database" + err);
            }
        });
    }
}
