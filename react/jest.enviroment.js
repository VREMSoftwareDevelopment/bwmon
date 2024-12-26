// jest.enviroment.js
import { mixinJestEnvironment } from '@stryker-mutator/jest-runner';
import { TestEnvironment } from 'jest-environment-jsdom';

class JestTestEnvironment extends TestEnvironment {
    async setup() {
        await super.setup();
        this.global.TextEncoder = TextEncoder;
        this.global.TextDecoder = TextDecoder;
        this.global.Response = Response;
        this.global.Request = Request;
    }
}

const customTestEnvironment = mixinJestEnvironment(JestTestEnvironment);

export default customTestEnvironment;
