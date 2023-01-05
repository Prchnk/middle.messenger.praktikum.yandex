import HTTPtransport from '../utils/HTTPtransport';

export default abstract class BaseAPI {
  protected http: HTTPtransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPtransport(endpoint);
  }

  public create?(data: unknown): Promise<unknown>;

  public read?(identifier?: string): Promise<unknown>;

  public update?(data: unknown): Promise<unknown>;

  public delete?(data: unknown): Promise<unknown>;
}
