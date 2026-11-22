// The JSON-LD block in index.html is hand-edited JSON that Google reads for the business listing.
// A stray comma silently breaks all of it, so check that it parses and only states verified facts.
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CONTACT, OPENING_HOURS } from "../config/site.js";

const html = fs.readFileSync(path.resolve(__dirname, "../../index.html"), "utf8");

function structuredData() {
  const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  expect(match, "JSON-LD script missing from index.html").not.toBeNull();
  return JSON.parse(match[1]);
}

describe("structured data (JSON-LD) in index.html", () => {
  it("is valid JSON with Organization and LocalBusiness entries", () => {
    const types = structuredData()["@graph"].map((entry) => entry["@type"]);
    expect(types).toEqual(expect.arrayContaining(["Organization", "LocalBusiness"]));
  });

  it("matches the contact details shown on the site", () => {
    const business = structuredData()["@graph"].find((entry) => entry["@type"] === "LocalBusiness");
    expect(business.telephone).toBe(CONTACT.phone);
    expect(business.email).toBe(CONTACT.email);
  });

  it("lists the same opening hours as the site (Mon–Sat, closed Sunday)", () => {
    const business = structuredData()["@graph"].find((entry) => entry["@type"] === "LocalBusiness");
    const [spec, ...others] = business.openingHoursSpecification;
    expect(others).toEqual([]);
    expect(spec.dayOfWeek).toEqual(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]);
    expect({ opens: spec.opens, closes: spec.closes }).toEqual(OPENING_HOURS);
  });

  it("does not link social profiles the business has not confirmed", () => {
    // Re-add `sameAs` only with profile URLs the owner has confirmed exist.
    for (const entry of structuredData()["@graph"]) {
      expect(entry.sameAs, `${entry["@type"]} lists unverified social profiles`).toBeUndefined();
    }
  });
});
