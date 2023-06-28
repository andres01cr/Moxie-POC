/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    roots: ['./test'],

    coverageThreshold: {
        global: {
            statements: 0,
            functions: 0,
            branches: 0,
            lines: 0,
        },
    },

    coverageDirectory: './test_results/coverage',
    coverageReporters: ['text', 'cobertura'],
    reporters: [
        'default',
        ['jest-junit', { outputDirectory: './test_results' }],
    ],

    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    transform: {
        '^.+\\.(t|j)sx?$': ['@swc/jest'],
    },

    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    watchPathIgnorePatterns: ['/dist/'],
};
