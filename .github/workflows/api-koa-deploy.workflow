name: api/koa

on:
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: 'Authenticate to Google Cloud'
      uses: 'google-github-actions/auth@v1'
      with:
        credentials_json: ${{ secrets.GCP_SERVICE_ACCOUNT_KEY }}
        token_format: 'access_token'
    
    - uses: hashicorp/setup-terraform@v2.0.3
    
    - name: Terraform Init
      run: terraform init -backend=false
      
    - name: Terraform Apply
      run: |-
        terraform apply \
          -var project=${{ secrets.GCP_PROJECT }} \
          -var docker_image=${{ secrets.GCP_DOCKER_REGISTRY }}/api-koa:latest \
          -var backend_bucket=${{ secrets.TF_BUCKET }}

      
