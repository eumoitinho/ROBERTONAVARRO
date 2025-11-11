// Stub for react/compiler-runtime (React 19 only feature)
// This file is used as a replacement when React 18 is being used
// Provides empty implementations of React Compiler APIs

export function useMemoCache(size) {
  return new Array(size);
}

export function c(size) {
  return new Array(size);
}

export default {
  useMemoCache,
  c,
};

