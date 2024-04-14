import AWS from 'aws-sdk';


const configureAws = () =>{AWS.config.update({
    region: 'us-east-1', // e.g., 'us-east-1'
    accessKeyId:'ASIAQ3EGT552VZTRB3YW',
    secretAccessKey:'UxGTP9DmFyrSops88nWCnAV4F7mgFsZ5KOrBNT2y',
    sessionToken: 'IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIDLA2Uc3kAeW8sHpD5sOPo77Z07RptdbMVrqr1yXYXweAiEAw/Ne78MUXzjBoE0eobn4HrvWiH2d8A0sQzr9cVugAVoqvwIImP//////////ARAAGgwwNTgyNjQzODMzNDkiDBf4Y9OUIfcINruxFCqTAmWHEZZdXNSOMNSc6v2pO1CMYEMcnmBdUtCIaCYl2Q+KjPT5Le63y+Kl5BWk87SIR6RdybIr/qce7ltzGv6lqRkdqlwl0Hve7OurvkK0ROgQ9mTuKll9EzBc6zpznHYP6rUHuGF8n6Eui2mUngtJDs8XF/Cby79ooSo0/hqKxRVR/SMiV1weyl/eqfF7BA72aYdLUu4vlEnhrET3hlTezMNg2vJItm/17tLhLf0Ep0sXta6e4P0ZgExliJ8zt2be+GHfepbgYiZimczXxDORwnDpw0NANlCuyfdTmrrzBommlAJ/3dxf20d5mmXy3qmUnrETlnlCIiVkQqNMueQdwSDWvKyXVL+iAQthKDp84VbQ2yVAMJzF8bAGOp0B47voqgDnReMA/Fwu1N3NhMcGfcPlbd0eAfcpVClgwfkq3+vxLSkeZFwChLfdx6sk+7thKotX/r7iULKeyoJRUgA/dnmSyuHxwyD06QyntEWB0FLSg4gJiI7ewMfpDmcBmWViU2mL6XgSbnff+JyfGQ71sn77OPCCb2aoTAKeOKcYH2PPvMPUSzHoqRemiVYak33mSutTAE8a4TTylg=='
})};


export  default configureAws;