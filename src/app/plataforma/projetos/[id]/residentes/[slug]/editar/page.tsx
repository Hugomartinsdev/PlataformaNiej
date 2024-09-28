import { Heading } from "@/components/ui/heading";
import { GoBackButton } from "./_components/go-back-button";
import { FormResident, ResidentType } from "./_components/form-resident";
import { getResident } from "@/actions/get-resident";

export default async function Page({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const isCreating = params.slug === "novo";

  const resident = isCreating ? null : await getResident(params.slug);

  return (
    <>
      <GoBackButton />
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>
            {isCreating && "Cadastrar"} Residente{" "}
            {!isCreating && resident!.name}
          </Heading>
        </div>
      </div>

      <FormResident projectId={params.id} data={resident as ResidentType} />
    </>
  );
}
