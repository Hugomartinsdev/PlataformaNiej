"use client";

import { zodResolver } from "@hookform/resolvers/zod";

import { CheckIcon, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { MutableRefObject, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Avatar } from "@/components/ui/avatar";
import { Field, Fieldset, Label } from "@/components/ui/fieldset";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { UserType } from "@/@types/user";
import { ButtonAnimated } from "@/components/ui/ButtonAnimated";
import { updateProfile } from "@/actions/update-profile";
import { toast } from "sonner";

type Props = {
  user: UserType;
};

const personalInfoFormSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(3, {
      message: "O nome deve ter no mínimo 3 caracteres.",
    })
    .max(255, {
      message: "O nome deve ter no máximo 255 caracteres.",
    }),
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email({
      message: "Email inválido",
    }),
});

type PersonalInfoSchema = z.infer<typeof personalInfoFormSchema>;

export function ChangePersonalInfoForm({ user }: Props) {
  const router = useRouter();
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState(false);

  const [profileAvatarFile, setProfileAvatarFile] = useState<File | null>(null);
  const [profileAvatarIsLoading, setProfileAvatarIsLoading] = useState(false);

  const inputProfileAvatar = useRef<HTMLInputElement>();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<PersonalInfoSchema>({
    resolver: zodResolver(personalInfoFormSchema),
  });

  async function handlePersonalInfo(data: PersonalInfoSchema) {
    const { name, email } = data;

    try {
      await updateProfile({
        name,
        email,
      });

      setIsSubmitSuccessful(true);

      router.refresh();

      setTimeout(() => {
        setIsSubmitSuccessful(false);
      }, 5000);

      toast.success("Informações atualizadas com sucesso.");
    } catch {
      toast.error("Erro ao atualizar as informações.");
    }
  }

  const handleChooseProfileAvatar = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!e.target.files?.[0]) return;

    const file = e.target.files[0];

    const maxSize = 1024 * 1024; // 1MB

    if (file.size > maxSize) {
      alert("O arquivo é muito grande. O tamanho máximo é 1MB.");
      return;
    }

    try {
      setProfileAvatarFile(file);

      setProfileAvatarIsLoading(true);

      router.refresh();

      setTimeout(() => {
        setProfileAvatarIsLoading(false);
      }, 8000);
    } catch (error) {
      alert("Erro ao carregar a imagem.");
    }
  };

  return (
    <form className="md:col-span-2" onSubmit={handleSubmit(handlePersonalInfo)}>
      <Fieldset className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
        <div className="col-span-full flex items-center gap-x-8">
          <Avatar
            initials={user.name[0] + user.name[1]}
            src={
              profileAvatarFile
                ? URL.createObjectURL(profileAvatarFile)
                : undefined
            }
            className={cn("size-24 max-h-24 text-white", {
              "animate-pulse": profileAvatarIsLoading,
            })}
            square
            alt={`Avatar de ${user.name}`}
            style={{
              backgroundColor: "#000",
            }}
          />
          <div>
            <ButtonAnimated
              type="button"
              onClick={() => {
                inputProfileAvatar?.current?.click();
              }}
              animated
              loader={<Loader className="h-6 w-6 animate-spin" />}
              state={profileAvatarIsLoading ? "loading" : "idle"}
              disabled={
                isSubmitting || isSubmitSuccessful || profileAvatarIsLoading
              }
            >
              Alterar foto
            </ButtonAnimated>
            <Text className="mt-2">JPG, GIF or PNG. 1MB max.</Text>

            <input
              ref={inputProfileAvatar as MutableRefObject<HTMLInputElement>}
              type="file"
              accept="image/*"
              className="hidden"
              max={1}
              size={1024 * 1024} // 1MB
              onChange={handleChooseProfileAvatar}
            />
          </div>
        </div>

        <Field className="col-span-full">
          <Label>Nome completo</Label>
          <Input
            type="text"
            autoComplete="given-name"
            required
            className="mt-2"
            defaultValue={user.name}
            disabled={isSubmitting || isSubmitSuccessful}
            {...register("name")}
          />

          {errors.name && (
            <Text className="mt-1 !text-red-500">{errors.name.message}</Text>
          )}
        </Field>

        <Field className="col-span-full">
          <Label>Email</Label>
          <Input
            type="text"
            autoComplete="email"
            className="mt-2"
            defaultValue={user.email}
            disabled={isSubmitting || isSubmitSuccessful}
            {...register("email")}
          />

          {errors.email && (
            <Text className="mt-1 !text-red-500">{errors.email.message}</Text>
          )}
        </Field>
      </Fieldset>

      <div className="mt-8 flex">
        <ButtonAnimated
          type="submit"
          animated
          loader={<Loader className="h-6 w-6 animate-spin" />}
          success={
            <div className="flex">
              <CheckIcon className="h-6 w-6" />
              <span className="ml-2">Informações atualizadas com sucesso!</span>
            </div>
          }
          state={
            isSubmitSuccessful ? "success" : isSubmitting ? "loading" : "idle"
          }
          disabled={
            isSubmitting || isSubmitSuccessful || profileAvatarIsLoading
          }
        >
          Salvar
        </ButtonAnimated>
      </div>
    </form>
  );
}
