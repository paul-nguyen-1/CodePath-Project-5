module.exports = {
    // other configuration options
    transform: {
      "^.+\\.jsx$": "babel-jest",
    },
    moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy'
    },
    testMatch: [
        "**/__tests__/**/*.jsx?(x)",
        "**/?(*.)+(spec|test).jsx?(x)",
      ],
    moduleDirectories: ["node_modules", "<rootdir>/src"],
    babel: {
      configFile: './babel.config.js',
    },
  };
  