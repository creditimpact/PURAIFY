// Platform Builder engine tests
import assert from 'assert';
import { parsePrompt, detectPlatformType } from '../src/parser.js';

// detect platform type
assert.strictEqual(detectPlatformType('Build a CRM platform'), 'CRM Platform');

// parse component action via alias
const actions = parsePrompt('please make a form');
assert.deepStrictEqual(actions[0], { type: 'add_component', params: { component: 'Forms', category: 'Input' } });
