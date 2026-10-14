import { am as Buffer$1, aI as toHexArray } from './index.js';
import { E as ErrorBuildTx, M as MetadataJsonSchema, O as cslToJson, b7 as AuxiliaryData, bs as GeneralTransactionMetadata, bF as TransactionMetadatum, bt as encode_json_str_to_metadatum, bu as BigNum } from './app2.js';

const createIMetadata = (ref) => {
  return {
    label: ref.label,
    metadatum: ref.metadatum
  };
};

const createSimpleMetadataJson = (message, encryption) => {
  return encryption ? JSON.stringify({ msg: Array.isArray(message) ? message : [message], enc: encryption }) : JSON.stringify({ msg: Array.isArray(message) ? message : [message] });
};
const getMetadataFromJSON = (metaData, schema = MetadataJsonSchema.NoConversions) => {
  const result = AuxiliaryData.new();
  if (metaData.length === 0) {
    return null;
  }
  const generalMetadata = GeneralTransactionMetadata.new();
  for (const meta of metaData) {
    const metadatum = "bytes" in meta ? TransactionMetadatum.from_bytes(toHexArray(meta.bytes)) : encode_json_str_to_metadatum(
      JSON.stringify(meta.metadatum),
      schema
    );
    generalMetadata.insert(
      BigNum.from_str("label" in meta ? meta.label.toString() : meta.key),
      metadatum
    );
  }
  result.set_metadata(generalMetadata);
  return result;
};
const checkAndTrimTxMessageLineList = (messageLineList) => {
  for (let i = messageLineList.length - 1; i >= 0; i--) {
    const line = messageLineList[i].trim();
    if (line.length === 0) {
      messageLineList.splice(i, 1);
    } else {
      messageLineList[i] = line;
    }
  }
  for (let i = messageLineList.length - 1; i >= 0; i--) {
    const line = messageLineList[i];
    if (line.length > 64) {
      throw ErrorBuildTx.messageLineTooLong;
    }
  }
  return messageLineList.length > 0;
};
const checkTxMetadataFromStringArray = (messageArray) => {
  const messageArrayFiltered = messageArray.filter((s) => s.trim().length > 0);
  if (messageArrayFiltered.length === 0) return true;
  for (let i = 0; i < messageArrayFiltered.length; i++) {
    if (Buffer$1.from(messageArrayFiltered[i]).byteLength > 64) {
      throw new Error(`Error: max 64 byte string allowed [row: ${i + 1}, bytes: ${Buffer$1.from(messageArrayFiltered[i]).byteLength}]`);
    }
  }
  return true;
};
const getTxMetadataFromStringArray = (messageArray, label = 674, encryption) => {
  checkTxMetadataFromStringArray(messageArray);
  const messageArrayFiltered = messageArray.filter((s) => s.trim().length > 0);
  if (messageArrayFiltered.length === 0) {
    return null;
  }
  const auxData = getMetadataFromJSON([createIMetadata({ label, metadatum: JSON.parse(createSimpleMetadataJson(messageArrayFiltered, encryption)) })]);
  const json = auxData?.to_json();
  auxData?.free?.();
  if (json) {
    return cslToJson(json);
  }
  return null;
};

export { createIMetadata as a, getMetadataFromJSON as b, checkAndTrimTxMessageLineList as c, getTxMetadataFromStringArray as g };
