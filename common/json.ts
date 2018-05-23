export type JSONType = string|number|boolean|null|{[key: string]: JSONType};

export function parseJSON(jsonString: string): JSONType {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
}