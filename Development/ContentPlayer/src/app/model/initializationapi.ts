export class Helper {

  constructor(startAt: number, segmentId: number, file: string) {
    this._startAt = startAt;
    this._segmentId = segmentId;
    this._file = file;
  }

  private _startAt: number;

  get startAt(): number {
    return this._startAt;
  }

  private _segmentId: number;

  get segmentId(): number {
    return this._segmentId;
  }

  private _file: string;

  get file(): string {
    return this._file;
  }

}

export class InitializationAPI {

  constructor(homePath: string, forwardEnabled: boolean, playerPreview: boolean, sessionId: string, files: Array<Helper>) {
    this._homePath = homePath;
    this._forwardEnabled = forwardEnabled;
    this._playerPreview = playerPreview;
    this._sessionId = sessionId;
    this._files = files;
  }

  private _homePath: string;

  get homePath(): string {
    return this._homePath;
  }

  private _forwardEnabled: boolean;

  get forwardEnabled(): boolean {
    return this._forwardEnabled;
  }

  private _playerPreview: boolean;

  get playerPreview(): boolean {
    return this._playerPreview;
  }

  private _sessionId: string;

  get sessionId(): string {
    return this._sessionId;
  }

  private _files: Array<Helper>;

  get files(): Array<Helper> {
    return this._files;
  }

}
