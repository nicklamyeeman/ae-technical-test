"use client";

import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

import { fetchApi } from "@/data/utils/api";
import { Spinner } from "../ui/spinner";

export const Register: React.FC = () => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSignup = useCallback(async () => {
    if (!username || !email || !password) {
      return;
    }
    try {
      await fetchApi("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      }).then(() => {
        router.replace("/login");
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
  }, [router, username, email, password]);

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center gap-10 px-6 py-12 lg:px-8">
      <div className="w-full sm:mx-auto sm:max-w-sm">
        <h1 className="text-center text-2xl font-bold tracking-tight text-stone-900">
          Register
        </h1>
      </div>
      <div className="flex flex-col w-full gap-6 sm:mx-auto sm:max-w-sm">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSignup();
          }}
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-col">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-stone-500"
              >
                Username
              </label>
              <input
                required
                id="username"
                name="username"
                type="username"
                autoComplete="username"
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md bg-stone-50/15 py-1.5 px-2 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-500/10 sm:text-sm sm:leading-6"
              />
            </div>
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
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md bg-stone-50/15 py-1.5 px-2 text-stone-900 shadow-sm ring-1 ring-inset ring-stone-500/10 sm:text-sm sm:leading-6"
              />
            </div>
            <div className="flex flex-col mt-4 gap-1">
              <span className="text-xs text-red-600 h-4">{error}</span>
              <button
                type="submit"
                disabled={!username || !email || !password}
                className="disabled:opacity-40 flex w-full items-center justify-center rounded-md bg-amber-500 px-3 py-1.5 text-sm font-semibold leading-6 text-stone-50 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500"
              >
                Register
                {loading && <Spinner className="ml-2" size={20} color="gray" />}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
