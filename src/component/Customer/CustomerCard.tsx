import type { SharePointProjectFile } from "../../type/sharePoint/project/projectFileType";

type Props = {
  projectFile: SharePointProjectFile;
};
function CustomerCard(props: Props) {
  const { projectFile } = props;

  const {
    name,
    reference,
    address,
    addressCity,
    addressPostcode,
    email,
    phone,
  } = projectFile;

  return (
    <section className="flex w-full flex-col shadow-md border border-slate-200/60 xl:w-5xl rounded-2xl p-6 bg-white space-y-6 mt-12">
      <div className="flex w-full justify-between">
        <h2 className="text-black font-semibold text-xl">{name}</h2>
        <p className="text-gray-500 text-sm">Reference: {reference}</p>
      </div>

      <div className="text-sm">
        <p>{address},</p>
        <p>
          {addressCity} {addressPostcode}
        </p>
      </div>

      <div className="flex w-full justify-between text-sm">
        <p>{email}</p>
        <p>{phone}</p>
      </div>
    </section>
  );
}

export default CustomerCard;
