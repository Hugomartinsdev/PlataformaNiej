import { GetOdonto } from "@/actions/get-odonto";
import { Heading } from "@/components/ui/heading";
import { FormResident, ResidentType } from "./_components/form-resident";
import { GoBackButton } from "./_components/go-back-button";

export default async function Page({
  params,
}: {
  params: { id: string; slug: string; record: string };
}) {
  const isCreating = params.record === "novo";

  const resident = isCreating ? null : await GetOdonto(params.record);

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
