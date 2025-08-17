// Discovery doc URL for APIs used by the quickstart
const DISCOVERY_DOC =
  "https://sheets.googleapis.com/$discovery/rest?version=v4";

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = [
  "https://www.googleapis.com/auth/userinfo.email",
  "https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
  "https://www.googleapis.com/auth/drive.file",
];
export const gapiConfig = {
  apiKey: import.meta.env.GOOGLE_API_KEY,
  clientId:
    "713710269016-ola80cev9prrbgq6e2m6d7gs59e0f7r7.apps.googleusercontent.com", // OAuth Client ID
  discoveryDocs: [
    DISCOVERY_DOC,
    "https://www.googleapis.com/discovery/v1/apis/oauth2/v1/rest",
  ],
  scope: SCOPES,
};
