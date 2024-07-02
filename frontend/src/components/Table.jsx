import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  CardBody,
  Card,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardFooter,
  Typography
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { userApiRequest } from "../config/axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TABLE_HEAD = ["Name", "Email", "Friends", "Actions"];

export function Table() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [users, setUsers] = useState([]);
  const navigate=useNavigate()

  const fetchUsers = async (page) => {
    try {
      const response = await userApiRequest({
        method: "get",
        url: `/?page=${page}`,
      });
      console.log(response);
      if (response.users) {
        setUsers(response.users);
setTotalPages(response.total)

      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async () => {
    try {
      const response = await userApiRequest({
        method: "delete",
        url: `/${deleteId}`,
      });
      console.log(response);
      toast.success("Successfully deleted!");
      // Refresh the user list after deletion
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageParam = queryParams.get("page");
    setPage(pageParam ? parseInt(pageParam, 10) : 1);
    fetchUsers(page);
  }, []);

  const handleOpen = (id) => {
    setOpen(!open);
    setDeleteId(id || "");
  };

  return (
    <>
      <div className="mb-4 flex items-center justify-between gap-8 pt-10">
        <div>
          <Typography variant="h4" color="blue-gray">
            Users list
          </Typography>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Link to="/add-user">
            <Button className="flex items-center gap-3 bg-[#131b3b]" size="sm">
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
                    className="border-b border-purple-100 bg-blue-gray-100 p-4"
                  >
                    <Typography
                      variant="h6"
                      color="black"
                      className="font-bold leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map(({ _id, name, email, friends }, index) => {
                const isLast = index === users.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
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
                        color="red"
                        variant="outlined"
                        size="sm"
                        className="hidden lg:inline-block"
                        onClick={() => handleOpen(_id)}
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
        <Typography variant="small" color="blue-gray" className="font-bold">
           Page {page} of {totalPages}
          </Typography>
          {totalPages>1&&<div className="flex gap-2">
            <Button variant="gradient" size="sm" onClick={() => {
              const nextPage = page - 1 > 0 ? page - 1 : 1;
              navigate(`?page=${nextPage}`);
            }}>
              Previous
            </Button>
            <Button variant="gradient" size="sm" onClick={() => {
              const nextPage = page + 1 <= totalPages ? page + 1 : totalPages;
              navigate(`?page=${nextPage}`);
            }}>
              Next
            </Button>
            </div>}
        </CardFooter>
      </Card>

      <Dialog open={open} handler={() => handleOpen()} size="xs">
        <DialogHeader>Confirm Deletion</DialogHeader>
        <DialogBody>
          Are you sure you want to delete this user?
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="black"
            onClick={() => handleOpen()}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="red"
            onClick={() => { deleteUser(); handleOpen(); }}
          >
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
