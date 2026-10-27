// Countdown channel names (docs/countdown.md §2–§3): calendar days in the
// server's timezone, "Today!" for the event's whole local day.
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  customEventChannelName,
  wishingWellChannelName,
} from '../constants/countdown.js';

const NY = 'America/New_York';
// Thu Nov 12 2026 10:00 PM EST (spec §2's worked example).
const NOV_12_10PM = 1794538800;

describe('wishingWellChannelName', () => {
  it('reads Today! all of the event day, from local midnight', () => {
    const justAfterMidnight = new Date('2026-11-12T05:01:00Z'); // 00:01 EST
    assert.equal(
      wishingWellChannelName([NOV_12_10PM], NY, justAfterMidnight),
      '💎 Wishing Well: Today!',
    );
  });

  it('still reads Today! after the event time has passed that day', () => {
    const lateEvening = new Date('2026-11-13T04:30:00Z'); // 11:30 PM EST Nov 12
    assert.equal(wishingWellChannelName([NOV_12_10PM], NY, lateEvening), '💎 Wishing Well: Today!');
  });

  it('uses the singular for the day before', () => {
    const nov11 = new Date('2026-11-11T15:00:00Z');
    assert.equal(wishingWellChannelName([NOV_12_10PM], NY, nov11), '💎 Wishing Well: in 1 day');
  });

  it('counts whole calendar days across the DST change', () => {
    // Oct 31 EDT -> Nov 12 EST: 12 calendar days, though not 12×24 hours.
    const oct31 = new Date('2026-10-31T12:00:00Z');
    assert.equal(wishingWellChannelName([NOV_12_10PM], NY, oct31), '💎 Wishing Well: in 12 days');
  });

  it('counts in the server timezone, not UTC', () => {
    // 10 PM EST Nov 12 is already Nov 13 in Tokyo.
    const nov12Tokyo = new Date('2026-11-12T03:00:00Z'); // noon Nov 12 JST
    assert.equal(
      wishingWellChannelName([NOV_12_10PM], 'Asia/Tokyo', nov12Tokyo),
      '💎 Wishing Well: in 1 day',
    );
  });

  it('skips past dates and moves on at local midnight', () => {
    const nov13 = new Date('2026-11-13T05:00:00Z'); // 00:00 EST Nov 13
    const nov30 = 1796050800; // Mon Nov 30 2026 10:00 AM EST
    assert.equal(
      wishingWellChannelName([NOV_12_10PM, nov30], NY, nov13),
      '💎 Wishing Well: in 17 days',
    );
  });

  it('reads TBA when nothing is upcoming', () => {
    const later = new Date('2027-01-01T12:00:00Z');
    assert.equal(wishingWellChannelName([NOV_12_10PM], NY, later), '💎 Wishing Well: TBA');
    assert.equal(wishingWellChannelName([], NY, later), '💎 Wishing Well: TBA');
  });
});

describe('customEventChannelName', () => {
  const now = new Date('2026-11-11T15:00:00Z'); // Nov 11 in New York

  it('shows the nearest upcoming event', () => {
    const events = [
      { event_number: 1, name: 'Server Anniversary', event_date: '2026-12-02' },
      { event_number: 3, name: 'Fan Meet', event_date: '2026-11-14' },
    ];
    assert.equal(customEventChannelName(events, NY, now), 'Fan Meet: in 3 days');
  });

  it('breaks a same-day tie by the lower #ID', () => {
    const events = [
      { event_number: 5, name: 'Later', event_date: '2026-11-12' },
      { event_number: 2, name: 'Earlier', event_date: '2026-11-12' },
    ];
    assert.equal(customEventChannelName(events, NY, now), 'Earlier: in 1 day');
  });

  it('reads Today! on the event date and ignores past events', () => {
    const events = [
      { event_number: 1, name: 'Gone', event_date: '2026-11-10' },
      { event_number: 2, name: 'Fan Meet', event_date: '2026-11-11' },
    ];
    assert.equal(customEventChannelName(events, NY, now), 'Fan Meet: Today!');
  });

  it('reads No events scheduled when the list is empty', () => {
    assert.equal(customEventChannelName([], NY, now), 'No events scheduled');
  });
});

// /event and /countdown timezone input (§5, §6).
describe('countdown input validation', async () => {
  const { eventDateError, normalizeEventName, resolveTimeZone } = await import('../constants/countdown.js');
  const today = '2026-11-11';

  it('trims and collapses event names, capped at 80 characters', () => {
    assert.equal(normalizeEventName('  Fan   Meet \n'), 'Fan Meet');
    assert.equal(normalizeEventName('x'.repeat(80)), 'x'.repeat(80));
    assert.equal(normalizeEventName('x'.repeat(81)), null);
    assert.equal(normalizeEventName('   '), null);
  });

  it('accepts dates from today through two years out', () => {
    assert.equal(eventDateError('2026-11-11', today), null);
    assert.equal(eventDateError('2028-11-10', today), null);
  });

  it('refuses past, too-distant and malformed dates', () => {
    assert.match(eventDateError('2026-11-10', today), /today or later/);
    assert.match(eventDateError('2062-11-11', today), /two years/);
    assert.match(eventDateError('2026-02-30', today), /YYYY-MM-DD/);
    assert.match(eventDateError('Nov 14', today), /YYYY-MM-DD/);
  });

  it('canonicalizes IANA names and rejects unknown ones', () => {
    assert.equal(resolveTimeZone('asia/tokyo'), 'Asia/Tokyo');
    assert.equal(resolveTimeZone('America/New_York'), 'America/New_York');
    assert.equal(resolveTimeZone('Mars/Olympus'), null);
    assert.equal(resolveTimeZone(''), null);
  });
});
