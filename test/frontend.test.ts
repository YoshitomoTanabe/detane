import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import Detane from "../lib/stack/detane-stack";

test("フロントエンド用S3バケットが存在している", () => {
    const app = new cdk.App();
    const stack = new Detane(app, "TestStack");
    const template = Template.fromStack(stack);

    template.resourceCountIs("AWS::S3::Bucket", 1);
});
