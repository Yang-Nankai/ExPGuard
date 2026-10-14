import { e as ref } from './index.js';
import { g as abs, s as subtract, j as add, d as divide } from './bigmath.js';
import { a5 as ITxBalanceType, bS as TransactionNoteDB } from './app2.js';
import { g as getTimestampFromSlot } from './chain.js';
import { u as useFormatter } from './useFormatter.js';

const _show = ref(false);
const _mode = ref("select");
const closeModalEntityManagement = () => {
  _show.value = false;
};
const openModalEntityManagement = (mode = "manage") => {
  _show.value = true;
  _mode.value = mode;
};
const useModalEntityManagement = () => {
  return {
    openModalEntityManagement,
    closeModalEntityManagement,
    showModalEntityManagement: _show,
    modeModalEntityManagement: _mode
  };
};

var ICSVExportTargetId = /* @__PURE__ */ ((ICSVExportTargetId2) => {
  ICSVExportTargetId2["universal"] = "universal";
  ICSVExportTargetId2["universaldot"] = "universaldot";
  ICSVExportTargetId2["koinlysimple"] = "koinlysimple";
  ICSVExportTargetId2["koinlysimpledot"] = "koinlysimpledot";
  return ICSVExportTargetId2;
})(ICSVExportTargetId || {});

var ITxCertificateKind = /* @__PURE__ */ ((ITxCertificateKind2) => {
  ITxCertificateKind2[ITxCertificateKind2["StakeRegistration"] = 0] = "StakeRegistration";
  ITxCertificateKind2[ITxCertificateKind2["StakeDeregistration"] = 1] = "StakeDeregistration";
  ITxCertificateKind2[ITxCertificateKind2["StakeDelegation"] = 2] = "StakeDelegation";
  ITxCertificateKind2[ITxCertificateKind2["PoolRegistration"] = 3] = "PoolRegistration";
  ITxCertificateKind2[ITxCertificateKind2["PoolRetirement"] = 4] = "PoolRetirement";
  return ITxCertificateKind2;
})(ITxCertificateKind || {});

const { formatTxType } = useFormatter();
const csvExportTargetMap = {
  //universal:    { id: 'universal',    label: 'Universal CSV',       separator: ',', fields: 'Date,Sent Amount,Sent Currency,Received Amount,Received Currency,Fee Amount,Fee Currency,Net Worth Amount,Net Worth Currency,Label,Description,TxHash,TxType'.split(',') },
  universal: { id: ICSVExportTargetId.universal, label: "Universal CSV (Decimal: , )", adaSeparator: ",", fields: "Date,Sent Amount,Sent Currency,Received Amount,Received Currency,Fee Amount,Fee Currency,Label,Description,TxHash,TxType".split(",") },
  universaldot: { id: ICSVExportTargetId.universaldot, label: "Universal CSV (Decimal: . )", adaSeparator: ".", fields: "Date,Sent Amount,Sent Currency,Received Amount,Received Currency,Fee Amount,Fee Currency,Label,Description,TxHash,TxType".split(",") },
  koinlysimple: { id: ICSVExportTargetId.koinlysimple, label: "Koinly CSV - simple (Decimal: , )", adaSeparator: ",", fields: "Koinly Date,Amount,Currency,Fee Amount,Fee Currency,TxHash".split(",") },
  koinlysimpledot: { id: ICSVExportTargetId.koinlysimpledot, label: "Koinly CSV - simple (Decimal: . )", adaSeparator: ".", fields: "Koinly Date,Amount,Currency,Fee Amount,Fee Currency,TxHash".split(",") }
};
const csvExportTargetList = [
  csvExportTargetMap.universal,
  csvExportTargetMap.universaldot,
  csvExportTargetMap.koinlysimple,
  csvExportTargetMap.koinlysimpledot
];
const getCSVTargetMap = () => csvExportTargetMap;
const getCSVTargetList = () => csvExportTargetList;
const getCSVTarget = (id) => csvExportTargetMap[id];
const createCSVFile = async (networkId, accountId, txList, rewardList, target, t, useLocalTimezone = false, includeTxNotes = false) => {
  const fields = target.fields.concat();
  if (includeTxNotes) {
    fields.push("Note");
  }
  const {
    formatDatetime
  } = useFormatter();
  const n = "\n";
  const sep = ",";
  const numFields = fields.length;
  const adaSeparator = target.adaSeparator;
  let csv = fields.join(sep) + n;
  const localTxList = [...txList];
  localTxList.sort((a, b) => a.block > b.block ? 1 : -1);
  for (const tx of localTxList) {
    if (!tx.coin) throw new Error("Transaction malformed.");
    const txType = tx.t;
    let total = abs(subtract(tx.coin ?? "0", tx.ow ?? "0"));
    let didSent = false;
    let didReceive = false;
    let fee = "0";
    if ((txType & ITxBalanceType.sentAda) === ITxBalanceType.sentAda) {
      fee = tx.f ?? "0";
      total = subtract(total, fee);
      didSent = true;
    }
    if ((txType & ITxBalanceType.receivedAda) === ITxBalanceType.receivedAda) {
      didReceive = true;
    }
    let isDeposit = false;
    let isReg = false;
    if (tx.cert) {
      for (const certKind of tx.cert) {
        switch (certKind) {
          case ITxCertificateKind.StakeRegistration:
            isDeposit = true;
            isReg = true;
            break;
          case ITxCertificateKind.StakeDeregistration:
            isDeposit = true;
            break;
        }
      }
    }
    if (isDeposit) {
      if (isReg) {
        didSent = true;
      } else {
        fee = tx.f ?? "0";
        total = add(total, fee);
        didReceive = true;
      }
    }
    const total2 = '"' + (didSent ? "-" : "") + divide(total, 1e6, 6).split(".").join(adaSeparator) + '"';
    total = '"' + divide(total, 1e6, 6).split(".").join(adaSeparator) + '"';
    fee = '"' + divide(fee, 1e6, 6).split(".").join(adaSeparator) + '"';
    for (let i = 0; i < numFields; i++) {
      const field = fields[i];
      switch (field) {
        case "Date":
        case "Koinly Date":
          const slotTime = new Date(getTimestampFromSlot(networkId, tx.slot));
          if (!useLocalTimezone) {
            csv += '"' + formatDatetime(slotTime, true, true, true) + '"';
          } else {
            csv += '"' + formatDatetime(slotTime.getTime() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4, true, true, true) + '"';
          }
          break;
        case "Sent Amount":
          if (didSent) csv += total;
          break;
        case "Received Amount":
          if (didReceive) csv += total;
          break;
        case "Amount":
          csv += total2;
          break;
        case "Fee Amount":
          csv += fee;
          break;
        case "Net Worth Amount":
          break;
        case "Sent Currency":
        case "Received Currency":
        case "Currency":
        case "Fee Currency":
        case "Net Worth Currency":
          csv += '"ADA"';
          break;
        case "Label":
          break;
        case "Description":
          if (tx.msg && tx.msg.length > 0) {
            csv += '"' + tx.msg.join(" - ") + '"';
          }
          break;
        case "TxHash":
          csv += '"' + tx.hash + '"';
          break;
        case "TxType":
          csv += '"' + formatTxType(tx.t ?? null, true).name.split(", ").join(" - ") + '"';
          break;
        case "Note":
          const txNote = await TransactionNoteDB.getTxNote(networkId, accountId, tx.hash);
          if (txNote?.note) {
            csv += '"' + txNote.note.note.replace(/\n/g, " ") + '"';
          }
          break;
      }
      if (i <= numFields - 2) {
        csv += sep;
      }
    }
    csv += n;
  }
  for (const reward of rewardList) {
    let total = reward.rewards?.amount ?? 0;
    total = '"' + divide(total, 1e6, 6).split(".").join(adaSeparator) + '"';
    for (let i = 0; i < numFields; i++) {
      const field = fields[i];
      switch (field) {
        case "Date":
        case "Koinly Date":
          if (!useLocalTimezone) {
            csv += '"' + formatDatetime(reward.tsSpendable, true, true, true) + '"';
          } else {
            csv += '"' + formatDatetime(reward.tsSpendable, true, true, true) + '"';
          }
          break;
        case "Sent Amount":
          break;
        case "Received Amount":
          csv += total;
          break;
        case "Amount":
          csv += total;
          break;
        case "Fee Amount":
          csv += '"0"';
          break;
        case "Net Worth Amount":
          break;
        case "Sent Currency":
        case "Received Currency":
        case "Currency":
        case "Fee Currency":
        case "Net Worth Currency":
          csv += '"ADA"';
          break;
        case "Label":
          csv += '"reward"';
          break;
        case "Description":
          if (reward.rewards?.type === "member") {
            csv += '"reward - epoch: earned: ' + reward.rewards?.epochEarned + " - spendable: " + reward.rewards?.epochSpendable + '"';
          } else {
            csv += '"reward - treasury: spendable: ' + reward.rewards?.epochSpendable + '"';
          }
          break;
      }
      if (i <= numFields - 2) {
        csv += sep;
      }
    }
    csv += n;
  }
  return csv;
};
function useCSVExport() {
  return {
    getCSVTargetMap,
    getCSVTargetList,
    getCSVTarget,
    createCSVFile
  };
}

export { useCSVExport as a, useModalEntityManagement as u };
