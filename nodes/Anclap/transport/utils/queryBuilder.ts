export default function convertToSnakeCase(input: Record<string, any>): string {
    return Object.entries(input)
      .map(([key, value]) => `${convertKeyToSnakeCase(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }
  
  function convertKeyToSnakeCase(key: string): string {
    return key.replace(/([A-Z])/g, '_$1').toLowerCase();
  }