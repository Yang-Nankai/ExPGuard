import { e as ref } from './index.js';
import { r as getSortedAssetDetailsList } from './useAppAccountBalances.js';

const showModal = ref(false);
const assetDetails = ref(void 0);
const openModalAssetDetails = async (_assetDetails) => {
  assetDetails.value = _assetDetails;
  showModal.value = !!assetDetails.value;
};
const openModalAssetDetailsById = async (policyId, assetName) => {
  const list = await getSortedAssetDetailsList({ [policyId]: { [assetName]: "0" } });
  if (list.length === 0) {
    return;
  }
  assetDetails.value = list[0];
  showModal.value = !!assetDetails.value;
};
const closeModalAssetDetails = () => openModalAssetDetails();
const useModalAssetDetails = () => {
  return {
    assetDetails,
    showModalAssetDetails: showModal,
    openModalAssetDetails,
    openModalAssetDetailsById,
    closeModalAssetDetails
  };
};

export { useModalAssetDetails as u };
