pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    docker build --pull --rm -f "dockerfile" -t creepsoft/lucille:$BUILD_NUMBER "." --no-cache
                    '''
                sh 'docker network create creep-$RED-$BUILD_ID'
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
                   docker run -p $PORT-API:3000 --network creep-$RED-$BUILD_ID -e MONGO_URI="mongodb://$USER-BD:$PSW@$NAMEBD" --name $NAMEAPI -d creepsoft/lucille:$BUILD_NUMBER
                   '''
            }
        }
        stage('BD') {
            steps {
                sh '''
                   docker run -p $PORTBD:27017 --network creep-$RED-$BUILD_ID --name $NAMEBD -e MONGO_INITDB_ROOT_USERNAME=$USERBD -e MONGO_INITDB_ROOT_PASSWORD=$PSW -e MONGO_INITDB_DATABASE=presupuesto -d mongo
                   '''
            }
        }
    }
}