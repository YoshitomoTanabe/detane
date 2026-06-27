import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import Detane from '../lib/stack/detane-stack';

test('スナップショットと一致している', () => {
  const app = new cdk.App();
  const stack = new Detane(app, 'TestStack');
  const template = Template.fromStack(stack);
  expect(template.toJSON()).toMatchSnapshot();
});
