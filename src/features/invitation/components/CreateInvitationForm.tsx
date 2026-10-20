import { useForm } from "react-hook-form";
import { Button } from "../../../shared/components/ui/Button/Button";
import { Input } from "../../../shared/components/ui/Input/Input";
import Modal from "../../../shared/components/ui/Modal/Modal";
import {
  createInvitationSchema,
  type CreateInvitationPayload,
} from "../schema/invitationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateInvitation } from "../hooks/useCreateInvitation";
import { notify } from "../../../shared/utils/toast";
import { getErrorMessage } from "../../../shared/utils/getErrorMessage";
import { Send } from "lucide-react";

interface CreateInvitationFormProps {
  open: boolean;
  onClose: () => void;
}

const CreateInvitationForm = ({ open, onClose }: CreateInvitationFormProps) => {
  const { mutateAsync, isPending } = useCreateInvitation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateInvitationPayload>({
    resolver: zodResolver(createInvitationSchema),
  });

  const onCancel = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = async (data: CreateInvitationPayload) => {
    try {
      await mutateAsync(data);
      notify.success("Invitation sent successfully");
      onCancel();
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      notify.error(errorMessage);
      console.log("error", error);
    }
  };

  return (
    <Modal open={open} onClose={onCancel} title="Create Invitation">
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          label="Email"
          {...register("email")}
          error={errors.email?.message}
          placeholder="user@gmail.com"
        />

        <div className="flex flex-col-reverse gap-3 border-t pt-5 sm:flex-row sm:items-center sm:justify-end">
          <button
            type="button"
            onClick={onCancel}
            className="h-11 shrink-0 rounded-lg border px-4 text-sm font-medium"
          >
            Cancel
          </button>

          <Button
            type="submit"
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 sm:w-auto"
            disabled={isPending}
          >
            <Send size={18} />
            {isPending ? "Sending..." : "Send"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateInvitationForm;
