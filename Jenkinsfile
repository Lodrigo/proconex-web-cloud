//Git
def CREDENTIALS_ID = 'latam_servicejenkins'
def REPOSITORY_URL = 'https://git.synnex.org/scm/prioninno/da.renewals.web.git'

def BRANCH = 'master'

if (ENVIRONMENT == 'UAT') {
    BRANCH = 'UAT'
} else if (ENVIRONMENT == 'QA') {
    BRANCH = 'QA'
}

pipeline {
    agent { label "${AGENT}" }

    stages {
        stage('Checkout') {
            steps {
                git branch: "${BRANCH}", credentialsId: "${CREDENTIALS_ID}", url: "${REPOSITORY_URL}"
            }
        }

        stage('Send docker') {
            steps {
                sshagent(credentials: ['ssh-credentials-id']) {
                    sh  "${SSH_DOCKER_CLEAN}"
                    sh  "${SSH_DOCKER_COPY}"
                }
            }
        }
        
        stage('Build') {
            steps {
                sshagent(credentials: ['ssh-credentials-id']) {
                    sh  "${SSH_DOCKER_BUILD}"
                }                
            }
        } 
        
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }        
    }
}