import { buildDetaneHarness, expectPlannedAwsResources } from "./detane-harness";

describe("DetaneStack harness", () => {
  test("synthesizes a stack template", () => {
    const { template } = buildDetaneHarness();

    expectPlannedAwsResources(template, {
      s3Buckets: 0,
      lambdas: 0,
      tables: 0,
    });
  });
});
