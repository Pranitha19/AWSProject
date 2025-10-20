import { Amplify, Auth } from 'aws-amplify'

Amplify.configure({
  Auth: {
    region: import.meta.env.VITE_AWS_REGION,
    userPoolId: import.meta.env.VITE_COGNITO_USERPOOL_ID,
    userPoolWebClientId: import.meta.env.VITE_COGNITO_APP_CLIENT_ID,
    oauth: {
      domain: import.meta.env.VITE_COGNITO_DOMAIN,
      scope: ['email','openid','profile'],
      redirectSignIn: import.meta.env.VITE_REDIRECT_SIGN_IN,
      redirectSignOut: import.meta.env.VITE_REDIRECT_SIGN_OUT,
      responseType: 'code'
    },
    mandatorySignIn: false
  }
});

export async function currentSessionJwt(){
  try{
    const session = await Auth.currentSession();
    return session.getIdToken().getJwtToken();
  }catch(e){ return null }
}

export function signInHosted(){
  Auth.federatedSignIn();
}