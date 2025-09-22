/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
    app(input) {
        return {
            name: "blockdance-reporting",
            removal: input?.stage === "production" ? "retain" : "remove",
            protect: ["production"].includes(input?.stage),
            home: input?.stage === "production" ? "aws" : "local",
            providers: {
                aws: {
                    region: "eu-central-1",
                },
            },
        }
    },
    async run() {
        const env = {
            DATABASE_URL_PAYMENT: process.env.DATABASE_URL_PAYMENT!,
            DATABASE_URL_REPORTING: process.env.DATABASE_URL_REPORTING!,
            REDIS_URL: process.env.REDIS_URL!,
        }
        // @docs https://sst.dev/docs/component/aws/function#_top
        const api = new sst.aws.Function("ReportingApi", {
            url: true,
            runtime: "nodejs22.x",
            handler: "src/lambda.handler",
            timeout: "600 seconds",
            memory: "512 MB",
            environment: env,
        })
        // @docs https://sst.dev/docs/component/aws/cron/#cron-job-function
        new sst.aws.Cron("TestCron", {
            enabled: true,
            schedule: "rate(1 minute)",
            function: {
                handler: "src/crons/test.handler",
                runtime: "nodejs22.x",
                timeout: "60 seconds",
                environment: env,
            },
        })
    },
})
