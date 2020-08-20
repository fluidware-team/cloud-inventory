import { http_post } from '../utils/httpUtils';

const { OPA_URL, OPA_CONTEXT } = process.env;

export const opaCheck = async function(input, context) {
  const ret = await http_post(`${OPA_URL}/data/${context || OPA_CONTEXT}`, { input });
  return ret.result?.allow;
};
