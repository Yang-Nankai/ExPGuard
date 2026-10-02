// Run the actual analyzer and check response behavior with synthetic API mocks.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');

async function main() {
  const root = path.resolve(__dirname, '..');
  const sample = path.join(root, 'samples/data_leak');
  const evidence = path.join(sample, 'verification');
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 'expguard-data-leak-'));
  try {
    execFileSync(process.execPath, [path.join(root, 'dist/main.js'), 'analyze',
      '--type', 'DIR', '--input', sample, '--out', out,
      '--id', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa', '--extension-version', '1.0.0'],
      { cwd: root, stdio: 'pipe' });
    const summary = JSON.parse(fs.readFileSync(path.join(out, 'summary.json'), 'utf8'));
    assert.equal(summary.status, 'success');
    assert.ok(summary.flows.length > 0);
    assert.ok(summary.flows.every(f => f.flowType === 'DATA_LEAK' &&
      f.sinkType === 'CHROME_RUNTIME_ONMESSAGEEXTERNAL_SENDRESPONSE'));
    const sources = [...new Set(summary.flows.map(f => f.sourceType))].sort();
    assert.deepEqual(sources, ['CHROME_COOKIES_INFO', 'CHROME_HISTORY_INFO']);

    const cookies = [{ name: 'demo_session', value: 'SYNTHETIC_COOKIE', domain: 'private.example.test' }];
    const history = [{ url: 'https://private.example.test/SYNTHETIC_HISTORY', title: 'Synthetic history' }];
    let listener;
    vm.runInNewContext(fs.readFileSync(path.join(sample, 'background.js'), 'utf8'), {
      chrome: {
        runtime: { onMessageExternal: { addListener(fn) { listener = fn; } } },
        cookies: { getAll(filter, cb) {
          assert.equal(filter.url, 'https://private.example.test/');
          setImmediate(() => cb(cookies));
        } },
        history: { search(filter, cb) {
          assert.equal(filter.maxResults, 10);
          setImmediate(() => cb(history));
        } },
      },
    });
    const results = [];
    for (const [kind, key, expected] of [
      ['READ_COOKIES', 'cookies', cookies], ['READ_HISTORY', 'history', history],
    ]) {
      const sender = { origin: 'https://attacker.lab.example', url: 'https://attacker.lab.example/' };
      let keepAlive;
      const response = await new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Response timed out')), 1000);
        keepAlive = listener({ kind }, sender, value => { clearTimeout(timer); resolve(value); });
      });
      assert.equal(keepAlive, true);
      assert.deepEqual(JSON.parse(JSON.stringify(response[key])), expected);
      results.push({ command: kind, sender_origin: sender.origin, keep_alive: keepAlive, response });
    }
    assert.equal(listener({ kind: 'UNKNOWN' }, {}, () => assert.fail('Unexpected response')), undefined);
    fs.mkdirSync(evidence, { recursive: true });
    for (const [name, candidates] of Object.entries({
      'summary.json': ['summary.json'],
      'report.txt': ['report.txt', 'report.source.md', 'report.flows.json'],
    })) {
      const source = candidates.map(candidate => path.join(out, candidate)).find(candidate => fs.existsSync(candidate));
      if (source) fs.copyFileSync(source, path.join(evidence, name));
    }
    fs.writeFileSync(path.join(evidence, 'synthetic-runtime.json'), JSON.stringify({
      mode: 'Node.js VM with asynchronous synthetic Chrome API mocks; not a browser reproduction',
      status: 'passed', raw_analyzer_flow_count: summary.flows.length,
      distinct_source_sink_pairs: sources.length, results,
    }, null, 2) + '\n');
    console.log(`Verified ${summary.flows.length} raw DATA_LEAK reports, ${sources.length} distinct source/sink pairs and 2 synthetic asynchronous responses.`);
  } finally {
    fs.rmSync(out, { recursive: true, force: true });
  }
}

main().catch(error => { console.error(error); process.exitCode = 1; });
