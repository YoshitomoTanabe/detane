import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export interface DynamoDbTableProps {}

export class DynamoDbTable extends Construct {
  constructor(scope: Construct, id: string, props: DynamoDbTableProps) {
    super(scope, id);
    new dynamodb.TableV2(this, 'DynamoDbTable', {
      partitionKey: {
        name: 'id',
        type: dynamodb.AttributeType.STRING,
      },
    });
  }
}
