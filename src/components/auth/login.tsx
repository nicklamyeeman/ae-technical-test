"use client";

import { fetchApi } from "@/data/utils/api";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { Spinner } from "../utils/spinner";

export const Login: React.FC = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = useCallback(async () => {
    if (!email || !password) {
      return;
    }
    try {
      setLoading(true);
      await fetchApi("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then(() => {
        router.replace("/");
        router.refresh();
      });
    } catch (error: any) {
      if (typeof error === "string") {
        setError(error);
      }
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [router, email, password]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center gap-10 px-6 py-12 lg:px-8">
      <div className="w-full sm:mx-auto sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold tracking-tight text-stone-900">
          Log in to your account
        </h1>
      </div>
      <div className="flex flex-col w-full gap-6 sm:mx-auto sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-stone-500"
              >
                Email address
              </label>
              <input
                required
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md bg-stone-50/15 py-1.5 px-2 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-500/10 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-stone-500"
              >
                Password
              </label>
              <input
                required
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-stone-50/15 py-1.5 px-2 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-500/10 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex flex-col mt-4 gap-1">
              <span className="text-xs text-red-600 h-4">{error}</span>
              <button
                type="submit"
                disabled={!email || !password}
                className="disabled:opacity-40 flex w-full items-center justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-stone-50 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Sign in
                {loading && <Spinner className="mx-2" size={20} color="gray" />}
              </button>
            </div>
          </div>
        </form>
        <p className="text-center text-sm text-stone-400">
          Not a member yet ?
          <button
            onClick={() => router.push("register")}
            className="mx-2 font-semibold text-amber-500 hover:text-amber-400"
          >
            Register now
          </button>
        </p>
      </div>
    </div>
  );
};
