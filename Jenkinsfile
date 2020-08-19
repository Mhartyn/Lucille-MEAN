pipeline {
    agent none
    environment {
        CI = 'true'
    }    
    stages {
        stage('Deploy BD') {
            agent any
            steps {
                sh 'docker network create creep-$RED-$BUILD_ID'
                sh '''
                   docker run -p $PORTBD:27017 -v db:/data/db --network creep-$RED-$BUILD_ID --name $NAMEBD -e MONGO_INITDB_ROOT_USERNAME=$USERBD -e MONGO_INITDB_ROOT_PASSWORD=$PSW -e MONGO_INITDB_DATABASE=presupuesto -d mongo
                   '''
            }
        }
        stage('Build and Test') {
            agent 
            {        
                docker {
                    image 'node:10-alpine'
                    networks 'creep-$RED-$BUILD_ID'
                }
            }
            environment {
                NODE_ENV='jenkins'
                NODE_UIR='mongodb://$USERBD:$PSW@$NAMEBD'                
            }
            steps {
                sh '''
                    npm install \
                    && npm install typescript -g
                    '''
                sh 'tsc -p tsconfig.json'
                sh '''
                   set -x
                   npm run test
                   set +x
                   '''
            }
        }
        stage('Images Build') {
            agent any
            steps {
                sh 'docker build --pull --rm -f "dockerfile" -t creepsoft/lucille:$BUILD_NUMBER "." --no-cache'
                sh 'docker build --pull --rm -f "proxy-inverso/dockerfile" -t creepsoft/inverso:$BUILD_NUMBER "." --no-cache'
            }
        }                
        stage('Deploy Microservicio') {
            agent any
            steps {                
                sh '''
                   docker run --network creep-$RED-$BUILD_ID -e MONGO_URI="mongodb://$USERBD:$PSW@$NAMEBD" --name $NAMEAPI -d creepsoft/lucille:$BUILD_NUMBER
                   '''
            }
        }
        stage('Deploy Proxy') {
            agent any
            steps {                
                sh '''
                    docker run -p $PORTAPI:80 --network creep-$RED-$BUILD_ID --name proxy-inverso -d creepsoft/inverso:$BUILD_NUMBER
                   '''
            }
        }
    }
}