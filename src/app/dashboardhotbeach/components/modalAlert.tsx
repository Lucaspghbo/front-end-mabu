"use client";
import { Button, ButtonComp } from "@/components/ui/button";

export function ModalAlert({
  title,
  description,
  titleBtnAccept,
  onClickCancel,
  onClickAceppt,
  isLoading
}: {
  title: string;
  description?: string;
  titleBtnAccept: string;
  onClickCancel: () => void;
  onClickAceppt: () => void;
  isLoading: boolean;
}) {
  return (
    <div className="fixed inset-0 z-[9999] flex px-2 items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-lg p-6 rounded-xl">
        <h2 className="text-zinc-500 text-2xl text-center">{title}</h2>
        {description && (
          <p className="text-zinc-500 text-center mt-4">{description}</p>
        )}
        <div className="w-full flex items-center justify-between gap-6 mt-8">
          <Button
            className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-all"
            onClick={onClickCancel}
          >
            Cancelar
          </Button>
          <div className="w-32">
            <ButtonComp
              text={titleBtnAccept}
              isLoading={isLoading}
              onClick={onClickAceppt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
