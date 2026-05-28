/**
 *
 * pdfmake - https://github.com/bpampuch/pdfmake
 */

import {
  sharePointProductIdToProcessTypeRecord,
  type SharePointProductId,
  type SharePointProductIdToWindowMeasurementJoinedRecordType,
  type SharePointProjectFileType,
} from "../../zod/sharePointProjectFile";
import type { WindowMeasurementJoined } from "../processProject";
import pdfmake from "pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import type {
  TDocumentDefinitions,
  TDocumentInformation,
} from "pdfmake/interfaces";

// @ts-ignore
(<any>pdfmake).vfs = pdfFonts.pdfMake ? pdfFonts.vfs : pdfFonts;

function getOrderPDF(
  projectFile: SharePointProjectFileType,
  joinedSelectedWindows: WindowMeasurementJoined[],
): TDocumentDefinitions[] {
  if (
    typeof projectFile === "undefined" ||
    typeof joinedSelectedWindows === "undefined" ||
    joinedSelectedWindows.length === 0
  )
    return [];

  const productIdToWindowMeasurementRecord =
    getProductIdToWindowMeasurementRecord(joinedSelectedWindows);

  return generateProcessPDF(projectFile, productIdToWindowMeasurementRecord);
}

function generateProcessPDF(
  projectFile: SharePointProjectFileType,
  productIdToWindowMeasurementRecord: SharePointProductIdToWindowMeasurementJoinedRecordType,
): TDocumentDefinitions[] {
  const generatedPDFs: TDocumentDefinitions[] = [];

  (
    Object.keys(productIdToWindowMeasurementRecord) as SharePointProductId[]
  ).forEach((key) => {
    const windowMeasurements = productIdToWindowMeasurementRecord[key];
    const createPDFFunction = sharePointProductIdToProcessTypeRecord[key];

    generatedPDFs.push(createPDFFunction(projectFile, windowMeasurements));
  });

  return generatedPDFs;
}

function createDocument(
  projectFile: SharePointProjectFileType,
  processType: SharePointProductId,
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

export { getOrderPDF, createDocument };
