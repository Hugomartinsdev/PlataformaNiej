import { getUser } from "@/actions/get-user";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { ChangePersonalInfoForm } from "./_components/change-personal-info-form";
import { ChangePasswordForm } from "./_components/change-password-form";

export default async function ProfilePage() {
  const user = await getUser();

  return (
    <div className="divide-y border-zinc-950/5 dark:border-white/5">
      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Heading>Informações Pessoais</Heading>
          <Text>
            Altere suas informações pessoais, como nome, email e senha.
          </Text>
        </div>
        <ChangePersonalInfoForm user={user} />
      </div>

      <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <Heading className="text-base font-semibold leading-7 text-white">
            Alterar senha
          </Heading>
          <Text>Altere sua senha atual para uma nova senha.</Text>
        </div>

        <ChangePasswordForm />
      </div>
    </div>
  );
}
