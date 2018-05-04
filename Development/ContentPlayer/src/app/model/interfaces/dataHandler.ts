export interface DataHandler {
  loadData(data, listener, success, failure);
  sendData(id: string, data);
  dataLoadedSuccess();
  dataLoadedFailure();
}
