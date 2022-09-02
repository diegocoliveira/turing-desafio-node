import UserService from "../services/UserService.mjs";

export default function UserController() {
    const service = new UserService();

    function getAll(req, res) {
        const users = service.getAll();
        res.status(200).json(users);
    }

    function getById(req, res) {
        res.status(200).send("getById");
    }

    function create(req, res) {
        const data = req.body;
        const result = service.create(data.name, data.email);

        if (result.success) {
            res.status(201).json(result.message);
        } else {
            res.status(400).json(result.message);
        }
    }

    function update(req, res) {
        res.status(200).send("update");
    }

    function remove(req, res) {
        res.status(200).send("remove");
    }

    return { getAll, getById, create, update, remove };
}
