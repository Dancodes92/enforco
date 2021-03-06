import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthQuery, useGetTasksQuery } from "../store/features/api/apiSlice";
import TaskClosestToDeadline from "../components/TaskClosestToDeadline";

export default function Home() {
  const { data, isLoading, error } = useAuthQuery();
  const navigate = useNavigate();
  const {
    data: tasksData,
    isLoading: tasksIsLoading,
    error: tasksError,
    isUninitialized,
    refetch,
  } = useGetTasksQuery();

  useEffect(() => {
    if (isUninitialized) {
      navigate("/login");
    }

    if (tasksError) {
      console.log("tasksError", tasksError);
    }

    if (tasksIsLoading) {
      console.log("tasksIsLoading", tasksIsLoading);
    }

    if (error) {
      console.log("error", error);
      navigate("/404");
    }

    if (isLoading) {
      console.log("isLoading", isLoading);
    }

    if (tasksData) {
      console.log("tasksData", tasksData);
      refetch();
    }
  }, [
    data,
    error,
    isLoading,
    isUninitialized,
    navigate,
    tasksData,
    tasksError,
    tasksIsLoading,
    refetch,
  ]);

  //copy the tasksData object
  const tasks = tasksData ? [...tasksData] : [];

  //get tasks where isAccepted is true and isFinished is false
  const acceptedTasks = tasks?.filter(task => task.status === "active");
  console.log("acceptedTasks", acceptedTasks);

  const closestTask = acceptedTasks?.find(
    task =>
      task.deadline ===
      tasks?.reduce((min, p) => (p.deadline < min.deadline ? p : min)).deadline
  ); //  ?. is used to check if the task is not null

  if (data) {
    return (
      <div className="min-h-screen bg-[#444B48] flex flex-col py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm text-center">
          <h3>Lets Get it Done {data.name}!</h3>
        </div>
        <div className="container mx-auto">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate("/newtask")}
          >
            Create a new task
          </button>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-12"
            onClick={() => navigate("/tasks")}
          >
            View all tasks
          </button>

          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-12"
            onClick={() => navigate("/enforcer")}
          >
            View all enforcer tasks
          </button>

          <TaskClosestToDeadline tasks={closestTask} />
        </div>
      </div>
    );
  }
}
