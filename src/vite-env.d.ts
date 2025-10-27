// This file and these lines are needed because TypeScript doesn’t natively understand non-code imports like CSS or images.
// It’s still valid in Vite, but TS needs a declaration file telling it “this type of import is okay.”

// This was done because of the index.css import in main.tsx

/// <reference types="vite/client" />

declare module "*.css"; // this 