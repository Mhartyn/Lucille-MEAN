pipeline {
    agent any 
    //{        
        //docker {
        //    image 'node'
        //    args '-p 3000:3000'
        //}
    //}
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh '''
                    docker build --pull --rm -f "dockerfile" -t creepsoftluceille:latest "."
                    '''
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
                   docker run -p 3000 --name luceille -d creepsoftluceille:latest
                   '''
            }
        }
    }
}