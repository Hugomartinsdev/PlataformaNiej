import { Heading } from "@/components/ui/heading";
import { GoBackButton } from "./_components/go-back-button";
import { FormResident, ResidentType } from "./_components/form-resident";
import { getResident } from "@/actions/get-resident";
import { GetPsychologyTriage } from "@/actions/get-psychology-triage";

export default async function Page({
  params,
}: {
  params: { id: string; slug: string; record: string };
}) {
  const isCreating = params.record === "novo";

  const resident = isCreating ? null : await GetPsychologyTriage(params.record);

  return (
    <>
      <GoBackButton />
      <div className="mt-4 lg:mt-8">
        <div className="flex items-center gap-4">
          <Heading>{isCreating && "Cadastrar"} Ficha </Heading>
        </div>
      </div>

      <FormResident
        projectId={params.id}
        data={resident as ResidentType}
        residentId={params.slug}
      />
    </>
  );
}
