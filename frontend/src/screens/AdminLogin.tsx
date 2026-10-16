import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "@/lib/ui";
import { adminLogin } from "@/lib/api";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: () => adminLogin(email, password),
    onSuccess: () => navigate("/admin-orders", { replace: true }),
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    mutation.mutate();
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{ backgroundColor: "var(--brand-background)" }}
    >
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Staff sign in</CardTitle>
            <CardDescription>
              Sign in with your staff account to manage orders and the catalogue.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="admin-email">Email</Label>
              <Input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                className="mt-1.5"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="admin-password">Password</Label>
              <Input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                className="mt-1.5"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            {mutation.isError && (
              <p role="alert" className="text-sm" style={{ color: "#b91c1c" }}>
                Incorrect email or password.
              </p>
            )}
          </CardContent>
          <CardFooter className="justify-end">
            <Button type="submit" disabled={mutation.isPending} className="w-full">
              {mutation.isPending ? "Signing in…" : "Sign in"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
