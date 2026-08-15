import { useState } from "react";
import { Input } from "../../../shared/components/ui/Input/Input";
import Modal from "../../../shared/components/ui/Modal/Modal";
import { PROJECT_COLOR } from "../constants/projectColors";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProjectSchema,
  type CreateProjectPayload,
} from "../schema/createProjectSchema";
import { Controller, useForm } from "react-hook-form";
import { Textarea } from "../../../shared/components/ui/Input/TextArea";
import { useCreateProject } from "../hooks/useCreateProject";
import { Button } from "../../../shared/components/ui/Button/Button";
import DateSelector from "../../../shared/components/DateSelector/DateSelector";

interface CreateProjectModalProps {
  open: boolean;
  onClose: () => void;
}
const colors = PROJECT_COLOR;

const CreateProjectModal = ({ open, onClose }: CreateProjectModalProps) => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  const { mutateAsync, isPending } = useCreateProject();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateProjectPayload>({
    resolver: zodResolver(createProjectSchema),
  });

  const handleClose = () => {
    onClose();
  };

  const onSubmit = async (data: CreateProjectPayload) => {
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

  return (
    <Modal
      title="Create Project"
      description="Organize your projects and team members"
      open={open}
      onClose={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* name */}
        <Input
          label="Name"
          placeholder="Project name"
          {...register("name")}
          error={errors.name?.message}
        />

        {/* description */}
        <Textarea
          label="Description"
          placeholder="Description"
          {...register("description")}
          error={errors.description?.message}
        />

        {/* start date */}
        <Controller
          name="startDate"
          control={control}
          render={({ field }) => (
            <DateSelector
              label="Start Date"
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date.toISOString().split("T")[0] : "");
              }}
              error={errors.startDate?.message}
            />
          )}
        />
        {/* end date */}
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => (
            <DateSelector
              label="End Date"
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? date.toISOString().split("T")[0] : "");
              }}
              error={errors.endDate?.message}
            />
          )}
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

export default CreateProjectModal;
