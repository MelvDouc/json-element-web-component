/**
 * Distinguishes the 3 JSON data type groups:
 * - primitive (string, number, boolean or `null`),
 * - array,
 * - dictionary (object).
 */
enum BranchKind {
  Primitive,
  Array,
  Dictionary
}

export default BranchKind;