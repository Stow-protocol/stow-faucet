import Web3 from 'web3';
import IPFS from 'ipfs-mini';
import Stow from '@stowprotocol/stow-js';
import config from '../config';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';

export const NO_METAMASK = 'NO_METAMASK';
export const LOCKED_METAMASK = 'LOCKED_METAMASK';
export const STOW_MISCONFIGURED = 'STOW_MISCONFIGURED';
export const IPFS_MISCONFIGURED = 'IPFS_MISCONFIGURED';

const hubAddress = config.STOW_HUB_ADDRESS;
const protocol = config.STOW_IPFS_PROTOCOL;
const port = config.STOW_IPFS_PORT;
const host = config.STOW_IPFS_HOST;

const authSuccess = (web3, ipfs, stow) => ({
  type: AUTH_SUCCESS,
  web3,
  ipfs,
  stow,
});

const authFailure = authError => ({
  type: AUTH_FAILURE,
  isAuthenticated: false,
  authError,
});

const getWeb3 = () => {
  return new Promise((resolve, reject) => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', async dispatch => {
      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof window.web3 !== 'undefined') {
        // Use Mist/MetaMask's provider.
        resolve(new Web3(window.web3.currentProvider));
      } else {
        reject(NO_METAMASK);
      }
    });
  });
};

export const authenticate = () => async dispatch => {
  let web3;

  try {
    web3 = await getWeb3();
  } catch (e) {
    console.error(e);
    return dispatch(authFailure(NO_METAMASK));
  }

  const accounts = await web3.eth.getAccounts();
  const address = accounts[0];

  if (!address) {
    console.error('Metamask is locked!');
    return dispatch(authFailure(LOCKED_METAMASK));
  }

  const ipfs = new IPFS({ host: host, port: port, protocol: protocol });

  try {
    //TODO Ping IPFS to check connection
  } catch (e) {
    console.error('IPFS is not configured correctly!');
    return dispatch(authFailure(IPFS_MISCONFIGURED));
  }

  const stow = new Stow(web3, { hubAddress });

  dispatch(authSuccess(web3, ipfs, stow));
};
