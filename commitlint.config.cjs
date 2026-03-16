module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-case': [2, 'always', 'lower-case'],
        'type-enum': [
            2,
            'always',
            [
                'init',
                'feat',
                'fix',
                'refactor',
                'docs',
                'style',
                'chore'
            ]
        ],
        'subject-case': [2, 'always', ['lower-case']],
    },
};
