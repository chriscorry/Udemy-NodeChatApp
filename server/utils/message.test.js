/* eslint-env mocha */
var expect              = require('expect');
var { generateMessage } = require('./message');

describe('generateMessage', () => {

  it('should generate correct message object', () => {

    let sender = 'Chris';
    let text = 'The quick brown fox jumped over the lazy dog.';

    let msg = generateMessage(sender, text);

    expect(typeof msg.createdAt).toBe('number');
    expect(Object.keys(msg)).toContain('from', 'text');
    expect(msg.from).toBe(sender);
    expect(msg.text).toBe(text);
  });
});
