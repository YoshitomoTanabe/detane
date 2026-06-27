#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { DetaneStack } from "../lib/detane-stack";

const app = new cdk.App();
new DetaneStack(app, "DetaneStack");
