"use client"

import { useEffect, useState } from "react";
import { supabase } from "@/lib/client";

const Page = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        setError(error.message);
        setUserId(null);
      } else {
        setUserId(data.user?.email || null);
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading user...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : userId ? (
        <p>User ID: {userId}</p>
      ) : (
        <p>No user found.</p>
      )}
    </div>
  );
};

export default Page;