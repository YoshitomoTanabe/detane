import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import Detane from '../../lib/stack/detane-stack';

test('DynamoDBテーブルが存在している', () => {
  const app = new cdk.App();
  const stack = new Detane(app, 'TestStack');
  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::DynamoDB::GlobalTable', 1);
});
