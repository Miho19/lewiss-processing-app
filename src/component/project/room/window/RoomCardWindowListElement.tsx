import type { SharePointWindowType } from "../../../../zod/sharePointProjectFile";
import RoomCardWindowListElement2Blind from "./RoomCardWindowListElement2Blind";
import RoomCardWindowListElementSingle from "./RoomCardWindowListElementSingle";

type Props = {
  window: SharePointWindowType;
};
function RoomCardWindowListElement(props: Props) {
  const { window } = props;

  const blindCount = window.blindCount;

  // claude did something stupid
  if (
    typeof blindCount === "string" &&
    (blindCount as string).localeCompare("dual", undefined, {
      sensitivity: "base",
    }) === 0
  ) {
    return <RoomCardWindowListElementSingle window={window} />;
  }

  if (blindCount === 1) {
    return <RoomCardWindowListElementSingle window={window} />;
  }

  if (blindCount === 2) {
    return <RoomCardWindowListElement2Blind window={window} />;
  }

  return <>Error</>;
}

export default RoomCardWindowListElement;
