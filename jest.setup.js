// MUST be first - Mock Expo winter runtime globals
global.__ExpoImportMetaRegistry = new Map();

// Mock structuredClone for older Node versions
if (!global.structuredClone) {
  global.structuredClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
  };
}

// Mock Expo entirely
jest.mock('expo', () => ({}), { virtual: true });
jest.mock('expo-modules-core', () => ({}), { virtual: true });