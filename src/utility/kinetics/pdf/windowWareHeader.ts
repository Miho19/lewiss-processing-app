import type { Content, ContentImage } from "pdfmake/interfaces";
import getImageAsBase64Async from "../../image/imageUtility";
import windowWareLogo from "../../../asset/Windoware-Logo-1.png";

export async function createWindowWareHeader() {
  const windowWareLogoAsBase64: string =
    await getImageAsBase64Async(windowWareLogo);

  const image: ContentImage = {
    image: windowWareLogoAsBase64,
    width: 100,
  };

  const content: Content[] = [
    {
      columns: [{ width: "*", text: " " }, image],
    },
  ];

  return content;
}
