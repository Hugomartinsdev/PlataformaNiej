"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Field, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { ButtonAnimated } from "@/components/ui/ButtonAnimated";
import { ChangePassword } from "@/actions/change-password";
import { toast } from "sonner";

const changePasswordFormSchema = z
  .object({
    current_password: z.string(),
    new_password: z
      .string({
        required_error: "Nova senha é obrigatória",
      })
      .min(8, {
        message: "A senha deve ter no mínimo 8 dígitos.",
      })
      .regex(
        new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
        "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula e um número.",
      ),
    confirm_password: z.string({
      required_error: "Confirmação de senha é obrigatória",
    }),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "As senhas precisam ser iguais.",
    path: ["confirm_password"],
  });

type ChangePasswordSchema = z.infer<typeof changePasswordFormSchema>;

export function ChangePasswordForm() {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordFormSchema),
  });

  async function handleChangePassword(data: ChangePasswordSchema) {
    const { current_password, new_password } = data;

    try {
      // TODO: Implement changePassword - @FabioNeves00
      // await changePassword({ current_password, new_password });
      await ChangePassword({
        newPassword: new_password,
        oldPassword: current_password,
      });
      setIsSubmitSuccessful(true);

      setTimeout(() => {
        setIsSubmitSuccessful(false);
      }, 5000);

      toast.success("Senha alterada com sucesso.");
    } catch {
      toast.error("Erro ao alterar senha.");
      setError("current_password", {
        type: "manual",
        message: "Senha atual incorreta",
      });
    }
  }

  return (
    <form
      className="md:col-span-2"
      onSubmit={handleSubmit(handleChangePassword)}
    >
      <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <Field className="col-span-full">
          <Label>Senha atual</Label>
          <Input
            type="password"
            autoComplete="current-password"
            required
            className="mt-2"
            disabled={isSubmitting || isSubmitSuccessful}
            {...register("current_password")}
          />

          {errors.current_password && (
            <Text className="mt-1 !text-red-500">
              {errors.current_password.message}
            </Text>
          )}
        </Field>

        <Field className="col-span-full">
          <Label>Nova senha</Label>
          <Input
            type="password"
            autoComplete="new-password"
            className="mt-2"
            disabled={isSubmitting || isSubmitSuccessful}
            {...register("new_password")}
          />

          {errors.new_password && (
            <Text className="mt-1 !text-red-500">
              {errors.new_password.message}
            </Text>
          )}
        </Field>

        <div className="col-span-full">
          <Label>Confirmação de senha</Label>
          <Input
            type="password"
            className="mt-2"
            autoComplete="new-password"
            disabled={isSubmitting || isSubmitSuccessful}
            {...register("confirm_password")}
          />

          {errors.confirm_password && (
            <Text className="mt-1 !text-red-500">
              {errors.confirm_password.message}
            </Text>
          )}
        </div>
      </Fieldset>

      <div className="mt-8 flex">
        <ButtonAnimated
          type="submit"
          loader={<Loader className="h-6 w-6 animate-spin" />}
          success={
            <div className="flex">
              <CheckIcon className="h-6 w-6" />
              <span className="ml-2">Senha alterada com sucesso.</span>
            </div>
          }
          state={
            isSubmitSuccessful ? "success" : isSubmitting ? "loading" : "idle"
          }
          disabled={isSubmitting || isSubmitSuccessful}
        >
          Salvar
        </ButtonAnimated>
      </div>
    </form>
  );
}
