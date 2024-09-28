"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SignIn } from "@/actions/sign-in";
import { ButtonAnimated } from "@/components/ui/ButtonAnimated";
import { Loader } from "lucide-react";
import { CheckIcon } from "@heroicons/react/20/solid";

const loginSchema = z.object({
  email: z.string().email({
    message: "Endereço de e-mail inválido",
  }),
  password: z.string().min(1, {
    message: "Senha é obrigatória",
  }),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await SignIn(values.email, values.password);
    } catch (error) {
      console.error(error);
      form.setError("password", {
        type: "manual",
        message: "Credenciais inválidas",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium leading-6 text-gray-900">
                Endereço de e-mail
              </FormLabel>
              <FormControl className="mt-2">
                <Input type="email" required autoComplete="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block text-sm font-medium leading-6 text-gray-900">
                Senha
              </FormLabel>
              <FormControl className="mt-2">
                <Input
                  type="password"
                  required
                  autoComplete="current-password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
            <label
              htmlFor="remember-me"
              className="ml-3 block text-sm leading-6 text-gray-900"
            >
              Lembrar-me
            </label>
          </div>

          <div className="text-sm leading-6">
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              Esqueceu sua senha?
            </a>
          </div>
        </div>

        <div>
          <ButtonAnimated
            type="submit"
            className="w-full"
            animated
            loader={<Loader className="h-6 w-6 animate-spin" />}
            success={
              <div className="flex">
                <CheckIcon className="h-6 w-6" />
                <span className="ml-2">Entrou com sucesso!</span>
              </div>
            }
            state={
              form.formState.isSubmitSuccessful
                ? "success"
                : form.formState.isSubmitting
                  ? "loading"
                  : "idle"
            }
            disabled={
              form.formState.isSubmitting || form.formState.isSubmitSuccessful
            }
          >
            Entrar
          </ButtonAnimated>
        </div>
      </form>
    </Form>
  );
}
