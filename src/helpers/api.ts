export class Request {

  private ongoingRequests = new Set<string>();
  private url: string;
  private retryCounter: number = 0;
  private error: unknown;
  private response: any;
  private pending: boolean = false;
  private controller: AbortController

  constructor(url: string, retryCounter: number) {
    this.url = url;
    this.retryCounter = retryCounter;
    this.controller = new AbortController()
  }

  get _ongoingRequests() {
    return this.ongoingRequests
  }

  async send(url?: string) {
    try {

      if (url) {
        this.url = url
      }

      this.ongoingRequests.add(this.url);
      this.pending = true

      // Используем один контроллер
      if (this.controller) {
        this.abort();
      }
      this.controller = new AbortController();

      const options = {
        signal: this.controller.signal
      };
      const response = await fetch(this.url, options)
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      this.response = await response.json()
    } catch (error: any) {
      if (error?.name === 'AbortError') {
        this.error = 'Запрос был прерван.'
      } else {
        this.error = `Произошла ошибка ${error}`
      }
    } finally {
      this.pending = false
      this.ongoingRequests.delete(this.url)
    }
    return {
      response: this.response,
      error: this.error,
    }
  }

  abort() {
    this.controller.abort()
    this.ongoingRequests.delete(this.url)
  }
}
