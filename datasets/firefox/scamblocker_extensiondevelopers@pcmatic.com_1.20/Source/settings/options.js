// Saves options to chrome.storage
const LS = {
  getAllItems: () => chrome.storage.local.get(),
  getItem: async key => (await chrome.storage.local.get(key))[key],
  setItem: (key, val) => chrome.storage.local.set({[key]: val}),
  removeItems: keys => chrome.storage.local.remove(keys),
};

const saveOptions = async () => {
  const whitelist = document.getElementById('whitelist').value;

  await LS.setItem("whitelist",whitelist);

  const status = document.getElementById('status');
  status.textContent = 'Options saved.';

};

const restoreOptions = async () => {

  const whitelist = await LS.getItem("whitelist");

  document.getElementById('whitelist').value = (whitelist ? whitelist : '');


};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);