import { Reporter, TestCase, TestResult, FullConfig, Suite } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

class CustomReporter implements Reporter {
    private reports: any[] = [];
    private startTime: number = 0;

    onBegin(config: FullConfig, suite: Suite) {
        this.startTime = Date.now();
        console.log('Starting the test run');
    }

    onTestBegin(test: TestCase) {
        console.log(`Starting test: ${test.title}`);
    }

    onTestEnd(test: TestCase, result: TestResult) {
        this.reports.push({
            title: test.title,
            status: result.status,
            duration: result.duration,
            error: result.error?.message || null,
            location: test.location
        });
    }

    async onEnd() {
        const endTime = Date.now();
        const duration = endTime - this.startTime;

        const reportData = {
            totalDuration: duration,
            timestamp: new Date().toISOString(),
            tests: this.reports,
            summary: {
                total: this.reports.length,
                passed: this.reports.filter(r => r.status === 'passed').length,
                failed: this.reports.filter(r => r.status === 'failed').length,
                skipped: this.reports.filter(r => r.status === 'skipped').length
            }
        };

        // Create reports directory if it doesn't exist
        const reportsDir = path.join(process.cwd(), 'test-reports');
        if (!fs.existsSync(reportsDir)) {
            fs.mkdirSync(reportsDir, { recursive: true });
        }

        // Save JSON report
        fs.writeFileSync(
            path.join(reportsDir, 'report.json'),
            JSON.stringify(reportData, null, 2)
        );

        // Generate HTML report
        const html = this.generateHTML(reportData);
        fs.writeFileSync(
            path.join(reportsDir, 'report.html'),
            html
        );
    }

    private generateHTML(data: any): string {
        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>Test Report</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        .summary { display: flex; gap: 20px; margin: 20px 0; }
                        .status-passed { color: green; }
                        .status-failed { color: red; }
                        .test-case { border: 1px solid #ddd; margin: 10px 0; padding: 10px; }
                    </style>
                </head>
                <body>
                    <h1>Test Execution Report</h1>
                    <div class="summary">
                        <div>Total: ${data.summary.total}</div>
                        <div class="status-passed">Passed: ${data.summary.passed}</div>
                        <div class="status-failed">Failed: ${data.summary.failed}</div>
                        <div>Skipped: ${data.summary.skipped}</div>
                    </div>
                    <div>Duration: ${data.totalDuration}ms</div>
                    <h2>Test Results</h2>
                    ${data.tests.map(test => `
                        <div class="test-case status-${test.status}">
                            <h3>${test.title}</h3>
                            <div>Status: ${test.status}</div>
                            <div>Duration: ${test.duration}ms</div>
                            ${test.error ? `<div class="error">Error: ${test.error}</div>` : ''}
                        </div>
                    `).join('')}
                </body>
            </html>
        `;
    }
}

export default CustomReporter;