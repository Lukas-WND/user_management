import { CreateUserForm } from "../../components/UserForm";

export default function CreateUser() {
    return (
        <section className="m-8">
            <h1 className="text-4xl font-bold">Cadastro de usuários</h1>
            <CreateUserForm />
        </section>
    )
}