pipeline {
    agent {
        docker {
            image 'node:lts-alpine3.9'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    npm install
                    npm tsc
                    '''
            }
        }
        stage('Deliver') {
            steps {
                sh '''
                    npm run build
                    npm start
                    '''                
            }
        }
    }
}
