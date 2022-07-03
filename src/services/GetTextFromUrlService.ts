export class GetTextFromUrlService {
  public async execute(url: string): Promise<string> {
    const response = await fetch(url);
    const text = await response.text();
    return text;
  }
}
