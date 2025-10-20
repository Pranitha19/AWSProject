# Backend

Deploy with SAM:

```bash
cd backend
sam build
sam deploy --guided
```

Follow prompts. After deploy, note the ApiUrl output and set it in the frontend .env.
