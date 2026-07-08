import getImageAsBase64Async from "../../image/imageUtility";
import santaFeLogo from "../../../asset/santa fe logo.png";
import type { Content, ContentImage } from "pdfmake/interfaces";

export async function createSantaFeOrderLogoAsync() {
  const base64Logo = await getImageAsBase64Async(santaFeLogo);

  const image: ContentImage = {
    image: base64Logo,
    width: 100,
  };

  const content: Content[] = [
    {
      columns: [{ width: "*", text: " " }, image],
    },
  ];

  return content;
}
