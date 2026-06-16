import { useState } from "react";
import { Input } from "../../../shared/components/ui/Input/Input";
import Modal from "../../../shared/components/ui/Modal/Modal";
import { Button } from "../../../shared/components/ui/Button/Button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createWorkspaceSchema } from "../schema/createWorkspaceSchema";
import type { CreateWorkspacePayload } from "../types/workspace.types";
import { useCreateWorkspace } from "../hooks/useCreateWorkspace";
import { WORKSPACE_COLOR } from "../../../shared/constants/workspaceColors";

interface CreateWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
}

const colors = WORKSPACE_COLOR;

const CreateWorkspaceModal = ({ open, onClose }: CreateWorkspaceModalProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const { mutateAsync, isPending } = useCreateWorkspace();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createWorkspaceSchema),
  });

  const onSubmit = async (data: CreateWorkspacePayload) => {
    try {
      await mutateAsync({
        ...data,
        color: selectedColor,
      });

      setSelectedColor(colors[0]);
      reset();
      onClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleClose = () => {
    setSelectedColor(colors[0]);
    reset();
    onClose();
  };

  return (
    <Modal
      title="Create Workspace"
      description="Organize your projects and team members"
      open={open}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* name */}
        <Input
          label="Workspace Name"
          placeholder="Development team"
          {...register("name")}
          error={errors.name?.message}
        />

        {/* color */}
        <div>
          <label className="mb-3 block text-sm font-medium">
            Workspace Icon
          </label>

          <div className="flex gap-3">
            {colors.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setSelectedColor(color)}
                className="h-10 w-10 rounded-full border-2 transition"
                style={{
                  backgroundColor: color,
                  borderColor:
                    selectedColor === color ? "#000000" : "transparent",
                }}
              />
            ))}
          </div>
        </div>

        {/* actions */}

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border px-4 py-2"
          >
            Cancel
          </button>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Creating..." : "Create Workspace"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateWorkspaceModal;
