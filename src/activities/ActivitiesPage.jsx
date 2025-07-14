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
  // /** Calls the mutate function with data from the form */
  const addActivity = (formData) => {
    const name = formData.get("name");
    // breed is required to add a puppy
    mutate({ name });
  };

  return (
    <>
      <h1>Activities</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {Array.isArray(activities) &&
        activities.map((activity) => <p key={activity.id}>{activity.name}</p>)}
      <form action={addActivity}>
        <label>
          Name: <input name="name" />
        </label>
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}
