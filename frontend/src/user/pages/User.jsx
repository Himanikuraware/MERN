import React, { useEffect, useState } from "react";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import UserList from "../components/UserList";

const User = () => {
  const [users, setUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  //Never turn useEffect into async function it is not good practice instead create a new function within it and turn that into async.
  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users"
        );

        setUsers(responseData.users);
      } catch (err) {}
    };
    getUsers();
  }, [sendRequest]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users && <UserList items={users} />}
    </>
  );
};

export default User;
