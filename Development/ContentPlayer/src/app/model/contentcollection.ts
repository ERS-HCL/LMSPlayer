import {Content} from './content';
export class ContentCollection {
  private _autoplay: boolean;
  private _collection: Array<Content> = new Array<Content>();

  constructor(autoplay: boolean, collection: Array<Content>) {
    this._autoplay = autoplay;
    this._collection = collection;
  }

  get autoplay(): boolean {
    return this._autoplay;
  }

  get collection(): Array<Content> {
    return this._collection;
  }
}
