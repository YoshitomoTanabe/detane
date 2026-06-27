import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as lambda_nodejs from 'aws-cdk-lib/aws-lambda-nodejs';
import { Construct } from 'constructs';

export interface CountLambdaProps {}

export class CountLambda extends Construct {
  constructor(scope: Construct, id: string, props: CountLambdaProps) {
    super(scope, id);

    new lambda.Function(this, 'CountLambdaFunction', {
      runtime: lambda.Runtime.NODEJS_24_X,
      code: lambda.Code.fromAsset('lib/lambda'),
      handler: 'count.handler',
    });
  }
}
