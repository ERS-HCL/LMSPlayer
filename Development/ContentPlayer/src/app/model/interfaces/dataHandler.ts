export interface DataHandler {
  loadData(data, success, failure);
  dataLoadedSuccess(success);
  dataLoadedFailure(failure);
}
