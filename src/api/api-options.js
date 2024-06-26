const {
  REACT_APP_OPENAI_API_KEY = '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',
  REACT_APP_SPEECHFLOW_KEY_ID = 'FWb1xFYSaJajHl7q',
  REACT_APP_SPEECHFLOW_KEY_SECRET = 'CXMD9iwpJl19fVIP',
} = process.env;

const gptApiOptions = {
  baseURL: 'https://api.openai.com/v1',
  errorMessages: {
    getAnswer: 'Unfortunately, it is not possible to get an answer.',
  },
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
    Authorization: 'Bearer ' + REACT_APP_OPENAI_API_KEY,
  },
};

const speechflowApiOptions = {
  baseURL: 'https://api.speechflow.io/asr/file/v1',
  errorMessages: {
    getTranscription: 'Unfortunately, the audio was not converted to text.',
  },
  headers: {
    keyId: REACT_APP_SPEECHFLOW_KEY_ID,
    keySecret: REACT_APP_SPEECHFLOW_KEY_SECRET,
  },
};

export { gptApiOptions, speechflowApiOptions };
