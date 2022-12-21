import HTTPtransport from '../utils/HTTPtransport';

export default abstract class BaseAPI {
  protected http: HTTPtransport;

  protected constructor(endpoint: string) {
    this.http = new HTTPtransport(endpoint);
  }

  public abstract create?(data: unknown): Promise<unknown>;

  public abstract read?(identifier?: string): Promise<unknown>;

  public abstract update?(data: unknown): Promise<unknown>;

  public abstract delete?(data: unknown): Promise<unknown>;
}
