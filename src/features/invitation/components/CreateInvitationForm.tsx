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

const CreateInvitationForm = ({ open, onClose }) => {
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

        <div className="flex items-center justify-end gap-3 border-t pt-5">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <Button
            type="submit"
            className="inline-flex justify-center items-center gap-3 w-100"
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
