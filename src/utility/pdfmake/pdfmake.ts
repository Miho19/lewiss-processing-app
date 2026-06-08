/**
 *
 * pdfmake - https://github.com/bpampuch/pdfmake
 */

import {
  sharePointProductIdToProcessTypeRecord,
  type ProcessTitleType,
  type SharePointProductId,
  type SharePointProductIdToWindowMeasurementJoinedRecordType,
  type SharePointProjectFileType,
} from "../../type/sharePointProjectFile";
import type { WindowMeasurementJoined } from "../processProject";

import type {
  TDocumentDefinitions,
  TDocumentInformation,
} from "pdfmake/interfaces";

async function getOrderPDF(
  projectFile: SharePointProjectFileType,
  joinedSelectedWindows: WindowMeasurementJoined[],
): Promise<TDocumentDefinitions[]> {
  if (
    typeof projectFile === "undefined" ||
    typeof joinedSelectedWindows === "undefined" ||
    joinedSelectedWindows.length === 0
  )
    return [];

  const productIdToWindowMeasurementRecord =
    getProductIdToWindowMeasurementRecord(joinedSelectedWindows);

  return await generateProcessPDF(
    projectFile,
    productIdToWindowMeasurementRecord,
  );
}

async function generateProcessPDF(
  projectFile: SharePointProjectFileType,
  productIdToWindowMeasurementRecord: SharePointProductIdToWindowMeasurementJoinedRecordType,
): Promise<TDocumentDefinitions[]> {
  const promises = (
    Object.keys(productIdToWindowMeasurementRecord) as SharePointProductId[]
  ).map(async (key) => {
    const windowMeasurements = productIdToWindowMeasurementRecord[key];

    if (windowMeasurements.length === 0) return [];

    const createPDFFunction = sharePointProductIdToProcessTypeRecord[key];
    const createdPDF = await createPDFFunction(projectFile, windowMeasurements);
    return createdPDF;
  });

  const generatedPDFs: TDocumentDefinitions[][] = await Promise.all(promises);

  return generatedPDFs.flat();
}

function createDocument(
  projectFile: SharePointProjectFileType,
  processType: ProcessTitleType,
) {
  const { name, reference, salesConsultant } = projectFile;

  const title = [name, reference, processType].join("-");

  const metaData: TDocumentInformation = {
    title: title,
    author: salesConsultant,
    creator: "lewiss-processing",
  };
  const document: TDocumentDefinitions = {
    content: [],
    info: metaData,
    pageOrientation: "landscape",
  };

  return document;
}

function getProductIdToWindowMeasurementRecord(
  windowJoined: WindowMeasurementJoined[],
): SharePointProductIdToWindowMeasurementJoinedRecordType {
  const productIdToWindowMeasurementRecord: SharePointProductIdToWindowMeasurementJoinedRecordType =
    {
      "cellular-blind": [],
      "sunscreen-roller": [],
      "blockout-roller": [],
    };

  Object.entries(productIdToWindowMeasurementRecord).forEach(([key, value]) => {
    const filteredList = windowJoined.filter(
      (w) => w.treatment.productId === key,
    );
    value.push(...filteredList);
  });

  return productIdToWindowMeasurementRecord;
}

async function openPDFDocumentAsync(document: TDocumentDefinitions) {
  const pdfmake = (await import("pdfmake/build/pdfmake")).default;
  const pdfFonts = (await import("pdfmake/build/vfs_fonts")).default;

  pdfmake.addVirtualFileSystem(pdfFonts);

  pdfmake.createPdf(document).open();
}

export { getOrderPDF, createDocument, openPDFDocumentAsync };
