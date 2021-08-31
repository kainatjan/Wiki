import axios from "axios";

//SignUP
export function SignUpApi(apiEnPoint, signUpData) {
  return axios({
    method: "POST",
    url: process.env.REACT_APP_BASE_URL + apiEnPoint,
    data: {
      FirstName: signUpData.FirstName,
      LastName: signUpData.LastName,
      Email: signUpData.Email,
      UserName: signUpData.UserName,
      Password: signUpData.Password,
    },
  }).then(
    (response) => {
      if (response.status === "208") {
        console.log(response.status);
        alert("User already exist");
      }
      if (response.status === "200") {
        return true;
      }
    },
    (error) => {
      return false;
    }
  );
}
//Login
export async function LogInApi(apiEnPoint, LogInData) {
  return await axios({
    method: "POST",
    url: process.env.REACT_APP_BASE_URL + apiEnPoint,
    data: {
      UserName: LogInData.UserName,
      Password: LogInData.Password,
    },
  }).then(
    (response) => {
      if (response) {
        return response;
      }
    },
    (error) => {
      return false;
    }
  );
}

//CreateDocument
export function CreateDocumentApi(
  apiEnPoint,
  Title,
  Text,
  DocumentTypeId,
  UserId
) {
  return axios({
    method: "POST",
    url: process.env.REACT_APP_BASE_URL + apiEnPoint,
    data: {
      UserId: UserId,
      WorkspaceTypeId: DocumentTypeId,
      Document: Text,
      Title: Title,
    },
  });
}
//Edit Document
export function EditDocumentApi(
  apiEnPoint,
  Title,
  Text,
  DocumentTypeId,
  DocumentId
) {
  return axios({
    method: "POST",
    url: process.env.REACT_APP_BASE_URL + apiEnPoint,
    data: {
      DocumentId: DocumentId,
      WorkspaceTypeId: DocumentTypeId,
      Document: Text,
      Title: Title,
    },
  });
}
//Subscribe Document
export function SubscribeDocumentApi(apiEnPoint, UserId, DocumentId) {
  return axios({
    method: "POST",
    url: process.env.REACT_APP_BASE_URL + apiEnPoint,
    data: {
      DocumentId: DocumentId,
      UserId: UserId,
    },
  });
}

//UnSubscribe Document
export function UnSubscribeDocumentApi(apiEnPoint, UserId, DocumentId) {
  return axios({
    method: "POST",
    url: process.env.REACT_APP_BASE_URL + apiEnPoint,
    data: {
      DocumentId: DocumentId,
      UserId: UserId,
    },
  });
}


//DocumentType
export function GetDocumentTypeApi(apiEnPoint) {
  return axios
    .get(process.env.REACT_APP_BASE_URL + apiEnPoint)
    .then((response) => {
      return response;
    });
}
// AllDocument
export function GetAllDocumentsApi(apiEnPoint, userId) {
  return axios
    .get(process.env.REACT_APP_BASE_URL + apiEnPoint, {
      params: {
        userId: userId,
      },
    })
    .then((response) => {
      return response;
    });
}
//GetSelectedDocument
export function GetSelectedDocumentApi(apiEnPoint, documentId, userId) {
  return axios
    .get(process.env.REACT_APP_BASE_URL + apiEnPoint, {
      params: {
        documentId: documentId,
        userId:userId
      },
    })
    .then((response) => {
      return response;
    });
}
