
export function generateKey(): string {
  // generates a 32 char string of 0-9A-F, is unique by domain size only.
  // is not compliant with uuid standards.
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, function(c) {
    return Math.floor(Math.random() * 16).toString(16);
  });
}