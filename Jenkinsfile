pipeline {
    agent 
    {        
        docker {
            image 'node'
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
                   node dist/index
                   set +x
                   '''
            }
        }
    }
}