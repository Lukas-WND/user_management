import { LoginForm } from "./components/LoginForm";

export default function LoginPage() {
  return (
    <main className="w-full h-screen overflow-hidden bg-custom-dark-blue">
      <section className="flex h-screen items-center justify-center animate-fade-in">
        <div className="w-1/2 h-full flex items-center justify-center">
          <img src="WenLock_Login_Logo.svg" alt="WenLock_Logo" />
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
