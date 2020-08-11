pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    docker build --pull --rm -f "dockerfile" -t creepsoftluceille:latest "."
                    '''
                sh 'docker network create creep-red'
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
                   docker run -p 8081:3000 --network creep-red -e MONGO_URI="mongodb://root:2020@mdb" --name luceille -d creepsoftluceille:latest
                   '''
            }
        }
        stage('BD') {
            steps {
                sh '''
                   docker run -p 8082:27017 --network creep-red --name mdb -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=2020 -e MONGO_INITDB_DATABASE=presupuesto -v "./data/mongodb :/data/db" -d mongo
                   '''
            }
        }
    }
}