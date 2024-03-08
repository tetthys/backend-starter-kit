import { describe, it, expect } from "vitest";
import Cache from "../../../src/tool/Cache/Cache";

/**
 * 내가 원하는 인터페이스는 :
 *
 * Haven.Cache().set('key', 'value')
 * Haven.Cache().get('key')
 *
 * Haven.Cache().set('key', 'value').forOneMinute()
 * Haven.Cache().set('key', 'value').forOneHour()
 * Haven.Cache().set('key', 'value').forOneDay()
 * Haven.Cache().set('key', 'value').rememberForever()
 *
 * Haven.Cache().get('key').ifNotFound(() => {
 * * do something
 * })
 */

describe("Cache", () => {
  it("true", async () => {
    expect(true).toBe(true);
  });
});
