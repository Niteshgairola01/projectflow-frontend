import { User } from "lucide-react";

import { Input } from "../../../shared/components/ui/Input/Input";
import { Button } from "../../../shared/components/ui/Button/Button";
import { Select } from "../../../shared/components/ui/Input/Select";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTaskSchema,
  type CreateTaskPayload,
} from "../schema/createTaskSchema";
import { Textarea } from "../../../shared/components/ui/Input/TextArea";
import {
  taskPriorityOptions,
  taskStatusOptions,
} from "../constants/taskOptions";
import DateSelector from "../../../shared/components/DateSelector/DateSelector";
import { getServerDate } from "../../../shared/utils/formateDate";

interface TaskFormProps {
  defaultValues?: CreateTaskPayload;
  onSubmit: (data: CreateTaskPayload) => void;
  onCancel: () => void;
  isSubmitting: boolean;
  submitLabel: string;
}

const TaskForm = ({
  defaultValues,
  onSubmit,
  onCancel,
  isSubmitting,
  submitLabel,
}: TaskFormProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTaskPayload>({
    resolver: zodResolver(createTaskSchema),
    defaultValues,
  });

  const handleFormSubmit = (data: CreateTaskPayload) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      {/* Title */}
      <Input
        label="Task title"
        {...register("title")}
        error={errors.title?.message}
        placeholder="e.g. Fix authentication issue"
        autoFocus
      />

      {/* Description */}
      <Textarea
        label="Description"
        {...register("description")}
        error={errors.description?.message}
        placeholder="Describe what needs to be done..."
      />

      {/* Status + Priority */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Status"
          options={taskStatusOptions}
          {...register("status")}
          error={errors.status?.message}
          placeholder="Select status"
        />

        <Select
          label="Priority"
          options={taskPriorityOptions}
          {...register("priority")}
          error={errors.priority?.message}
          placeholder="Select priority"
        />
      </div>

      {/* Assignee + Due Date */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Assignee"
          options={[
            { label: "John Doe", value: "user-1" },
            { label: "Jane Smith", value: "user-2" },
          ]}
          {...register("assignedTo")}
          error={errors.assignedTo?.message}
          placeholder="Assign to..."
          icon={<User size={16} />}
        />

        {/* Due Date */}
        <Controller
          name="dueDate"
          control={control}
          render={({ field }) => (
            <DateSelector
              label="End Date"
              value={field.value ? new Date(field.value) : null}
              onChange={(date) => {
                field.onChange(date ? getServerDate(date) : "");
              }}
              error={errors.dueDate?.message}
            />
          )}
        />
        {/* <Input label="Due date" type="date" /> */}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 border-t pt-5">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-xl border px-4 py-2"
        >
          Cancel
        </button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
