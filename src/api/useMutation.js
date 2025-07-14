import { useState } from "react";
import { useApi } from "./ApiContext";

export default function useMutation(method, resource, tagsToInvalidate) {
  const { request, invalidateTags } = useApi();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mutate = async (body, overrideResource = null) => {
    const url = overrideResource ?? resource;
    const options = { method };

    if (body !== undefined && body !== null && method !== "DELETE") {
      options.body = JSON.stringify(body);
    }

    try {
      setLoading(true);
      setError(null);

      const result = await request(url, options);
      setData(result);
      invalidateTags(tagsToInvalidate);
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { mutate, data, loading, error };
}
