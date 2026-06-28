import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { FrontendBucket } from '../construct/frontend/bucket';
import { CountLambda } from '../construct/backend/count';
import { DynamoDbTable } from '../construct/db/table';

export default class DetaneStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    new FrontendBucket(this, 'FrontendBucket', {});
    new CountLambda(this, 'CountLambda', {});
    new DynamoDbTable(this, 'DynamoDbTable', {});
  }
}
