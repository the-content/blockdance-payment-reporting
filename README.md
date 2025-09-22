# Blackdance Reporting System

blockdance支付数据转移清晰并生成可视化图表数据报告

#### 配置 AWS IAM 秘钥

-   通过 aws 配置文件配置  
    https://sst.dev/docs/iam-credentials/#credentials

-   通过`.env` `.env.development` `.env.production`文件配置  
    https://sst.dev/docs/iam-credentials/#precedence

## SST 本地开发和线上部署

### 安装 sst 的 aws 提供商

> 这一步可能不需要手动执行，在`package.json`的`postinstall`脚本中已经执行了,如果没有出现`.sst`目录需要手动执行一次

```bash
npx sst install aws
# or
bunx sst install aws
```

### 本地开发

> [!NOTE]  
> 需要先通过 AWS CLI 配置访问秘钥，或者配置秘钥在.env 文件  
> https://sst.dev/docs/iam-credentials/#from-environment-variables

#### 本地开发[需要先配置访问秘钥]

```bash
npm run dev:sst
```

#### 线上部署[需要先配置访问秘钥]

```bash
npm run deploy:sst:prod
```
