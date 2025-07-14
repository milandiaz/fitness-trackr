import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

export default function ActivitiesPage() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", "activities");
  // Mutation that will POST /players and invalidate the "puppies" tag
  // I am renaming the data, loading, and error variables here because
  // they will conflict with the query variables otherwise

  const {
    mutate,
    data: addedActivity,
    loading: adding,
    error: addError,
  } = useMutation("POST", "/activities", ["activities"]);

  /** Calls the mutate function with data from the form */
  const addActivity = (formData) => {
    const name = formData.get("name");
    const description = formData.get("description");
    // breed is required to add a puppy
    console.log("Submitting:", { name, description });
    mutate({ name, description });
  };

  const {
    mutate: deleteMutate,
    loading: deleting,
    error: deleteError,
  } = useMutation("DELETE", "/activities", ["activities"]);

  const handleDelete = (id) => {
    deleteMutate(null, `/activities/${id}`);
  };

  return (
    <>
      <h1>Activities</h1>

      {Array.isArray(activities) &&
        activities.map((activity) => (
          <div key={activity.id}>
            <p>{activity.name}</p>
            <button onClick={() => handleDelete(activity.id)}>Delete</button>
          </div>
        ))}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addActivity(new FormData(e.target));
        }}
      >
        <label>
          Name: <input name="name" required />
        </label>
        <label>
          Description: <input name="description" required />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
