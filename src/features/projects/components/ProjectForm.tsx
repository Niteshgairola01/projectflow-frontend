import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "../../../shared/components/ui/Input/Input";
import { Textarea } from "../../../shared/components/ui/Input/TextArea";
import { Button } from "../../../shared/components/ui/Button/Button";
import DateSelector from "../../../shared/components/DateSelector/DateSelector";

import { PROJECT_COLOR } from "../constants/projectColors";
import {
  createProjectSchema,
  type CreateProjectPayload,
} from "../schema/createProjectSchema";
import { getServerDate } from "../../../shared/utils/formateDate";

interface ProjectFormProps {
  defaultValues?: CreateProjectPayload;
  onSubmit: (data: CreateProjectPayload) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
  submitLabel?: string;
}

const colors = PROJECT_COLOR;

const ProjectForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting = false,
  submitLabel = "Create Project",
}: ProjectFormProps) => {
  const [selectedColor, setSelectedColor] = useState(
    defaultValues?.color ?? colors[0]
  );

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectPayload>({
    resolver: zodResolver(createProjectSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: CreateProjectPayload) => {
    onSubmit({
      ...data,
      color: selectedColor,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
              field.onChange(date ? getServerDate(date) : "");
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
              field.onChange(date ? getServerDate(date) : "");
            }}
            error={errors.endDate?.message}
          />
        )}
      />

      {/* color */}
      <div>
        <label className="mb-3 block text-sm font-medium">Workspace Icon</label>

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
          onClick={onCancel}
          className="rounded-xl border px-4 py-2"
        >
          Cancel
        </button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default ProjectForm;
