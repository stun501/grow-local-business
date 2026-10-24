const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { valid } = require('../assets/booking-config');
const root = path.resolve(__dirname, '..');
const config = { n: 'Café 安', em: 'owner@example.com', len: 60, buf: 15,
  d: Array.from({length:7}, () => ({o:true,s:'09:00',e:'17:00'})), sv: [{n:'Consultation',len:30}] };
test('booking boundary and all three generators terminate safely', () => {
  assert.ok(valid(config));
  for (const rel of ['booking/request.html','booking/index.html','booking/build/index.html']) {
    const html = fs.readFileSync(path.join(root,rel),'utf8');
    const start = html.indexOf('function generateSlots(');
    const end = html.indexOf('\n/* ===', start);
    const ctx = vm.createContext({ BookingConfig: { valid }, londonNow: () => ({y:2026,mo:10,d:24,h:8,mi:0}),
      timeToMinutes: t => Number(t.slice(0,2))*60+Number(t.slice(3)), minutesToLabel: String,
      DOW_ABBR:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], MONTH_ABBR:Array(12).fill('Month') });
    vm.runInContext(html.slice(start,end),ctx,{timeout:200});
    ctx.c = config;
    assert.ok(vm.runInContext('generateSlots(c).length',ctx,{timeout:200}) > 0);
    for (const len of [0,-1,1e-20,1e100,'30',null]) {
      ctx.c = {...config,len};
      assert.equal(valid(ctx.c),false);
      assert.equal(vm.runInContext('generateSlots(c).length',ctx,{timeout:200}),0);
    }
    ctx.c = {...config,d:[null]};
    assert.equal(vm.runInContext('generateSlots(c).length',ctx,{timeout:200}),0);
  }
});
test('limiter admits a bounded quota and handles store failures safely', async () => {
  process.env.NODE_ENV='test';
  const { take } = require('../netlify/functions/_shared/rate-limit');
  const replies = await Promise.all(Array.from({length:200},()=>take('burst',30,3600000)));
  assert.equal(replies.filter(Boolean).length,30);
  const saved = global.fetch;
  process.env.UPSTASH_REDIS_REST_URL='https://redis.example.test';process.env.UPSTASH_REDIS_REST_TOKEN='test';
  global.fetch=async()=>{throw new Error('offline')};
  try { assert.equal(await take('offline',30,1000),false); }
  finally { global.fetch=saved;delete process.env.UPSTASH_REDIS_REST_URL;delete process.env.UPSTASH_REDIS_REST_TOKEN; }
});
test('oversized requests make no upstream calls', async () => {
  const saved=global.fetch;let calls=0;global.fetch=async()=>{calls++;throw new Error('unexpected provider')};
  try {
    for(const name of ['baserow-add','notify-lead','places-search','places-details','review-reply']) {
      const {handler}=require('../netlify/functions/'+name);
      const res=await handler({httpMethod:'POST',headers:{},body:'x'.repeat(24001)});
      assert.equal(res.statusCode,413,name);
    }
    assert.equal(calls,0);
  } finally {global.fetch=saved;}
});
test('public build excludes operational files, secrets and the old prototype', () => {
  require('../scripts/build-public.cjs');
  for (const item of ['.env','ops','netlify','tests','scripts','instant-quote-form.html','PRD.md']) {
    assert.equal(fs.existsSync(path.join(root,'dist',item)),false,item);
  }
  assert.ok(fs.existsSync(path.join(root,'dist','booking','request.html')));
  assert.ok(fs.existsSync(path.join(root,'dist','assets','booking-config.js')));
});
