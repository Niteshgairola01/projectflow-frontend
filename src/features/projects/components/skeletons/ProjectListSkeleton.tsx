import ProjectCardSkeleton from "./ProjectCardSkeleton";

const ProjectListSkeleton = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProjectCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProjectListSkeleton;
