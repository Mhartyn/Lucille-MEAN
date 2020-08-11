pipeline {
    agent 
    {        
        docker {
            image 'node:10-alpine'
            args '-p 8081:3000'
        }
    }
    environment {
        MONGO_URI='jenkins'
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
        stage('BD'){
            steps{
                sh 'docker network create creep-red'
                sh '''
                    docker run -p 8082:27017 --network creep-red --name mdb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=2020 -d mongo --no-cache
                    '''
            }
        }
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