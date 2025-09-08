export class TestError extends Error {
    constructor(message: string, public readonly context?: any) {
        super(message);
        this.name = 'TestError';
    }
}

export const ErrorMessages = {
    NAVIGATION_FAILED: 'Failed to navigate to page',
    ELEMENT_NOT_FOUND: 'Element not found on page',
    VALIDATION_FAILED: 'Validation failed',
    FORM_SUBMISSION_FAILED: 'Form submission failed'
};