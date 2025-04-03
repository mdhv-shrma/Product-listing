import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:5000/api/auth/user/${userId}`)
        .then((response) => setUserInfo(response.data))
        .catch((error) => console.error("Error fetching user info:", error));
    }
  }, []);

  if (!userInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p><strong>Name:</strong> {userInfo.name}</p>
      <p><strong>Email:</strong> {userInfo.email}</p>
    </div>
  );
};

export default Profile;