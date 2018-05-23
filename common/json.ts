interface JSONObject {
  [key: string]: JSONType;
}

interface JSONArray extends Array<JSONType> {}

export type JSONType =
    null|undefined|string|number|boolean|JSONArray|JSONObject;

export function parseJSON(jsonString: string): JSONType {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    return null;
  }
}