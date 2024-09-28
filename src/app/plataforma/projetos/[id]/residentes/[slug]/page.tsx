import { getResident } from "@/actions/get-resident";
import { notFound } from "next/navigation";
import { GoBackButton } from "./editar/_components/go-back-button";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { ButtonEdit } from "./_components/button-edit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Divider } from "@/components/ui/divider";
import { columns } from "./_components/table/columns";
import { RecordDataTable } from "./_components/table/data-table";
import CreateRecordDialog from "./_components/create-record-dialog";
import { GetRecords } from "@/actions/get-records";

export default async function Page({
  params,
}: {
  params: { id: string; slug: string };
}) {
  const resident = await getResident(params.slug);

  if (!resident) {
    notFound();
  }

  const records = await GetRecords(resident.id);

  return (
    <>
      <GoBackButton />
      <div className="mt-4 lg:mt-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex items-center gap-4">
            <Heading>Residente {resident.name}</Heading>
          </div>

          <ButtonEdit id={resident.id} />
        </div>

        <Accordion
          type="single"
          collapsible
          className="mt-4 w-full space-y-4 text-sm lg:mt-8"
        >
          <AccordionItem
            className="rounded border border-slate-200 bg-slate-50 px-4"
            value="item-1"
          >
            <AccordionTrigger>Informações básicas</AccordionTrigger>
            <AccordionContent className="text-slate-600">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p>
                    <strong>Nome:</strong> {resident.name}
                  </p>
                  <p>
                    <strong>Data de nascimento:</strong> {resident.birthDate}
                  </p>
                  <p>
                    <strong>CPF:</strong> {resident.cpf}
                  </p>
                  <p>
                    <strong>RG:</strong> {resident.rg}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>SUS:</strong> {resident.susCardNumber}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {resident.contactPhone}
                  </p>
                  <p>
                    <strong>Residência e Domicílio:</strong>{" "}
                    {resident.residenceInfo}
                  </p>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Divider soft className="my-7" />
        <RecordDataTable columns={columns} data={records} />
        <CreateRecordDialog idResident={params.slug} />
      </div>
    </>
  );
}
