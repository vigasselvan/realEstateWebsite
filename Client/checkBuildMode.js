// CheckBuildMode.js or CheckBuildMode.ts
if (import.meta.env.MODE === 'development') {
    console.log('Running in development mode');
  } else if (import.meta.env.MODE === 'production') {
    console.log('Running in production mode');
  } else {
    console.warn('Unknown mode:', import.meta.env.MODE);
  }
  