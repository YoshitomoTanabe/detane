import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export interface FrontendBucketProps {}

export class FrontendBucket extends Construct {
  constructor(scope: Construct, id: string, props: FrontendBucketProps) {
    super(scope, id);

    new s3.Bucket(this, 'Bucket', {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
    });
  }
}
