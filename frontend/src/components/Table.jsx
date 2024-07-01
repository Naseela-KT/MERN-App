import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  Typography,
  Button,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { userApiRequest } from "../config/axios";
import { useEffect, useState } from "react";

const TABLE_HEAD = ["Name", "Email", "Friends", "Actions"];

export function Table() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await userApiRequest({
        method: "get",
        url: `/`,
      });
      console.log(response);
      if (response.users) {
        setUsers(response.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-8 pt-10">
        <div>
          <Typography variant="h5" color="blue-gray">
            Users list
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            See information about all users
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link to="/add-user">
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add user
            </Button>
          </Link>
        </div>
      </div>

      <Card className="h-full w-full overflow-scroll">
        <CardBody>
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id,name, email, friends }, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={name}>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {name}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {email}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        {friends.map((friend) => (
                          <Typography
                            key={friend._id}
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {friend.name}
                          </Typography>
                        ))}
                      </div>
                    </td>
                    <td className={classes}>
                    <Link to={`/edit-user?id=${_id}`}>
                      <Button
                        color="gray"
                        variant="outlined"
                        size="sm"
                        className="hidden lg:inline-block mr-2"
                        
                      >
                        <span>Edit</span>
                      </Button>
                      </Link>
                      <Button
                        color="indigo"
                        variant="outlined"
                        size="sm"
                        className="hidden lg:inline-block"
                        
                      >
                        <span>Delete</span>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
