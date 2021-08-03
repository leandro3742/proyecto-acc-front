import { CognitoUserPool } from 'amazon-cognito-identity-js';

const poolData = {
    UserPoolId: 'sa-east-1_UX1kdseLX',
    ClientId: '1q3ltru071j9qd4ee9unn8a4g8'
};

export default new CognitoUserPool(poolData);
