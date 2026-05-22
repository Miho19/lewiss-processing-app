import type { SharePointProjectFileType } from "../../zod/sharePointProjectFile";

type Props = {
  projectFile: SharePointProjectFileType;
};
function CustomerCard(props: Props) {
  const { projectFile } = props;

  return (
    <section className="flex w-full flex-col space-y-3 shadow-md p-6 border border-black/5 pb-6 md:w-xl">
      <div className="flex w-full pb-6 border-b border-black/15 justify-between">
        <p className="text-black font-semibold text-lg">{projectFile.name}</p>
        <p className="text-black">{projectFile.reference}</p>
      </div>

      <div className="text-sm">
        <p>{projectFile.address},</p>
        <p>
          {projectFile.addressCity} {projectFile.addressPostcode}
        </p>
      </div>

      <div className="flex w-full justify-between text-md">
        <p>{projectFile.email}</p>
        <p>{projectFile.phone}</p>
      </div>
    </section>
  );
}

export default CustomerCard;
