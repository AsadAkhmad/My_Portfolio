import { LoginForm } from "./LoginForm";

export const metadata = { title: "Admin Login" };

export default function AdminLoginPage() {
  return (
    <main data-theme="recruiter" className="flex min-h-screen flex-1 items-center justify-center bg-background px-6">
      <div className="w-full max-w-sm">
        <h1 className="mb-1 text-xl font-semibold text-foreground">Admin sign in</h1>
        <p className="mb-6 text-sm text-muted-foreground">Manage your portfolio content.</p>
        <LoginForm />
      </div>
    </main>
  );
}
