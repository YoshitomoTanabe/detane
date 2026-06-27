#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import DetaneStack from '../lib/stack/detane-stack';

const app = new cdk.App();
new DetaneStack(app, 'DetaneStack');
