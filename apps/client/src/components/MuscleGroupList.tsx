import { useGetMuscleGroupsQuery } from '@/features/api/workoutApi';

export default function MuscleGroupList() {
  const { data: groups = [], isLoading } = useGetMuscleGroupsQuery();

  if (isLoading) return <p>Loading muscle groups...</p>;

  return (
    <div className="grid grid-cols-3 gap-4">
      {groups.map((group) => (
        <div key={group._id} className="text-center">
          <img
            src={`http://localhost:5050/static/icons/${group.icon}`}
            alt={group.name}
            className="w-12 h-12 mx-auto mb-2"
          />
          <p className="text-sm text-white">{group.name}</p>
        </div>
      ))}
    </div>
  );
}
