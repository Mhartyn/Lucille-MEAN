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
                    docker-compose -f "docker-compose.yml" up -d --build
                    '''
            }
        }
        //stage('Test') {
        //    steps {
        //        sh './jenkins/scripts/test.sh'
        //    }
        //}
        //stage('Deliver') {
        //    steps {
        //        sh './jenkins/scripts/deliver.sh'
        //        input message: 'Finished using the web site? (Click "Proceed" to continue)?'
        //        sh './jenkins/scripts/kill.sh'
        //    }
        //}
    }
}