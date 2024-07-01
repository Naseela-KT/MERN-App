import { useEffect, useState } from "react";
import { userApiRequest } from "../config/axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [formError, setFormError] = useState(""); // State to handle form errors
  const navigate = useNavigate();

  // Fetch users from the API
  const fetchUsers = async () => {
    try {
      const response = await userApiRequest({
        method: "get",
        url: `/`,
      });
      console.log(response);
      if (response.users) {
        // Adjust based on the actual API response structure
        setUsers(response.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle changes in the friends select box
  // const handleFriendsChange = (event) => {
  //   const selectedOptions = Array.from(event.target.selectedOptions, (option) => option.value);
  //   setSelectedFriends(selectedOptions);
  // };
  const handleCheckboxChange = (userId) => {
    setSelectedFriends((prevSelectedFriends) => {
      if (prevSelectedFriends.includes(userId)) {
        return prevSelectedFriends.filter((friend) => friend !== userId);
      } else {
        return [...prevSelectedFriends, userId];
      }
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError(""); // Clear any previous errors

    // Validate form input
    if (!name || !email) {
      setFormError("Please fill in all required fields.");
      return;
    }

    try {
      const response = await userApiRequest(
        {
          method: "post",
          url: `/add`,
          data: {
            name,
            email,
            friends: selectedFriends,
          },
        },
        { withCredentials: true }
      );
      console.log("User added:", response.data);
      // Clear form fields after successful submission
      setName("");
      setEmail("");
      setSelectedFriends([]);
      navigate("/");
      // You can also add a success message or redirect here
    } catch (error) {
      console.error("Error adding user:", error);
      setFormError("Error adding user. Please try again."); // Display error message
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 mt-5">
      <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Add User</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Name
            </label>
            <input
              name="name"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020F3C]"
              placeholder="Enter name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium mb-2"
            >
              Email
            </label>
            <input
              name="email"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#020F3C]"
              placeholder="Enter email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="friends"
              className="block text-gray-700 font-medium mb-2"
            >
              Friends
            </label>
            <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-lg p-2">
              {users.map((user) => (
                <div key={user._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`friend-${user._id}`}
                    value={user._id}
                    checked={selectedFriends.includes(user._id)}
                    onChange={() => handleCheckboxChange(user._id)}
                    className="mr-2"
                  />
                  <label htmlFor={`friend-${user._id}`} className="text-gray-700">{user.name}</label>
                </div>
              ))}
            </div>
          </div>
          {formError && (
            <p className="text-red-500 text-sm mb-4">{formError}</p>
          )}
          <button
            type="submit"
            className="w-full bg-[#020F3C] text-white font-medium py-2 px-4 rounded-lg hover:bg-[#030C2E] focus:outline-none focus:ring-2 focus:ring-[#020F3C] focus:ring-opacity-50"
          >
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
