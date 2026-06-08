async function getImageAsBase64Async(path: string): Promise<string> {
  try {
    const fileBlob = await fetchFileBlobAsync(path);

    return await convertFileToBase64(fileBlob);
  } catch (error) {
    throw new Error("Failed to fetch image as base64", { cause: error });
  }
}

async function fetchFileBlobAsync(path: string) {
  const response: Response = await fetch(path);
  return await response.blob();
}

function convertFileToBase64(fileBlob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        resolve(result);
      } else {
        reject("Failed to read file into base64");
      }
    };
    reader.readAsDataURL(fileBlob);
  });
}

export default getImageAsBase64Async;
