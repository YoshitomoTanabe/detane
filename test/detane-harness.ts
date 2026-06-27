import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { DetaneStack } from "../lib/detane-stack";

export interface DetaneHarness {
  readonly app: cdk.App;
  readonly stack: DetaneStack;
  readonly template: Template;
}

export function buildDetaneHarness(props: cdk.StackProps = {}): DetaneHarness {
  const app = new cdk.App();
  const stack = new DetaneStack(app, "TestStack", props);
  const template = Template.fromStack(stack);

  return { app, stack, template };
}

export function expectPlannedAwsResources(
  template: Template,
  expected: { s3Buckets?: number; lambdas?: number; tables?: number } = {},
): void {
  if (expected.s3Buckets !== undefined) {
    template.resourceCountIs("AWS::S3::Bucket", expected.s3Buckets);
  }

  if (expected.lambdas !== undefined) {
    template.resourceCountIs("AWS::Lambda::Function", expected.lambdas);
  }

  if (expected.tables !== undefined) {
    template.resourceCountIs("AWS::DynamoDB::Table", expected.tables);
  }
}
