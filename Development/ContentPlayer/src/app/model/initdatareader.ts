import {InitializationAPI, Helper} from './initializationapi';
export class InitDataReader {
  constructor() {

  }

  read(data): InitializationAPI {


    console.log('InitDataReader: read', data);

    if (
      data == null
      || data.homePath == null
      || data.forwardEnabled == null
      || data.playerPreview == null
      || data.sessionId == null
      || data.files == null
      || data.files.length <= 0
    ) {
      throw new Error('Invalid data');
    }

    const initHelperCollection: Array<Helper> = new Array<Helper>();
    for (let i = 0; i < data.files.length; i++) {
      const inithelper: Helper = new Helper(
        data.files[i].startAt, data.files[i].segmentId, data.files[i].file);
      initHelperCollection.push(inithelper);
    }
    return new InitializationAPI(data.homePath, data.forwardEnabled, data.playerPreview, data.sessionId, initHelperCollection);

  }
}
