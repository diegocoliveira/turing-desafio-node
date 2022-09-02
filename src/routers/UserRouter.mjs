import UserController from "../controllers/UserController.mjs";
export default function UserRouter(express) {
    const router = express.Router();
    const userController = UserController();
    router.get("/", userController.get);
    router.get("/:id", userController.getById);
    router.post("/", userController.create);
    router.put("/:id", userController.update);
    router.delete("/:id", userController.remove);

    return router;
}