import CustomerCard from "../component/customer/CustomerCard";
import RoomCardList from "../component/project/room/RoomCardList";
import useSharePointProjectFileQuery from "../hook/useSharePointProjectFileQuery";
import { projectRoute } from "../router/router";

function ProjectPage() {
  const { projectId } = projectRoute.useParams();

  const { data, isSuccess, isLoading, isError, error } =
    useSharePointProjectFileQuery(projectId);

  const errorStyleClassName = "flex items-center justify-center flex-1";

  if (isLoading) return <div className={errorStyleClassName}>Loading...</div>;
  if (isError)
    return <div className={errorStyleClassName}>error: {error.message}</div>;
  if (!isSuccess)
    return (
      <div className={errorStyleClassName}>Failed to fetch project file</div>
    );

  return (
    <main className="flex flex-col w-full h-full items-center p-6 space-y-6">
      <CustomerCard projectFile={data} />
      <RoomCardList projectFile={data} />
    </main>
  );
}

export default ProjectPage;
