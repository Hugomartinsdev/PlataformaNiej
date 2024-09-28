"use client";

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { useMediaQuery } from "usehooks-ts";

import { ButtonAnimated } from "./ui/ButtonAnimated";
import { Drawer, DrawerContent, DrawerTitle } from "./ui/drawer";
import { Text } from "./ui/text";
import { Dialog, DialogTitle } from "./ui/dialog";

type Props = {
  open: boolean;
  title: string;
  message: string;
  onHandleClose: () => void;
  onHandleDelete: () => void;
  isLoading: boolean;
  disabled?: boolean;
};

export default function DeleteDialog(props: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = useState(props.open);

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  if (isDesktop) {
    return (
      <Dialog
        open={open}
        // onOpenChange={(isOpen) => {
        //   if (!isOpen) {
        //     props.onHandleClose();
        //   }
        // }}
        onClose={() => {
          props.onHandleClose();
        }}
      >
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="h-6 w-6 text-red-600"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <DialogTitle
              as="h2"
              className="text-base font-semibold leading-6 text-gray-900"
            >
              {props.title}
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{props.message}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <ButtonAnimated
            type="button"
            onClick={() => {
              props.onHandleDelete();
            }}
            disabled={props.isLoading || props.disabled}
            animated
            color="red"
            state={props.isLoading ? "loading" : "idle"}
            loader={<Loader className="h-6 w-6 animate-spin" />}
            className="ml-3"
          >
            Excluir
          </ButtonAnimated>
          <ButtonAnimated
            type="button"
            data-autofocus
            outline
            onClick={() => {
              props.onHandleClose();
            }}
            disabled={props.isLoading}
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
          >
            Cancelar
          </ButtonAnimated>
        </div>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          props.onHandleClose();
        }
      }}
    >
      <DrawerContent className="px-4 pb-16">
        <div>
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="h-6 w-6 text-red-600"
            />
          </div>
          <div className="mt-3 text-center sm:mt-5">
            <DrawerTitle className="text-base font-semibold leading-6 text-gray-900">
              {props.title}
            </DrawerTitle>
            <div className="mt-2">
              <Text>{props.message}</Text>
            </div>
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          <ButtonAnimated
            type="button"
            onClick={() => {
              props.onHandleDelete();
            }}
            disabled={props.isLoading}
            animated
            color="red"
            state={props.isLoading ? "loading" : "idle"}
            loader={<Loader className="h-6 w-6 animate-spin" />}
          >
            Excluir
          </ButtonAnimated>
          <ButtonAnimated
            type="button"
            data-autofocus
            outline
            onClick={() => {
              props.onHandleClose();
            }}
            disabled={props.isLoading}
          >
            Cancelar
          </ButtonAnimated>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
