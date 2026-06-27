# detane

TypeScript の CDK アプリです。フロントエンドは React、バックエンドは S3 / Lambda / DynamoDB を前提にしています。

## まず読むもの

- [AGENTS.md](./AGENTS.md)
- `cdk.json`
- `package.json`
- `lib/detane-stack.ts`
- `bin/detane.ts`
- `test/`

## できること

- `npm run build` で型チェックとビルド
- `npm run test` で CDK の assertions テスト
- `npx cdk synth` で CloudFormation テンプレート生成
- `npx cdk diff` で差分確認
- `npx cdk deploy` でデプロイ

## 開発メモ

- 変更は小さく保つ
- インフラ変更は synth または assertions で確認する
- 仕様が曖昧なときは、最小実装を優先する
