pipeline {
    agent 
    {        
        docker {
            image 'node:10-alpine'
            args '-p 8081:3000'
        }
    }
    environment {
        NODE_ENV='jenkins'
        PORT='8081'
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    npm install \
                    && npm install typescript -g
                    '''
                sh 'tsc -p tsconfig.json'
            }
        }    
        //stage('Test') {
        //    steps {
        //        sh './jenkins/scripts/test.sh'
        //    }
        //}
        stage('Deliver') {
            steps {
                sh '''
                   set -x
                   npm run deploy
                   set +x
                   '''
            }
        }
    }
}