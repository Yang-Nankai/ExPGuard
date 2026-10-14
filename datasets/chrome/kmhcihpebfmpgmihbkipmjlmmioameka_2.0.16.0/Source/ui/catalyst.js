import { eK as encrypt_catalyst_with_pin, aI as toHexArray, am as Buffer$1, ch as prefix0x } from './index.js';
import { dA as getCSLBip32PrivateKey, s as safeFreeCSLObject, e8 as MetadataList, bs as GeneralTransactionMetadata, bu as BigNum, dt as blake2b256Str, bt as encode_json_str_to_metadatum, M as MetadataJsonSchema, bF as TransactionMetadatum, b7 as AuxiliaryData } from './app2.js';
import { a1 as createPrvKeyRoot, U as getMnemonic } from './useAppAccountBalances.js';

const isCatalystVotingRegistrationMetadata = (metadata) => {
  const _metadata = metadata?.metadata();
  if (_metadata) {
    const keys = _metadata.keys();
    for (let i = 0; i < keys.len(); i++) {
      const label = keys.get(i);
      if (label.to_str() === "61284") {
        label.free();
        keys.free();
        _metadata.free();
        return true;
      }
      label.free();
    }
    keys.free();
    _metadata.free();
  }
  return false;
};
const generateCatalystRegistrationMetadata = (votingPublicKey, stakingPublicKey, rewardAddress, nonce) => {
  const registrationData = encode_json_str_to_metadatum(
    JSON.stringify({
      "1": prefix0x(votingPublicKey),
      "2": prefix0x(stakingPublicKey),
      "3": prefix0x(rewardAddress),
      "4": nonce
    }),
    MetadataJsonSchema.BasicConversions
  );
  const generalMetadata = GeneralTransactionMetadata.new();
  generalMetadata.insert(
    BigNum.from_str("61284"),
    registrationData
  );
  return generalMetadata;
};
const generateCIP36Metadata = (delegation, stakingPublicKey, rewardAddress, nonce, governancePurpose) => {
  const registrationData = encode_json_str_to_metadatum(
    JSON.stringify({
      "1": delegation,
      "2": stakingPublicKey,
      "3": rewardAddress,
      "4": nonce,
      "5": governancePurpose
    }),
    MetadataJsonSchema.BasicConversions
  );
  const generalMetadata = GeneralTransactionMetadata.new();
  generalMetadata.insert(
    BigNum.from_str("61284"),
    registrationData
  );
  return generalMetadata;
};
const getCatalystRegistrationMetadata = (metadata) => {
  const metaList = MetadataList.from_bytes(metadata.to_bytes());
  const generalTxMeta = GeneralTransactionMetadata.from_bytes(metaList.get(0).to_bytes());
  safeFreeCSLObject(metaList);
  return generalTxMeta;
};
const addCatalystRegistrationSignature = (metadata, stakePrivateKey, catalystRegistrationSignatureHex) => {
  const label61284 = BigNum.from_str("61284");
  if (!metadata.get(label61284)) {
    throw new Error("Error: generateRegistrationSignature: metadata with label 61284 not found.");
  }
  const generalMetadata = GeneralTransactionMetadata.new();
  generalMetadata.insert(
    label61284,
    metadata.get(label61284)
  );
  let hashedMetadata;
  if (stakePrivateKey) {
    hashedMetadata = stakePrivateKey.sign(
      toHexArray(blake2b256Str(Buffer$1.from(generalMetadata.to_bytes())))
    ).to_hex();
  } else {
    hashedMetadata = "0".repeat(64 * 2);
  }
  generalMetadata.insert(
    BigNum.from_str("61285"),
    encode_json_str_to_metadatum(
      JSON.stringify({
        "1": prefix0x(catalystRegistrationSignatureHex ?? hashedMetadata)
      }),
      MetadataJsonSchema.BasicConversions
    )
  );
  return generalMetadata;
};
const generateCatalystRegistration = (metadata) => {
  const metadataList = MetadataList.new();
  metadataList.add(
    TransactionMetadatum.from_bytes(
      metadata.to_bytes()
    )
  );
  metadataList.add(
    TransactionMetadatum.new_list(
      MetadataList.new()
    )
  );
  return AuxiliaryData.from_bytes(
    metadataList.to_bytes()
  );
};
const generatePrivateKeyForCatalyst = () => createPrvKeyRoot(getMnemonic(160));
const generateCatalystKey = async (pin) => {
  const prvVoteKeyBech32 = generatePrivateKeyForCatalyst();
  const cslBip32PrvVoteKey = getCSLBip32PrivateKey(prvVoteKeyBech32);
  const cslPrvVoteKey = cslBip32PrvVoteKey.to_raw_key();
  const key = encrypt_catalyst_with_pin(pin, cslPrvVoteKey.as_bytes());
  safeFreeCSLObject(cslPrvVoteKey);
  safeFreeCSLObject(cslBip32PrvVoteKey);
  return {
    encryptedKey: key,
    privateKey: prvVoteKeyBech32
  };
};

export { addCatalystRegistrationSignature as a, generateCatalystRegistration as b, generateCatalystKey as c, generateCIP36Metadata as d, generateCatalystRegistrationMetadata as e, getCatalystRegistrationMetadata as g, isCatalystVotingRegistrationMetadata as i };
