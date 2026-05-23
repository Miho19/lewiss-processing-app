import type { SharePointWindowType } from "../../../../zod/sharePointProjectFile";

type Props = {
  window: SharePointWindowType;
};

function RoomCardWindowListElement2Blind(props: Props) {
  const { window } = props;

  return <></>;
  // return (
  //   <li className="flex flex-col w-full pb-6 border-b border-black/5 space-y-3">
  //     <div className="flex w-full justify-between">
  //       <p className="text-sm text-gray-500">{window.name}</p>
  //       <p className="text-sm text-gray-500 italic">Single</p>
  //     </div>

  //     <div className="flex space-x-3">
  //       <p>
  //         {window.internalWidth} x {height}
  //       </p>
  //     </div>
  //   </li>
  // );
}

export default RoomCardWindowListElement2Blind;
